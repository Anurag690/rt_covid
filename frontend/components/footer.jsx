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
                <span>Data analysis and Model development by <a target="_blank" href="https://www.linkedin.com/in/nidhigupta1154">Nidhi Gupta</a>.</span>
                <span>Site built by <a href="https://www.linkedin.com/in/anurag-gupta690" target="_blank">Anurag Gupta</a>.</span>
                <span>Thanks to <a target="_blank" href="https://twitter.com/kevin">Kevin Systrom</a> for his contributions for the US version - <a target="_blank" href="https://rt.live">rt.live</a></span>
                <span>Visualizations built using <a target="_blank" href="https://recharts.org/">Recharts</a>; site built using <a target="_blank" href="https://nodejs.org/">Node.js</a> and <a target="_blank" href="https://reactjs.org/">React.js</a>.</span>
            </div>
        );
    }
}