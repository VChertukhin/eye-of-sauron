import { DEBOUNCE_INTERVAL, VISUALISE_EVENTS } from '@constants';
import {
    MouseMoveEvent,
    MouseClickEvent,
    Events,
    MetricsBuffer,
} from '@interfaces/interfaces';
import Observable from '@observable';
import { DrawServices } from '@services/services';
import { debounce } from '@utils/utils';

type StopHandlerFunction = () => void;

export const initMouseMoveHandler = (
    mouseMoveAtom: Observable<MouseMoveEvent | null>,
    metricsBuffer: Observable<MetricsBuffer>,
): StopHandlerFunction => {
    const handleMouseMove = debounce<MouseEvent>((event: MouseEvent) => {
        const { clientX, clientY } = event;

        const mouseMove: MouseMoveEvent = {
            eventType: Events.mouseMove,
            payload: {
                at: Date.now(),
                position: {
                    x: clientX,
                    y: clientY,
                },
            },
        };

        mouseMoveAtom.value = mouseMove;
    }, DEBOUNCE_INTERVAL.mouseMove);

    window.addEventListener('mousemove', handleMouseMove);

    // update buffer on each new mouse move
    mouseMoveAtom.subscribe((newMouseMove: MouseMoveEvent) => {
        const { mouseMoveBuffer: prevMouseMoveBuffer } = metricsBuffer.value;

        metricsBuffer.value = {
            ...metricsBuffer.value,
            mouseMoveBuffer: [...prevMouseMoveBuffer, newMouseMove],
        };
    });
    if (VISUALISE_EVENTS) {
        // draw mouse move visualisation
        mouseMoveAtom.subscribe((newMouseMove: MouseMoveEvent) => DrawServices.drawMouseMove(newMouseMove));
    }

    return () => window.removeEventListener('mousemove', handleMouseMove);
};

export const initMouseClickHandler = (
    mouseClickAtom: Observable<MouseClickEvent | null>,
    metricsBuffer: Observable<MetricsBuffer>,
): StopHandlerFunction => {
    const handleMouseClick = debounce<MouseEvent>((event: MouseEvent) => {
        const { clientX, clientY } = event;

        const mouseClick: MouseClickEvent = {
            eventType: Events.mouseClick,
            payload: {
                at: Date.now(),
                position: {
                    x: clientX,
                    y: clientY,
                },
            },
        };

        mouseClickAtom.value = mouseClick;
    }, DEBOUNCE_INTERVAL.mouseClick);

    window.addEventListener('click', handleMouseClick);

    // update buffer on each new mouse click
    mouseClickAtom.subscribe((newMouseClick: MouseClickEvent) => {
        const { mouseClickBuffer: prevMouseClickBuffer } = metricsBuffer.value;

        metricsBuffer.value = {
            ...metricsBuffer.value,
            mouseClickBuffer: [...prevMouseClickBuffer, newMouseClick],
        };
    });
    if (VISUALISE_EVENTS) {
        // draw mouse click visualisation
        mouseClickAtom.subscribe((newMouseClick: MouseClickEvent) => DrawServices.drawMouseClick(newMouseClick));
    }

    return () => window.removeEventListener('click', handleMouseClick);
};
