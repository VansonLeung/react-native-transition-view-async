'use strict';

import TransitionChildView from './TransitionChildView'
import React, { Component } from 'react';
import {
    View,
    Animated,
    Easing,
} from 'react-native';




export default class ShowcaseTransitionChildView extends TransitionChildView
{
  constructor(props)
  {
    super(props);
    this.initialize(props);
  }


  initialize(props)
  {
    this.state = {
      left: new Animated.Value(-200),
      right: new Animated.Value(0),
      top: new Animated.Value(0),
      bottom: new Animated.Value(0),
      opacity: new Animated.Value(0),
      scale: new Animated.Value(0.5),
      spinValue: new Animated.Value((Math.random() * 2) - 1),
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
              duration: 1000,
            }),
            Animated.timing(this.state.scale, {
              toValue: 1,
              duration: 2500,
              easing: Easing.elastic(2),
            }),
            Animated.timing(this.state.spinValue, {
              toValue: 0,
              duration: 3000,
              easing: Easing.elastic(2),
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
            Animated.timing(this.state.left, {
              toValue: 300,
              duration: 1000,
            }),
            Animated.timing(this.state.scale, {
              toValue: 0,
              duration: 2500,
              easing: Easing.elastic(2),
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






