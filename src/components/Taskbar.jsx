export default function Taskbar({ children }) {
    return (
        <>
            <div className='border-emboss whitespace-no-wrap overflow-x-auto taskbar h-12 shadow bg-win-gray border-2 space-x-1 p-1'>
                {children}
            </div>
        </>
    )
}
