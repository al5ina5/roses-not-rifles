import '../global.scss'
import Head from 'next/head'
import { SWRConfig } from 'swr'
import { fetcher } from '../lib/win98'

export default function App({ Component, pageProps }) {
    return (
        <>
            <SWRConfig
                value={{
                    fetcher
                }}>
                <Component {...pageProps} />
            </SWRConfig>
        </>
    )
}
