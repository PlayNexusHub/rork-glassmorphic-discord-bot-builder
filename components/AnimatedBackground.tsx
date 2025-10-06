import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, StyleSheet } from 'react-native';
import colors from '@/constants/colors';

const { width, height } = Dimensions.get('window');

export default function AnimatedBackground() {
  const particle1 = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const particle2 = useRef(new Animated.ValueXY({ x: width, y: height })).current;
  const particle3 = useRef(new Animated.ValueXY({ x: width / 2, y: height / 2 })).current;

  useEffect(() => {
    const animateParticle = (particle: Animated.ValueXY, duration: number) => {
      return Animated.loop(
        Animated.sequence([
          Animated.timing(particle, {
            toValue: {
              x: Math.random() * width,
              y: Math.random() * height,
            },
            duration,
            useNativeDriver: true,
          }),
          Animated.timing(particle, {
            toValue: {
              x: Math.random() * width,
              y: Math.random() * height,
            },
            duration,
            useNativeDriver: true,
          }),
        ])
      );
    };

    const anim1 = animateParticle(particle1, 20000);
    const anim2 = animateParticle(particle2, 25000);
    const anim3 = animateParticle(particle3, 30000);

    anim1.start();
    anim2.start();
    anim3.start();

    return () => {
      anim1.stop();
      anim2.stop();
      anim3.stop();
    };
  }, [particle1, particle2, particle3]);

  return (
    <LinearGradient
      colors={[colors.dark.bg, colors.dark.bgSecondary, colors.dark.bgTertiary]}
      style={styles.container}
    >
      <Animated.View
        style={[
          styles.particle,
          {
            transform: [
              { translateX: particle1.x },
              { translateY: particle1.y },
            ],
            backgroundColor: colors.neon.cyan,
          },
        ]}
      />
      <Animated.View
        style={[
          styles.particle,
          {
            transform: [
              { translateX: particle2.x },
              { translateY: particle2.y },
            ],
            backgroundColor: colors.neon.magenta,
          },
        ]}
      />
      <Animated.View
        style={[
          styles.particle,
          {
            transform: [
              { translateX: particle3.x },
              { translateY: particle3.y },
            ],
            backgroundColor: colors.neon.purple,
          },
        ]}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  particle: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    opacity: 0.15,
  },
});
