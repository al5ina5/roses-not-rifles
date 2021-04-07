import { useRef, useState } from "react";
import Button from "../Button";
import About from "./About";
import Contact from "./Contact";
import Listing from "./Listing.jsx";
import { useOutsideAlerter } from "../../lib/win98";

const LISTING_TAB = "listing";
const CONTACT_TAB = "contact";
const ABOUT_TAB = "about";

export default function StartMenu({ shutdown, toggle }) {
    const [activeTab, setActiveTab] = useState(LISTING_TAB);

    const isListing = activeTab == LISTING_TAB;
    const isContact = activeTab == CONTACT_TAB;
    const isAbout = activeTab == ABOUT_TAB;

    const startRef = useRef();
    useOutsideAlerter(startRef, toggle);

    return (
        <>
            <div
                ref={startRef}
                className="z-50 pointer-events-auto max-w-sm w-full absolute p-1 bottom-0"
            >
                <div className="w-full bg-win-gray border-emboss">
                    <div className="bg-black bg-opacity-25 p-2">
                        <div className="flex items-center">
                            <img
                                className="absolute w-6"
                                src="/img/win-98/win-98.png"
                                alt=""
                            />
                            <span className="pl-8 font-win-bold">RosesOS</span>
                        </div>
                    </div>

                    <div className="h-full overflow-auto">
                        {isListing && (
                            <Listing
                                shutdown={shutdown}
                                setActiveTab={setActiveTab}
                            />
                        )}
                        {isContact && <Contact />}
                        {isAbout && <About />}
                    </div>
                </div>
            </div>
        </>
    );
}
