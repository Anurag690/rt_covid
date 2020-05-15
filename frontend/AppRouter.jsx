import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import App from './components/home';
import DistrictChart from './components/districtChart';
import ScrollToTop from './components/scrollToTop';
import Header from './components/header';

export default class AppRouter extends React.Component {
    render() {
        return(
            <Router>
                <ScrollToTop/>
                <Header/>
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