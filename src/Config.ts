import type {Transform} from "./Transform";
import type {Storage} from "./Storage";

export interface Config<T> {
    key: string;
    storage?: Storage;
    transform?: Transform<T>;
}
