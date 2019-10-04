import React, { FC, Fragment } from 'react';
import { Route, Switch } from "react-router-dom";

import DataTable from "./containers/data-table/DataTable";

const App: FC = () => (
  <Fragment>
    <Switch>
      <Route path="/data-table" component={DataTable} />
      {/* <Route path="/data-charts" component={DataCharts} /> */}
    </Switch>
  </Fragment>
);

export default App;
