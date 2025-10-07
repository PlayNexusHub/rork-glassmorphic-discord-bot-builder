import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, StyleSheet, View } from 'react-native';
import colors from '@/constants/colors';

const { width, height } = Dimensions.get('window');

interface Particle {
  x: Animated.Value;
  y: Animated.Value;
  opacity: Animated.Value;
  scale: Animated.Value;
  color: string;
}

export default function ParticleField() {
  const particles = useRef<Particle[]>([]);

  useEffect(() => {
    const particleColors = [
      colors.neon.cyan,
      colors.neon.magenta,
      colors.neon.purple,
      colors.neon.green,
      colors.neon.yellow,
    ];

    for (let i = 0; i < 30; i++) {
      const particle: Particle = {
        x: new Animated.Value(Math.random() * width),
        y: new Animated.Value(Math.random() * height),
        opacity: new Animated.Value(Math.random() * 0.5 + 0.2),
        scale: new Animated.Value(Math.random() * 0.5 + 0.5),
        color: particleColors[Math.floor(Math.random() * particleColors.length)],
      };

      particles.current.push(particle);

      const animateParticle = () => {
        const duration = Math.random() * 10000 + 15000;
        
        Animated.parallel([
          Animated.timing(particle.x, {
            toValue: Math.random() * width,
            duration,
            useNativeDriver: true,
          }),
          Animated.timing(particle.y, {
            toValue: Math.random() * height,
            duration,
            useNativeDriver: true,
          }),
          Animated.sequence([
            Animated.timing(particle.opacity, {
              toValue: Math.random() * 0.6 + 0.3,
              duration: duration / 2,
              useNativeDriver: true,
            }),
            Animated.timing(particle.opacity, {
              toValue: Math.random() * 0.3 + 0.1,
              duration: duration / 2,
              useNativeDriver: true,
            }),
          ]),
          Animated.sequence([
            Animated.timing(particle.scale, {
              toValue: Math.random() * 0.8 + 0.6,
              duration: duration / 2,
              useNativeDriver: true,
            }),
            Animated.timing(particle.scale, {
              toValue: Math.random() * 0.5 + 0.3,
              duration: duration / 2,
              useNativeDriver: true,
            }),
          ]),
        ]).start(() => animateParticle());
      };

      animateParticle();
    }
  }, []);

  return (
    <View style={styles.container} pointerEvents="none">
      {particles.current.map((particle, index) => (
        <Animated.View
          key={index}
          style={[
            styles.particle,
            {
              backgroundColor: particle.color,
              transform: [
                { translateX: particle.x },
                { translateY: particle.y },
                { scale: particle.scale },
              ],
              opacity: particle.opacity,
            },
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },
  particle: {
    position: 'absolute',
    width: 4,
    height: 4,
    borderRadius: 2,
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
  },
});
