import React from 'react';
import { colors, fonts, images } from '@/theme';
import { TouchableOpacity, Image, Text } from 'react-native';
import { AppDispatch } from '@/store';
import { useDispatch } from 'react-redux';
import { logOutAsync } from '@/store/actions/auth';

export function StackHeaderLogout({ color, title }: { color: string; title: string }) {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <TouchableOpacity
      onPress={() => {
        dispatch(logOutAsync())
      }}
      style={{
        borderColor: 'transparent',
        backgroundColor: colors.transparent,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
        gap: 9,
      }}
      activeOpacity={1} // Evitar cambio de opacidad al presionar
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
          marginBottom: 2,
        }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}
