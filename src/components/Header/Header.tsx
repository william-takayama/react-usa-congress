import logo from "../../assets/images/usa-flag.webp";

import classes from "./Header.module.scss";

export function Header() {
  return (
    <header id="main-header" className={classes.mainHeader}>
      <img src={logo} className={classes.logo} alt="logo" />
    </header>
  );
}
