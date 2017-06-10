// @flow
import { connect } from 'react-redux';
import Home, { type Props } from './Home';
import type { StateType } from '../../modules/reducers';

import {
  tvShowsSelector,
  fetchingSelector,
  refreshingSelector,
  refresh,
  search,
} from 'modules/TvShowMainList';
import { showDetail } from 'modules/TvShowDetail';

const mapStateToProps = (state: StateType): $Shape<Props> => ({
  tvShows: tvShowsSelector(state),
  refreshing: refreshingSelector(state),
  fetching: fetchingSelector(state),
});

const mapDispatchToProps: $Shape<Props> = {
  refresh,
  onSelect: showDetail,
  search,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
