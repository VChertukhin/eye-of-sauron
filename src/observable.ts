type Subscriber = (newValue?: any) => void;

/**
 * Tiny implementation of Observable pattern to manage state and data streams
 */
export default class Observable<T> {
    constructor(
        private observableValue: T,
        private subscribers: Subscriber[] = [],
    ) { }

    public get value(): T {
        return this.observableValue;
    }

    public set value(newValue: T) {
        this.observableValue = newValue;
        // push new value to all subscribers
        this.notifySubscribers();
    }

    public subscribe(subscriber: Subscriber) {
        this.subscribers.push(subscriber);
    }

    private notifySubscribers() {
        this.subscribers.forEach(subscriber => subscriber(this.observableValue));
    }
}
