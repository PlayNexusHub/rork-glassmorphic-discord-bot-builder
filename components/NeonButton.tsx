import { LinearGradient } from 'expo-linear-gradient';
import React, { useRef } from 'react';
import {
  Animated,
  Pressable,
  StyleSheet,
  Text,
  ViewStyle,
} from 'react-native';
import colors from '@/constants/colors';

interface NeonButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'accent' | 'outline';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  style?: ViewStyle;
  icon?: React.ReactNode;
}

export default function NeonButton({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  style,
  icon,
}: NeonButtonProps) {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;

  const handlePressIn = () => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 0.95,
        useNativeDriver: true,
      }),
      Animated.timing(glowAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handlePressOut = () => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 3,
        tension: 40,
        useNativeDriver: true,
      }),
      Animated.timing(glowAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const gradientColors = {
    primary: colors.gradient.primary,
    secondary: colors.gradient.secondary,
    accent: colors.gradient.accent,
    outline: ['transparent', 'transparent'],
  };

  const sizeStyles = {
    small: { paddingVertical: 8, paddingHorizontal: 16, fontSize: 14 },
    medium: { paddingVertical: 12, paddingHorizontal: 24, fontSize: 16 },
    large: { paddingVertical: 16, paddingHorizontal: 32, fontSize: 18 },
  };

  const animatedStyle = {
    transform: [{ scale: scaleAnim }],
    opacity: disabled ? 0.5 : 1,
  };

  return (
    <Animated.View style={[animatedStyle, style]}>
      <Pressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled}
        style={styles.pressable}
      >
        <LinearGradient
          colors={gradientColors[variant] as [string, string]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[
            styles.gradient,
            variant === 'outline' && styles.outlineGradient,
          ]}
        >
          <Animated.View
            style={[
              styles.content,
              {
                paddingVertical: sizeStyles[size].paddingVertical,
                paddingHorizontal: sizeStyles[size].paddingHorizontal,
              },
              variant === 'outline' && styles.outlineContent,
            ]}
          >
            {icon && icon}
            <Text
              style={[
                styles.text,
                { fontSize: sizeStyles[size].fontSize },
                variant === 'outline' && styles.outlineText,
              ]}
            >
              {title}
            </Text>
          </Animated.View>
        </LinearGradient>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  pressable: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  gradient: {
    borderRadius: 12,
  },
  outlineGradient: {
    borderWidth: 2,
    borderColor: colors.neon.cyan,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  outlineContent: {
    backgroundColor: 'transparent',
  },
  text: {
    color: colors.dark.text,
    fontWeight: '700' as const,
    textAlign: 'center' as const,
  },
  outlineText: {
    color: colors.neon.cyan,
  },
});
