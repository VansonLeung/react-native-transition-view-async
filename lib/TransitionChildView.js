'use strict';

import React, { Component } from 'react';
import {
    View,
    Animated,
    Easing,
} from 'react-native';




export default class TransitionChildView extends React.Component
{
  constructor(props)
  {
    super(props);
    this.initialize(props);
  }


  initialize(props)
  {
    this.state = {
      left: new Animated.Value(0),
      right: new Animated.Value(0),
      top: new Animated.Value(0),
      bottom: new Animated.Value(0),
      opacity: new Animated.Value(0),
      scale: new Animated.Value(1),
      spinValue: new Animated.Value(0),
    };
  }


  componentDidMount() {
    this.refreshParameters(this.props, false);
  }


  componentWillReceiveProps(nextProps)
  {
    this.refreshParameters(nextProps, true);
  }



  refreshParameters(props, is_edit)
  {
    if (is_edit) {
      if (props.is_showing) {
        if (!this.props.is_showing) {
          // show

          Animated.parallel([
            Animated.timing(this.state.opacity, {
              toValue: 1,
              duration: 1000,
            }),
          ]).start((params) => {
            var {finished} = params;
            if (finished) {
              this.onShown();
            }
          });
        }
      }
      if (props.is_killing) {
        if (!this.props.is_killing) {
          // kill

          Animated.parallel([
            Animated.timing(this.state.opacity, {
              toValue: 0,
              duration: 1000,
            }),
          ]).start((params) => {
            var {finished} = params;
            if (finished) {
              this.onKilled();
            }
          });
        }
      }
    }
  }



  onShown()
  {
    this.props.onShown ? this.props.onShown(this, this.props.ID) : {};
  }

  onKilled()
  {
    this.props.onKilled ? this.props.onKilled(this, this.props.ID) : {};
  }



  render() {

    const spin = this.state.spinValue.interpolate({
      inputRange: [-1, 1],
      outputRange: ['-360deg', '360deg']
    })

    return (
        <Animated.View style={{
    position: 'absolute',
    left: this.state.left,
    right: this.state.right,
    top: this.state.top,
    bottom: this.state.bottom,
    opacity: this.state.opacity,
    transform: [
          {scale: this.state.scale},
          {rotate: spin},
          {perspective: 1000},
    ]
    }}>
          {this.props.children}
        </Animated.View>
    )
  }
}


