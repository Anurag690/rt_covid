import React from 'react';
import CountryChart from './components/countryChart';
import StateCharts from './components/stateCharts';
import ScrollToTop from './components/scrollToTop';
import Footer from './components/footer';
import Header from './components/header';
import './app.css';

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
                <Header/>
                <CountryChart/>
                <StateCharts/>
                <div style={{fontWeight: "bold", padding: '0 7% 2%', color: 'rgb(169,169,169)'}}>* States with less than 100 cases have been removed because of insufficient data.</div>
                <Footer/>
            </div>
        );
    }
}