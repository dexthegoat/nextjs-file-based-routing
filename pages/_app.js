import '../styles/globals.css';
import Layout from '../components/layout/layout';
import Head from 'next/head';

const MyApp = ({ Component, pageProps }) => {
  return (
    <Layout>
      <Head>
        <title>NextJS Events</title>
        <meta name="description" content="Find a lot of events" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
};

export default MyApp;
