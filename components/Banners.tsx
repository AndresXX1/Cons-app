import { IBanner } from '@/store/reducers/auth';
import { colors } from '@/theme';
import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Animated,
  FlatList,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';

const BANNER_WIDTH = 335; // Ajusta este valor al ancho real de tus banners


interface BannersProps {
  banners: IBanner[];
}

const Banners: React.FC<BannersProps> = ({ banners }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef<FlatList<IBanner>>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      let nextIndex = currentIndex + 1;
      if (nextIndex >= banners.length) {
        nextIndex = 0;
      }
      if (flatListRef.current) {
        flatListRef.current.scrollToOffset({
          offset: nextIndex * BANNER_WIDTH,
          animated: true,
        });
        setCurrentIndex(nextIndex);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex, banners.length]);

  const onMomentumScrollEnd = (event: any) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(offsetX / BANNER_WIDTH);
    if (newIndex !== currentIndex) {
      setCurrentIndex(newIndex);
    }
  };

  const renderItem = ({ item, index }: { item: IBanner; index: number }) => {
    const inputRange = [
      (index - 1) * BANNER_WIDTH,
      index * BANNER_WIDTH,
      (index + 1) * BANNER_WIDTH,
    ];


    const opacity = scrollX.interpolate({
      inputRange,
      outputRange: [0.05, 1, 0.05],
      extrapolate: 'clamp',
    });

    return (
      <Animated.View style={{ width: BANNER_WIDTH, opacity }}>
        <TouchableOpacity activeOpacity={0.75}>
          <ImageBackground
            source={{ uri: `https://back5.maylandlabs.com/banner/${item.url}` }}
            style={styles.image}
            resizeMode="cover"
          />
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <View style={styles.bannerContainer}>
      <Animated.FlatList
        data={banners}
        ref={flatListRef}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        onMomentumScrollEnd={onMomentumScrollEnd}
        scrollEventThrottle={16}
        snapToInterval={BANNER_WIDTH}
        decelerationRate="fast"
        contentContainerStyle={{ alignItems: 'center' }}
      />
      {/* Indicador de paginación */}
      <View style={styles.paginationContainer}>
        {banners.map((_, i) => (
          <View
            key={i}
            style={i === currentIndex ? styles.lineActive : styles.lineInactive}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bannerContainer: {
    width: BANNER_WIDTH,
    height: 212,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: "auto",
    overflow: 'hidden',
    borderRadius: 10,
  },
  image: {
    width: BANNER_WIDTH,
    height: 212,
  },
  paginationContainer: {
    position: 'absolute',
    bottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lineActive: {
    width: 59,
    height: 7,
    borderRadius: 10,
    backgroundColor: colors.blue2, // Asegúrate de reemplazar con tu color
    marginHorizontal: 5,
  },
  lineInactive: {
    width: 10,
    height: 7,
    borderRadius: 10,
    backgroundColor: colors.blue2, // Asegúrate de reemplazar con tu color
    opacity: 0.7,
    marginHorizontal: 5,
  },
});

export default Banners;
