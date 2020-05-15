import React from 'react';
import CountryChart from './countryChart';
import StateCharts from './stateCharts';
import BodyContent from './bodyContent';
import Footer from './footer';

import '../app.css';

export default class App extends React.PureComponent{
    constructor(props) {
        super(props);
    }
    render(){
        return(
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <BodyContent/>
                <CountryChart/>
                <StateCharts/>
                <div style={{fontWeight: "bold", padding: '0 7% 2%', color: 'rgb(169,169,169)'}}>* States with less than 100 cases have been removed because of insufficient data.</div>
                <Footer/>
            </div>
        );
    }
}