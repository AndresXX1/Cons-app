import { Platform, StatusBar, View, StyleSheet } from 'react-native';

interface ViewContainerProps {
  children: React.ReactNode;
  style?: any;
  header?: boolean;
}

const ViewContainer = ({ children, style, header }: ViewContainerProps) => {
  const paddingTop =
    Platform.OS === 'android' && StatusBar.currentHeight ? StatusBar.currentHeight : Platform.OS === 'web' ? 0 : 50;

  const styles = StyleSheet.create({
    contenContainer: {
      paddingTop: header ? paddingTop : 0,
    },
  });
  return <View style={[styles.contenContainer, style]}>{children}</View>;
};

ViewContainer.defaultProps = {
  styles: {},
  header: true,
};

export default ViewContainer;
