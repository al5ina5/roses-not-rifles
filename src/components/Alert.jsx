import Topbar from "./Windows/Topbar";
import Window from "./Windows/Window";

export default function Alert({ visible, hide, title, subtitle }) {
    return (
        <div
            onClick={() => hide()}
            className="bg-win-gray p-2 border-emboss space-y-1"
        >
            <p className="text-xs font-win-bold">{title}</p>
            <p>{subtitle}</p>
        </div>
    );
}
