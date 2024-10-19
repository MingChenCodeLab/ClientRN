import React from 'react';
import { View, Image, StyleSheet, Dimensions, SafeAreaView } from 'react-native';
import Swiper from 'react-native-swiper';

const { width } = Dimensions.get('window');

const images = [
 "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/7307e562514417.5a931ab904cad.gif",
  "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/hk7hv22ezuxx0qvadlt9/air-jordan-legacy-312-low-shoes-6Vd4Xl.png",
  "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/6c220fb9-a08c-437a-ae82-9b59bc700394/jordan-one-take-4-pf-shoes-v5trdl.png",
  "https://iili.io/JuGdGOQ.png",
  "https://giaysneaker.store/media/wysiwyg/slidershow/home-12/banner_NIKE.jpg",
  "https://chiinstore.com/media/news/9_banner_nike.jpg",
  "https://i.pinimg.com/originals/84/e0/54/84e0549407ac340872460e040456b59d.gif",
  "https://cdn.dribbble.com/users/2198140/screenshots/4377526/nike_shoe.gif"
];

const Banner = () => {
  return (
    <SafeAreaView style={styles.container}>
        <Swiper
      style={styles.wrapper}
      showsButtons={false}
      autoplay={true}
      autoplayTimeout={3} // 3 seconds
      dot={<View style={styles.dot} />}
      activeDot={<View style={styles.activeDot} />}
    >
      {images.map((image, index) => (
        <View key={index} style={styles.slide}>
          <Image source={{ uri: image }} style={styles.image} />
        </View>
      ))}
    </Swiper>
    </SafeAreaView>
  
  );
};

const styles = StyleSheet.create({
  container: {
    height: 180,
    
  },
  wrapper: {
   margin:"10px"
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  image: {
    width: '100%',
    height: '100%', 
    resizeMode: 'cover',
    borderRadius: 15,
  },
  dot: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    width: 10,
    height: 10,
    borderRadius: 4,
    margin: 3,
  },
  activeDot: {
    backgroundColor: '#24A0FF',
    width: 15,
    height: 10,
    borderRadius: 5,
    margin: 3,
  },
});

export default Banner;
