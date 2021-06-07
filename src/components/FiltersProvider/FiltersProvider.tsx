import produce, { Draft } from "immer";
import debounce from "lodash/debounce";
import {
  ChangeEvent,
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from "react";
import * as localStorage from "local-storage";
import { Chamber } from "../../types/Congress";

export type FieldType = {
  key: string;
  value: string | number;
};

export type ReducerAction =
  | {
      type: "CHANGE";
      field: FieldType;
    }
  | {
      type: "SUBMIT";
      fields: FieldType[];
    }
  | {
      type: "LOAD";
    }
  | {
      type: "RESET";
      key: FieldType["key"];
    };

export type ReducerState = {
  fieldsValue: FieldType[];
  isLoading: boolean;
};

function reducer(state: ReducerState, action: ReducerAction): ReducerState {
  return produce(state, (draft: Draft<ReducerState>) => {
    function findFieldIndex(key: string) {
      const fieldIndex = draft.fieldsValue.findIndex(
        (field) => field.key === key
      );
      return fieldIndex;
    }

    if (action.type === "LOAD") {
      draft.isLoading = true;
    }

    if (action.type === "CHANGE") {
      const fieldIndex = findFieldIndex(action.field.key);
      if (fieldIndex === -1) {
        draft.fieldsValue = [action.field];
        return;
      }
      draft.fieldsValue[fieldIndex] = action.field;
      draft.isLoading = false;
    }

    if (action.type === "SUBMIT") {
      draft.isLoading = true;
    }

    if (action.type === "RESET") {
      draft.isLoading = false;
      const fieldIndex = findFieldIndex(action.key);

      if (fieldIndex === -1) {
        return;
      }
      draft.fieldsValue[fieldIndex].value = "";
    }
  });
}

const initialState: ReducerState = {
  fieldsValue: [
    {
      key: "party",
      value: localStorage.get("party") ?? "",
    },
    {
      key: "gender",
      value: localStorage.get("gender") ?? "",
    },
    {
      key: "next-election-year",
      value: localStorage.get("next-election-year") ?? "",
    },
    {
      key: "chamber",
      value: localStorage.get("chamber") ?? ("senate" as Chamber),
    },
    {
      key: "total-votes",
      value: localStorage.get("total-votes") ?? "",
    },
    {
      key: "votes-with-party-pct",
      value: localStorage.get("votes-with-party-pct") ?? "",
    },
    {
      key: "congress",
      value: localStorage.get("congress") ?? 115,
    },
  ],
  isLoading: false,
};

interface SearchContextInterface extends ReducerState {
  handlerSearchInput: (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  reset: (key: string) => void;
  select: (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement> | undefined,
    key: string,
    option?: string
  ) => void;
  getFieldValue: (fieldKey: FieldType["key"]) => FieldType["value"];
}

export const FiltersContext = createContext<SearchContextInterface>({
  ...initialState,
  handlerSearchInput: () => {},
  onChange: () => {},
  reset: () => {},
  select: () => {},
  getFieldValue: () => "",
});

export function useFilters() {
  return useContext(FiltersContext);
}

export function FiltersProvider({ children }: PropsWithChildren<any>) {
  const [state, dispatch] = useReducer<typeof reducer>(reducer, initialState);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handlerSearchInput = useCallback(
    debounce((e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      dispatch({
        type: "CHANGE",
        field: {
          key: "search",
          value: e.target.value,
        },
      });
    }, 1200),
    []
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    dispatch({ type: "LOAD" });
    handlerSearchInput(e);
  };

  const select = useCallback(
    (
      e: ChangeEvent<HTMLInputElement | HTMLSelectElement> | undefined,
      key: string,
      option?: string
    ) => {
      dispatch({
        type: "CHANGE",
        field: {
          key,
          value: e?.target?.value ?? option ?? "",
        },
      });
      localStorage.set(key, e?.target?.value ?? option ?? "");
    },
    []
  );

  const reset = useCallback((key: FieldType["key"]) => {
    dispatch({ type: "RESET", key });
  }, []);

  const getFieldValue = useCallback(
    (fieldKey: FieldType["key"]): FieldType["value"] => {
      return (
        state.fieldsValue.find((field) => field.key === fieldKey)?.value ?? ""
      );
    },
    [state.fieldsValue]
  );

  const context = useMemo(
    () => ({
      ...state,
      handlerSearchInput,
      onChange,
      reset,
      select,
      getFieldValue,
    }),
    [state, handlerSearchInput, onChange, reset, select, getFieldValue]
  );

  return (
    <FiltersContext.Provider value={context}>
      {children}
    </FiltersContext.Provider>
  );
}
