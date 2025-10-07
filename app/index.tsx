import { router } from 'expo-router';
import {
  Bot,
  Sparkles,
  Zap,
  Shield,
  Code2,
} from 'lucide-react-native';
import React, { useEffect, useRef } from 'react';
import {
  Animated,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AnimatedBackground from '@/components/AnimatedBackground';
import ParticleField from '@/components/ParticleField';
import GlassCard from '@/components/GlassCard';
import NeonButton from '@/components/NeonButton';
import colors from '@/constants/colors';

export default function HomeScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim]);

  const features = [
    {
      icon: <Bot size={32} color={colors.neon.cyan} />,
      title: '1000+ Capabilities',
      description: 'Choose from a vast library of pre-built bot features',
    },
    {
      icon: <Zap size={32} color={colors.neon.magenta} />,
      title: 'Instant Deploy',
      description: 'Generate production-ready code in seconds',
    },
    {
      icon: <Shield size={32} color={colors.neon.purple} />,
      title: 'Enterprise Ready',
      description: 'Built with security and scalability in mind',
    },
    {
      icon: <Code2 size={32} color={colors.neon.green} />,
      title: 'Clean Code',
      description: 'Well-structured, documented Python code',
    },
  ];

  return (
    <View style={styles.container}>
      <AnimatedBackground />
      <ParticleField />
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Animated.View
            style={[
              styles.header,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <View style={styles.logoContainer}>
              <Sparkles size={48} color={colors.neon.cyan} />
            </View>
            <Text style={styles.title}>Discord Bot Builder</Text>
            <Text style={styles.subtitle}>
              Create production-ready Python Discord bots with our glassmorphic
              builder
            </Text>
          </Animated.View>

          <Animated.View
            style={[
              styles.featuresContainer,
              {
                opacity: fadeAnim,
              },
            ]}
          >
            {features.map((feature, index) => (
              <GlassCard key={index} style={styles.featureCard}>
                <View style={styles.featureIcon}>{feature.icon}</View>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureDescription}>
                  {feature.description}
                </Text>
              </GlassCard>
            ))}
          </Animated.View>

          <Animated.View
            style={[
              styles.ctaContainer,
              {
                opacity: fadeAnim,
              },
            ]}
          >
            <NeonButton
              title="Start Building"
              onPress={() => router.push('/builder' as any)}
              variant="primary"
              size="large"
              icon={<Sparkles size={24} color={colors.dark.text} />}
            />
            <NeonButton
              title="View Capabilities"
              onPress={() => router.push('/capabilities' as any)}
              variant="outline"
              size="large"
            />
          </Animated.View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark.bg,
  },
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: '900' as const,
    color: colors.dark.text,
    textAlign: 'center' as const,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: colors.dark.textSecondary,
    textAlign: 'center' as const,
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  featuresContainer: {
    gap: 16,
    marginBottom: 40,
  },
  featureCard: {
    minHeight: 140,
  },
  featureIcon: {
    marginBottom: 12,
  },
  featureTitle: {
    fontSize: 20,
    fontWeight: '700' as const,
    color: colors.dark.text,
    marginBottom: 8,
  },
  featureDescription: {
    fontSize: 14,
    color: colors.dark.textSecondary,
    lineHeight: 20,
  },
  ctaContainer: {
    gap: 16,
  },
});
