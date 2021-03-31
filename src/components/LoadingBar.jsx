import { useEffect, useState } from "react";

export default function LoadingBar() {
    // Move the loading icon.
    const [pos, setPos] = useState(0);
    useEffect(() => {
        const timer = setInterval(() => {
            if (pos >= 100) {
                setPos(-20);
            } else {
                setPos((_) => _ + 10);
            }
        }, 250);
        return () => clearInterval(timer);
    }, [pos]);
    return (
        <div className="relative overflow-hidden border-emboss noise bg-black w-64 h-6">
            <div style={{ left: `${pos}%` }} className="absolute ">
                <div className="flex">
                    <div className="w-6 h-6 border-emboss bg-win-darkblue"></div>
                    <div className="w-6 h-6 border-emboss bg-win-darkblue"></div>
                    <div className="w-6 h-6 border-emboss bg-win-darkblue"></div>
                </div>
            </div>
        </div>
    );
}
