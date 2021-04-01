import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useOutsideAlerter } from "../lib/win98";
import R from "random";

export default function AppIcon({ title, src, onDoubleClick, desktopRef }) {
    const [active, setActive] = useState(false);

    const buttonRef = useRef(null);
    useOutsideAlerter(buttonRef, (e) => {
        setActive(false);
    });

    const activeClases = active ? "border-opacity-50" : "border-opacity-0";
    return (
        <>
            <motion.div
                ref={buttonRef}
                transition={{ duration: 30, loop: Infinity }}
                drag={true}
                dragMomentum={false}
                dragConstraints={desktopRef}
                onClick={() => {
                    onDoubleClick();
                    setActive(true);
                }}
                onDoubleClick={onDoubleClick}
                onDragStart={() => setActive(true)}
                className={`p-2 border-dotted border-white  border-2 rounded text-center w-32 inline-block ${activeClases}`}
            >
                <img
                    className="transform mx-auto mb-4 h-22 pointer-events-none"
                    src={src}
                    alt={title}
                />
                <span className="text-white text-sm sm:text-lg">{title}</span>
            </motion.div>
        </>
    );
}
