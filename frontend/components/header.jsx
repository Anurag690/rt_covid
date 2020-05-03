import React from 'react';
import moment from 'moment';

export default class Header extends React.Component{
    constructor(props) {
        super(props);
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
                    marginBottom: '0.3em'
                }}>
                    {rtText()} Covid-19 
                </h1>
                <div style={{
                    color: 'rgba(0,0,0,0.65)', 
                    lineHeight: 1.5715, 
                    maxWidth: '70%', 
                    fontSize: '14px',
                    marginBottom: '1%'
                }}>
                    These are up-to-date values for {rtText()}, a key measure of how fast the virus is growing. It’s the average number of people who become infected by an infectious person. If {rtText()} is above 1.0, the virus will spread quickly. When {rtText()} is below 1.0, the virus will stop spreading. You can learn more about it on the {rtText()} Live website. You can learn more about it on the <a target="_blank" href="https://rt.live">rt.live</a> website.
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
                        Data Last Updated: {moment("2020-04-26").format("LL")}
                    </div>
                </div>
            </div>
        );
    }
}