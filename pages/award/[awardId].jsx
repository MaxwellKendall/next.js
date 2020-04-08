import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import axios from 'axios';

import { setAward } from 'Redux/actions/award/awardActions';
import AwardContainer from 'Containers/award/AwardContainer';
import "styles/_award.scss";

export async function getServerSideProps({
  params: { awardId },
  req,
  res,
  query
}) {
  try {
    const { data } = await axios.get(`https://api.usaspending.gov/api/v2/awards/${awardId}`)
    return { props: { data } };
  }
  catch (e) {
    console.log("error", e)
    return { props: { data: { error: e }}};
  }
};

class AwardPage extends React.Component {
  render() {
    return (
      <AwardContainer {...this.props} />
    );
  }
};

const mapStateToProps = (state) => ({
  award: state.award,
  isSubAwardIdClicked: false,
  params: PropTypes.object,
  isDownloadPending: false,
  isSubAwardIdClicked: false
});

const mapDispatchToProps = (dispatch) => ({
  setAward: (award) => dispatch(setAward(award)),
  subAwardIdClicked: () => {},
  resetAward: () => {},
  handleDownloadRequest: () => {},
  setDownloadCollapsed: () => {},
  setDownloadPending: () => {},
  setDownloadExpectedFile: () => {},
  setDownloadExpectedUrl: () => {}
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withRouter(AwardPage)
);
