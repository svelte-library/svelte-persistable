import type {Transform} from "./Transform";
import type {Storage} from "./Storage";

/**
 * This interface represents a configuration for a Persistable store.
 */
export interface Config<T> {
    /**
     * A unique key to identify the used storage.
     */
    key: string;
    /**
     * The storage interface.
     * This value defaults to window.localStorage.
     */
    storage?: Storage;
    /**
     * The transformation interface.
     * This object is responsible for (de)serializing your data before sending it to storage.
     * It defaults to JSON.stringify and JSON.parse.
     */
    transform?: Transform<T>;
}
