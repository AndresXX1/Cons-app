import { colors, fonts } from '@/theme';
import React from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';

const CuponCard = ({ cupon, onPress }) => {
  return (
    <Pressable onPress={onPress} style={styles.containerRecom}>
     {({ pressed }) => (    
      <View style={{ opacity: pressed ? 0.8 : 1 }}>
      <Image source={{ uri: cupon.foto_principal.original }} style={styles.imageRecom} />
      <Text style={styles.recomText1}>{cupon.nombre.toUpperCase()}</Text>
      <Text style={styles.recomText2}>{cupon.descuento}</Text>
      <Text style={styles.recomText3}>{cupon.descripcion_breve.replace(/<\/?p>/g, '').trim()}</Text>
    </View>
    )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  containerRecom: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    width: 156,
    paddingBottom: 8,
    overflow: 'hidden',
  },
  imageRecom: {
    width: 156,
    height: 149,
    marginBottom: 5,
  },
  pressedCard: {
    opacity: 0.8,
    borderWidth: 1,
    borderColor: colors.g
  },
  recomText1: {
    textAlign: 'center',
    fontSize: 10,
    lineHeight: 19,
    fontFamily: fonts.gotham.regular,
    color: colors.texts,
  },
  recomText2: {
    fontSize: 30,
    textAlign: 'center',
    paddingVertical: 10,
    fontFamily: fonts.gotham.bold,
    color: colors.texts,
  },
  recomText3: {
    fontSize: 10,
    textAlign: 'center',
    paddingHorizontal: 8,
    paddingTop: 2,
    fontFamily: fonts.gotham.regular,
    color: colors.texts,
  },
  cuponButton: {
    backgroundColor: '#00A5E7',
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
  },
  cuponButtonText: {
    color: '#ffffff',
    textAlign: 'center',
  },
});

export default CuponCard;