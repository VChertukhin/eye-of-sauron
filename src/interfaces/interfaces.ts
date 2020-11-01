import { DEBOUNCE_INTERVAL } from '@constants';

export interface Config {
    SEND_AND_DROP_INTERVAL?: number;
    DEBOUNCE_INTERVAL?: { [key in keyof typeof DEBOUNCE_INTERVAL]: number },
    CANVAS_ID?: string;
    VISUALISE_EVENTS?: boolean;
}

export type Position = {
    x: number;
    y: number;
}

export type MousePosition = Position;

export enum Events {
    mouseMove = 'mousemove',
    mouseClick = 'mouseclick',
}

type EventPayload = {
    at: number; // Date.now()
    position: MousePosition;
};

type MouseEvent = {
    payload: EventPayload;
}

export interface MouseMoveEvent extends MouseEvent {
    eventType: Events.mouseMove;
}

export type MouseMoveBuffer = MouseMoveEvent[];

export interface MouseClickEvent extends MouseEvent {
    eventType: Events.mouseClick;
}

export type MouseClickBuffer = MouseClickEvent[];

export interface MetricsBuffer {
    start: number; // Date.now()
    mouseMoveBuffer: MouseMoveBuffer;
    mouseClickBuffer: MouseClickBuffer;
}
