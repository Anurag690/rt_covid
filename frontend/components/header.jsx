import React from 'react';
import moment from 'moment';
import {getCovidUpdationDate} from '../services/covidData';

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
        const rtText = function(){return(<span>R<sub>t</sub></span>)}
        return(
            <div style={{
                backgroundColor: 'white',
                paddingLeft: '7%',
                marginTop: '2%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'left',
                justifyContent: 'left'
            }}>
                <h1 class="ant-typography" style={{
                    fontSize: '38px', 
                    fontWeight: '600', 
                    letterSpacing: '-0.5px', 
                    marginBottom: '0.3em',
                    marginTop: '0.3em'
                }}>
                    {rtText()} Covid-19 
                </h1>
                <div style={{
                    color: 'rgba(0,0,0,0.65)', 
                    lineHeight: 1.5715, 
                    maxWidth: '75%', 
                    fontSize: '14px',
                    marginBottom: '1%'
                }}>
                    <div style={{marginBottom: '1em'}}>These are up-to-date values for {rtText()}, a key measure of how fast the virus is growing. {rtText()}, effective reproductive number — is the virus’s actual transmission rate at a given moment. <br/></div>
                    <div style={{marginBottom: '1em'}}>An {rtText()} of 1 means that the epidemic is holding steady: For every person who is infected, another one becomes infected, and as the first one either recovers or dies, the second one replaces it; the size of the total pool of infected people remains the same. At a rate below 1, the epidemic will fade out. If it is above 1, it will grow, perhaps exponentially. </div>
                    <div style={{marginBottom: '1em'}}>After achieving a sustained decline in the {rtText()} and bringing the number of daily new cases down to an acceptable baseline with the help of physical distancing, a state can consider relaxing some measures.<br/></div>
                    <div style={{marginBottom: '1em'}}>{rtText()} varies according to the measures to control the epidemic — quarantine and isolation protocols, travel restrictions, school closures, physical distancing, the use of face masks — that have been put in place. Further enhancements in the model using more data at the state level is coming soon.<br/></div>
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