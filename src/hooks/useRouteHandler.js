import { useEffect } from "react";
import { useRouter } from "next/router";
import { usePopups } from "../components/PopsProvider";
import ShopWindow from "../components/Windows/ShopWindow/ShopWindow";
import StreamWindow from "../components/Windows/StreamWindow";

export default function useRouteHandler() {
    const router = useRouter();

    const { createWindow } = usePopups();

    useEffect(() => {
        if (!router) null;

        const path = router.asPath;
        const query = router.query;

        if (path.startsWith("/shop"))
            createWindow({
                title: "The Shop",
                children: <ShopWindow />,
            });
        if (path.startsWith("/stream"))
            createWindow({
                title: "The Stream",
                children: <StreamWindow />,
            });
    }, [router]);
    return null;
}
