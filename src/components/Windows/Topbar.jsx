import Button from "../Button";
export default function Topbar({ title, maximize, close }) {
    return (
        <>
            <div className="flex items-center bg-win-darkblue px-2 py-1 text-white">
                <div className="dragger w-full mr-4">{title}</div>
                <div className="ml-auto space-x-1 text-black flex flex-row items-center">
                    {maximize && (
                        <Button
                            className="font-win-bold whitespace-nowrap"
                            onClick={maximize}
                        >
                            [ ]
                        </Button>
                    )}
                    {close && (
                        <Button className="font-win-bold" onClick={close}>
                            X
                        </Button>
                    )}
                </div>
            </div>
        </>
    );
}
