import React from 'react';
import { colors, fonts, images } from '@/theme';
import { TouchableOpacity, Image, Text } from 'react-native';
import { useRouter } from 'expo-router';

export function StackHeaderLeftGoBack({ color, title }: { color: string; title: string }) {
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() => {
        router.back();
      }}
      style={{
        borderColor: 'transparent',
        backgroundColor: colors.transparent,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
        gap: 9,
      }}
    >
      <Image
        source={color === colors.white ? images.arrow_back : images.arrow_blue}
        style={{
          width: 14,
          height: 24,
        }}
      />
      <Text
        style={{
          color: color,
          fontFamily: fonts.gotham.semiBold,
        }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}
