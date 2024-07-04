import React from 'react';
import { colors, fonts, images } from '@/theme';
import { TouchableOpacity, Image, Text } from 'react-native';
import { useRouter } from 'expo-router';

export function StackHeaderLeftGoBack({ color, title }: { color: string; title: string }) {
  const route = useRouter();
  return (
    <TouchableOpacity
      onPress={() => {
        route.back();
      }}
      style={{
        borderColor: 'transparent',
        backgroundColor: colors.transparent,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 20,
        gap: 9,
      }}
      activeOpacity={1} // Evitar cambio de opacidad al presionar
    >
      <Image
        source={images.arrow_blue}
        style={{
          width: 14,
          height: 24,
        }}
      />
      <Text
        style={{
          color: color,
          fontFamily: fonts.gotham.semiBold,
          marginBottom: 2,
        }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}
