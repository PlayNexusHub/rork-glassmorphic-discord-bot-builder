import { router } from 'expo-router';
import { ArrowLeft, Search } from 'lucide-react-native';
import React, { useState, useMemo } from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AnimatedBackground from '@/components/AnimatedBackground';
import GlassCard from '@/components/GlassCard';
import colors from '@/constants/colors';
import { capabilities, categories } from '@/data/capabilities';

export default function CapabilitiesScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredCapabilities = useMemo(() => {
    return capabilities.filter((cap) => {
      const matchesSearch =
        cap.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cap.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cap.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        );

      const matchesCategory =
        !selectedCategory || cap.tags.includes(selectedCategory);

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low':
        return colors.status.success;
      case 'medium':
        return colors.status.warning;
      case 'high':
        return colors.status.error;
      default:
        return colors.dark.textMuted;
    }
  };

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'simple':
        return colors.neon.green;
      case 'moderate':
        return colors.neon.yellow;
      case 'advanced':
        return colors.neon.orange;
      default:
        return colors.dark.textMuted;
    }
  };

  return (
    <View style={styles.container}>
      <AnimatedBackground />
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        <View style={styles.header}>
          <Pressable
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <ArrowLeft size={24} color={colors.neon.cyan} />
          </Pressable>
          <Text style={styles.headerTitle}>Capabilities</Text>
          <View style={styles.headerSpacer} />
        </View>

        <View style={styles.searchContainer}>
          <GlassCard style={styles.searchCard}>
            <View style={styles.searchInputContainer}>
              <Search size={20} color={colors.dark.textMuted} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search capabilities..."
                placeholderTextColor={colors.dark.textMuted}
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>
          </GlassCard>
        </View>

        <View style={styles.categoriesContainer}>
          <FlatList
            horizontal
            data={categories}
            keyExtractor={(item) => item}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesList}
            renderItem={({ item }) => (
              <Pressable
                onPress={() =>
                  setSelectedCategory(
                    selectedCategory === item ? null : item
                  )
                }
                style={[
                  styles.categoryChip,
                  selectedCategory === item && styles.categoryChipActive,
                ]}
              >
                <Text
                  style={[
                    styles.categoryText,
                    selectedCategory === item && styles.categoryTextActive,
                  ]}
                >
                  {item}
                </Text>
              </Pressable>
            )}
          />
        </View>

        <FlatList
          data={filteredCapabilities}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <GlassCard style={styles.capabilityCard}>
              <View style={styles.capabilityHeader}>
                <Text style={styles.capabilityTitle}>{item.title}</Text>
                <View style={styles.badges}>
                  <View
                    style={[
                      styles.badge,
                      { borderColor: getRiskColor(item.riskLevel) },
                    ]}
                  >
                    <Text
                      style={[
                        styles.badgeText,
                        { color: getRiskColor(item.riskLevel) },
                      ]}
                    >
                      {item.riskLevel}
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.badge,
                      { borderColor: getComplexityColor(item.complexity) },
                    ]}
                  >
                    <Text
                      style={[
                        styles.badgeText,
                        { color: getComplexityColor(item.complexity) },
                      ]}
                    >
                      {item.complexity}
                    </Text>
                  </View>
                </View>
              </View>
              <Text style={styles.capabilityDescription}>
                {item.description}
              </Text>
              <View style={styles.tags}>
                {item.tags.map((tag, index) => (
                  <View key={index} style={styles.tag}>
                    <Text style={styles.tagText}>{tag}</Text>
                  </View>
                ))}
              </View>
            </GlassCard>
          )}
        />
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
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  searchCard: {
    minHeight: 56,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: colors.dark.text,
  },
  categoriesContainer: {
    marginBottom: 16,
  },
  categoriesList: {
    paddingHorizontal: 20,
    gap: 8,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.glass.light,
    borderWidth: 1,
    borderColor: colors.glass.border,
  },
  categoryChipActive: {
    backgroundColor: colors.neon.cyan + '20',
    borderColor: colors.neon.cyan,
  },
  categoryText: {
    fontSize: 14,
    color: colors.dark.textSecondary,
    fontWeight: '600' as const,
  },
  categoryTextActive: {
    color: colors.neon.cyan,
  },
  listContent: {
    padding: 20,
    gap: 16,
  },
  capabilityCard: {
    minHeight: 120,
  },
  capabilityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  capabilityTitle: {
    fontSize: 18,
    fontWeight: '700' as const,
    color: colors.dark.text,
    flex: 1,
  },
  badges: {
    flexDirection: 'row',
    gap: 8,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '600' as const,
    textTransform: 'uppercase' as const,
  },
  capabilityDescription: {
    fontSize: 14,
    color: colors.dark.textSecondary,
    lineHeight: 20,
    marginBottom: 12,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: colors.glass.medium,
  },
  tagText: {
    fontSize: 12,
    color: colors.dark.textSecondary,
  },
});
