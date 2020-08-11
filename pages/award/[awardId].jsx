import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import axios from 'axios';

import { setAward } from 'redux/actions/award/awardActions';
// import AwardContainer from 'containers/award/Test';
import AwardContainer from 'containers/award/AwardContainer';

require("../../styles/_award.scss");

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
    const { awardId } = this.props.router.query;
    return (
      <AwardContainer {...this.props} params={{ awardId}} />
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