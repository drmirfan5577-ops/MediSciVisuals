import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, Radius } from '@/constants/theme';
import { TEMPLATES, CATEGORIES } from '@/constants/data';
import { TemplateCard, CategoryChip } from '@/components';

export default function TemplatesScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const allCategory = {
    id: 'all',
    title: 'All',
    icon: 'apps',
    color: Colors.primary,
    bgColor: Colors.primaryLight,
    count: TEMPLATES.length,
  };

  const categories = [allCategory, ...CATEGORIES];

  const filtered = useMemo(() => {
    if (selectedCategory === 'all') return TEMPLATES;
    return TEMPLATES.filter((t) => t.category === selectedCategory);
  }, [selectedCategory]);

  const handleTemplatePress = (id: string) => {
    router.push({ pathname: '/template-detail', params: { id } });
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerIcon}>
          <MaterialIcons name="view-module" size={22} color={Colors.primary} />
        </View>
        <View>
          <Text style={styles.headerTitle}>Templates Library</Text>
          <Text style={styles.headerSubtitle}>{TEMPLATES.length} professional visualizations</Text>
        </View>
      </View>

      {/* Category Filter */}
      <View style={styles.filterContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterContent}
        >
          {categories.map((cat) => (
            <CategoryChip
              key={cat.id}
              title={cat.title}
              icon={cat.icon}
              color={cat.color}
              bgColor={cat.bgColor}
              count={cat.count}
              isSelected={selectedCategory === cat.id}
              onPress={() => setSelectedCategory(cat.id)}
            />
          ))}
        </ScrollView>
      </View>

      {/* Results Count */}
      <View style={styles.resultsBar}>
        <Text style={styles.resultsText}>
          Showing <Text style={styles.resultsCount}>{filtered.length}</Text> templates
        </Text>
        {selectedCategory !== 'all' && (
          <View style={styles.activeFilter}>
            <MaterialIcons name="filter-list" size={14} color={Colors.primary} />
            <Text style={styles.activeFilterText}>
              {categories.find((c) => c.id === selectedCategory)?.title}
            </Text>
          </View>
        )}
      </View>

      {/* Template List */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TemplateCard
            template={item}
            onPress={() => handleTemplatePress(item.id)}
          />
        )}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <MaterialIcons name="inbox" size={56} color={Colors.textMuted} />
            <Text style={styles.emptyTitle}>No Templates Found</Text>
            <Text style={styles.emptySubtext}>No visuals in this category yet</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    paddingHorizontal: Spacing.base,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.base,
  },
  headerIcon: {
    width: 44,
    height: 44,
    backgroundColor: Colors.primaryLight,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: Typography.xl,
    fontWeight: Typography.bold,
    color: Colors.textPrimary,
  },
  headerSubtitle: {
    fontSize: Typography.sm,
    color: Colors.textMuted,
  },
  filterContainer: {
    marginBottom: Spacing.sm,
  },
  filterContent: {
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.xs,
    flexDirection: 'row',
    alignItems: 'center',
  },
  resultsBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.base,
    marginBottom: Spacing.sm,
  },
  resultsText: {
    fontSize: Typography.sm,
    color: Colors.textSecondary,
  },
  resultsCount: {
    fontWeight: Typography.bold,
    color: Colors.textPrimary,
  },
  activeFilter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: Radius.full,
  },
  activeFilterText: {
    fontSize: 12,
    color: Colors.primary,
    fontWeight: Typography.semibold,
  },
  listContent: {
    paddingHorizontal: Spacing.base,
    paddingBottom: Spacing.xxxl,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 64,
    gap: Spacing.sm,
  },
  emptyTitle: {
    fontSize: Typography.md,
    fontWeight: Typography.bold,
    color: Colors.textSecondary,
  },
  emptySubtext: {
    fontSize: Typography.sm,
    color: Colors.textMuted,
  },
});
