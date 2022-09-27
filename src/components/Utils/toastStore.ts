import { BehaviorSubject } from "rxjs";

// To raise listerner when a value of task is changed
const toaster$ = new BehaviorSubject(false);

function setToaster(toaster: any) {
  toaster$.next(toaster);
}

export { setToaster, toaster$ };
