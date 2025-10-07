import { router } from 'expo-router';
import {
  Download,
  CheckCircle,
  Code,
  FileText,
} from 'lucide-react-native';
import React from 'react';
import {
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

export default function PreviewScreen() {
  const handleDownload = () => {
    console.log('Downloading bot files...');
  };

  const generatedFiles = [
    { name: 'main.py', size: '2.4 KB', type: 'Python' },
    { name: 'config.py', size: '1.2 KB', type: 'Python' },
    { name: 'requirements.txt', size: '0.5 KB', type: 'Text' },
    { name: 'README.md', size: '3.1 KB', type: 'Markdown' },
    { name: 'cogs/moderation.py', size: '5.2 KB', type: 'Python' },
    { name: 'cogs/fun.py', size: '3.8 KB', type: 'Python' },
  ];

  return (
    <View style={styles.container}>
      <AnimatedBackground />
      <ParticleField />
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        <View style={styles.header}>
          <View style={styles.backButton} />
          <Text style={styles.headerTitle}>Bot Preview</Text>
          <View style={styles.headerSpacer} />
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <GlassCard style={styles.successCard} neonBorder>
            <View style={styles.successIcon}>
              <CheckCircle size={64} color={colors.status.success} />
            </View>
            <Text style={styles.successTitle}>Bot Generated Successfully!</Text>
            <Text style={styles.successDescription}>
              Your Discord bot is ready to deploy. Download the files and follow
              the setup instructions.
            </Text>
          </GlassCard>

          <GlassCard style={styles.section}>
            <Text style={styles.sectionTitle}>Generated Files</Text>
            {generatedFiles.map((file, index) => (
              <View key={index} style={styles.fileItem}>
                <View style={styles.fileIcon}>
                  {file.type === 'Python' ? (
                    <Code size={24} color={colors.neon.cyan} />
                  ) : (
                    <FileText size={24} color={colors.neon.magenta} />
                  )}
                </View>
                <View style={styles.fileInfo}>
                  <Text style={styles.fileName}>{file.name}</Text>
                  <Text style={styles.fileSize}>
                    {file.size} • {file.type}
                  </Text>
                </View>
              </View>
            ))}
          </GlassCard>

          <GlassCard style={styles.section}>
            <Text style={styles.sectionTitle}>Setup Instructions</Text>
            <View style={styles.instructionStep}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>1</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>Install Dependencies</Text>
                <Text style={styles.stepDescription}>
                  Run: pip install -r requirements.txt
                </Text>
              </View>
            </View>
            <View style={styles.instructionStep}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>2</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>Configure Bot Token</Text>
                <Text style={styles.stepDescription}>
                  Add your Discord bot token to config.py
                </Text>
              </View>
            </View>
            <View style={styles.instructionStep}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>3</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>Run Your Bot</Text>
                <Text style={styles.stepDescription}>
                  Execute: python main.py
                </Text>
              </View>
            </View>
          </GlassCard>

          <View style={styles.actions}>
            <NeonButton
              title="Download Bot"
              onPress={handleDownload}
              variant="primary"
              size="large"
              icon={<Download size={24} color={colors.dark.text} />}
            />
            <NeonButton
              title="Build Another"
              onPress={() => router.push('/builder' as any)}
              variant="outline"
              size="large"
            />
          </View>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  backButton: {
    width: 40,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700' as const,
    color: colors.dark.text,
  },
  headerSpacer: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 200,
  },
  successCard: {
    alignItems: 'center',
    marginBottom: 24,
  },
  successIcon: {
    marginBottom: 16,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: '700' as const,
    color: colors.dark.text,
    marginBottom: 8,
    textAlign: 'center' as const,
  },
  successDescription: {
    fontSize: 16,
    color: colors.dark.textSecondary,
    textAlign: 'center' as const,
    lineHeight: 24,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700' as const,
    color: colors.dark.text,
    marginBottom: 16,
  },
  fileItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.glass.border,
  },
  fileIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: colors.glass.medium,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  fileInfo: {
    flex: 1,
  },
  fileName: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: colors.dark.text,
    marginBottom: 4,
  },
  fileSize: {
    fontSize: 13,
    color: colors.dark.textSecondary,
  },
  instructionStep: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.neon.cyan + '20',
    borderWidth: 2,
    borderColor: colors.neon.cyan,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  stepNumberText: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: colors.neon.cyan,
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: colors.dark.text,
    marginBottom: 4,
  },
  stepDescription: {
    fontSize: 14,
    color: colors.dark.textSecondary,
    lineHeight: 20,
  },
  actions: {
    gap: 16,
    marginTop: 20,
  },
});
