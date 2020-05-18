import React from 'react';
import moment from 'moment';
import {getCovidUpdationDate} from '../services/covidData';
// import DistrictChart from './districtChart';

export default class Header extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            updationDate: "",
            readMore: false
        }
    }
    componentDidMount() {
        getCovidUpdationDate().then(data=>{
            this.setState({
                updationDate: data.updationDate
            })
        })
    }
    handleReadMore() {
        this.setState( {
            readMore: !this.state.readMore
        })
    }
    render() {
        // let { path, url } = useRouteMatch();
        const rtText = function(){return(<span>R<sub>t</sub></span>)}
        return(
            <div style={{
                backgroundColor: 'white',
                paddingLeft: '7%',
                // marginTop: '2%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'left',
                justifyContent: 'left'
            }}>
                <div style={{
                    color: 'rgba(0,0,0,0.65)', 
                    lineHeight: 1.5715, 
                    maxWidth: '75%', 
                    fontSize: '14px',
                    marginBottom: '1%'
                }}>
                    <div style={{marginBottom: '1em'}}>{rtText()}, is a key measure of how fast the virus is spreading. It represents effective reproductive number i.e the virus’s actual transmission rate at a given moment. An {rtText()} of 1 means that the epidemic is holding steady: For every person who is infected, another one becomes infected, and as the first one either recovers or dies, the second one replaces it; the size of the total pool of infected people remains the same. At a rate below 1, the epidemic will fade out. If it is above 1, it will grow, perhaps exponentially. <br/></div>
                    <div style={{marginBottom: '1em'}}>After achieving a sustained decline in the {rtText()} and bringing the number of daily new cases down to an acceptable baseline with the help of physical distancing, a state can consider relaxing some measures. {rtText()} varies according to the measures to control the epidemic — quarantine and isolation protocols, travel restrictions, school closures, physical distancing, the use of face masks — that have been put in place. </div>
                    <div style={{marginBottom: '1em'}}>We have presented here up-to-date values for {rtText()} by state as well as by district. In each of the charts, we represent the most likely value (solid line) along with the 90% confidence range (shaded region above and below the solid line) of {rtText()}. We have only included states with >100 cases and districts with >150 cases to ensure we are calculating this for regions where we have enough data. We have overlaid actual new cases data for each state and district as well. We continue to update the site regularly. We are using data sourced from <a target="_blank" href="https://www.covid19india.org">covid19india.org</a>.<br/></div>
                </div>
                <div>
                    <div style={{
                        boxSizing: 'border-box', 
                        backgroundColor: 'rgba(0,145,255,0.1)', 
                        color: '#0091ff',
                        margin: '0 10px 12px 0',
                        padding: '4px 12px',
                        borderRadius: '4px',
                        fontSize: '12px',
                        display: 'inline-block'
                    }}>
                        Data Last Updated: {moment(this.state.updationDate).format("LL")}
                    </div>
                </div>
            </div>
        );
    }
}