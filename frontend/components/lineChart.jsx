import React from 'react';
import { 
    ResponsiveContainer, LineChart, Line, XAxis, YAxis, ReferenceLine, ReferenceArea,
    ReferenceDot, Tooltip, CartesianGrid, Legend, Brush, ErrorBar, AreaChart, Area,
    Label, LabelList 
} from 'recharts';
import {getCovidData} from '../services/covidData';

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
            <div style={{display: 'flex', flexWrap: 'wrap'}}>
                {(Object.keys(this.state.data)).map((item, index)=>
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        <LineChart
                        width={400}
                        height={400}
                        data={this.state.data[item]}
                        margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                        >
                            <XAxis dataKey="name" />
                            <Tooltip />
                            <CartesianGrid stroke="#f5f5f5" />
                            <Line type="monotone" dataKey="ML" stroke="#ff7300" yAxisId={0} />
                            <Line type="monotone" dataKey="date" stroke="#387908" yAxisId={1} />
                        </LineChart>
                        <div>{item}</div>
                    </div>
                )}
            </div>
        );
    }
}