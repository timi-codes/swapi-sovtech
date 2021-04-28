import { useState } from 'react';
import { useRouter } from 'next/router'
import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getSortedPostsData } from '../lib/posts'
import Link from 'next/link'
import People from 'components/people';
import Date from '../components/date'

export default function Home({ allPostsData }) {
  const { query } = useRouter();
  const page = parseInt(query.page);

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <People page={page || 1} />
      </section>
    </Layout>
  )
}
