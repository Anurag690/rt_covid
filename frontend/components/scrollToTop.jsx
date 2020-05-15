import React from 'react';

export default class ScrollToTop extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            is_visible: false
        };
    }
    componentDidMount() {
        var scrollComponent = this;
        document.addEventListener("scroll", function(e) {
            scrollComponent.toggleVisibility();
        });
    }
    toggleVisibility() {
        if (window.pageYOffset > 300) {
            this.setState({
                is_visible: true
            });
        } else {
            this.setState({
                is_visible: false
            });
        }
    }
    scrollToTop() {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
    }
    render() {
        const { is_visible } = this.state;
        return (
        <div className="scroll-to-top">
            {is_visible && (
            <div style={{
                position: 'fixed', 
                zIndex: '999', 
                backgroundColor: '#0091ff', 
                borderRadius: '16px', 
                boxShadow: '0px 2px 12px rgba(0,0,0,0.12)', 
                cursor: 'pointer', 
                padding: '4px 10px', 
                color: '#fff',
                marginTop: '1%'
            }} onClick={() => this.scrollToTop()}>
                ↑ Scroll to top
            </div>
            )}
        </div>
        );
    }
}