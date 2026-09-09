import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, Radius } from '@/constants/theme';
import { RESOURCES, Resource } from '@/constants/data';
import { ResourceCard } from '@/components';

type FilterType = 'All' | 'Website' | 'Journal' | 'Organization' | 'Repository';
const FILTERS: FilterType[] = ['All', 'Website', 'Journal', 'Organization', 'Repository'];

const FILTER_COLORS: Record<FilterType, string> = {
  All: Colors.primary,
  Website: '#4A90E2',
  Journal: '#E91E63',
  Organization: '#7ED321',
  Repository: '#FF9800',
};

export default function ResourcesScreen() {
  const insets = useSafeAreaInsets();
  const [activeFilter, setActiveFilter] = useState<FilterType>('All');

  const filtered: Resource[] = activeFilter === 'All'
    ? RESOURCES
    : RESOURCES.filter((r) => r.type === activeFilter);

  const verifiedCount = RESOURCES.filter((r) => r.verified).length;

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Research Hub</Text>
          <Text style={styles.headerSubtitle}>
            {verifiedCount} verified sources from leading institutions
          </Text>
        </View>
        <View style={styles.verifiedBadge}>
          <MaterialIcons name="verified" size={16} color={Colors.primary} />
          <Text style={styles.verifiedText}>All Verified</Text>
        </View>
      </View>

      {/* Info Banner */}
      <View style={styles.infoBanner}>
        <MaterialIcons name="info" size={18} color={Colors.primary} />
        <Text style={styles.infoText}>
          Sources verified by WHO, NIH & peer-reviewed institutions. Tap any resource to open.
        </Text>
      </View>

      {/* Filter Tabs */}
      <View style={styles.filterRow}>
        {FILTERS.map((f) => {
          const isActive = activeFilter === f;
          const color = FILTER_COLORS[f];
          return (
            <Pressable
              key={f}
              onPress={() => setActiveFilter(f)}
              style={({ pressed }) => [
                styles.filterTab,
                isActive && { backgroundColor: color, borderColor: color },
                !isActive && { backgroundColor: Colors.surface, borderColor: Colors.border },
                pressed && { opacity: 0.8 },
              ]}
            >
              <Text style={[styles.filterText, { color: isActive ? '#fff' : Colors.textSecondary }]}>
                {f}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {/* Resource List */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <ResourceCard resource={item} />}
        ListHeaderComponent={
          <Text style={styles.listLabel}>
            {filtered.length} {activeFilter === 'All' ? 'resources' : activeFilter.toLowerCase() + 's'} available
          </Text>
        }
        ListEmptyComponent={
          <View style={styles.empty}>
            <MaterialIcons name="library-books" size={48} color={Colors.textMuted} />
            <Text style={styles.emptyText}>No resources in this category</Text>
          </View>
        }
      />

      {/* Contact Footer */}
      <View style={[styles.contactFooter, { paddingBottom: insets.bottom + Spacing.sm }]}>
        <View style={styles.contactItem}>
          <MaterialIcons name="email" size={16} color={Colors.primary} />
          <Text style={styles.contactText}>dr.mirfan5577@gmail.com</Text>
        </View>
        <View style={styles.contactItem}>
          <MaterialIcons name="phone" size={16} color={Colors.secondary} />
          <Text style={styles.contactText}>0300-4737757</Text>
        </View>
      </View>
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
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.base,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.sm,
  },
  headerTitle: {
    fontSize: Typography.xl,
    fontWeight: Typography.bold,
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: Typography.sm,
    color: Colors.textMuted,
    maxWidth: 220,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 6,
    borderRadius: Radius.full,
    borderWidth: 1,
    borderColor: Colors.primary + '30',
  },
  verifiedText: {
    fontSize: 12,
    color: Colors.primary,
    fontWeight: Typography.semibold,
  },
  infoBanner: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.sm,
    backgroundColor: Colors.primaryLight,
    marginHorizontal: Spacing.base,
    marginBottom: Spacing.md,
    padding: Spacing.md,
    borderRadius: Radius.lg,
    borderLeftWidth: 3,
    borderLeftColor: Colors.primary,
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
  filterRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    paddingHorizontal: Spacing.base,
    marginBottom: Spacing.md,
    flexWrap: 'wrap',
  },
  filterTab: {
    paddingHorizontal: Spacing.md,
    paddingVertical: 7,
    borderRadius: Radius.full,
    borderWidth: 1.5,
    minHeight: 34,
  },
  filterText: {
    fontSize: 13,
    fontWeight: Typography.semibold,
  },
  listContent: {
    paddingHorizontal: Spacing.base,
    paddingBottom: Spacing.xl,
  },
  listLabel: {
    fontSize: Typography.sm,
    color: Colors.textMuted,
    marginBottom: Spacing.sm,
  },
  empty: {
    alignItems: 'center',
    paddingVertical: 64,
    gap: Spacing.sm,
  },
  emptyText: {
    fontSize: Typography.md,
    color: Colors.textSecondary,
  },
  contactFooter: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: Colors.surface,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingTop: Spacing.md,
    paddingHorizontal: Spacing.base,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  contactText: {
    fontSize: 13,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
});
