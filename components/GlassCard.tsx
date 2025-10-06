import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import colors from '@/constants/colors';

interface GlassCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  intensity?: 'light' | 'medium' | 'strong';
  gradient?: boolean;
  neonBorder?: boolean;
}

export default function GlassCard({
  children,
  style,
  intensity = 'medium',
  gradient = false,
  neonBorder = false,
}: GlassCardProps) {
  const intensityMap = {
    light: 10,
    medium: 20,
    strong: 30,
  };

  const content = (
    <View style={[styles.container, style]}>
      <BlurView intensity={intensityMap[intensity]} style={styles.blur}>
        <View style={styles.content}>{children}</View>
      </BlurView>
    </View>
  );

  if (gradient) {
    return (
      <View style={[styles.container, style]}>
        <LinearGradient
          colors={[colors.glass.medium, colors.glass.light] as const}
          style={styles.gradient}
        >
          <View style={styles.gradientContent}>{children}</View>
        </LinearGradient>
      </View>
    );
  }

  if (neonBorder) {
    return (
      <View style={[styles.container, style]}>
        <LinearGradient
          colors={colors.gradient.primary as [string, string]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.neonBorderGradient}
        >
          <View style={styles.neonBorderInner}>
            <BlurView intensity={intensityMap[intensity]} style={styles.blur}>
              <View style={styles.content}>{children}</View>
            </BlurView>
          </View>
        </LinearGradient>
      </View>
    );
  }

  return content;
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  blur: {
    flex: 1,
    backgroundColor: colors.glass.light,
    borderWidth: 1,
    borderColor: colors.glass.border,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  gradient: {
    flex: 1,
    borderRadius: 20,
  },
  gradientContent: {
    flex: 1,
    padding: 20,
  },
  neonBorderGradient: {
    padding: 2,
    borderRadius: 20,
  },
  neonBorderInner: {
    borderRadius: 18,
    overflow: 'hidden',
  },
});
