import { takeLatest } from 'redux-saga/effects';

import * as reducersExport from '../reducers';
import * as sagasExport from '../sagas';
import createStore from '../store';

describe('stores', () => {
  it('should use the imported reducers', () => {
    const action = { type: '@@INIT' };
    reducersExport.default = jest.fn();
    createStore(store => store.dispatch(action));
    expect(reducersExport.default).toHaveBeenCalledWith(undefined, action);
    reducersExport.default.mockRestore();
  });

  it('should use the imported sagas', () => {
    const action = { type: 'LAUNCH_SAGA' };
    const saga = jest.fn();

    sagasExport.default = jest.fn(function*() {
      yield takeLatest('LAUNCH_SAGA', saga);
    });
    createStore(store => store.dispatch(action));
    expect(reducersExport.default).toHaveBeenCalled();
    expect(saga).toHaveBeenCalledWith(action);
    reducersExport.default.mockRestore();
  });
});
