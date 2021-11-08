import React, { useEffect, useRef } from 'react';
import { View, Animated } from 'react-native';
import { IconTextButton } from '../components';
import {  COLORS, SIZES, icons } from '../constants';
import { useSelector } from 'react-redux';

const MainLayout = ({ children }) => {
  const isModalVisible = useSelector(state => state.tabReducer.isTradeModalVisible);
  const modalAnimatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if(isModalVisible) {
      Animated.timing(modalAnimatedValue, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false
      }).start();
    } else {
      Animated.timing(modalAnimatedValue, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false
      }).start();
    }
  }, [isModalVisible]);

  const modalY = modalAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [SIZES.height, SIZES.height - 280],
  });

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      {children}
      {/* Dim background */}
      {isModalVisible &&
        <Animated.View 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: COLORS.transparentBlack
          }}
          opacity={modalAnimatedValue}
        />
      }
      {/* Modal */}
      <Animated.View
        style={{
          position: 'absolute',
          left: 0,
          top: modalY,
          width: '100%',
          padding: SIZES.padding,
          backgroundColor: COLORS.primary
        }}
      >
        <IconTextButton 
          label="Transfer"
          icon={icons.send}
          onPress={() => console.log('transfer')}
        />
        <IconTextButton 
          label="Withdraw"
          icon={icons.withdraw}
          containerStyle={{
            marginTop: SIZES.base
          }}
          onPress={() => console.log('withdraw')}
        />
      </Animated.View>
    </View>
  )
}

export default MainLayout;