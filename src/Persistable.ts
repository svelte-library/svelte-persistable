import type {Writable} from "svelte/store";
import {writable} from "svelte/store";
import {JsonTransformer, Transform} from "./Transform";
import type {NowOrLater} from "./NowOrLater";
import type {Config} from "./Config";

export interface Persistable<T> extends Writable<T> {
    /**
     * Wait for this store to be fully loaded and flushed.
     */
    wait(): Promise<void>;
}

export function persistable<T>(defaultValue: () => NowOrLater<T>, config: Config<T>): Persistable<T> {
    const storageKey = config.key;
    const storage = config.storage || window.localStorage;
    const transform: Transform<T> = config.transform || JsonTransformer;

    let busy = Promise.resolve();

    const store = writable<T>(undefined, (set) => {
        busy = busy.then(async () => {
            const storedValue = await storage.getItem(storageKey);
            if (storedValue) {
                return transform.deserialize(storedValue);
            } else {
                return defaultValue();
            }
        }).then(set);
    });

    store.subscribe((newValue) => {
        busy = busy.then(async () => {
            const serialized = await transform.serialize(newValue);
            await storage.setItem(storageKey, serialized);
        });
    });

    return {
        ...store,
        async wait(): Promise<void> {
            await busy;
        }
    };
}
