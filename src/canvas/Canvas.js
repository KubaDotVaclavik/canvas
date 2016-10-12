import React, { Component } from 'react';
import Circles from '../circles/Circles';
import { addCircle } from '../circles/actions'
import { frameTick } from './actions';

class Canvas extends Component {
    constructor(props) {
        super(props)

        this.state = { mouseCoor: [], rects: [] }

        this.mouseMove = this.mouseMove.bind(this)
        this.mouseClick = this.mouseClick.bind(this)
        this.animate = this.animate.bind(this)
    }

    getCoordinates(event) {
        const refName = "canvas"

        if (event.pageX == null && event.clientX != null) {
            var doc = document.documentElement, body = document.body;
            event.pageX = event.clientX + ((doc && doc.scrollLeft) || (body && body.scrollLeft) || 0) - ((doc && doc.clientLeft) || (body && body.clientLeft) || 0);
            event.pageY = event.clientY + ((doc && doc.scrollTop) || (body && body.scrollTop) || 0) - ((doc && doc.clientTop) || (body && body.clientTop) || 0);
        }

        return {
            x: event.pageX - this.refs[refName].getBoundingClientRect().left,
            y: event.pageY - this.refs[refName].getBoundingClientRect().top
        }

    }

    mouseMove(e) {
        this.setState({ mouseCoor: this.getCoordinates(e) })
    }

    mouseClick(e) {
        this.store.dispatch(
            addCircle(this.getCoordinates(e))
        )

    }

    draw() {
        const state = this.store.getState()
        const { ctx } = this

        Circles(state, ctx)
    }

    animate() {
        this.store.dispatch(frameTick())
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.draw()
        requestAnimationFrame(this.animate);
    }

    componentDidMount() {
        this.canvas = this.refs.canvas
        this.ctx = this.refs.canvas.getContext('2d')
        this.store = this.context.store
        this.animate()
    }

    render() {
        const { width, height } = this.props;

        return (
            <canvas style={{ border: '1px solid #ddd' }}
                width={width}
                height={height}
                ref="canvas"
                onMouseMove={this.mouseMove}
                onMouseUp={this.mouseClick}
                >
            </canvas>
        )
    }
}

Canvas.contextTypes = {
    store: React.PropTypes.object
};

export default Canvas