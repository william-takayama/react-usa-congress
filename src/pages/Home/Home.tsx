import cn from "clsx";
import * as localStorage from "local-storage";
import debounce from "lodash/debounce";
import { parse } from "query-string";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router";
import { Button } from "../../components/Button/Button";
import { CardCongressMember } from "../../components/Card/CardCongressMember/CardCongressMember";
import {
  FiltersContext,
  FiltersProvider,
} from "../../components/FiltersProvider/FiltersProvider";
import { FormFilters } from "../../components/FormFilters/FormFilters";
import { Input, InputSelect } from "../../components/Input/Input";
import { RadioInput } from "../../components/Input/RadioInput";
import { Loader } from "../../components/Loader/Loader";
import { Spacing } from "../../components/Spacing/Spacing";
import { Typography } from "../../components/Typography/Typography";
import { usePagination } from "../../hooks/usePagination";
import { usePrevious } from "../../hooks/usePrevious";
import { congressService } from "../../services/congress.service";
import { Chamber } from "../../types/Congress";
import { CongressMembersResult, Member } from "../../types/CongressMembers";
import classes from "./Home.module.scss";

const MAX_ITEMS = 10;

const congress = {
  house: { initial: 102, final: 117 },
  senate: { initial: 80, final: 117 },
};
const congressOptionHouse: InputSelect["options"] = Array.from(
  { length: congress.house.final - congress.house.initial + 1 },
  (_, i) => {
    return {
      label: String(congress.house.initial + i),
      value: String(congress.house.initial + i),
    };
  }
);

const congressOptionSenate: InputSelect["options"] = Array.from(
  { length: congress.senate.final - congress.senate.initial + 1 },
  (_, i) => {
    return {
      label: String(congress.senate.initial + i),
      value: String(congress.senate.initial + i),
    };
  }
);

export function Home() {
  return (
    <FiltersProvider>
      <HomePageComponent />
    </FiltersProvider>
  );
}

