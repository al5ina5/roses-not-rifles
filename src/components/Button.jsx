export default function Button({ className, onClick, children }) {
    return (
        <>
            <button
                onClick={onClick}
                className={`relative bg-win-gray button-emboss inline-block w-auto px-2 py-2 h-full text-xs ${className} `}>
                {children}
            </button>
        </>
    )
}
