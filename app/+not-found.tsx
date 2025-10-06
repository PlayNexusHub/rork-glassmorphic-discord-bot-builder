import { Link, Stack } from 'expo-router';
import { AlertCircle } from 'lucide-react-native';
import { StyleSheet, Text, View } from 'react-native';
import AnimatedBackground from '@/components/AnimatedBackground';
import GlassCard from '@/components/GlassCard';
import colors from '@/constants/colors';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View style={styles.container}>
        <AnimatedBackground />
        <GlassCard style={styles.card}>
          <AlertCircle size={64} color={colors.neon.magenta} />
          <Text style={styles.title}>Page Not Found</Text>
          <Text style={styles.description}>
            This screen doesn&apos;t exist.
          </Text>
          <Link href="/" style={styles.link}>
            <Text style={styles.linkText}>Go to home screen</Text>
          </Link>
        </GlassCard>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: colors.dark.bg,
  },
  card: {
    alignItems: 'center',
    maxWidth: 400,
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: '700' as const,
    color: colors.dark.text,
    marginTop: 20,
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: colors.dark.textSecondary,
    textAlign: 'center' as const,
    marginBottom: 24,
  },
  link: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    backgroundColor: colors.glass.medium,
    borderWidth: 1,
    borderColor: colors.neon.cyan,
  },
  linkText: {
    fontSize: 16,
    color: colors.neon.cyan,
    fontWeight: '600' as const,
  },
});
