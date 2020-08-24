import { CANVAS_ID } from '../constants';
import {
    MetricsBuffer,
    Position,
    MousePosition,
    MouseMoveEvent,
    MouseClickEvent,
} from '../interfaces/interfaces';

export const sendMetricsBufferService = (metrics: MetricsBuffer): void => console.log(metrics);

/**
 * return absolute position on page (correct mouse coordinates
 * relatively window with body element position)
 * @param position - mouse coordinates in window
 */
export const getPositionWithScroll = (position: MousePosition): Position => {
    const { x, y } = document.body.getBoundingClientRect();
    return {
        x: position.x - x,
        y: position.y - y,
    };
};

type DrawMouseMoveService = (mouseMove: MouseMoveEvent) => void;


/**
 * we need this extra wrapper to create lexical scope for previous mouse
 * move as beginning of the line
 */
const getDrawMouseMoveService = (): DrawMouseMoveService => {
    let lastMove: MousePosition | null = null;

    return (mouseMove: MouseMoveEvent) => {
        const canvas = document.getElementById(CANVAS_ID) as HTMLCanvasElement;

        const { x, y } = getPositionWithScroll(mouseMove.payload.position);

        if (lastMove) {
            const { x: prevX, y: prevY } = lastMove;
            const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
            ctx.beginPath();
            ctx.moveTo(prevX, prevY);
            ctx.lineTo(x, y);
            ctx.stroke();
        }
        lastMove = { x, y };
    };
};

export const drawMouseMoveService = getDrawMouseMoveService();

export const drawMouseClickService = (mouseClick: MouseClickEvent): void => {
    const canvas = document.getElementById(CANVAS_ID) as HTMLCanvasElement;

    const { x, y } = getPositionWithScroll(mouseClick.payload.position);

    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, 2 * Math.PI, true);
    ctx.stroke();
};
