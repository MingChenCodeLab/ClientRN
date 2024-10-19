import React from 'react';
import { StatusBar, Platform, StyleSheet, View } from 'react-native';

const CustomStatusBar = ({
  barStyle = 'dark-content',
  backgroundColor = 'transparent',
  translucent = true,
  paddingTop = false,
  hidden = false,
  showHideTransition = 'fade',
  animated = true,
  backgroundColorAndroid = 'transparent',
  ...props
}) => {
  return (
    <View style={[styles.container, paddingTop ? { paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight } : {}]}>
      <StatusBar
        animated={animated}
        backgroundColor={Platform.OS === 'android' ? backgroundColorAndroid : backgroundColor}
        barStyle={barStyle}
        translucent={translucent}
        hidden={hidden}
        showHideTransition={showHideTransition}
        {...props}

      />
    </View>
  );
};

const styles = StyleSheet.create({

});

export default CustomStatusBar;
