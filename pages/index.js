import Layout from '../components/MyLayout';
import Link from 'next/link';

const AwardLink = props => (
  <li>
    <Link href="/award/[id]" as={`/award/${props.id}`}>
      <a>{props.id}</a>
    </Link>
  </li>
);

export default function Blog() {
  return (
    <Layout>
      <h1>USA Spending</h1>
      <ul>
        <AwardLink id="23423" />
        <AwardLink id="4444" />
        <AwardLink id="3333" />
      </ul>
    </Layout>
  );
}