import React, { FC, Fragment } from 'react';
import { Route, Switch, Redirect } from "react-router-dom";

import DataTable from "./containers/data-table/DataTable";

const App: FC = () => (
  <Fragment>
    <Switch>
      <Route exact path="/" render={() => (
          <Redirect to="/data-table"/>
      )}/>
      <Route path="/data-table" component={DataTable} />
      {/* <Route path="/data-charts" component={DataCharts} /> */}
    </Switch>
  </Fragment>
);

export default App;
