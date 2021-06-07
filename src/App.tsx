import React from "react";
import classes from "./App.module.scss";
import bannerImg from "./assets/images/background.jpg";
import { Banner } from "./components/Banner/Banner";
import { Header } from "./components/Header/Header";
import { Spacing } from "./components/Spacing/Spacing";
import Routes from "./routes";

export default function App(): JSX.Element {
  return (
    <div className={classes.wrapper}>
      <Header />

      <Banner src={bannerImg} alt="congress" />

      <section className={classes.section}>
        <div className={classes.container}>
          <Routes />
          <Spacing type="block" size="regular" />
        </div>
      </section>
    </div>
  );
}
