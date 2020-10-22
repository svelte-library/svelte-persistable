/**
 * Something that may or may not be a promise.
 */
export type NowOrLater<T> = T | Promise<T>;
