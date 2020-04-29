import React from 'react';
import { 
    ResponsiveContainer, LineChart, Line, XAxis, YAxis, ReferenceLine, ReferenceArea,
    ReferenceDot, Tooltip, CartesianGrid, Legend, Brush, ErrorBar, AreaChart, Area,
    Label, LabelList, ComposedChart
} from 'recharts';
import {getCovidData} from '../services/covidData';
import async from 'async';

export default class MyLineChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }
    componentDidMount() {
        getCovidData().then((data)=>{
            console.log(data);
            this.setState({
                data
            })
        }).catch(err=>{
            console.log(err);
        })
    }
    render() {
        return (
            <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'start', padding: '1%'}}>
                {(Object.keys(this.state.data)).map((item, index)=>
                    <div width="100%" height={300} style={{display: 'flex', flexDirection: 'column', alignItems: 'start', marginTop: '1%', marginBottom: '1%'}}>
                        
                        <div style={{fontWeight: 'bold', marginBottom: '1%'}}>{item}</div>
                        <ComposedChart
                        width={400}
                        height={200}
                        data={this.state.data[item].item}
                        margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                        stackOffset="none"
                        >
                            <defs>
                                <linearGradient id={"color90"+index} x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" stopColor="#FCF2F2" stopOpacity="1" />
                                    <stop offset={this.state.data[item].colorBreakPointPercentage90} stopColor="#FCF2F2" stopOpacity="1" />
                                    <stop offset={this.state.data[item].colorBreakPointPercentage90} stopColor="#F2F9F0" stopOpacity="1" />
                                    <stop offset="100%" stopColor="#F2F9F0" stopOpacity="1" />
                                </linearGradient>
                                <linearGradient id={"colorML"+index} x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" stopColor="rgba(235, 83, 88, 1.0)" stopOpacity="1" />
                                    <stop offset={this.state.data[item].colorBreakPointPercentageML} stopColor="rgba(235, 83, 88, 1.0)" stopOpacity="1" />
                                    <stop offset={this.state.data[item].colorBreakPointPercentageML} stopColor="rgba(53, 179, 46, 1.0)" stopOpacity="1" />
                                    <stop offset="100%" stopColor="rgba(53, 179, 46, 1.0)" stopOpacity="1" />
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip 
                                wrapperStyle={{
                                    borderColor: 'white',
                                    boxShadow: '0px 0px 0px 0px rgb(204, 204, 204)',
                                  }}
                                  contentStyle={{ backgroundColor: 'transparent' }}
                                  labelStyle={{ fontWeight: 'bold', color: '#666666' }}
                            />
                            <CartesianGrid stroke="#f5f5f5" vertical={false} />
                            <Line type="monotone" dataKey="ML" stroke={"url(#colorML"+index+")"} dot={false}/>
                            <ReferenceLine y={1} stroke="#000"/>
                            <Area type="monotone" dataKey='RT_90' fill={"url(#color90"+index+")"} />
                        </ComposedChart>
                    </div>
                )}
            </div>
        );
    }
}