import { ChangeEvent, CSSProperties, FocusEvent, useRef } from "react";
import { Typography } from "../Typography/Typography";
import cn from "clsx";
import classes from "./Input.module.scss";
import { Loader } from "../Loader/Loader";

export interface InputSelect {
  options?: { label: string; value: string }[];
}

export interface InputRange {
  min?: number | string;
  max?: number | string;
  step?: number | string;
  rangeValue?: string;
}

interface InputProps {
  id: string;
  type: string;
  placeholder: string;
  name?: string;
  defaultValue?: string;
  value?: string;
  label?: string;
  disabled?: boolean;
  maxLength?: number;
  title?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement | HTMLSelectElement>) => void;
  className?: string;
  style?: CSSProperties;
  labelStyle?: CSSProperties;
  isLoading?: boolean;
}

type InputPropsType = InputProps & InputSelect & InputRange;

export function Input({
  id,
  type = "text",
  placeholder,
  name,
  label,
  disabled = false,
  maxLength,
  defaultValue,
  value,
  options,
  title,
  onChange: onChangeProp,
  onBlur: onBlurProp,
  className,
  style,
  labelStyle,
  isLoading,
  min,
  max,
  step,
  rangeValue,
  ...props
}: InputPropsType) {
  const lastValue = useRef(value);

  function onChange(event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    if (typeof onChangeProp === "function") {
      onChangeProp(event);
    }
  }

  function onBlur(event: FocusEvent<HTMLInputElement | HTMLSelectElement>) {
    if (typeof onBlurProp === "function") {
      onBlurProp(event);
    }
    lastValue.current = value;
  }

  if (type === "select") {
    return (
      <select
        className={cn(classes.input, className)}
        value={value}
        onChange={onChange}
      >
        {options?.map((option, index) => {
          return (
            <option key={String(index) + option.value} value={option.value}>
              {option.label}
            </option>
          );
        })}
      </select>
    );
  }

  return (
    <>
      {title ? (
        <div className={classes.titleContainer}>
          <Typography type="body-heading" className={classes.title}>
            {title}
          </Typography>
        </div>
      ) : null}
      <label htmlFor={id} style={labelStyle} className={classes.labelContainer}>
        <input
          id={id}
          type={type}
          style={style}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          name={name}
          value={value}
          defaultValue={defaultValue}
          disabled={disabled}
          className={cn(classes.input, className)}
          maxLength={maxLength}
          min={min}
          max={max}
          step={step}
          {...props}
        />
        {min && max ? <Typography type="body">{rangeValue}</Typography> : null}
        {isLoading ? (
          <Loader
            isLoading={isLoading}
            width={16}
            height={16}
            spinnerWidth={16}
            spinnerHeight={16}
            className={classes.loader}
          />
        ) : null}
      </label>
    </>
  );
}
