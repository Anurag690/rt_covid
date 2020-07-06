import React from 'react';
import CountryChart from './countryChart';
import StateCharts from './stateCharts';

export default class App extends React.PureComponent{
    constructor(props) {
        super(props);
    }
    render(){
        return(
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <CountryChart/>
                <StateCharts/>
            </div>
        );
    }
}