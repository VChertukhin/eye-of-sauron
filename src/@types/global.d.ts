import { Config } from '@interfaces/interfaces';

// use interface decalration merging to externg global window
declare global {
    interface Window {
        eyeOfSauron?: {
            config?: Config;
            [key: string]: any;
        };
    }
}
