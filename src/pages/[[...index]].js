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
import BooterSequence from "../components/BooterSequence";
import { usePopups } from "../components/PopsProvider";
// import ShoutBox from "../components/ShoutBox/ShoutBox";
// import MusicStation from "../components/MusicStation";
import useRouteHandler from "../hooks/useRouteHandler";

export default function IndexPage() {
    const desktopRef = useRef();

    useRouteHandler();

    const { windows, popRefs, createWindow } = usePopups();

    const [shutdown, setShutdown] = useState(false);
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
            <BooterSequence />

            {shutdown && <Shutdown setShutdown={setShutdown} />}
            <div className="flex flex-col h-full font-win">
                <div
                    ref={desktopRef}
                    className="flex relative bg-win-blue overflow-hidden block h-full"
                >
                    <div className="absolute p-12 inset-0 flex items-center justify-center">
                        <img
                            className="w-64 opacity-75"
                            src="/img/roses-not-rifles-v4.png"
                            alt=""
                        />
                    </div>
                    <div className="realtive z-10 p-4 flex flex-col flex-wrap">
                        <AppIcon
                            title="The Stream"
                            src="/img/win-98/help_book_computer-4.png"
                            desktopRef={desktopRef}
                            onDoubleClick={() =>
                                createWindow({
                                    title: "The Stream",
                                    children: <StreamWindow />,
                                })
                            }
                        />
                        <AppIcon
                            title="The Shop"
                            src="/img/win-98/world-2.png"
                            desktopRef={desktopRef}
                            onDoubleClick={() =>
                                createWindow({
                                    title: "The Shop",
                                    children: <ShopWindow />,
                                })
                            }
                        />
                        <AppIcon
                            title="About this Site"
                            src="/img/win-98/help_question_mark-0.png"
                            desktopRef={desktopRef}
                            onDoubleClick={() =>
                                createWindow({
                                    title: "About this Site",
                                    children: <AboutWindow />,
                                })
                            }
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
                    <div className="absolute z-50 pointer-events-none inset-0">
                        {showStart && (
                            <StartMenu
                                shutdown={doShutdown}
                                toggle={() => setShowStart((s) => !s)}
                            />
                        )}
                    </div>
                </div>
                <Taskbar>
                    <Button onClick={() => setShowStart((s) => !s)}>
                        <div className="flex items-center whitespace-nowrap">
                            <img
                                className="absolute w-6"
                                src="/img/win-98/win-98.png"
                                alt=""
                            />
                            <span className="pl-8 font-win-bold">Start</span>
                        </div>
                    </Button>
                    {windows.map((window, index) => {
                        return (
                            <Button
                                key={window.id}
                                onClick={() => {
                                    const top = popRefs.current[window.id].top;
                                    const setTop = (value) => {
                                        popRefs.current[window.id].setTop(
                                            value
                                        );
                                    };

                                    setTop(true);
                                    // popRefs.current[window.id].click();
                                    // console.log(popRefs.current[window.id]);
                                }}
                            >
                                {window.title.length >= 22
                                    ? window.title.slice(0, 22) + "..."
                                    : window.title}
                            </Button>
                        );
                    })}
                    <div className="flex-1"></div>
                    {/* <Button onClick={() => {}}>Twitter</Button>
                    <Button>Instagram</Button>
                    <Button>YouTube</Button>
                    <Button>Behance</Button> */}
                </Taskbar>
            </div>
        </>
    );
}
