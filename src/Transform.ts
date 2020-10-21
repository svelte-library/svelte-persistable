import type {NowOrLater} from "./NowOrLater";

export interface Transform<T> {
    serialize: (value: T) => NowOrLater<string>;
    deserialize: (value: string) => NowOrLater<T>;
}

export const JsonTransformer: Transform<any> = {
    deserialize(value: string): any {
        return JSON.parse(value);
    },
    serialize(value: any): string {
        return JSON.stringify(value);
    }
}
