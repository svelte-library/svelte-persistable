import type {NowOrLater} from "./NowOrLater";

export interface Storage {
    getItem: (key: string) => NowOrLater<string | null>;
    setItem: (key: string, value: string) => NowOrLater<void>;
}
