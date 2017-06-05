jest.mock('Linking', () => ({
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  openURL: jest.genMockFn().mockReturnValue(Promise.resolve()),
  canOpenURL: jest.genMockFn().mockReturnValue(Promise.resolve()),
  getInitialURL: jest.genMockFn().mockReturnValue(Promise.resolve()),
}));

jest.mock('NetInfo', () => ({
  isConnected: {
    addEventListener: jest.genMockFn(),
    fetch: jest.genMockFn().mockReturnValue(Promise.resolve()),
  },
}));
