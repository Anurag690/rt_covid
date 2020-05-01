import React from 'react';
import { 
    XAxis, YAxis, ReferenceLine,
    Tooltip, CartesianGrid, BarChart, Bar, LabelList, Legend 
} from 'recharts';
import {getCovidCountryData} from '../services/covidData';
// import CustomTooltip from './customTooltip';

export default class CountryChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            customLabelHovered: false
        }
        this.scrollTo = this.scrollTo.bind(this);
        this.handleBarClick = this.handleBarClick.bind(this);
        this.renderCustomizedLabel = this.renderCustomizedLabel.bind(this);
        this.handleCustomCircleClick = this.handleCustomCircleClick.bind(this);
    }
    componentDidMount() {
        getCovidCountryData().then((data)=>{
            this.setState({
                data
            })
        }).catch(err=>{
            console.log(err);
        })
    }
    scrollTo(ref) {
        setTimeout(function() {
            document.getElementById(ref).scrollIntoView({behavior: "smooth", block: "center"})
        }, 500)
    }
    handleBarClick(data, index, e){
        this.scrollTo(data.activeLabel)
    }
    handleCustomCircleClick(event, stateName) {
        event.stopPropagation();
        this.scrollTo(stateName);
    }
    mouseOver(event) {
        event.target.style.strokeWidth = 2
    }
    mouseOut(event) {
        event.target.style.strokeWidth = 1
    }
    renderCustomizedLabel(props, item){
        const {
          x, y, width, height, value, index, ...rest
        } = props;
        var initials = "";
        var stateName = item[index].state
        var words = stateName.replace(/and /g, "").split(" ");
        words.map((item, index)=>{
            initials += item.substr(0,1)
        })
        let context = this;
        var texth = 25,
		textpadding = 5;
        return (
          <g style={{cursor: 'pointer'}} className="myTooltip" onClick={(event)=>context.handleCustomCircleClick(event, stateName)} onMouseEnter={(event)=>context.mouseOver(event)} onMouseLeave={(event)=>context.mouseOut(event)}>
            <rect width="20" height="14" rx="6.5" fill="white" x={x - width } y={y} stroke="rgb(235, 83, 88)"></rect>
            <text x={x + width / 2} y={y+8} color="rgb(235, 83, 88)" stroke="rgb(235, 83, 88)" fontSize="8px" textAnchor="middle" fontWeight={200} dominantBaseline="middle">
              {initials}
            </text>
            <g className="myTooltipText" x={x + width / 2} y={y} fill="white" stroke="yellow" opacity="1" >
                <text fill="gray" transform={"translate("+textpadding+","+(textpadding*2+texth)+")"} x={x + 5 + width / 2} y={y-70} fontSize="" color="#fff" stroke="black" strokeOpacity="0.5" opacity="0.5" strokeWidth={1} textAnchor="middle" dominantBaseline="middle">{stateName + " : " +(+value).toFixed(2)}</text>
            </g>
          </g>
        );
    };
    render() {
        return (
            <div style={{display: 'flex', flexWrap: 'wrap', padding: '3%', justifyContent: 'center', alignItems: 'center'}}>
                <BarChart width={1200} height={250} barGap={-6} barSize={6} data={this.state.data.item} margin={{ top: 20, right: 60, bottom: 0, left: 20 }} onClick={this.handleBarClick}>
                    <defs>
                        <linearGradient id={"colorBar90"} x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="rgba(235, 83, 88, 0.5)" stopOpacity="1" />
                            <stop offset={this.state.data.colorBreakPointPercentage90} stopColor="rgba(235, 83, 88, 0.5)" stopOpacity="1" />
                            <stop offset={this.state.data.colorBreakPointPercentage90} stopColor="rgba(53, 179, 46, 0.5)" stopOpacity="1" />
                            <stop offset="100%" stopColor="rgba(53, 179, 46, 0.5)" stopOpacity="1" />
                        </linearGradient>
                        <linearGradient id={"colorBar50"} x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="rgba(235, 83, 88, 0.8)" stopOpacity="1" />
                            <stop offset={this.state.data.colorBreakPointPercentage50} stopColor="rgba(235, 83, 88, 0.8)" stopOpacity="1" />
                            <stop offset={this.state.data.colorBreakPointPercentage50} stopColor="rgba(53, 179, 46, 0.8)" stopOpacity="1" />
                            <stop offset="100%" stopColor="rgba(53, 179, 46, 0.8)" stopOpacity="1" />
                        </linearGradient>
                    </defs>
                    <XAxis type="category" strokeOpacity={0.2} dataKey="state" minTickGap={10} tick={false} tickCount={0} tickLine={false} />
                    <YAxis type="number" strokeOpacity={0.2} ticks={[-1,-0.5,0,0.5,1.0,1.5,2.0,2.5,3.0,3.5,4.0,4.5,5.0]} interval="preserveStartEnd" tickCount={10} allowDecimals={false} fill="rgba(240,240,240,0.5)" tick={{color: 'rgb(240,240,240)', fontSize: '12px' }} tickLine={false} />
                    <Legend verticalAlign="bottom" height={36}/>
                    {/* <Tooltip content={<CustomTooltip/>}/> */}
                    <CartesianGrid vertical={false} opacity="0.1" />
                    <Bar dataKey="RT_90" fill="rgba(235, 83, 88, 0.6)" radius={[5, 5, 5, 5]} />
                    <Bar dataKey="RT_50" fill="rgba(235, 83, 88, 1.0)" radius={[5, 5, 5, 5]} >
                        <LabelList dataKey="ML" content={(myProps)=>this.renderCustomizedLabel(myProps, this.state.data.item)}/>
                    </Bar>
                    <ReferenceLine y={1} stroke="#000"/>
                </BarChart>
            </div>
        );
    }
}