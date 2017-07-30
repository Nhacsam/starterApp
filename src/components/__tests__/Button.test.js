import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import Button from '../Button';
import Components from 'components';

describe('Button', () => {
  it('should render the button', () => {
    const tree = renderer.create(<Button text="Hello" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('should export a Button in components', () => {
    expect(Components.Button).toBe(Button);
  });
});
