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
            <div id={""+item} onClick={(event)=>event.preventDefault()} width="100%" height={300} style={{display: 'flex', flexDirection: 'column', alignItems: 'start', marginTop: '1%', marginBottom: '1%', color: 'rgba(0,0,0,0.85)', flex: '1 0 21%'}}>
                <div style={{fontWeight: 'bold', marginBottom: '1%'}}>{item}</div>
                <ComposedChart
                width={400}
                height={200}
                data={this.state.data[item].item}
                margin={{ top: 10, right: 20, left: -35, bottom: 10 }}
                stackOffset="none"
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
                    />
                    <Tooltip 
                        content={<CustomTooltip {...this.props} myLabelType="date"/>}
                    >
                    </Tooltip>
                    <CartesianGrid stroke="rgba(0, 0, 0, 0.05)" verticalPoints={[0]} />
                    <Line type="monotone" dataKey="RT" strokeWidth="1" stroke={"url(#colorML"+index+")"} dot={false}/>
                    <ReferenceLine y={1} textRendering="geometricPrecision" stroke="rgba(235, 83, 88, 0.5)" opacity="0.4" isFront/>
                    <Area 
                        type="monotone" 
                        strokeOpacity="0"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        dataKey='RT_90' 
                        fill={"url(#color90"+index+")"} 
                    />
                </ComposedChart>
            </div>
        )
    }
    render() {
        let that = this;
        return (
            <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'start', padding: '0% 5% 5% 5%'}}>
                {(Object.keys(this.state.data)).map(function(item, index){
                    if(item!=="India") return that.loadStatesGraph(item, index)
                }
                )}
            </div>
        );
    }
}