import React from 'react';
import { 
    Line, XAxis, YAxis, ReferenceLine, 
    Tooltip, CartesianGrid, Area, ComposedChart, LineChart, ReferenceDot
} from 'recharts';
import CustomTooltip from './customTooltip';
import moment from 'moment';

export default class NewCasesChart extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <div className="newCasesChartBase">
                <LineChart
                    width={400}
                    height={250}
                    data={this.props.data}
                    margin={{ top: 10, right: 30, left: -15, bottom: 10 }}
                    fill="white"
                    stroke="#eee"
                >
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
                        // ticks={[0.4,0.6,0.8,1,1.2,1.4,1.6,1.8,2.0,2.2,2.4,2.6,2.8,3.0,3.5]} 
                        // domain={[0.2,3.5]} 
                        interval="preserveStartEnd"
                        // minTickGap={3} 
                        stroke="rgba(0, 0, 0, 0.05)"
                        tick={{fill: 'rgba(0, 0, 0, 0.4)', fontSize: '12px' }} 
                        tickLine={false} 
                        orientation="right"
                        allowDataOverflow={true}
                    />
                    <Tooltip 
                        content={<CustomTooltip {...this.props} myOpacity={0.6} myLabelType="date"/>}
                    ></Tooltip>
                    <CartesianGrid 
                        stroke="rgba(0, 0, 0, 0.05)" 
                        fillOpacity={1} 
                        verticalPoints={[0]} 
                        opacity={1}
                    />
                    <Line 
                        type="monotone" 
                        dataKey="new_cases" 
                        strokeWidth={1}
                        opacity={1}
                        stroke={"black"} 
                        strokeLinecap="butt"
                        dot={false}
                        fillOpacity={1}
                        strokeOpacity={1}
                        floodOpacity={1}
                        isFront={true}
                        strokeDasharray="3 3"
                    />
                    <Line 
                        type="monotone" 
                        dataKey="smoothed_9d" 
                        strokeWidth={2}
                        opacity={1}
                        stroke={"black"} 
                        strokeLinecap="butt"
                        dot={false}
                        fillOpacity={1}
                        strokeOpacity={1}
                        floodOpacity={1}
                        isFront={true}
                    />
                </LineChart>
            </div>
        );
    }
}