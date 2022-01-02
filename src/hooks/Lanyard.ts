import { MutableRefObject, useRef } from "react";

class Lanyard {
    private beatInterval: MutableRefObject<any> = useRef();
    private socket: MutableRefObject<any> = useRef();
     
}

export { Lanyard };