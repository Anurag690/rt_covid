import React from 'react';
import { 
    Line, XAxis, YAxis, ReferenceLine, 
    Tooltip, CartesianGrid, Area, ComposedChart
} from 'recharts';

import {getCovidDistrictData} from '../services/covidData';
import CustomTooltip from './customTooltip';
import moment from 'moment';

export default class DistrictCharts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            selectedState: -1,
            strokeColor: 'red'
        }
        this.loadStatesGraph = this.loadStatesGraph.bind(this);
    }
    componentDidMount() {
        getCovidDistrictData().then((data)=>{
            this.setState({
                data
            }, ()=>{
                this.setState({
                    selectedState: Object.keys(this.state.data)[0]
                })
            })
        }).catch(err=>{
            
        })
    }
    loadStatesGraph(item, index) {
        try{
            let context = this;
            var districtArray = context.state.data[context.state.selectedState]
            let myData = districtArray[item]
            let lastRT = (+myData.item[myData.item.length-1].RT).toFixed(2)
            return(
                <div key={index} id={""+item} onClick={(event)=>event.preventDefault()} style={{display: 'flex', flexDirection: 'column', alignItems: 'start', marginTop: '1%', marginBottom: '1%', color: 'rgba(0,0,0,0.85)'}}>
                    <div className="smallChartHeader" style={{display: 'flex', justifyContent: 'space-between', minWidth: '77%', alignItems: 'center'}}>
                        <div style={{fontWeight: 'bold', marginBottom: '1%'}}>
                            {item}
                        </div>
                        <div style={{fontWeight: 'bold', marginBottom: '1%', color: lastRT<1?"rgba(53, 179, 46, 1)":"rgba(235, 83, 88, 1)"}}>{lastRT}</div>
                    </div>
                    <ComposedChart
                    width={400}
                    height={250}
                    data={myData.item}
                    margin={{ top: 10, right: 30, left: -15, bottom: 10 }}
                    stackOffset="none"
                    fill="white"
                    stroke="#eee"
                    >
                        <defs>
                            <linearGradient id={"color90"+index} x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="rgba(199,0,57,0.3)" stopOpacity="0.6" />
                                <stop offset={myData.colorBreakPointPercentage90} stopColor="rgba(199,0,57,0.3)" stopOpacity="0.6" />
                                <stop offset={myData.colorBreakPointPercentage90} stopColor="#99ff99" stopOpacity="0.6" />
                                <stop offset="100%" stopColor="#99ff99" stopOpacity="0.6" />
                            </linearGradient>
                            <linearGradient id={"colorML"+index} x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="rgba(235, 83, 88, 1.0)" stopOpacity="0.6" />
                                <stop offset={myData.colorBreakPointPercentageML} stopColor="rgba(235, 83, 88, 1.0)" stopOpacity="0.6" />
                                <stop offset={myData.colorBreakPointPercentageML} stopColor="rgba(53, 179, 46, 1.0)" stopOpacity="0.6" />
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
                            ticks={[0.4,0.6,0.8,1,1.2,1.4,1.6,1.8,2.0,2.2,2.4,2.6,2.8,3.0,3.5]} 
                            domain={[0.2,3.5]} 
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
                            isFront={true}
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
                        />
                    </ComposedChart>
                </div>
            )
        }catch(err) {
            console.log(err)
        }
    }
    handleStateChange(event) {
        let selectedValue = event.target.value;
        this.setState({
            selectedState: selectedValue
        })
    }
    render() {
        let that = this;
        return (
            <div className="districtContainer">
                <select name="states" id="states_select" value={this.state.selectedState} onChange={(event)=>this.handleStateChange(event)}>
                    {Object.keys(this.state.data).map((item, index) => <option key={index} value={item}>{item}</option>)}
                </select>
                {(+this.state.selectedState)!==-1 && <div style={{display: 'flex', flexWrap: 'wrap', alignItems: 'start'}}>
                    {(Object.keys(this.state.data[this.state.selectedState])).map((item, index)=>
                        that.loadStatesGraph(item, index)
                    )}
                </div>}
            </div>
        );
    }
}