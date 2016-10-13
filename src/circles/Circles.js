import { selectCirclesArray } from './selectors'

const Circles = (state, ctx) => {

    selectCirclesArray(state).forEach(item => {
        item.draw(ctx)
    })

}

export default Circles;