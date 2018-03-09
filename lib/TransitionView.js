'use strict';

import React, { Component } from 'react';
import {
    View,
} from 'react-native';


export default class TransitionView extends React.Component
{
  constructor(props)
  {
    super(props)
    this.state = {
      queue: [],
    };
  }

  enqueue(view, options, callback)
  {
    var queue = this.state.queue;

    var ID = randomString(16, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');

    var q = {
      ID: ID,
      is_showing: false,
      is_shown: false,
      is_killing: false,
      view: view,
    }

    if (options.SpecificTransitionChildView) {
      q.SpecificTransitionChildView = options.SpecificTransitionChildView;
    }

    queue.push(q);

    this.setState({
      queue: queue,
    }, callback || (() => {}) )
  }

  consume()
  {
    this.kill();
    this.show();
  }


  kill()
  {
    var need_refresh = false;

    for (var k in this.state.queue) {
      var item = this.state.queue[k];
      if (item.is_showing
          && !item.is_killing) {
        item.is_killing = true;
        need_refresh = true;
      }
    }

    if (need_refresh) {
      this.setState({
        queue: this.state.queue,
      })
    }
  }


  show()
  {
    var need_refresh = false;

    for (var k in this.state.queue) {
      var item = this.state.queue[k];
      if (!item.is_showing) {
        item.is_showing = true;
        need_refresh = true;
      }
    }

    if (need_refresh) {
      this.setState({
        queue: this.state.queue,
      })
    }
  }




  onShown(ID)
  {
    var need_refresh = false;
    for (var k in this.state.queue) {
      var item = this.state.queue[k];
      if (item.ID === ID) {
        // destroy
        item.is_shown = true;
        need_refresh = true;
        break;
      }
    }

    if (need_refresh) {
      this.setState({
        queue: this.state.queue,
      })
    }
  }

  onKilled(ID)
  {
    var need_refresh = false;
    for (var k in this.state.queue) {
      var item = this.state.queue[k];
      if (item.ID === ID) {
        // destroy
        this.state.queue.splice(k, 1);
        need_refresh = true;
        break;
      }
    }

    if (need_refresh) {
      this.setState({
        queue: this.state.queue,
      })
    }
  }



  render() {
    return (
        <View {...this.props}>
          {
            this.state.queue.map((item) => {
              var {
                  ID,
                  is_showing,
                  is_shown,
                  is_killing,
                  view,
                  SpecificTransitionChildView,
                  } = item;

              SpecificTransitionChildView = SpecificTransitionChildView || TransitionChildView;

              return (
                  <View
                      key={ID}
                      style={{
                      position: 'absolute',
                      left: 0,
                      right: 0,
                      top: 0,
                      bottom: 0,
                  }}>
                    <SpecificTransitionChildView
                        ID={ID}
                        is_showing={is_showing}
                        is_shown={is_shown}
                        is_killing={is_killing}
                        onShown={(child, ID) => {this.onShown(ID);}}
                        onKilled={(child, ID) => {this.onKilled(ID);}}>
                      {view}
                    </SpecificTransitionChildView>
                  </View>
              )
            })
          }
        </View>
    )
  }
}


