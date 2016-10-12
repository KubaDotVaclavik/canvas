import { selectCirclesArray } from './selectors'

const Circles = (state, ctx) => {

    selectCirclesArray(state).forEach(item => {
        ctx.beginPath();
        ctx.arc(item.coor.x, item.coor.y, 5, 0, 2 * Math.PI);
        ctx.stroke();
    })

}

export default Circles;