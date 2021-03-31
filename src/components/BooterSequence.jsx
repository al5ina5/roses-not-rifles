import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import useCookie from "../hooks/useCookie";
import Typed from "react-typed";
import LoadingBar from "./LoadingBar";

export default function BooterSequence() {
    const [ready, setReady] = useState();
    const [hidden, setHidden] = useState(false);
    useEffect(() => setHidden(Cookies.get("booter_complete")), []);

    useEffect(() => {
        setTimeout(() => {
            setReady(true);
        }, 2000);
    }, []);

    const hide = () => {
        setHidden(true);
        Cookies.set("booter_complete", true);
    };

    if (hidden) return null;
    return (
        <div
            onClick={ready ? () => hide() : null}
            className="absolute z-50 inset-0 bg-black text-white"
        >
            <div className="flex items-center justify-center w-full h-full">
                <div className="flex flex-col items-center space-y-8">
                    <div className="text-center space-y-4">
                        <img
                            className="mx-auto w-32"
                            src="/img/roses-not-rifles-v4.png"
                            alt="Roses, not Rifles Logo"
                        />
                        {/* <p className="text-4xl">
                                Roses95<span className="text-sm">&copy;</span>
                            </p> */}
                    </div>
                    {!ready && (
                        <div className="space-y-4">
                            <p className="text-white flex flex-row items-center text-xs">
                                <img
                                    src="/img/win-98/computer_explorer-5.png"
                                    className="mr-4 h-6"
                                    alt="Retro Computer"
                                />
                                <span>Loading</span>
                                <Typed
                                    strings={["..."]}
                                    loop
                                    showCursor={false}
                                    typeSpeed={40}
                                />
                            </p>
                            <LoadingBar />
                        </div>
                    )}
                    {ready && (
                        <p className="text-xs">Click anywhere to start.</p>
                    )}
                </div>
            </div>

            <div className="absolute max-w-sm w-full  bottom-0 left-0 p-6 text-xxs opacity-50 space-y-1">
                <p>Copyright &copy; {new Date().getFullYear()}</p>
                <p>RNR Corporation</p>
            </div>
            <div className="absolute max-w-sm w-full text-right bottom-0 right-0 p-6 text-xs opacity-50">
                <p>&copy;</p>
            </div>
        </div>
    );
}
