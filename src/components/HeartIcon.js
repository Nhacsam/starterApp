// @flow
import React, { Component } from 'react';
import { View, Animated, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const AnimatedIcon = Animated.createAnimatedComponent(Icon);

type Props = {
  style?: any,
};

type State = {
  value: Animated.Value,
  full: boolean,
};

class HeartIcon extends Component<void, Props, State> {
  state: State;

  constructor() {
    super();
    this.state = {
      value: new Animated.Value(0),
      full: false,
    };
  }

  toggle() {
    this.state.value.setValue(0);
    Animated.timing(this.state.value, {
      toValue: 1,
      duration: 500,
    }).start();

    this.setState({ full: !this.state.full });
  }

  render() {
    return (
      <TouchableWithoutFeedback underlayColor="transparent" onPress={() => this.toggle()}>
        <View style={{ padding: 10 }}>
          <AnimatedIcon
            name="heart"
            style={[
              {
                fontSize: 30,
                color: this.state.full ? '#dddd00' : '#aaaaaa',
                transform: [
                  {
                    scale: this.state.value.interpolate({
                      inputRange: [0, 0.6, 1],
                      outputRange: [1, 1.2, 1],
                    }),
                  },
                ],
              },
              this.props.style,
            ]}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default HeartIcon;
