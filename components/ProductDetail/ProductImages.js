import React, { useMemo, useRef, useState, useEffect } from 'react';
import { View, FlatList, Animated, StyleSheet, Dimensions, ActivityIndicator, Image, TouchableOpacity } from 'react-native';

const { width } = Dimensions.get('window');

const ImageItem = React.memo(({ uri, loadingIndex, index, rotateAnimation, setLoadingIndex }) => (
  <View style={styles.imageContainer}>
    {loadingIndex === index && (
      <ActivityIndicator size="large" color="#fff" style={styles.loadingIndicator} />
    )}
    <Animated.Image
      source={{ uri }}
      style={[styles.image, { transform: [{ rotateY: rotateAnimation }] }]}
      onLoad={() => setLoadingIndex(null)}
      onLoadStart={() => setLoadingIndex(index)}
    />
  </View>
), (prevProps, nextProps) => prevProps.uri === nextProps.uri && prevProps.loadingIndex === nextProps.loadingIndex);

const ProductImages = ({ images }) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const rotate = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef(null);
  const [loadingIndex, setLoadingIndex] = useState(null);
  const [activeImage, setActiveImage] = useState(images[0]);

  const rotateAnimation = rotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  useEffect(() => {
    setActiveImage(images[0]);
  }, [images]);

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    {
      useNativeDriver: false,
      listener: (event) => {
        const offsetX = event.nativeEvent.contentOffset.x;
        const index = Math.round(offsetX / width);
        setActiveImage(images[index]);
  
        // Update the rotation value more smoothly
        rotate.setValue(offsetX % width / width);
      },
    }
  );
  

  const renderProduct = useMemo(() => ({ item, index }) => (
    <ImageItem
      uri={item}
      loadingIndex={loadingIndex}
      index={index}
      rotateAnimation={rotateAnimation}
      setLoadingIndex={setLoadingIndex}
    />
  ), [loadingIndex, rotateAnimation]);

  const dotInterpolation = Animated.divide(scrollX, width);

  return (
    <View style={styles.container}>
      <FlatList
        data={images}
        horizontal
        renderItem={renderProduct}
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        snapToInterval={width}
        bounces={false}
        onScroll={handleScroll}
        keyExtractor={(item, index) => index.toString()}
        ref={flatListRef}
      />
      <View style={styles.dotContainer}>
        {images.map((_, index) => {
          const opacity = dotInterpolation.interpolate({
            inputRange: [index - 0.5, index, index + 0.5],
            outputRange: [0.5, 1, 0.5],
            extrapolate: 'clamp',
          });
          return <Animated.View key={index} style={[styles.dot, { opacity }]} />;
        })}
      </View>
      <View style={styles.thumbnailContainer}>
        {images.map((image, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              flatListRef.current.scrollToIndex({ animated: true, index });
              setActiveImage(image);
            }}
            style={[
              styles.thumbnailWrapper,
              { borderColor: activeImage === image ? '#6AD9FA' : 'transparent' },
            ]}
          >
            <Image source={{ uri: image || activeImage }} style={styles.thumbnail} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  imageContainer: {
    width,
    height: 240,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 10,
    backfaceVisibility: 'hidden',
  },
  loadingIndicator: {
    position: 'absolute',
  },
  dotContainer: {
    position: 'absolute',
    top: "74%",
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  dot: {
    width: 20,
    height: 5,
    backgroundColor: '#6AD9FA',
    marginHorizontal: 4,
    borderRadius: 100,
  },
  thumbnailContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  thumbnailWrapper: {
    marginHorizontal: 5,
    borderRadius: 5,
    padding: 2,
    borderWidth: 1,
  },
  thumbnail: {
    width: 35,
    height: 35,
    borderRadius: 5,
  },
});

export default ProductImages;
