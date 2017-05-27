// @flow
import { connect } from 'react-redux';
import Home from './Home';

import {
  tvShowsSelector,
  fetchingSelector,
  refreshingSelector,
  refresh,
} from 'modules/TvShowMainList';

const mapStateToProps = state => ({
  tvShows: tvShowsSelector(state),
  refreshing: refreshingSelector(state),
  fetching: fetchingSelector(state),
});

const mapDispatchToProps = {
  refresh,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
