declare module "*.scss" {
  const classes: { [key: string]: string };
  export default classes;
}

declare module "clsx" {
  const cn: (
    ...args: (string | undefined | Record<string, boolean | undefined>)[]
  ) => string;
  export default cn;
}
