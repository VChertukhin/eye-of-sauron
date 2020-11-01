/** 
 * as the number of services gowths we will split this file into sepatare modules
 * but now we will just use namespaces for grouping
 */
import { CANVAS_ID } from '@constants';
import {
    MetricsBuffer,
    Position,
    MousePosition,
    MouseMoveEvent,
    MouseClickEvent,
} from '@interfaces/interfaces';

/** contains services related to metrics sending (console / some processing API \ etc.) */
export namespace SendServices {
    // simply stream metrics to console
    export const sendMetricsBufferConsole = (metrics: MetricsBuffer, asJson = false): void => (
        asJson
            ? console.log(JSON.stringify(metrics))
            : console.log(metrics)
    );
}

/** services related to drawing on screen in canvas */
export namespace DrawServices {
    /**
     * may return null at app start so we should get later
     * @returns {HTMLCanvasElement}
     */
    const getCanvas = () => document.getElementById(CANVAS_ID) as HTMLCanvasElement;
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
    const getDrawMouseMove = (): DrawMouseMoveService => {
        let lastMove: MousePosition | null = null;

        return (mouseMove: MouseMoveEvent) => {
            const canvas = getCanvas();
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

    export const drawMouseMove = getDrawMouseMove();

    export const drawMouseClick = (mouseClick: MouseClickEvent): void => {
        const canvas = getCanvas();
        const { x, y } = getPositionWithScroll(mouseClick.payload.position);

        const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
        ctx.beginPath();
        ctx.arc(x, y, 10, 0, 2 * Math.PI, true);
        ctx.stroke();
    };

}
