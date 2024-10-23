import { IBanner } from '@/store/reducers/auth';
import { colors } from '@/theme';
import React, { useState, useEffect } from 'react';
import { Image, Text, StyleSheet, Dimensions, ImageBackground, View } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

interface BannersProps {
  banners: IBanner[];
}

const Banners: React.FC<BannersProps> = ({ banners }) => {
  const [index, setIndex] = useState(0);
  const animation = useSharedValue(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prevIndex => (prevIndex + 1) % banners.length);
      animation.value = 0;
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    animation.value = withTiming(1, { duration: 600 });
  }, [index]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: animation.value,
    };
  });

  return (
    <Animated.View style={[styles.banner, animatedStyle]}>
      {banners.length > 0 && (
        <ImageBackground
          source={{ uri: `https://back5.maylandlabs.com/banner/${banners[index].url}` }}
          style={styles.image}
          imageStyle={{ borderRadius: 10 }}
          resizeMode="cover">
          <View style={styles.containerLine}>
            <View style={index === 0 ? styles.lineActive : styles.lineInactive} />
            <View style={index === 1 ? styles.lineActive : styles.lineInactive} />
            <View style={index === 2 ? styles.lineActive : styles.lineInactive} />
          </View>
        </ImageBackground>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: width - 32,
    height: 212,
    resizeMode: 'cover',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  banner: {
    width: width - 32,
    height: 212,
    marginLeft: 16,
  },
  text: {
    fontSize: 18,
    color: '#333',
  },
  containerLine: {
    gap: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  lineActive: {
    width: 59,
    height: 7,
    borderRadius: 10,
    backgroundColor: colors.blue2,
  },
  lineInactive: {
    width: 10,
    height: 7,
    opacity: 0.7,
    borderRadius: 10,
    backgroundColor: colors.blue2,
  },
});

export default Banners;
