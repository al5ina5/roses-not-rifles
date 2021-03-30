import Button from "../Button";
export default function Topbar({ title, maximize, close }) {
    return (
        <>
            <div className="flex items-center bg-win-darkblue px-2 py-1 text-white">
                <div className="dragger w-full">{title}</div>
                <div className="ml-auto whitespace-no-wrap space-x-1 text-black">
                    {maximize && (
                        <Button className="font-win-bold" onClick={maximize}>
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
