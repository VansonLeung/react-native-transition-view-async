'use strict';


import {
    View,
    Image,
} from 'react-native';

// Import different kinds of transitions here / create & roll out your own transitions
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
    // in this example here, it randomly picks a transition type from the array below when changing every time
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

		// This is where the magic of seamless transition relies...
		// When a network image has been loaded into memory completely, consume / start the transition here
                this.transitionView.consume();

		// Recursively schedule another "onChange()" after 3 secs
                setTimeout(() => {
                  this.onChange();
                }, 3000);
              }}
          />
        </View>
    ), {
      // Specify transition here
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
