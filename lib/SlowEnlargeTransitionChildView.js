'use strict';

import TransitionChildView from './TransitionChildView';
import React, { Component } from 'react';
import {
    View,
    Animated,
    Easing,
} from 'react-native';




export default class SlowEnlargeTransitionChildView extends TransitionChildView
{
  constructor(props)
  {
    super(props);
    this.initialize(props);
  }


  initialize(props)
  {
    var offsetX = (Math.random() * 200) - 100;
    var offsetY = (Math.random() * 200) - 100;
    this.state = {
      left: new Animated.Value(offsetX),
      right: new Animated.Value(-offsetX),
      top: new Animated.Value(offsetY),
      bottom: new Animated.Value(-offsetY),
      opacity: new Animated.Value(0),
      scale: new Animated.Value(0.75),
      spinValue: new Animated.Value((Math.random() * 0.05) - 0.025),
    };
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
            Animated.timing(this.state.left, {
              toValue: 0,
              duration: 3000,
            }),
            Animated.timing(this.state.right, {
              toValue: 0,
              duration: 3000,
            }),
            Animated.timing(this.state.top, {
              toValue: 0,
              duration: 3000,
            }),
            Animated.timing(this.state.bottom, {
              toValue: 0,
              duration: 3000,
            }),
            Animated.timing(this.state.scale, {
              toValue: 1,
              duration: 6000,
              easing: Easing.inOut(Easing.quad),
            }),
            Animated.timing(this.state.spinValue, {
              toValue: 0,
              duration: 6000,
              easing: Easing.inOut(Easing.quad),
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
}


