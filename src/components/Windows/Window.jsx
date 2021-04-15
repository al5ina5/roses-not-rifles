import { motion } from "framer-motion";
import {
    Children,
    forwardRef,
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
} from "react";
import Button from "../Button";
import { useOutsideAlerter } from "../../lib/win98";
import { full } from "acorn-walk";
import Draggable, { DraggableCore } from "react-draggable";
import Topbar from "./Topbar";

const Window = forwardRef(
    (
        {
            title,
            offset,
            close,
            taskbar,
            children,
            className,
            fullScreen: initialFullScreen,
        },
        ref
    ) => {
        const [fullScreen, setFullScreen] = useState(initialFullScreen);
        const [top, setTop] = useState(true);

        useImperativeHandle(ref, () => ({
            top,
            setTop,
        }));

        const [dragPos, setDragPos] = useState({ x: offset, y: offset });

        const topClasses = top ? "z-30" : "z-20";

        const windowRef = useRef(null);
        useOutsideAlerter(windowRef, (e) => {
            setFullScreen();
            setTop(false);
        });

        return (
            <Draggable
                axis="both"
                handle=".dragger"
                onDrag={(event, data) => {
                    if (!fullScreen) setDragPos(data);
                }}
                // position={dragPos}
                position={fullScreen ? { x: 0, y: 0 } : dragPos}
                grid={[25, 25]}
                scale={1}
                ref={ref}
            >
                <div
                    ref={windowRef}
                    onPointerDown={() => setTop(true)}
                    className={`${
                        fullScreen ? "h-full w-full" : "max-w-3/4 max-h-3/4"
                    } ${topClasses} max-w-full space-y-1 border-emboss absolute flex flex-col pointer-events-auto bg-win-gray p-1 ${className}`}
                >
                    <Topbar
                        title={title}
                        maximize={() => setFullScreen((s) => !s)}
                        close={close}
                    />
                    {taskbar}
                    <div className="bg-white border-emboss-invert h-full p-3 overflow-auto">
                        <div className="container mx-auto">{children}</div>
                    </div>
                </div>
            </Draggable>
        );
    }
);

export default Window;
