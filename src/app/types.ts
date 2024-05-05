export type Maybe<T> = NonNullable<T> | undefined;

export enum Theme {
  Light = 'light',
  Dark = 'dark',
}

export enum Token {
  Access = 'access-token',
  Refresh = 'refresh-token',
}

export interface FileInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}
