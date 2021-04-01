import R from "random";
import useSWR from "swr";
import Window from "./Window";

export default function AboutWindow({ close, desktopRef }) {
    const { data: about } = useSWR(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/wp-json/wp/v2/pages/?slug=about`
    );

    if (!about) return <p>Loading...</p>;
    return (
        // <Window
        //     title="About This Site"
        //     offset={25}
        //     close={close}
        //     desktopRef={desktopRef}
        // >
        <div className="max-w-2xl w-full mx-auto space-y-4">
            <div
                className="wordpress-content space-y-4"
                dangerouslySetInnerHTML={{
                    __html: about[0]?.content.rendered,
                }}
            />
        </div>
        // </Window>
    );
}
