import "../global.scss";
import Head from "next/head";
import { SWRConfig } from "swr";
import { fetcher } from "../lib/win98";
import PopsProvider from "../components/PopsProvider";

export default function App({ Component, pageProps }) {
    return (
        <>
            <SWRConfig
                value={{
                    fetcher,
                }}
            >
                <div className="font-win h-full">
                    <PopsProvider>
                        <Component {...pageProps} />
                    </PopsProvider>
                </div>
            </SWRConfig>
        </>
    );
}
