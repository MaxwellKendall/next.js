import React from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';

const AwardLink = props => (
  <li>
    <Link href="/award/[awardId]" as={`/award/${props.id}`}>
      <a>{props.id}</a>
    </Link>
  </li>
);

export default function Home() {
  return (
    <Layout>
      <h1>USA Spending</h1>
      <ul>
        <AwardLink id="CONT_AWD_0746_9700_SPE2DH16D0009_9700" />
      </ul>
    </Layout>
  );
}