// @flow
import { connect } from 'react-redux';
import TvShowDetail from './TvShowDetail';

import { tvShowSelector, fetchingSelector } from 'modules/TvShowDetail';

const mapStateToProps = state => ({
  tvShow: tvShowSelector(state),
  fetching: fetchingSelector(state),
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(TvShowDetail);
