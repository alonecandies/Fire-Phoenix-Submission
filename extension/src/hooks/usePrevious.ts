import { useRef, useEffect } from "react";

const usePrevious = (value: any): any => {
  const ref = useRef<HTMLDivElement | null>();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

export default usePrevious;
