import { colors, fonts } from '@/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  inputsContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
  },
  codeContainer: {
    width: 50,
    height: 60,
    textAlign: 'center',
    borderBottomWidth: 3,
    borderColor: colors.gray5,
    fontFamily: fonts.gotham.semiBold,
    fontSize: 54,
    lineHeight: 60.48,
    color: colors.gray5,
  },
  codeText: {
    width: 50,
    height: 60,
    textAlign: 'center',
    borderBottomWidth: 3,
    borderColor: colors.transparent,
    fontFamily: fonts.gotham.semiBold,
    fontSize: 54,
    lineHeight: 60.48,
    color: colors.black,
  },
  hiddenInput: {
    width: 1,
    height: 1,
    opacity: 0,
  },
  stick: {
    width: 2,
    height: 50,
    backgroundColor: colors.blue2,
    fontFamily: fonts.gotham.semiBold,
  },
});
