import React from 'react';
import moment from 'moment';

export default class CustomTooltip extends React.Component{
    constructor(props) {
        super(props);
    }
    render() {
        let { active, payload, label, myLabelType, index, myOpacity, myToFixed, ...rest } = this.props;
        myToFixed = myToFixed!==undefined?myToFixed:2;
        return(
            <div>
                {active && <div key={index} className="custom-tooltip" 
                style={{display: 'flex', flexDirection: 'column', background: '#f0f0f0',
                        opacity: myOpacity?myOpacity:0.4,
                        color: '#222831',
                        padding: '0.3em',
                        borderRadius: '0.5em'}}
                >
                    <div className="label" style={{fontWeight: "bold"}}>{myLabelType=="date"?moment(label).format('MMM D'):label}</div>
                    {payload && payload.map((item, index)=><div className="contents" style={{display: 'flex', flexDirection: 'column', fontSize: '12px'}}>{item.name!="smoothed_9d"&&`${item.name}: ${((item.value+"").split(",").map((x,y)=>x && (+x).toFixed(myToFixed))).join(" ~ ")}`}</div>)}
                </div>}
            </div>
        );
    }
}