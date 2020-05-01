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
            <div id={""+item} onClick={(event)=>event.preventDefault()} width="100%" height={300} style={{display: 'flex', flexDirection: 'column', alignItems: 'start', marginTop: '1%', marginBottom: '1%', color: 'rgba(0,0,0,0.85)'}}>
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
                            <stop offset="0%" stopColor="rgba(199,0,57,0.3)" stopOpacity="1" />
                            <stop offset={this.state.data[item].colorBreakPointPercentage90} stopColor="rgba(199,0,57,0.3)" stopOpacity="1" />
                            <stop offset={this.state.data[item].colorBreakPointPercentage90} stopColor="#99ff99" stopOpacity="1" />
                            <stop offset="100%" stopColor="#99ff99" stopOpacity="1" />
                        </linearGradient>
                        <linearGradient id={"colorML"+index} x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="rgba(235, 83, 88, 1.0)" stopOpacity="1" />
                            <stop offset={this.state.data[item].colorBreakPointPercentageML} stopColor="rgba(235, 83, 88, 1.0)" stopOpacity="1" />
                            <stop offset={this.state.data[item].colorBreakPointPercentageML} stopColor="rgba(53, 179, 46, 1.0)" stopOpacity="1" />
                            <stop offset="100%" stopColor="rgba(53, 179, 46, 1.0)" stopOpacity="1" />
                        </linearGradient>
                    </defs>
                    <XAxis type="category" strokeOpacity={0.2} dataKey="date" minTickGap={10} interval="preserveEnd" tickCount={2} tickFormatter={(tickItem)=>moment(tickItem).format('MMM D')} tick={{color: 'rgba(0, 0, 0, 0.2)', fontSize: '12px' }} tickLine={false} />
                    <YAxis type="number" strokeOpacity={0.2} ticks={[-1,-0.5,0,0.5,1.0,1.5,2.0,2.5,3.0,3.5,4.0,4.5,5.0]} interval="preserveStartEnd" tickCount={0} allowDecimals={true} fill="rgba(240,240,240,0.5)" tick={{color: 'rgb(240,240,240)', fontSize: '12px' }} tickLine={false} />
                    <Tooltip 
                        content={<CustomTooltip {...this.props} myLabelType="date"/>}
                    >
                    </Tooltip>
                    <CartesianGrid stroke="#f5f5f5" vertical={false} opacity="0.5" />
                    <Line type="monotone" dataKey="ML" strokeWidth="2.5" stroke={"url(#colorML"+index+")"} dot={false}/>
                    <ReferenceLine y={1} stroke="#000" opacity="0.2" isFront/>
                    <Area 
                        type="monotone" 
                        strokeOpacity="0"
                        strokeWidth="1.5"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        // opacity="1" 
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
            <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'start', padding: '5%'}}>
                {(Object.keys(this.state.data)).map(function(item, index){
                    if(item!=="India") return that.loadStatesGraph(item, index)
                }
                )}
            </div>
        );
    }
}