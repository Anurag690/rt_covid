import React from 'react';
import CountryChart from './components/countryChart';
import StateCharts from './components/stateCharts';
import ScrollToTop from './components/scrollToTop';
import Footer from './components/footer';

export default class App extends React.PureComponent{
    constructor(props) {
        super(props);
        this.state = {
            intervalId: 0
        }
    }
    componentDidMount() {
        
    }
    render(){
        return(
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <ScrollToTop/>
                <h1 class="ant-typography" style={{marginLeft: '4%'}}>R<sub>t</sub> Covid-19 </h1>
                <CountryChart/>
                <StateCharts/>
                <Footer/>
            </div>
        );
    }
}