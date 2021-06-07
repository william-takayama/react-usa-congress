import { useCallback, useState } from "react";
import { ImFilter } from "react-icons/im";
import { Button } from "../Button/Button";
import { Spacing } from "../Spacing/Spacing";
import { Typography } from "../Typography/Typography";
import { FiltersModal } from "./FiltersModal";
import classes from "./FormFilters.module.scss";

export function FormFilters() {
  const [filtersIsOpen, setOpenFilters] = useState(false);

  const setIsOpen = useCallback((isOpen: boolean) => {
    setOpenFilters(isOpen);
  }, []);

  return (
    <div className={classes.container}>
      <FiltersModal isVisible={filtersIsOpen} close={() => setIsOpen(false)} />

      <Button
        onClick={() => setIsOpen(true)}
        icon={<ImFilter size={16} />}
        iconPosition="only"
      />

      <Spacing type="inline" size="x-small" />

      <Typography type="heading3">Filters</Typography>
    </div>
  );
}
