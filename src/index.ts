import { SEND_AND_DROP_INTERVAL, VISUALISE_EVENTS } from '@constants';
import {
    MetricsBuffer,
    MouseMoveEvent,
    MouseClickEvent,
} from '@interfaces/interfaces';

import Observable from '@observable';
import { initMouseMoveHandler, initMouseClickHandler } from '@events/events';
import { sendMetricsBufferService } from '@services/services';
import { initEventsCanvas } from '@utils/utils';

const voidMetrics: MetricsBuffer = {
    start: Date.now(),
    mouseMoveBuffer: [],
    mouseClickBuffer: [],
};

export default function eyeOfSauron() {
    // metrics Buffer
    const metricsBuffer = new Observable<MetricsBuffer>(voidMetrics);
    // use event observables as atoms for metrics buffer and
    // at the same time as state with last event of atom type
    const mouseMoveAtom = new Observable<MouseMoveEvent | null>(null);
    const mouseClickAtom = new Observable<MouseClickEvent | null>(null);

    // prevent SSR break
    if (typeof window !== 'undefined') {
        // create canvas to show all tracked events on page
        if (VISUALISE_EVENTS) {
            initEventsCanvas();
        }

        initMouseMoveHandler(mouseMoveAtom, metricsBuffer);
        initMouseClickHandler(mouseClickAtom, metricsBuffer);

        // periodicaly send metrics and drop atoms
        setInterval(
            () => {
                // send metrics buffer to some service
                sendMetricsBufferService(metricsBuffer.value);
                // drop buffer
                metricsBuffer.value = voidMetrics;
            },
            SEND_AND_DROP_INTERVAL,
        );
    }
}
