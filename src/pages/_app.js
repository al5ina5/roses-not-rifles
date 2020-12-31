import '../global.scss'
import Head from 'next/head'

export default function App({ Component, pageProps }) {
    return (
        <>
            <Component {...pageProps} />
        </>
    )
}
