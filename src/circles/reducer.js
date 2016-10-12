import uuid from 'uuid';
import Vector from '../lib/Vector';

import { FRAME_TICK } from '../canvas/actions';
import { ADD_CIRCLE } from './actions';

const defaultState = { a: { coor: new Vector(10, 20), move: new Vector(1, 0), } }

const MAX_Y = 350
const G = new Vector(0, 0.1)

const move = (state) => Object.assign({}, state, {
    coor: state.coor.add(state.move)
})

const applyGravitation = (state) => Object.assign({}, state, {
    move: state.move.add(G)
})

const checkBorder = (state) => {
    if (state.coor.y - MAX_Y >= 0.5) {
        return Object.assign({}, state, {
            move: state.move.multiply(new Vector(1, -1))
        })
    }
    return state
}

const updateCircle = (circle) => {
    circle = move(circle)
    circle = applyGravitation(circle)
    circle = checkBorder(circle)

    return circle;
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
        return Object.assign({}, state, {
            [uuid.v4()]: {
                coor: new Vector(payload.coor.x, payload.coor.y),
                move: new Vector(),
            }
        })
    }

    return state
}

export default circles;