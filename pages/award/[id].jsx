import { useRouter } from 'next/router';
import axios from 'axios';

import Layout from '../../comps/MyLayout';

export async function getServerSideProps() {
  const { data } = await axios.get('https://api.usaspending.gov/api/v2/awards/CONT_AWD_0746_9700_SPE2DH16D0009_9700')
  return { props: { data } };
};

const Post = ({ data }) => {
  const router = useRouter();
  console.log("data", data);
  return (
    <Layout>
      <h1>{router.query.id}</h1>
      <p>{`Server Side Rendered Page for ${data.generated_unique_award_id}`}.</p>
    </Layout>
  );
};

export default Post;
