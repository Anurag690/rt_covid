import React from 'react';
import { 
    XAxis, YAxis, ReferenceLine,
    Tooltip, CartesianGrid, BarChart, Bar, LabelList, Legend, Cell, Rectangle 
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
        this.renderDefs = this.renderDefs.bind(this);
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
        if(data)
            this.scrollTo(data.activeLabel)
    }
    handleCustomCircleClick(event, stateName) {
        event.stopPropagation();
        this.scrollTo(stateName);
    }
    mouseOver(event) {
        event.stopPropagation();
        event.target.style.strokeWidth = 2
    }
    mouseOut(event) {
        event.stopPropagation();
        event.target.style.strokeWidth = 1
    }
    renderCustomizedLabel(props, item){
        const {
          x, y, width, height, value, index, ...rest
        } = props;
        var initials = item[index].state_ab;
        var stateName = item[index].state
        
        let context = this;
        var texth = 25,
        textpadding = 5;
        
        let customColor = "rgba(53, 179, 46, 0.5)"
        if((+value)>1) {
            customColor = "rgba(235, 83, 88, 0.5)"
        }
        let rect_x = x-width/2
        let rect_y = y+height/2
        let text_x = x + width / 2
        let text_y = y+10+height/2
        // console.log(initials, "rect_y", rect_y)
        // console.log(initials, "y", y)
        // console.log(initials, "height", height)
        if(initials=="TR") {
            rect_y = rect_y - 12
            text_y = text_y - 12
        }
        return (
          <g style={{cursor: 'pointer'}} className="myTooltip" onClick={(event)=>context.handleCustomCircleClick(event, stateName)} onMouseEnter={(event)=>context.mouseOver(event)} onMouseLeave={(event)=>context.mouseOut(event)}>
            <rect width="30" height="18" rx="8.5" fill="white" x={rect_x} y={rect_y} stroke={customColor}></rect>
            <text x={text_x} y={text_y} color={customColor} stroke={customColor} fontSize="12px" strokeWidth={1} textAnchor="middle" fontWeight={200} dominantBaseline="middle" onMouseEnter={(event)=>context.mouseOut(event)} onMouseLeave={(event)=>context.mouseOut(event)}>
              {initials}
            </text>
            <g className="myTooltipText" x={x + width / 2} y={y+height/2} fill="white" stroke="yellow" opacity="1" >
                <text fill="gray" transform={"translate("+textpadding+","+(textpadding*2+texth)+")"} x={x + 5 + width / 2} y={y-70+height/2} color="#fff" stroke="black" strokeOpacity="0.5" opacity="0.5" strokeWidth={1} textAnchor="middle" dominantBaseline="middle">{stateName + " : " +(value).toFixed(2)}</text>
            </g>
          </g>
        );
    };
    customBar(props, barType){
        const {fill, index} = props;
        return <Rectangle {...props} fill={"url(#colorBar"+barType+"_"+index+")"} />
    };
    renderDefs() {
        return(
            <defs>
            {this.state.data && this.state.data.map((item, index)=>
                <defs>
                    <linearGradient id={"colorBar90_"+index} x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="rgba(235, 83, 88, 0.2)" stopOpacity="1" />
                        <stop offset={item.colorBreakPointPercentage90} stopColor="rgba(235, 83, 88, 0.2)" stopOpacity="1" />
                        <stop offset={item.colorBreakPointPercentage90} stopColor="rgba(53, 179, 46, 0.2)" stopOpacity="1" />
                        <stop offset="100%" stopColor="rgba(53, 179, 46, 0.2)" stopOpacity="1" />
                    </linearGradient>
                    <linearGradient id={"colorBar50_"+index} x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="rgba(235, 83, 88, 0.3)" opacity="1" stopOpacity="1" />
                        <stop offset={item.colorBreakPointPercentage50} stopColor="rgba(235, 83, 88, 0.3)" opacity="1" stopOpacity="1" />
                        <stop offset={item.colorBreakPointPercentage50} stopColor="rgba(53, 179, 46, 0.3)" stopOpacity="1" />
                        <stop offset="100%" stopColor="rgba(53, 179, 46, 0.3)" stopOpacity="1" />
                    </linearGradient>
                </defs>
            )}
            </defs>
        );
    }
    render() {
        let context = this;
        let legendTypes = [
            {
                value: "CI 50%",
                type: "square",
                id: "0",
                color: "rgba(235, 83, 88, 0.8)"
            },
            {
                value: "CI 90%",
                type: "square",
                id: "1",
                color: "rgba(235, 83, 88, 0.5)"
            },
            {
                value: "CI 50%",
                type: "square",
                id: "2",
                color: "rgba(53, 179, 46, 0.8)"
            },
            {
                value: "CI 90%",
                type: "square",
                id: "3",
                color: "rgba(53, 179, 46, 0.5)"
            }
        ]
        console.log(this.props.barChartWidth)
        return (
            <div style={{
                display: 'flex', 
                flexWrap: 'wrap', 
                padding: '0% 1.5% 0%', 
                justifyContent: 'left'
            }}>
                {this.state.data.length && <BarChart width={this.props.barChartWidth} height={350} barGap={-14} barSize={14} data={this.state.data} margin={{ top: 20, right: 60, bottom: 0, left: 20 }} onClick={this.handleBarClick}>
                    
                        {this.renderDefs()}
                    <XAxis 
                        type="category" 
                        stroke="rgba(0, 0, 0, 0.05)"
                        dataKey="state" 
                        minTickGap={10} 
                        tick={false} 
                        tickCount={0} 
                        tickLine={false} 
                    />
                    <YAxis 
                        stroke="rgba(0, 0, 0, 0.05)"
                        ticks={[0,0.2,0.4,0.6,0.8,1,1.2,1.4,1.6,1.8,2.0,2.4,2.6,2.8,3.0,3.2]} 
                        domain={[0,3.5]} 
                        minTickGap={2}
                        interval={1}                      
                        tick={{fill: 'rgba(0, 0, 0, 0.4)', height: 20 ,fontSize: '12px' }}
                        tickLine={false} 
                        allowDataOverflow={true}
                    />
                    <Legend 
                        verticalAlign="bottom" 
                        height={36} 
                        align="left" 
                        opacity={0.2} 
                        left={"7%"} 
                        top={"75%"} 
                        payload={legendTypes}
                        wrapperStyle={{left: '7%', top: "84%", opacity: '0.2'}}
                    />
                    {/* <Tooltip content={<CustomTooltip/>}/> */}
                    <CartesianGrid stroke="rgba(0, 0, 0, 0.05)" />
                    <Bar shape={(myProps)=>context.customBar(myProps, "90")} fill="rgba(235, 83, 88, 0.5)" dataKey="RT_90" radius={[14, 14, 14, 14]} />
                    <Bar shape={(myProps)=>context.customBar(myProps, "50")} fill="rgba(235, 83, 88, 0.8)" dataKey="RT_50" radius={[14, 14, 14, 14]} >
                        <LabelList position="center" dataKey="RT" content={(myProps)=>this.renderCustomizedLabel(myProps, this.state.data)}/>
                    </Bar>
                    <ReferenceLine y={1} stroke="rgba(235, 83, 88, 0.5)"/>
                </BarChart>}
            </div>
        );
    }
}