import "@/styles/globals.css";
import Head from 'next/head';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="https://api.olamap.com/v1/maps/styles/ola-maps.css" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
