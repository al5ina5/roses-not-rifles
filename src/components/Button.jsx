import LoadingIndicator from "./LoadingIndicator";

export default function Button({
    className,
    onClick,
    children,
    loading,
    disabled,
}) {
    return (
        <>
            <button
                onClick={onClick}
                className={`relative bg-win-gray button-emboss inline-block w-auto px-2 py-2 h-full text-xs ${className} `}
            >
                <div className="flex flex-row items-center">
                    {children}
                    {loading && <LoadingIndicator />}
                </div>
            </button>
        </>
    );
}