function HomePageComponent() {
  const location = useLocation();
  const parsedQuery: any = useMemo(
    () => parse(location.search),
    [location.search]
  );

  const { select, getFieldValue } = useContext(FiltersContext);
  const chamberValue = useMemo<Chamber | undefined>(
    () => getFieldValue("chamber") as Chamber,
    [getFieldValue]
  );
  const congressNumber = useMemo(
    () => getFieldValue("congress"),
    [getFieldValue]
  ) as number;
  const oldChamberValue = usePrevious(chamberValue);
  const oldCongressNumber = usePrevious(congressNumber);

  const [members, setMembers] = useState<
    CongressMembersResult["members"] | undefined
  >(localStorage.get(`members-${congressNumber}-${chamberValue}`) ?? undefined);

  const [query, setQuery] = useState<string | null>(
    localStorage.get("search") ?? null
  );

  const [isSearchFieldLoading, setIsSearchFieldLoading] =
    useState<boolean>(false);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const filteredCards = useMemo(() => {
    const normalizedQuery = query?.toLocaleLowerCase();
    if (
      (query?.length ?? "") > 0 &&
      normalizedQuery &&
      (members?.length ?? []) > 0
    ) {
      return members?.filter((member) => {
        return (
          member?.first_name?.toLocaleLowerCase().includes(normalizedQuery) ||
          member?.last_name?.toLocaleLowerCase().includes(normalizedQuery)
        );
      });
    }

    if (
      !!parsedQuery &&
      Object.keys(parsedQuery).length > 0 &&
      (members?.length ?? []) > 0
    ) {
      return members?.filter((member) => {
        return (
          member.gender?.includes(parsedQuery["gender"] ?? "") &&
          (member.next_election ?? "")?.includes(
            parsedQuery["next-election-year"] ?? ""
          ) &&
          member.party?.includes(parsedQuery["party"] ?? "") &&
          (member.total_votes ?? 0) >= (parsedQuery["total-votes"] ?? 0) &&
          (member.votes_with_party_pct ?? 0) >=
            (parsedQuery["votes-with-party-pct"] ?? 0)
        );
      });
    }

    return members;
  }, [members, parsedQuery, query]);

  const { pages, currentPage, changePage } = usePagination({
    initialPage: 1,
    items: filteredCards ?? [],
    maxItems: MAX_ITEMS,
  });

  const handleChangePage = useCallback(
    (id: number) => {
      changePage(id);
    },
    [changePage]
  );

  useEffect(() => {
    if (filteredCards) {
      handleChangePage(0);
    }
  }, [filteredCards, handleChangePage]);

  useEffect(() => {
    if (
      members != null &&
      oldChamberValue === chamberValue &&
      oldCongressNumber === congressNumber
    ) {
      setIsLoading(false);
      return;
    }

    const membersFromLS: Member[] | undefined = localStorage.get(
      `members-${congressNumber}-${chamberValue}`
    );

    if (membersFromLS != null) {
      setMembers(membersFromLS ?? []);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    async function fetchCongressData() {
      const congressMembers =
        await congressService.getMembersBySessionAndChamber(
          congressNumber ?? 115,
          chamberValue
        );

      if (congressMembers) {
        setMembers(congressMembers);
        localStorage.set(
          `members-${congressNumber}-${chamberValue}`,
          congressMembers
        );
      }
      setIsLoading(false);
    }

    fetchCongressData();
  }, [
    chamberValue,
    members,
    oldChamberValue,
    congressNumber,
    oldCongressNumber,
  ]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onSearchChange = useCallback(
    debounce((e) => {
      setQuery(e.target.value);
      setIsSearchFieldLoading(false);
    }, 1200),
    []
  );

  return (
    <>
      {isLoading ? <Loader /> : null}
      <div className={classes.filtersHeader}>
        <FormFilters />

        <Spacing type="block" size="x-small" />

        <div className={classes.radioInputContainer}>
          <RadioInput
            name="chamber"
            id="chamber-house"
            onChange={() => select(undefined, "chamber", "house")}
            selected={chamberValue === "house"}
            label="HOUSE"
          />
          <Spacing type="inline" size="x-small" />
          <RadioInput
            name="chamber"
            id="chamber-senate"
            onChange={() => select(undefined, "chamber", "senate")}
            selected={chamberValue === "senate"}
            label="SENATE"
          />

          <Input
            id="congress"
            type="select"
            onChange={(e) => select(e, "congress")}
            placeholder="Select congress number"
            value={String(congressNumber)}
            options={
              chamberValue === "house"
                ? congressOptionHouse
                : congressOptionSenate
            }
            className={classes.congressOptionsInput}
          />
        </div>
      </div>

      <Spacing type="block" size="x-small" />

      <Input
        id="search-field"
        type="text"
        placeholder="Search your candidate"
        onChange={(e) => {
          setIsSearchFieldLoading(true);
          onSearchChange(e);
        }}
        isLoading={isSearchFieldLoading}
      />

      <ul className={classes.pagesList}>
        {pages.map((page, id) => {
          if (page.length === 0 || filteredCards?.length === 0) {
            return undefined;
          }
          return (
            <Button
              key={id}
              size="xx-small"
              onClick={() => handleChangePage(id)}
              style={{ width: 24, height: 24 }}
              className={cn(classes.button, {
                [classes.active]: id === currentPage,
              })}
            >
              {id + 1}
            </Button>
          );
        })}
      </ul>
      <div className={classes.gridContainer}>
        {query || (filteredCards?.length ?? []) > 0 ? (
          <>
            {pages[currentPage]?.map((member, i) => {
              return (
                <CardCongressMember
                  key={member.id}
                  member={member}
                  chamber={chamberValue ?? "senate"}
                  session={congressNumber}
                />
              );
            })}
          </>
        ) : (
          <Typography type="body-heading">
            Sorry, we couldn't find{" "}
            <b style={{ color: "red" }}>{query ? `${query}` : ""}</b>
          </Typography>
        )}
      </div>
    </>
  );
}
