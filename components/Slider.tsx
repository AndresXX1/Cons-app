import React, { useState, useRef, useCallback } from 'react';
import { View, Dimensions, StyleSheet, FlatList, Pressable, Text } from 'react-native';
import SliderItem from './SliderItem';
import { images, fonts, colors } from '@/theme';

const { width } = Dimensions.get('window');

const Slider = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef(null);
  const pageSize = 2;

  const keyExtractor = useCallback((_, index) => index.toString(), []);

  const renderItem = useCallback(
    ({ item, index }) => (
      <View style={styles.slide}>
        <SliderItem item={data[index * 2]} index={index * 2} />
        {index * 2 + 1 < data.length && (
          <SliderItem item={data[index * 2 + 1]} index={index * 2 + 1} />
        )}
      </View>
    ),
    [data],
  );

  const handleScroll = useCallback(event => {
    const newIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    setActiveIndex(newIndex);
  }, []);

  const scrollToIndex = index => {
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({ index, animated: true });
      setActiveIndex(index);
    }
  };

  const renderDots = () => {
    const totalPages = Math.ceil(data?.length / pageSize);
    return (
      <View style={styles.dotContainer}>
        {Array.from({ length: totalPages }, (_, index) => (
          <Pressable
            key={index}
            onPress={() => scrollToIndex(index)}
            style={[styles.dot, activeIndex === index && styles.activeDot]}
          />
        ))}
      </View>
    );
  };

  return (
    <View>
      <View style={styles.containerOffices}>
        <Text style={styles.textOffices}>
          📍 Nuestras <Text style={styles.span}>sucursales</Text>
        </Text>
        <View style={styles.containerCircle}>{renderDots()}</View>
      </View>
      <View style={styles.container}>
        <FlatList
          ref={flatListRef}
          data={Array.from({ length: Math.ceil(data?.length / pageSize) }, (_, i) => i)}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          snapToInterval={width}
          decelerationRate="fast"
          onScroll={handleScroll}
          scrollEventThrottle={16}
          contentContainerStyle={{ paddingHorizontal: 16 }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slide: {
    marginTop: 22,
    marginBottom: 16,
    flexDirection: 'row',
    width: width, // Full width of screen
    justifyContent: 'flex-start',
    gap: 16,
    paddingLeft: 25,
  },
  containerOffices: {
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: 20,
    paddingRight: 30,
    justifyContent: 'space-between',
    marginTop: 10,
    alignItems: 'center',
  },
  textOffices: {
    color: '#575757',
    fontSize: 20,
    fontFamily: fonts.gotham.regular,
    fontWeight: '400',
  },
  span: {
    fontWeight: '700',
    fontFamily: fonts.gotham.bold,
  },
  dotContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    backgroundColor: '#D9D9D9',
    width: 12,
    height: 12,
    borderRadius: 20,
  },
  activeDot: {
    backgroundColor: colors.blue2,
    width: 12,
    height: 12,
    borderRadius: 20,
  },
});

export default Slider;
