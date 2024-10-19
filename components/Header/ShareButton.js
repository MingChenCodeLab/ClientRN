import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';

const ShareButton = ({ onPress, style, iconStyle }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, style]}>
      <FontAwesome name="share" style={[styles.icon, iconStyle]} />
    </TouchableOpacity>
  );
};

ShareButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  style: PropTypes.object,
  iconStyle: PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: 'white',
    backgroundColor: 'white',
  },
  icon: {
    fontSize: 20,
    color: 'gray',
  },
});

export default ShareButton;
