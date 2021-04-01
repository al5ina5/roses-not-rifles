import LoadingIndicator from "./LoadingIndicator";
import LoadingBar from "./LoadingBar";

export default function LoadingScreen() {
    return (
        <div className="w-64 h-64 flex items-center justify-center">
            <LoadingBar />
        </div>
    );
}
