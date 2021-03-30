import { useEffect, useState } from "react";

export default function LoadingIndicator() {
    const [rotate, setRotate] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => setRotate((_) => !_, 2000));
        return () => clearInterval(timer);
    }, []);

    return (
        <img
            className={`ml-4 h-4 transform ${rotate ? "rotate-90" : ""}`}
            src="/img/loading.png"
            alt="Loading..."
        />
    );
}
