import React from 'react';
import { colors, fonts, images } from '@/theme';
import { TouchableOpacity, Image, Text } from 'react-native';
import { AppDispatch } from '@/store';
import { useDispatch } from 'react-redux';
import { logOutAsync } from '@/store/actions/auth';
import { useRouter } from 'expo-router';	


export function StackHeaderLogout({ color, title }: { color: string; title: string }) {

  const router = useRouter();

  const dispatch = useDispatch<AppDispatch>();

  return (
    <TouchableOpacity
      onPress={() => {
        dispatch(logOutAsync())
        router.push('/(auth)/signup');
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
          marginBottom: 2,
        }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}
