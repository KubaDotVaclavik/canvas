import createLoggerMiddleware from 'redux-logger';
import { FRAME_TICK } from './canvas/actions'; 

const configureMiddleware = () => {
  const middleware = [];

  const enableLogger = process.env.NODE_ENV !== 'production';
  
  if (enableLogger) {
    const logger = createLoggerMiddleware({
      collapsed: true,
      stateTransformer: state => JSON.parse(JSON.stringify(state)),
      predicate: (getState, action) => action.type !== FRAME_TICK
    });
    middleware.push(logger);
  }

  return middleware;
};

export default configureMiddleware;
