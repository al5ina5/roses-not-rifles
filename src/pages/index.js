import { useEffect, useRef, useState } from "react";
import AppIcon from "../components/AppIcon";
import Button from "../components/Button";
import Shutdown from "../components/Shutdown";
import StartMenu from "../components/StartMenu/StartMenu";
import Taskbar from "../components/Taskbar";
import AlertWindow from "../components/Windows/AlertWindow";
import ShopWindow from "../components/Windows/ShopWindow/ShopWindow";
import StreamWindow from "../components/Windows/StreamWindow";
import shortid from "shortid";
import AboutWindow from "../components/Windows/AboutWindow";

export default function IndexPage() {
    const desktopRef = useRef();

    const [shutdown, setShutdown] = useState(false);

    const [alert, setAlert] = useState(null);

    const triggerAlert = (data) => {
        setAlert({ ...data });

        setTimeout(() => {
            setAlert(null);
        }, 2000);
    };

    const [showStream, setShowStream] = useState(false);
    const [showShop, setShowShop] = useState(false);
    const [showStart, setShowStart] = useState(false);
    const [showAbout, setShowAbout] = useState(false);

    const doShutdown = () => {
        setShowStart(false);
        setShutdown(true);
    };
    return (
        <>
            {shutdown && <Shutdown setShutdown={setShutdown} />}
            <div className="flex flex-col h-full font-win">
                <div
                    ref={desktopRef}
                    className="flex relative bg-win-blue overflow-hidden block h-full"
                >
                    <div className="absolute p-12 inset-0 z-0 flex items-center justify-center">
                        <img
                            className="w-64 opacity-75"
                            src="/img/roses-not-rifles-v4.png"
                            alt=""
                        />
                    </div>
                    <div className="relative flex-1 z-10">
                        <div className="apps p-4 flex flex-col">
                            <AppIcon
                                title="Open The Stream"
                                src="/img/win-98/help_book_computer-4.png"
                                desktopRef={desktopRef}
                                onDoubleClick={() => setShowStream((s) => !s)}
                            />
                            <AppIcon
                                title="Open The Shop"
                                src="/img/win-98/world-2.png"
                                desktopRef={desktopRef}
                                onDoubleClick={() => setShowShop((s) => !s)}
                            />
                            <AppIcon
                                title="About This Site"
                                src="/img/win-98/help_question_mark-0.png"
                                desktopRef={desktopRef}
                                onDoubleClick={() => setShowAbout((s) => !s)}
                            />
                        </div>
                        <div className="absolute bottom-0 right-0 p-4">
                            <a
                                target="_blank"
                                href="https://sebastianalsina.com"
                                className="block border-emboss text-xs transform scale-75 origin-bottom-right opacity-50 hover:opacity-100 text-white p-1"
                            >
                                {"</>"} by Sebastian Alsina
                            </a>
                        </div>
                        <div className="absolute pointer-events-none inset-0">
                            <AlertWindow
                                alert={alert}
                                setAlert={setAlert}
                                close={() => console.log("test")}
                                desktopRef={desktopRef}
                            />
                            {showStream && (
                                <StreamWindow
                                    close={() => setShowStream(false)}
                                    desktopRef={desktopRef}
                                />
                            )}
                            {showShop && (
                                <ShopWindow
                                    close={() => setShowShop(false)}
                                    desktopRef={desktopRef}
                                />
                            )}
                            {showAbout && (
                                <AboutWindow
                                    close={() => setShowAbout(false)}
                                    desktopRef={desktopRef}
                                />
                            )}
                            {showStart && (
                                <StartMenu
                                    shutdown={doShutdown}
                                    toggle={() => setShowStart((s) => !s)}
                                />
                            )}
                        </div>
                    </div>
                </div>
                <Taskbar>
                    <Button onClick={() => setShowStart((s) => !s)}>
                        <div className="flex items-center">
                            <img
                                className="absolute w-6"
                                src="/img/win-98/win-98.png"
                                alt=""
                            />
                            <span className="pl-8  font-win-bold">Start</span>
                        </div>
                    </Button>
                    <Button
                        onClick={() => {
                            triggerAlert({ title: "yes", message: "23123" });
                        }}
                    >
                        Twitter
                    </Button>
                    <Button>Instagram</Button>
                    <Button>YouTube</Button>
                    <Button>Behance</Button>
                </Taskbar>
            </div>
        </>
    );
}
