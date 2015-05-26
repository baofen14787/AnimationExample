/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  ScrollView,
  AlertIOS,
  TouchableHighlight,
  Text,
  View,
} = React;

var TimerMixin = require('react-timer-mixin');
var AnimationExperimental = require('AnimationExperimental');


var Button = React.createClass({
    render() {
        return (
            <TouchableHighlight
                onPress={this.props.onPress}
                style={styles.button}
                underlayColor="#eeeeee">
                <Text style={{paddingTop : 5,paddingLeft : 5,paddingBottom : 5,paddingRight : 5,}}>
                    {this.props.children}
                </Text>
            </TouchableHighlight>
        );
    },
});

var AnimationExample = React.createClass({

  mixins: [TimerMixin],

  animationPosition(){
    AnimationExperimental.startAnimation({
      node: this.refs['position'],
      duration: 3000,
      easing: 'easeInQuad',
      property: 'position',
      toValue: {x: 300, y:500},
    }, (finished) => this.finishAnimation(finished));
  },

  finishAnimation(finished){
    console.log(finished)
    // 
    this.setTimeout(function(){
      AlertIOS.alert('done!');
    },3000)
    
  },

  animationOpacity(){
    AnimationExperimental.startAnimation({
      node: this.refs['opacity'],
      duration: 300,
      easing: 'easeInOutCubic',
      property: 'opacity',
      // delay : 10,
      toValue: 0.2,
    });
  },

  animationPositionX(){
    //github : https://github.com/facebook/react-native/issues/796
    var easeInQuad = function(t: number): number {
      return t * t;
    };
    var ease_duration = 300; //duration for animation
    var infinite_duration = 100000;
    AnimationExperimental.startAnimation({
      node: this.refs['positionX'],
      duration: infinite_duration,
      easing: (t) => easeInQuad(Math.min(1, t*infinite_duration/ease_duration)),
      property: 'positionX',
      toValue: 200,
    });
  },

  animationPositionY(){
    AnimationExperimental.startAnimation({
      node: this.refs['positionY'],
      duration: 1000,
      easing: 'easeInQuad',
      property: 'positionY',
      toValue: 200,
    });
  },


  animationScaleXY(){
    var easeInQuad = function(t: number): number {
      return t * t;
    };
    var ease_duration = 300; //duration for animation
    var infinite_duration = 1000;
    AnimationExperimental.startAnimation({
      node: this.refs['scaleXY'],      
      duration: infinite_duration,
      //apply function
      easing: (t) => easeInQuad(Math.min(1, t*infinite_duration/ease_duration)),
      property: 'scaleXY',
      toValue: [2,2],
    }, () => this.setState({scale: [2,2]}));
  },

  animationRotation(){
    AnimationExperimental.startAnimation({
      node: this.refs['rotation'],      
      duration: 1000,
      easing: 'easeInQuad',
      property: 'rotation',
      toValue: 2,
    });
  },

  getInitialState() {
    return {
      scale: [1, 1]
    }
  },

  componentDidMount(){
    console.log(this)
  },

  render() {
    return (
      <ScrollView ref="this" >
        <View style={styles.container}>
          <View style={styles.items}>
            <Button onPress={ () => this.animationOpacity() }>
            开始动画(opacity)
            </Button>
            <View ref="opacity" style={styles.box}></View>
          </View>

          <View style={styles.items}>
            <Button onPress={ () => this.animationPosition() }>
            开始动画(position)
            </Button>
            <View ref="position" style={[styles.box,{backgroundColor :'#daa536'}]}></View>
          </View>



          <View style={styles.items}>
            <Button onPress={ () => this.animationPositionX() }>
            开始动画(positionX)
            </Button>
            <View ref="positionX" style={[styles.box,{backgroundColor :'#e7846f'}]}></View>
          </View>

          <View style={styles.items}>
            <Button onPress={ () => this.animationPositionY() }>
            开始动画(positionY)
            </Button>
            <View ref="positionY" style={[styles.box,{backgroundColor :'#e61f44'}]}></View>
          </View>

          <View style={styles.items}>
            <Button onPress={ () => this.animationRotation() }>
            开始动画(rotation)
            </Button>
            <View ref="rotation" style={[styles.box,{backgroundColor :'#f06e01'}]}></View>
          </View>

          <View style={styles.items}>
            <Button onPress={ () => this.animationScaleXY() }>
            开始动画(scaleXY)
            </Button>
            <View ref="scaleXY" style={[styles.box,{backgroundColor :'#51a3a3',transform:[{scaleX: this.state.scale[0]}, {scaleY: this.state.scale[1]}]}]}></View>
          </View>
        </View>
      </ScrollView>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    paddingTop : 30,
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#F5FCFF',
  },
  items : {
    height : 150
  },
  box : {
    position : "absolute",width : 100, height : 100, backgroundColor : '#0485A9',marginTop:10
  }
});

AppRegistry.registerComponent('AnimationExample', () => AnimationExample);
