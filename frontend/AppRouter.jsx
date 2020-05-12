import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import App from './App';
import DistrictChart from './components/districtChart';

export default class AppRouter extends React.Component {
    render() {
        return(
            <Router>
                <Switch>
                    <Route exact path="/rtcovid">
                        <App />
                    </Route>
                    <Route path={"/rtcovid/districts"}>
                        <DistrictChart />
                    </Route>
                </Switch>
            </Router>
        );
    }
}