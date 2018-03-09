# react-native-transition-view-async
This transition view allows preparation of components before rendering animation. Suitable for showing animations for asynchronous presentation.

[![npm version](https://badge.fury.io/js/react-native-transition-view-async.svg)](http://badge.fury.io/js/react-native)
[![NPM](https://nodei.co/npm/react-native-transition-view-async.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/react-native-transition-view-async/)

## Demo
[![Demo Showcase](https://img.youtube.com/vi/lvyJX2-l8pM/0.jpg)](https://www.youtube.com/watch?v=lvyJX2-l8pM)
##
<img src="http://i.imgur.com/gD7kFvi.gif" alt="Demo Showcase" width=200 height=300 style="width: 200px; height: 300px; max-width: auto;"/>


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


