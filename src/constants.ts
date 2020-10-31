// basic consts describing working mode (development/production)
export const __DEV__ = process.env.NODE_ENV === 'development';
export const __PROD__ = !__DEV__;
// defines mininmal time limit (in ms) atoms (state parts) will be cleaned and metrics buffer
// will be send to some service
export const SEND_AND_DROP_INTERVAL = 2000;
// used in event handlers and determines mininmal interval (in ms) betven events that will be
// stored in atoms, 50-100 is optimal to prevent blocking and at the same time to have relevant
// information about interactions
export enum DEBOUNCE_INTERVAL {
    default = 75,
    mouseMove = 50,
    mouseClick = 100,
}
// test canvas id (for event visualisation)
export const CANVAS_ID = 'metricon-canvas';
// show all tracked events visualisation in the canvas on the top of the page
export const VISUALISE_EVENTS = __DEV__ || process.env.VISUALISE_EVENTS === 'true';
