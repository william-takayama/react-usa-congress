import cn from "clsx";
import { Typography } from "../Typography/Typography";
import classes from "./RadioInput.module.scss";

interface RadioInputProps {
  id: string;
  label: string;
  onChange: (option: string) => void;
  selected?: boolean;
  name: string;
}

export function RadioInput({
  id,
  label,
  onChange,
  selected = false,
  name,
}: RadioInputProps) {
  return (
    <>
      <div
        className={classes.inputRadioContainer}
        role="radio"
        aria-checked={selected}
        tabIndex={1}
        data-name={name}
      >
        <input
          id={id}
          type="radio"
          style={{ margin: 0 }}
          value={id}
          onChange={() => onChange(id)}
          checked={selected}
          hidden
          className={classes.inputRadio}
        />

        <label htmlFor={id} className={cn(classes.label)}>
          <div data-selected={selected} className={classes.circle}>
            <div className={classes.innerCircle} />
          </div>

          <Typography
            type="body"
            size={12}
            align="start"
            weight={selected ? 700 : 400}
            spaced={false}
          >
            {label}
          </Typography>
        </label>
      </div>
    </>
  );
}
