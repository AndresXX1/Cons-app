import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors, fonts } from '@theme';
import { LinearGradient } from 'expo-linear-gradient';
interface CustomProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const CustomProgressBar: React.FC<CustomProgressBarProps> = ({ currentStep, totalSteps }) => {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <View style={styles.container}>
      <View style={styles.progressBarContainer}>
        <LinearGradient
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          colors={['#01a5e7', '#4cccff']}
          style={[styles.progressBar, { width: `${progress}%` }]}></LinearGradient>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressBarContainer: {
    flex: 1,
    height: 6,
    backgroundColor: colors.gray4,
    borderRadius: 10,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
  },
});

export default CustomProgressBar;
