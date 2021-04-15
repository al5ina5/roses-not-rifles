import R from "random";
import useSWR from "swr";
import { usePopups } from "../PopsProvider";
import Window from "./Window";
import moment from "moment";
export default function StreamWindow({ close, desktopRef }) {
    const { data: posts, error } = useSWR(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/wp-json/wp/v2/posts?_embed&status=publish`
    );

    const { createWindow } = usePopups();
    return (
        <div className="max-w-grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {error && <p>An error occurred... :(</p>}
            {!posts && <p>Loading...</p>}
            {posts?.map((post, index) => (
                <div
                    onClick={() => {
                        createWindow({
                            // fullscreen: true,
                            title: post.title.rendered,
                            children: (
                                <div className="p-6 sm:p-12">
                                    <div className="max-w-lg mx-auto mb-12 space-y-4">
                                        <p className=" font-win-bold text-4xl">
                                            {post.title.rendered}
                                        </p>
                                        <p className="text-xs">
                                            {moment(post.date).format(
                                                "dddd, MMMM Do YYYY, h:mm:ss a"
                                            )}
                                        </p>
                                    </div>
                                    <div
                                        className="wordpress-content space-y-4"
                                        dangerouslySetInnerHTML={{
                                            __html: post.content.rendered,
                                        }}
                                    />
                                </div>
                            ),
                        });
                    }}
                    key={index}
                    className="cursor-pointer p-2 border-emboss square bg-cover bg-center"
                    style={{
                        backgroundImage: `url("${post?._embedded?.["wp:featuredmedia"]?.["0"]?.source_url}")`,
                    }}
                >
                    <div className="h-ful w-full flex justify-end">
                        <p className="border-emboss inline-block px-2 py-1 bg-win-darkblue text-white text-xs">
                            {moment(post.date).format("MMMM Do")}
                        </p>
                    </div>
                </div>
            ))}
        </div>
        // </Window>
    );
}
