'use strict';


import {
    View,
    Image,
} from 'react-native';

import {
  TransitionView,
  FadeTransitionChildView,
  ShowcaseTransitionChildView,
  SlowEnlargeTransitionChildView,
} from './index'




export default class extends React.Component {

  constructor(props)
  {
    super(props);
  }

  componentDidMount()
  {
    setTimeout(() => {
      this.onChange();
    }, 3000);
  }

  onChange() {
    const SpecificTransitionChildViews = [
	  FadeTransitionChildView,
      ShowcaseTransitionChildView,
      SlowEnlargeTransitionChildView,
      SlowEnlargeTransitionChildView,
      SlowEnlargeTransitionChildView,
    ];
    const rand = Math.floor(Math.random() * SpecificTransitionChildViews.length);
    const SpecificTransitionChildView = SpecificTransitionChildViews[rand];

    this.transitionView.enqueue((
        <View style={{flex: 1, flexDirection: 'row'}}>
          <Image style={{flex: 1, alignSelf: 'stretch', resizeMode: 'stretch'}}
              source={{uri: `https://picsum.photos/2000/2000&t=${new Date().getTime()}`}}
              onLoad={() => {
                this.transitionView.consume();
                setTimeout(() => {
                  this.onChange();
                }, 3000);
              }}
          />
        </View>
    ), {
      SpecificTransitionChildView: SpecificTransitionChildView,
    })
  }

  render()
  {
    return (
        <View style={{flexDirection: 'row', flex: 1}}>
          <TransitionView
              ref={(v) => {this.transitionView = v;}}
              style={{flex: 1}}>
          </TransitionView>
        </View>
    )
  }

}
