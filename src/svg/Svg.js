import React, { Component } from 'react';

const getStyle = (style) =>
    Object.assign({
        position: 'absolute' 
    }, style)

class Svg extends Component {
    componentDidMount(){
        const path = this.refs.path
        path.getTotalLength()
        path.getPointAtLength(55)
        debugger;
    }

    render() {
        const { width, height, style } = this.props
        return (
            <svg ref="svg" width={width} height={height} style={getStyle(style)}>
                <path ref="path" d="M150 0 L75 200 L225 200 " fill="none" stroke="red"/>
            </svg>
        )
    }
}

export default Svg