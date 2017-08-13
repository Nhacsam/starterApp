// @flow
import { connect } from 'react-redux';
import TvShowDetail from './TvShowDetail';

import { tvShowSelector } from 'modules/TvShowDetail';

const mapStateToProps = state => ({
  tvShow: tvShowSelector(state),
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(TvShowDetail);
