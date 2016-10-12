import { createSelector } from 'reselect';

export const selectCircles = state => state.entities.circles || {};

export const selectCirclesId = createSelector(
    [selectCircles],
    circles => Object.keys(circles)
)

export const selectCirclesArray = createSelector(
    [selectCirclesId, selectCircles],
    (circlesId, circles) => circlesId.map(id => {
        const circle = circles[id];
        circle.id = id;
        return circle;
    })
)