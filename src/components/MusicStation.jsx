import useSWR from "swr";

export default function MusicStation() {
    const { data: musicStation, error } = useSWR(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/wp-json/wp/v2/pages/?slug=music-station`
    );

    if (error) return <p>An error occurred.</p>;
    if (!musicStation) return <p>Loading...</p>;
    return (
        <div>
            <div
                className="wordpress-content space-y-4"
                dangerouslySetInnerHTML={{
                    __html: musicStation[0]?.content.rendered,
                }}
            />
        </div>
    );
}
