import { router } from 'expo-router';
import {
  ArrowLeft,
  Check,
  Sparkles,
  Zap,
  Download,
  Eye,
} from 'lucide-react-native';
import React, { useState } from 'react';
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AnimatedBackground from '@/components/AnimatedBackground';
import ParticleField from '@/components/ParticleField';
import FloatingActionButton from '@/components/FloatingActionButton';

import GlassCard from '@/components/GlassCard';
import NeonButton from '@/components/NeonButton';
import colors from '@/constants/colors';
import { capabilities } from '@/data/capabilities';
import { generateBotFiles, downloadBotFiles } from '@/utils/botGenerator';

export default function BuilderScreen() {
  const [botName, setBotName] = useState('');
  const [botDescription, setBotDescription] = useState('');
  const [prefix, setPrefix] = useState('!');
  const [selectedCapabilities, setSelectedCapabilities] = useState<string[]>([]);
  const [features, setFeatures] = useState({
    slashCommands: true,
    prefixCommands: false,
    autoModeration: false,
    logging: true,
  });

  const toggleCapability = (id: string) => {
    setSelectedCapabilities((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const handleGenerate = () => {
    console.log('Generating bot with:', {
      botName,
      botDescription,
      prefix,
      selectedCapabilities,
      features,
    });
    
    const files = generateBotFiles(
      { botName, botDescription, prefix, selectedCapabilities, features },
      capabilities
    );
    
    console.log('Generated files:', files.length);
    router.push('/preview' as any);
  };

  const handleQuickPreview = () => {
    router.push('/preview' as any);
  };

  const handleDownload = () => {
    const files = generateBotFiles(
      { botName, botDescription, prefix, selectedCapabilities, features },
      capabilities
    );
    downloadBotFiles(files, botName);
  };

  const fabActions = [
    {
      icon: <Eye size={24} color={colors.dark.text} />,
      onPress: handleQuickPreview,
      color: colors.neon.purple,
    },
    {
      icon: <Download size={24} color={colors.dark.text} />,
      onPress: handleDownload,
      color: colors.neon.magenta,
    },
    {
      icon: <Zap size={24} color={colors.dark.text} />,
      onPress: handleGenerate,
      color: colors.neon.cyan,
    },
  ];

  return (
    <View style={styles.container}>
      <AnimatedBackground />
      <ParticleField />
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <ArrowLeft size={24} color={colors.neon.cyan} />
          </Pressable>
          <Text style={styles.headerTitle}>Bot Builder</Text>
          <View style={styles.headerSpacer} />
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <GlassCard style={styles.section}>
            <Text style={styles.sectionTitle}>Basic Information</Text>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Bot Name</Text>
              <TextInput
                style={styles.input}
                placeholder="My Awesome Bot"
                placeholderTextColor={colors.dark.textMuted}
                value={botName}
                onChangeText={setBotName}
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Description</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="A powerful Discord bot for my server"
                placeholderTextColor={colors.dark.textMuted}
                value={botDescription}
                onChangeText={setBotDescription}
                multiline
                numberOfLines={3}
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Command Prefix</Text>
              <TextInput
                style={styles.input}
                placeholder="!"
                placeholderTextColor={colors.dark.textMuted}
                value={prefix}
                onChangeText={setPrefix}
                maxLength={3}
              />
            </View>
          </GlassCard>

          <GlassCard style={styles.section}>
            <Text style={styles.sectionTitle}>Features</Text>
            <View style={styles.featureRow}>
              <Text style={styles.featureLabel}>Slash Commands</Text>
              <Switch
                value={features.slashCommands}
                onValueChange={(value) =>
                  setFeatures({ ...features, slashCommands: value })
                }
                trackColor={{
                  false: colors.dark.surfaceLight,
                  true: colors.neon.cyan,
                }}
                thumbColor={colors.dark.text}
              />
            </View>
            <View style={styles.featureRow}>
              <Text style={styles.featureLabel}>Prefix Commands</Text>
              <Switch
                value={features.prefixCommands}
                onValueChange={(value) =>
                  setFeatures({ ...features, prefixCommands: value })
                }
                trackColor={{
                  false: colors.dark.surfaceLight,
                  true: colors.neon.cyan,
                }}
                thumbColor={colors.dark.text}
              />
            </View>
            <View style={styles.featureRow}>
              <Text style={styles.featureLabel}>Auto Moderation</Text>
              <Switch
                value={features.autoModeration}
                onValueChange={(value) =>
                  setFeatures({ ...features, autoModeration: value })
                }
                trackColor={{
                  false: colors.dark.surfaceLight,
                  true: colors.neon.cyan,
                }}
                thumbColor={colors.dark.text}
              />
            </View>
            <View style={styles.featureRow}>
              <Text style={styles.featureLabel}>Logging</Text>
              <Switch
                value={features.logging}
                onValueChange={(value) =>
                  setFeatures({ ...features, logging: value })
                }
                trackColor={{
                  false: colors.dark.surfaceLight,
                  true: colors.neon.cyan,
                }}
                thumbColor={colors.dark.text}
              />
            </View>
          </GlassCard>

          <GlassCard style={styles.section}>
            <Text style={styles.sectionTitle}>
              Select Capabilities ({selectedCapabilities.length})
            </Text>
            <FlatList
              data={capabilities}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              contentContainerStyle={styles.capabilitiesList}
              renderItem={({ item }) => (
                <Pressable
                  onPress={() => toggleCapability(item.id)}
                  style={[
                    styles.capabilityItem,
                    selectedCapabilities.includes(item.id) &&
                      styles.capabilityItemSelected,
                  ]}
                >
                  <View style={styles.capabilityContent}>
                    <Text style={styles.capabilityTitle}>{item.title}</Text>
                    <Text style={styles.capabilityDescription}>
                      {item.description}
                    </Text>
                  </View>
                  {selectedCapabilities.includes(item.id) && (
                    <View style={styles.checkIcon}>
                      <Check size={20} color={colors.neon.cyan} />
                    </View>
                  )}
                </Pressable>
              )}
            />
          </GlassCard>

          <NeonButton
            title="Generate Bot"
            onPress={handleGenerate}
            variant="primary"
            size="large"
            icon={<Sparkles size={24} color={colors.dark.text} />}
            disabled={!botName || selectedCapabilities.length === 0}
            style={styles.generateButton}
          />
        </ScrollView>
        
        <FloatingActionButton actions={fabActions} />
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
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
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
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700' as const,
    color: colors.dark.text,
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: colors.dark.textSecondary,
    marginBottom: 8,
  },
  input: {
    backgroundColor: colors.glass.medium,
    borderWidth: 1,
    borderColor: colors.glass.border,
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    color: colors.dark.text,
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  featureRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.glass.border,
  },
  featureLabel: {
    fontSize: 16,
    color: colors.dark.text,
    fontWeight: '600' as const,
  },
  capabilitiesList: {
    gap: 12,
  },
  capabilityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: colors.glass.light,
    borderWidth: 1,
    borderColor: colors.glass.border,
    borderRadius: 12,
  },
  capabilityItemSelected: {
    backgroundColor: colors.neon.cyan + '10',
    borderColor: colors.neon.cyan,
  },
  capabilityContent: {
    flex: 1,
    marginRight: 12,
  },
  capabilityTitle: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: colors.dark.text,
    marginBottom: 4,
  },
  capabilityDescription: {
    fontSize: 13,
    color: colors.dark.textSecondary,
    lineHeight: 18,
  },
  checkIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.neon.cyan + '20',
    alignItems: 'center',
    justifyContent: 'center',
  },
  generateButton: {
    marginTop: 20,
  },
});
