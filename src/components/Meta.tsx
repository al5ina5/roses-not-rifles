import Head from "next/head";

const Meta = () => {
    const title = "RosesOS v1.0.0-beta.12";
    const description = "Roses, not Rifles ❤️";
    const url = "http://rosesnotrifles.com/";

    return (
        <Head>
            <title>{title} &copy;</title>
            <meta name="description" content={description} />
            <meta property="og:type" content="website" />
            <meta name="og:title" property="og:title" content={title} />
            <meta
                name="og:description"
                property="og:description"
                content={description}
            />
            <meta property="og:site_name" content={title} />
            <meta property="og:url" content={url} />
            <meta name="twitter:card" content="summary" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:site" content={url} />
            <meta name="twitter:creator" content="@al5ina5" />
            <link
                rel="icon"
                type="image/png"
                href="/img/logos/LOGOMARK - COLOR_1.png"
            />
            <link
                rel="apple-touch-icon"
                href="/img/logos/LOGOMARK - COLOR_1.png"
            />
            <meta property="og:image" content="/img/upsocia-banner.png" />
            <meta
                name="twitter:image"
                content="/img/logos/LOGOMARK - COLOR_1.png"
            />
        </Head>
    );
};
export default Meta;
