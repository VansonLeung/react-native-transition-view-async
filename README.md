# react-native-transition-view-async
This transition view allows preparation of components before rendering animation. Suitable for showing animations for asynchronous presentation.

[![npm version](https://badge.fury.io/js/react-native-transition-view-async.svg)](http://badge.fury.io/js/react-native)
[![NPM](https://nodei.co/npm/react-native-transition-view-async.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/react-native-transition-view-async/)


## Prerequisites
React Native 0.25 or higher

## Installation
```shell
npm i react-native-transition-view-async --save
```

## Usage

### 1. Bootstrap Transition View
```js
import {
  TransitionView,
  FadeTransitionChildView,
  ShowcaseTransitionChildView,
  SlowEnlargeTransitionChildView,
} from 'react-native-transition-view-async'

[...]

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
```

### 2. Enqueue View & Consume View

"Enqueue" pushes new component into queue. Transition does not take place yet.

```js
this.transitionView.enqueue(<View ... />, {OPTIONS})
```

Running "consume()" function triggers the following transitions:
a. Fading out of current component
b. Fading in of the next component in queue

```js
this.transitionView.consume()
```


#### Options Table
| Key                         | Type                  | Value(s)                                                                                                                                            | Mandatory?                        |   |
|-----------------------------|-----------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------|---|
| SpecificTransitionChildView | React Component Class | Any inheritance of TransitionChildView:   TransitionChildView, FadeTransitionChildView, ShowcaseTransitionChildView, SlowEnlargeTransitionChildView | No (Default: TransitionChildView) |   |
|                             |                       |                                                                                                                                                     |                                   |   |
|                             |                       |                                                                                                                                                     |                                   |   |




### 3. Use case: Screensaver

<img src="https://media.giphy.com/media/nbPiguFpasY1Fdv9uk/giphy.gif" alt="Demo" />


```js
const SpecificTransitionChildView = SlowEnlargeTransitionChildView;
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
});

```


### 4. Custom Transitions

All the custom transition components should inherit ```<TransitionChildView>```.
To understand how the transition animations are made, refer to our transition examples:

- [FadeTransitionChildView.js](https://github.com/VansonLeung/react-native-transition-view-async/blob/master/lib/FadeTransitionChildView.js)
- [ShowcaseTransitionChildView.js](https://github.com/VansonLeung/react-native-transition-view-async/blob/master/lib/ShowcaseTransitionChildView.js)
- [SlowEnlargeTransitionChildView.js](https://github.com/VansonLeung/react-native-transition-view-async/blob/master/lib/SlowEnlargeTransitionChildView.js)




