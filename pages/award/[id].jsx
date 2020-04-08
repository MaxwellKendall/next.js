import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import axios from 'axios';

import Layout from '../../components/MyLayout';
import { setAward } from '../../redux/actions/award/awardActions';

import "../../styles/_award.scss";

export async function getServerSideProps({
  params: { id },
  req,
  res,
  query
}) {
  console.log("id", id);
  try {
    const { data } = await axios.get('https://api.usaspending.gov/api/v2/awards/CONT_AWD_0746_9700_SPE2DH16D0009_9700')
    return { props: { data } };
  }
  catch (e) {
    console.log("error", e)
    return { props: { data: { error: e }}};
  }
};

class Post extends React.Component {
  componentDidMount() {
    this.props.setAward(this.props.data);
  }
  render() {
    const { router, award } = this.props;
    return (
      <Layout>
        <h1 className="header">{router.query.id}</h1>
        <p>{`Award Id Stuff: ${award.overview.generated_unique_award_id}`}</p>
      </Layout>
    );
  }
};

const mapStateToProps = (state) => ({
  ...state
});

const mapDispatchToProps = (dispatch) => ({
  setAward: (award) => dispatch(setAward(award))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withRouter(Post)
);
