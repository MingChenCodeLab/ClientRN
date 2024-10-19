import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const DescriptionToggle = ({ description, maxLength = 100 }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handlePress = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.description}>
        {isExpanded
          ? description
          : `${description.slice(0, maxLength)}${description.length > maxLength ? '...' : ''}`}
      </Text>
      {description.length > maxLength && (
        <TouchableOpacity onPress={handlePress} style={styles.button}>
          <Text style={styles.buttonText}>{isExpanded ? 'Thu gọn' : 'Xem thêm'}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    paddingHorizontal: 15,
  },
  description: {
    fontSize: 16,
    color: '#707B81',
    lineHeight: 22,
    marginBottom: 10,
    

  },
  button: {
    marginTop: 10,
    backgroundColor: '#F6F6F6',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    width: '100%',
    alignSelf: 'stretch',
    borderTopWidth: 2, 
    borderBlockColor: "#D2D2D2"
  },
  buttonText: {
    color: '#8F9495',
    fontSize: 14,
    textAlign: 'center',
  },
});

export default DescriptionToggle;
