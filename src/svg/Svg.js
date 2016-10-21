import React, { Component } from 'react';

const getStyle = (style) =>
    Object.assign({
        position: 'absolute'
    }, style)

class Svg extends Component {
    componentDidMount() {
    }

    pathToCoors(n) {
        const path = this.refs.path
        const sectionLength = path.getTotalLength() / n

        return Array.from(new Array(n), (el, i) => {
            const {x, y} = path.getPointAtLength(i * sectionLength)
            return {x, y}
        })
    }

    render() {
        const { width, height, style } = this.props
        return (
            <svg ref="svg" width={width} height={height} style={getStyle(style)} >
                <path ref="path" d="M150 0 L75 200 L225 200 " fill="none" stroke="red" />
            </svg >
        )
    }
}

export default Svg