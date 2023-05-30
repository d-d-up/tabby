export function sleep(milliseconds: number) {
  return new Promise((r) => setTimeout(r, milliseconds));
}

export function splitLines(input: string) {
  return input.match(/.*(?:$|\r?\n)/g).filter(Boolean) // Split lines and keep newline character
}

export function splitWords(input: string) {
  return input.match(/\w+|\W+/g).filter(Boolean); // Split consecutive words and non-words
}

import { CancelablePromise } from "./generated";
export function cancelable<T>(promise: Promise<T>, cancel: () => void): CancelablePromise<T> {
  return new CancelablePromise((resolve, reject, onCancel) => {
    promise
      .then((resp: T) => {
        resolve(resp);
      })
      .catch((err: Error) => {
        reject(err);
      });
    onCancel(() => {
      cancel();
    });
  });
}