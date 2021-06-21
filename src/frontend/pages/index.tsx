import { useRouter } from 'next/router'
import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import People from 'components/people';

export default function Home() {
  const { query } = useRouter();
  const page: number = parseInt(query?.page);

  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <People page={page || 1} />
      </section>
    </Layout>
  )
}
