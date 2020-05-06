import React from 'react';

export default class Footer extends React.Component{
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <div style={{
                backgroundColor: '#f7f6f3',
                padding: '2% 2% 2% 2%',
                marginTop: '2%',
                textAlign: 'left',
                color: 'gray',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'left',
                justifyContent: 'left'
            }}>
                <span>
                    <h2 style={{fontWeight: "bold", fontSize: "18px"}}>Helpful Links</h2>
                    <div style={{marginBottom: '1%'}}>To learn more about Rt, you can refer to the <a target="_blank" href="http://systrom.com/blog/the-metric-we-need-to-manage-covid-19/">blog</a> by <a target="_blank" href="https://twitter.com/kevin">Kevin Systrom</a> and his <a target="_blank" href="https://rt.live">website</a>.
                    </div>
                </span>
                <span>Data analysis and Model development by <a target="_blank" href="https://www.linkedin.com/in/nidhigupta1154">Nidhi Gupta</a>.</span>
                <span>Site built by <a href="https://www.linkedin.com/in/anurag-gupta690" target="_blank">Anurag Gupta</a>.</span>
                <span>Statewise daily data used from <a target="_blank" href="https://covid19india.org">covid19india.org</a>.</span>
                <span>Visualizations built using <a target="_blank" href="https://recharts.org/">Recharts</a>; site built using <a target="_blank" href="https://nodejs.org/">Node.js</a> and <a target="_blank" href="https://reactjs.org/">React.js</a>.</span>
            </div>
        );
    }
}