import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import PropTypes from 'prop-types';

const BackButton = ({ onPress, style, iconStyle }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, style]}>
      <Entypo name="chevron-left" style={[styles.icon, iconStyle]} />
    </TouchableOpacity>
  );
};

BackButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  style: PropTypes.object,
  iconStyle: PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 30,
    left: 10,
    zIndex: 1,
  },
  icon: {
    fontSize: 18,
    color: '#000000',
    padding: 12,
    backgroundColor: '#F7F7F9',
    borderRadius: 10,
  },
});

export default BackButton;
