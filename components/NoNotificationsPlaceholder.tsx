import React from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { images, fonts, colors } from '@/theme';
import { router } from 'expo-router';

const NoNotificationsPlaceholder = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Aún no tienes nuevas notifiaciones😊</Text>
      <Pressable onPress={() => router.push('/')}>
        {({ pressed }) => (
          <View style={[styles.button, { opacity: pressed ? 0.5 : 1 }]}>
          <Text style={styles.buttonText}>Volver al inicio</Text>
          </View>
        )}

      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: colors.blue2,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 500,
    marginTop: 30,
    maxWidth: 300,
    alignSelf: 'center',
  },
  buttonText: {
    color: colors.white,
    fontFamily: fonts.gotham.semiBold,
    fontSize: 18,
    textAlign: 'center',
  },
  title: {
    fontFamily: fonts.gotham.regular,
    fontSize: 22,
    color: colors.blue2,
    textAlign: 'center',
    marginTop: 30,
  },
});

export default NoNotificationsPlaceholder;
