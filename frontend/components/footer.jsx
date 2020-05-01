import React from 'react';

export default class Footer extends React.Component{
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <div style={{
                backgroundColor: '#f7f6f3',
                padding: '2%',
                marginTop: '2%',
                height: '200px',
                textAlign: 'center',
                color: 'gray'
            }}>
                Copyright © AG {new Date().getFullYear()}
            </div>
        );
    }
}