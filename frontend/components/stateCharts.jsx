import React from 'react';
import { 
    Line, XAxis, YAxis, ReferenceLine, 
    Tooltip, CartesianGrid, Area, ComposedChart
} from 'recharts';

import {getCovidStatesData} from '../services/covidData';
import CustomTooltip from './customTooltip';
import moment from 'moment';

export default class StateCharts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            strokeColor: 'red'
        }
    }
    componentDidMount() {
        getCovidStatesData().then((data)=>{
            this.setState({
                data
            })
        }).catch(err=>{
            console.log(err);
        })
    }
    loadStatesGraph(item, index) {
        let context = this;
        return(
            <div id={""+item} onClick={(event)=>event.preventDefault()} width="100%" style={{display: 'flex', flexDirection: 'column', alignItems: 'start', marginTop: '1%', marginBottom: '1%', color: 'rgba(0,0,0,0.85)', flex: '1 0 20%'}}>
                <div style={{fontWeight: 'bold', marginBottom: '1%'}}>{item}</div>
                <ComposedChart
                width={400}
                height={250}
                data={this.state.data[item].item}
                margin={{ top: 10, right: 30, left: -15, bottom: 10 }}
                stackOffset="none"
                fill="white"
                stroke="#eee"
                >
                    <defs>
                        <linearGradient id={"color90"+index} x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="rgba(199,0,57,0.3)" stopOpacity="0.6" />
                            <stop offset={this.state.data[item].colorBreakPointPercentage90} stopColor="rgba(199,0,57,0.3)" stopOpacity="0.6" />
                            <stop offset={this.state.data[item].colorBreakPointPercentage90} stopColor="#99ff99" stopOpacity="0.6" />
                            <stop offset="100%" stopColor="#99ff99" stopOpacity="0.6" />
                        </linearGradient>
                        <linearGradient id={"colorML"+index} x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="rgba(235, 83, 88, 1.0)" stopOpacity="0.6" />
                            <stop offset={this.state.data[item].colorBreakPointPercentageML} stopColor="rgba(235, 83, 88, 1.0)" stopOpacity="0.6" />
                            <stop offset={this.state.data[item].colorBreakPointPercentageML} stopColor="rgba(53, 179, 46, 1.0)" stopOpacity="0.6" />
                            <stop offset="100%" stopColor="rgba(53, 179, 46, 1.0)" stopOpacity="0.6" />
                        </linearGradient>
                    </defs>
                    <XAxis 
                        type="category" 
                        dataKey="date" 
                        minTickGap={150}
                        interval="preserveStartEnd" 
                        tickCount={1} 
                        tickFormatter={(tickItem)=>moment(tickItem).format('D/M')} 
                        tick={{fill: 'rgba(0, 0, 0, 0.4)', fontSize: '12px' }} 
                        tickLine={false} 
                        stroke="rgba(0, 0, 0, 0.05)"
                        fill="black"
                    />
                    <YAxis 
                        type="number" 
                        ticks={[-0.5,0,1,2.5,3.5]} 
                        domain={[-0.5,3.5]} 
                        interval="preserveStartEnd"
                        minTickGap={3} 
                        stroke="rgba(0, 0, 0, 0.05)"
                        tick={{fill: 'rgba(0, 0, 0, 0.4)', fontSize: '12px' }} 
                        tickLine={false} 
                        orientation="right"
                        allowDataOverflow={true}
                    />
                    <Tooltip 
                        content={<CustomTooltip {...this.props} myLabelType="date"/>}
                    >
                    </Tooltip>
                    <CartesianGrid 
                        stroke="rgba(0, 0, 0, 0.05)" 
                        fillOpacity={1} 
                        verticalPoints={[0]} 
                        opacity={1}
                    />
                    <Line 
                        type="monotone" 
                        dataKey="RT" 
                        strokeWidth={1.5}
                        opacity={1}
                        stroke={"url(#colorML"+index+")"} 
                        strokeLinecap="butt"
                        dot={false}
                        fillOpacity={1}
                        strokeOpacity={1}
                        floodOpacity={1}
                        isFront="true"
                        strokeDasharray={0}
                    />
                    <ReferenceLine y={1} 
                        textRendering="geometricPrecision" 
                        stroke="rgba(0, 0, 0, 0.3)" 
                        opacity="1" 
                        isFront="true"
                        fillOpacity={1}
                        strokeOpacity={1}
                        alwaysShow={true}
                    />
                    <Area 
                        type="monotone" 
                        strokeWidth="0"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        dataKey='RT_90' 
                        fill={"url(#color90"+index+")"} 
                        // opacity={0.8}
                        // fillOpacity={0.8}
                        // strokeWidth={1.5}
                    />
                </ComposedChart>
            </div>
        )
    }
    render() {
        let that = this;
        return (
            <div style={{display: 'flex', flexWrap: 'wrap', alignItems: 'start', padding: '0% 7% 2% 7%'}}>
                {(Object.keys(this.state.data)).map(function(item, index){
                    if(item!=="India") return that.loadStatesGraph(item, index)
                }
                )}
            </div>
        );
    }
}