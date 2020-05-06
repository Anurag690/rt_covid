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
            intervalId: 0,
            countryChartWidth: 1350,
            stateChartWidth: 400,
            initialWindowWidth: 0
        }
        this.onWindowResize = this.onWindowResize.bind(this);
        this.getWindowWidth = this.getWindowWidth.bind(this);
    }
    componentDidMount() {
        this.onWindowResize();
        window.addEventListener("resize", this.onWindowResize);
    }
    componentWillUnmount() {
        window.removeEventListener("resize", this.onWindowResize);
    }
    getWindowWidth() {
        return Math.max(
          document.documentElement.clientWidth,
          window.innerWidth || 0
        );
    }
    onWindowResize() {
        let windowSize = this.getWindowWidth();
        if(!this.state.initialWindowWidth) {
            this.setState({
                initialWindowWidth: windowSize,
                countryChartWidth: windowSize<764?764-90 : windowSize-90,
                stateChartWidth: windowSize<400?windowSize*0.99:400
            })
        }
        if(this.state.initialWindowWidth) {
            let percentDiminished =  (windowSize / this.state.initialWindowWidth)*100;
            let diminishedStateWidth = (400)*percentDiminished/100
            this.setState({
                countryChartWidth: windowSize<764?764-90 :(this.state.initialWindowWidth - 90)*percentDiminished/100,
                stateChartWidth: windowSize<400 && diminishedStateWidth < 400?diminishedStateWidth:400
            })
        }
    }
    render(){
        return(
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <ScrollToTop/>
                <Header/>
                <CountryChart barChartWidth={this.state.countryChartWidth}/>
                <StateCharts stateChartWidth={this.state.stateChartWidth}/>
                <Footer/>
            </div>
        );
    }
}