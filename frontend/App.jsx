import React from 'react';
import CountryChart from './components/countryChart';
import StateCharts from './components/stateCharts';
import ScrollToTop from './components/scrollToTop';
import Footer from './components/footer';
import Header from './components/header';

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
                <Footer/>
            </div>
        );
    }
}