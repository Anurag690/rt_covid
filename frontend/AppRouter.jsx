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
import BodyContent from './components/bodyContent';
import Footer from './components/footer';

import './app.css';

export default class AppRouter extends React.Component {
    render() {
        return(
            <Router>
                <ScrollToTop/>
                <Header/>
                <BodyContent/>
                <Switch>
                    <Route exact path="/rtcovid">
                        <App />
                    </Route>
                    <Route path={"/rtcovid/districts"}>
                        <DistrictChart />
                    </Route>
                </Switch>
                <div className="notes-section">
                    <div>* There is an incubation period in which people are likely infectious but not symptomatic. This model assumes infectiousness begins with symptoms. While future versions may correct for this, a simple heuristic is to shift all values of Rt 5 days into the past. The model calculates Rt based on report time and is not backdated to onset time.</div>
                    <div>* The model also does not incorporate serial interval as a distribution. Update coming for both.</div>
                </div>
                <Footer/>
            </Router>
        );
    }
}