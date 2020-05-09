import React from 'react';
import { 
    Line, XAxis, YAxis, ReferenceLine, 
    Tooltip, CartesianGrid, Area, ComposedChart
} from 'recharts';

import {getCovidStatesData, getNewCasesData} from '../services/covidData';
import CustomTooltip from './customTooltip';
import NewCasesChart from './newCasesChart'
import moment from 'moment';

export default class StateCharts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            newCasesData: [],
            strokeColor: 'red',
            showNewCases: {},
            showNewCaseChartFlag: true
        }
    }
    componentDidMount() {
        getCovidStatesData().then((data)=>{
            this.setState({
                data
            }, ()=>{
                getNewCasesData().then((data)=>{
                    if(!data.error) {
                        this.setState({
                            newCasesData: data,
                            showNewCaseChartFlag: true
                        })
                    } else {
                        this.setState({
                            showNewCaseChartFlag: false
                        })
                    }
                })
            })
        }).catch(err=>{
            
        })
    }
    toggleNewCases(stateName) {
        let flag = this.state.showNewCases[stateName];

        let stateNewCase = {};
        stateNewCase[stateName] = !flag;

        let newShowNewCase = Object.assign({}, this.state.showNewCases, stateNewCase);

        this.setState({
            showNewCases: newShowNewCase
        });
    }
    loadStatesGraph(item, index) {
        let context = this;
        let lastRT = (+context.state.data[item].item[context.state.data[item].item.length-1].RT).toFixed(2)
        return(
            <div key={index} id={""+item} onClick={(event)=>event.preventDefault()} width="100%" style={{display: 'flex', flexDirection: 'column', alignItems: 'start', marginTop: '1%', marginBottom: '1%', color: 'rgba(0,0,0,0.85)'}}>
                <div style={{display: 'flex', justifyContent: 'space-between', minWidth: '77%', alignItems: 'center'}}>
                    <div style={{fontWeight: 'bold', marginBottom: '1%'}}>
                        <div>{item}</div>
                        {this.state.showNewCaseChartFlag&&<div className="showNewCaseText" onClick={()=>this.toggleNewCases(item)}>{!this.state.showNewCases[item]?<div>show new cases</div>:<div>hide new cases</div>}</div>}
                    </div>
                    <div style={{fontWeight: 'bold', marginBottom: '1%', color: lastRT<1?"rgba(53, 179, 46, 1)":"rgba(235, 83, 88, 1)"}}>{lastRT}</div>
                </div>
                <div className={!this.state.showNewCases[item]?"stateComposedBase":"stateComposedNewCase"}>
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
                        tick={!this.state.showNewCases[item]?{fill: 'rgba(0, 0, 0, 0.4)', fontSize: '12px' }:false} 
                        tickLine={false} 
                        stroke="rgba(0, 0, 0, 0.05)"
                        fill="black"
                    />
                    <YAxis 
                        type="number" 
                        ticks={[0.4,0.6,0.8,1,1.2,1.4,1.6,1.8,2.0,2.2,2.4,2.6,2.8,3.0,3.5]} 
                        domain={[0.2,3.5]} 
                        interval="preserveStartEnd"
                        minTickGap={3} 
                        stroke="rgba(0, 0, 0, 0.05)"
                        tick={!this.state.showNewCases[item]?{fill: 'rgba(0, 0, 0, 0.4)', fontSize: '12px' }:false} 
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
                        isFront={true}
                        // strokeDasharray="0"
                    />
                    <ReferenceLine y={1} 
                        textRendering="geometricPrecision" 
                        stroke="rgba(0, 0, 0, 0.3)" 
                        opacity="1" 
                        isFront={true}
                        fillOpacity={1}
                        strokeOpacity={1}
                        ifOverflow="extendDomain"
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
                </ComposedChart></div>
                {this.state.showNewCaseChartFlag && this.state.showNewCases[item] && <NewCasesChart data={this.state.newCasesData[item]} />}
                
            </div>
        )
    }
    render() {
        let that = this;
        return (
            <div style={{display: 'flex', flexWrap: 'wrap', alignItems: 'start', padding: '0% 7% 2% 7%'}}>
                {(Object.keys(this.state.data)).map(function(item, index){
                    return that.loadStatesGraph(item, index)
                }
                )}
            </div>
        );
    }
}