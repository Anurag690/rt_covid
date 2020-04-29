import React from 'react';
import MyLineChart from './components/lineChart';
import MyComposedChart from './components/composedChart';

export default class App extends React.PureComponent{
    render(){
        return(
            <MyComposedChart/>
        );
    }
}