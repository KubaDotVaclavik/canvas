// import uuid from 'uuid';
import Vector from '../lib/Vector';
import Mover from '../lib/Mover';

import { FRAME_TICK } from '../canvas/actions';
import { ADD_CIRCLE } from './actions';

const defaultState = {
    a: new Mover({
        position: new Vector(60, 10),
        velocity: new Vector(2, 0)
    })
}

const updateCircle = (circle) => {
    return circle.update()
}

const circles = (state = defaultState, action) => {
    const { type, payload } = action;

    if (type === FRAME_TICK) {
        const nextState = {}
        Object.keys(state).forEach(key => {
            nextState[key] = updateCircle(state[key])
        })
        return nextState
    }

    if (type === ADD_CIRCLE) {
        const nextState = {}
        Object.keys(state).forEach(key => {
            nextState[key] = state[key]
            nextState[key].target = new Vector(payload.coor.x, payload.coor.y)
            nextState[key].gravitySensitive = false
        })
        return nextState
    }

    return state
}

export default circles;