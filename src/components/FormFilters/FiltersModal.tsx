import { FormEvent, useContext } from "react";
import { useHistory } from "react-router";
import { BottomSheet } from "../BottomSheet/BottomSheet";
import { Button } from "../Button/Button";
import { FiltersContext } from "../FiltersProvider/FiltersProvider";
import { Input, InputSelect } from "../Input/Input";
import LineDivider from "../LineDivider/LineDivider";
import { Spacing } from "../Spacing/Spacing";
import { Typography } from "../Typography/Typography";
import classes from "./FiltersModal.module.scss";

interface FiltersModalProps {
  isVisible: boolean;
  close: () => void;
}

const partyOptions: InputSelect["options"] = [
  { label: "", value: "" },
  { label: "Republican", value: "R" },
  { label: "Democratic", value: "D" },
];

const genderOptions: InputSelect["options"] = [
  { label: "", value: "" },
  { label: "Female", value: "F" },
  { label: "Male", value: "M" },
];

const nextElectionYearsOptions: InputSelect["options"] = Array.from(
  { length: 20 },
  (_, i) => {
    if (i === 0) {
      return {
        label: "",
        value: "",
      };
    }

    return {
      label: String(2008 + i),
      value: String(2008 + i),
    };
  }
);

const fieldValues = [
  "party",
  "gender",
  "next-election-year",
  "total-votes",
  "votes-with-party-pct",
];

export function FiltersModal({ isVisible, close }: FiltersModalProps) {
  const { fieldsValue, select, getFieldValue } = useContext(FiltersContext);
  const history = useHistory();

  const [
    partyValue,
    genderValue,
    nextElectionYearValue,
    totalVotesValue,
    totalVotesWithPartyValue,
  ] = fieldValues.reduce((acc: string[], key: string) => {
    let fieldValue = getFieldValue(key);
    acc = [...acc, fieldValue as string];
    return acc;
  }, []);

  const queries = fieldsValue
    .filter((field) => fieldValues.includes(field.key))
    .reduce((acc: string[], current) => {
      let query = `${current.key}=${current.value}`;
      if ((current.value as string).length > 0) {
        acc = [...acc, query];
      }
      return acc;
    }, []);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await history.push({
      pathname: "/",
      search:
        queries?.length > 1 ? `?${queries.join("&")}` : `?${queries[0]}` ?? "",
    });
    close();
  }

  return (
    <BottomSheet id="filters-modal" isVisible={isVisible} onDismiss={close}>
      <form className={classes.form}>
        <Typography type="heading3">Filters</Typography>

        <LineDivider marginTop={12} marginBottom={12} />

        <Input
          id="party-options"
          type="select"
          options={partyOptions}
          onChange={(e) => select(e, "party")}
          value={partyValue}
          placeholder="Select a party"
        />

        <Spacing type="block" size="xx-small" />

        <Input
          id="gender-options"
          type="select"
          options={genderOptions}
          onChange={(e) => select(e, "gender")}
          value={genderValue}
          placeholder="Select a gender"
        />

        <Spacing type="block" size="xx-small" />

        <Input
          id="next-election-options"
          type="select"
          onChange={(e) => select(e, "next-election-year")}
          value={nextElectionYearValue}
          options={nextElectionYearsOptions}
          placeholder="Next election year"
        />
        <Spacing type="block" size="xx-small" />

        <Input
          id="total-votes"
          type="range"
          placeholder=""
          defaultValue=""
          min="0"
          max="1600"
          step={50}
          onChange={(e) => select(e, "total-votes")}
          rangeValue={`${totalVotesValue} votes`}
        />

        <LineDivider marginTop={12} marginBottom={12} />

        <Input
          id="votes-with-party-pct"
          type="range"
          placeholder=""
          defaultValue=""
          min="0"
          max="100"
          step={5}
          onChange={(e) => select(e, "votes-with-party-pct")}
          rangeValue={`${totalVotesWithPartyValue}%`}
        />
        <LineDivider marginTop={12} marginBottom={12} />

        <Button
          type="submit"
          size="regular"
          variant="light"
          borderRadius={30}
          fluid
          onClick={onSubmit}
        >
          <b>APPLY FILTERS</b>
        </Button>
      </form>
    </BottomSheet>
  );
}
