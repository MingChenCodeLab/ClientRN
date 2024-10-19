import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import PropTypes from 'prop-types';

const ActionButton = ({ onPress, title, style, textStyle }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, style]}>
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

ActionButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  style: PropTypes.object,
  textStyle: PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    backgroundColor: '#007bff',
  },
  text: {
    color: 'white',
    fontSize: 16,
  },
});

export default ActionButton;
