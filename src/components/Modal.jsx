import Topbar from "./Windows/Topbar";
import Window from "./Windows/Window";

export default function Modal({ visible, hide, children }) {
    if (!visible) return null;
    return (
        <>
            <div
                onClick={hide}
                className="absolute inset-0 z-50 bg-win-darkblue flex items-center justify-center"
            >
                <div className="bg-win-gray p-1 border-emboss z-10 w-full max-w-sm">
                    <Topbar title="System Notification" close={hide} />
                    <div className="p-5">{children}</div>
                </div>
            </div>
        </>
    );
}
