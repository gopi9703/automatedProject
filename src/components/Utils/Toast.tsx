import { MutableRefObject, useEffect, useRef } from "react";
import { Toast } from "primereact/toast";
import { toaster$ } from "./toastStore";

export default function Toaster() {
  const toast = useRef() as MutableRefObject<any>;
  useEffect(() => {
    toaster$.subscribe((res: any) => {
      if (res.detail && res.detail) {
        toast.current.show({
          severity: res.severity,
          summary: res.summary,
          detail: res.detail,
        });
      }
    });
  }, []);

  return <Toast ref={toast} />;
}
