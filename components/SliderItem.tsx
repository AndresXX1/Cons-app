import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { images, fonts, colors } from '@/theme';

const SliderItem = ({ item }) => {


  return (
    <View style={styles.container}>
      <Image source={images["location_avellaneda"]} style={styles.image} />
      <View style={styles.containerText}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.location}>{item.address}</Text>
        <Text style={styles.number}>{item.phone}</Text>
        <Text style={styles.number}>{item.whatsapp}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 160, // Para que los dos ítems ocupen el espacio completo
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
  },
  containerText: {
    padding: 10,
  },
  image: {
    width: '100%',
    height: 100,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    fontFamily: fonts.gotham.bold,
  },
  location: {
    fontSize: 14,
    marginTop: 5,
    fontFamily: fonts.gotham.regular,
  },
  number: {
    fontSize: 14,
    marginTop: 5,
    fontFamily: fonts.gotham.regular,
  },
});

export default SliderItem;
