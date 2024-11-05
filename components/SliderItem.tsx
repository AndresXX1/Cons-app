import React from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { images, fonts, colors } from '@/theme';
import { router } from 'expo-router';

const SliderItem = ({ item }) => {
  return (
    <Pressable onPress={() => router.push(`/branch_offices`)}>
    {({ pressed }) => (
    <View style={[styles.container, { opacity: pressed ? 0.5 : 1 }, { borderColor: pressed ? colors.gray5 : 'transparent'}]}>
      <Image source={{ uri : `https://back5.maylandlabs.com/branch/${item.image}`}} style={styles.image} />
      <View style={styles.containerText}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.location}>{item.address}</Text>
        <Text style={styles.number}>{item.phone}</Text>
        <Text style={styles.number}>{item.whatsapp}</Text>
      </View>
    </View>
    )}
   </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    minWidth: "43%", // Para que los dos ítems ocupen el espacio completo
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
  },
  containerText: {
    padding: 10,
    minHeight: 140,
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
    color: colors.blue,
  },
  location: {
    fontSize: 14,
    marginTop: 5,
    fontFamily: fonts.gotham.regular,
    color: colors.texts,
  },
  number: {
    fontSize: 14,
    marginTop: 5,
    fontFamily: fonts.gotham.regular,
    color: colors.texts,
  },
});

export default SliderItem;
