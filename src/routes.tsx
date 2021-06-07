import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { MemberDetails } from "./pages/MemberDetails/MemberDetails";
import { NotFound } from "./pages/NotFound/NotFound";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/member/:id" exact component={MemberDetails} />
        <Route path="*" exact component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}
