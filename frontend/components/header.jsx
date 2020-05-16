import React from 'react';
import {
    Link
} from "react-router-dom";

export default class Header extends React.Component{
    constructor(props) {
        super(props);
    }
    render() {
        const rtText = function(){return(<span>R<sub>t</sub></span>)}
        return(
            <div className="headerContainer">
                <h1 className="ant-typography">
                    {rtText()} Tracker India – Covid-19 
                </h1>
                <div className="tabs">
                    <Link to={`/rtcovid`}>View State Level</Link>
                    <Link to={`/rtcovid/districts`}>View District Level</Link>
                </div>
            </div>
        );
    }
}