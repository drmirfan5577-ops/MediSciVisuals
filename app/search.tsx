import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  Pressable,
  ScrollView,
  Modal,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Colors, Typography, Spacing, Radius, Shadows } from '@/constants/theme';
import { TEMPLATES, CATEGORIES } from '@/constants/data';
import { TemplateCard } from '@/components';

type Difficulty = 'All' | 'Beginner' | 'Intermediate' | 'Advanced';
type SortOption = 'Relevant' | 'Popular' | 'Duration' | 'A-Z';

const DIFFICULTIES: Difficulty[] = ['All', 'Beginner', 'Intermediate', 'Advanced'];
const SORT_OPTIONS: SortOption[] = ['Relevant', 'Popular', 'Duration', 'A-Z'];
const LANG_OPTIONS = [0, 8, 10, 12];

const DIFF_COLORS: Record<Difficulty, string> = {
  All: Colors.primary,
  Beginner: Colors.success,
  Intermediate: Colors.warning,
  Advanced: Colors.error,
};

export default function SearchScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const [query, setQuery] = useState('');
  const [selectedDiff, setSelectedDiff] = useState<Difficulty>('All');
  const [selectedCats, setSelectedCats] = useState<string[]>([]);
  const [minLangs, setMinLangs] = useState(0);
  const [sortBy, setSortBy] = useState<SortOption>('Relevant');
  const [showFilters, setShowFilters] = useState(false);

  const toggleCat = (id: string) => {
    setSelectedCats((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const activeFilterCount =
    (selectedDiff !== 'All' ? 1 : 0) +
    selectedCats.length +
    (minLangs > 0 ? 1 : 0) +
    (sortBy !== 'Relevant' ? 1 : 0);

  const results = useMemo(() => {
    let list = [...TEMPLATES];

    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.subtitle.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q)
      );
    }
    if (selectedDiff !== 'All') {
      list = list.filter((t) => t.difficulty === selectedDiff);
    }
    if (selectedCats.length > 0) {
      list = list.filter((t) => selectedCats.includes(t.category));
    }
    if (minLangs > 0) {
      list = list.filter((t) => t.languages >= minLangs);
    }

    switch (sortBy) {
      case 'Popular':
        list = list.sort((a, b) => parseFloat(b.views) - parseFloat(a.views));
        break;
      case 'Duration':
        list = list.sort((a, b) => parseInt(a.duration) - parseInt(b.duration));
        break;
      case 'A-Z':
        list = list.sort((a, b) => a.title.localeCompare(b.title));
        break;
    }

    return list;
  }, [query, selectedDiff, selectedCats, minLangs, sortBy]);

  const resetFilters = () => {
    setSelectedDiff('All');
    setSelectedCats([]);
    setMinLangs(0);
    setSortBy('Relevant');
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Search Bar Row */}
      <View style={styles.searchRow}>
        <Pressable onPress={() => router.back()} hitSlop={8} style={styles.backBtn}>
          <MaterialIcons name="arrow-back" size={22} color={Colors.textPrimary} />
        </Pressable>

        <View style={styles.searchBox}>
          <MaterialIcons name="search" size={20} color={Colors.textMuted} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search templates, body systems..."
            placeholderTextColor={Colors.textMuted}
            value={query}
            onChangeText={setQuery}
            autoFocus
          />
          {query.length > 0 && (
            <Pressable onPress={() => setQuery('')} hitSlop={8}>
              <MaterialIcons name="close" size={18} color={Colors.textMuted} />
            </Pressable>
          )}
        </View>

        <Pressable
          onPress={() => setShowFilters(true)}
          style={[styles.filterBtn, activeFilterCount > 0 && { backgroundColor: Colors.primary }]}
        >
          <MaterialIcons
            name="tune"
            size={20}
            color={activeFilterCount > 0 ? '#fff' : Colors.textSecondary}
          />
          {activeFilterCount > 0 && (
            <View style={styles.filterBadge}>
              <Text style={styles.filterBadgeText}>{activeFilterCount}</Text>
            </View>
          )}
        </Pressable>
      </View>

      {/* Quick Filters */}
      <View style={styles.quickRow}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.quickScroll}>
          {DIFFICULTIES.map((d) => {
            const active = d === selectedDiff;
            const color = DIFF_COLORS[d];
            return (
              <Pressable
                key={d}
                onPress={() => setSelectedDiff(d)}
                style={[
                  styles.quickChip,
                  active && { backgroundColor: color, borderColor: color },
                  !active && { borderColor: Colors.border },
                ]}
              >
                <Text style={[styles.quickChipText, { color: active ? '#fff' : Colors.textSecondary }]}>
                  {d}
                </Text>
              </Pressable>
            );
          })}
          {CATEGORIES.slice(0, 4).map((c) => {
            const active = selectedCats.includes(c.id);
            return (
              <Pressable
                key={c.id}
                onPress={() => toggleCat(c.id)}
                style={[
                  styles.quickChip,
                  active && { backgroundColor: c.color, borderColor: c.color },
                  !active && { borderColor: Colors.border },
                ]}
              >
                <MaterialIcons name={c.icon as any} size={13} color={active ? '#fff' : c.color} />
                <Text style={[styles.quickChipText, { color: active ? '#fff' : Colors.textSecondary }]}>
                  {c.title}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      {/* Results Bar */}
      <View style={styles.resultsBar}>
        <Text style={styles.resultsText}>
          <Text style={styles.resultsCount}>{results.length}</Text> results
          {query ? ` for "${query}"` : ''}
        </Text>
        <Pressable
          onPress={() => setSortBy(SORT_OPTIONS[(SORT_OPTIONS.indexOf(sortBy) + 1) % SORT_OPTIONS.length])}
          style={styles.sortBtn}
        >
          <MaterialIcons name="sort" size={14} color={Colors.primary} />
          <Text style={styles.sortText}>{sortBy}</Text>
        </Pressable>
      </View>

      {/* Results */}
      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TemplateCard
            template={item}
            onPress={() => router.push({ pathname: '/template-detail', params: { id: item.id } })}
          />
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <MaterialIcons name="search-off" size={56} color={Colors.textMuted} />
            <Text style={styles.emptyTitle}>No results found</Text>
            <Text style={styles.emptySubtext}>Try adjusting your search or filters</Text>
            {activeFilterCount > 0 && (
              <Pressable onPress={resetFilters} style={styles.clearBtn}>
                <Text style={styles.clearBtnText}>Clear All Filters</Text>
              </Pressable>
            )}
          </View>
        }
      />

      {/* Filter Modal */}
      <Modal visible={showFilters} animationType="slide" presentationStyle="pageSheet" onRequestClose={() => setShowFilters(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Advanced Filters</Text>
            <Pressable onPress={resetFilters}>
              <Text style={styles.resetText}>Reset All</Text>
            </Pressable>
          </View>

          <ScrollView contentContainerStyle={styles.modalScroll}>
            {/* Difficulty */}
            <Text style={styles.filterSection}>Difficulty Level</Text>
            <View style={styles.filterChips}>
              {DIFFICULTIES.map((d) => {
                const active = d === selectedDiff;
                const color = DIFF_COLORS[d];
                return (
                  <Pressable
                    key={d}
                    onPress={() => setSelectedDiff(d)}
                    style={[styles.filterChip, active && { backgroundColor: color, borderColor: color }]}
                  >
                    <Text style={[styles.filterChipText, { color: active ? '#fff' : Colors.textSecondary }]}>{d}</Text>
                  </Pressable>
                );
              })}
            </View>

            {/* Categories */}
            <Text style={styles.filterSection}>Body System / Category</Text>
            <View style={styles.filterChips}>
              {CATEGORIES.map((c) => {
                const active = selectedCats.includes(c.id);
                return (
                  <Pressable
                    key={c.id}
                    onPress={() => toggleCat(c.id)}
                    style={[styles.filterChip, active && { backgroundColor: c.color, borderColor: c.color }]}
                  >
                    <MaterialIcons name={c.icon as any} size={14} color={active ? '#fff' : c.color} />
                    <Text style={[styles.filterChipText, { color: active ? '#fff' : Colors.textSecondary }]}>{c.title}</Text>
                  </Pressable>
                );
              })}
            </View>

            {/* Languages */}
            <Text style={styles.filterSection}>Minimum Language Support</Text>
            <View style={styles.filterChips}>
              {LANG_OPTIONS.map((l) => {
                const active = minLangs === l;
                return (
                  <Pressable
                    key={l}
                    onPress={() => setMinLangs(l)}
                    style={[styles.filterChip, active && { backgroundColor: Colors.primary, borderColor: Colors.primary }]}
                  >
                    <MaterialIcons name="translate" size={14} color={active ? '#fff' : Colors.primary} />
                    <Text style={[styles.filterChipText, { color: active ? '#fff' : Colors.textSecondary }]}>
                      {l === 0 ? 'Any' : `${l}+ Languages`}
                    </Text>
                  </Pressable>
                );
              })}
            </View>

            {/* Sort */}
            <Text style={styles.filterSection}>Sort By</Text>
            <View style={styles.filterChips}>
              {SORT_OPTIONS.map((s) => {
                const active = sortBy === s;
                return (
                  <Pressable
                    key={s}
                    onPress={() => setSortBy(s)}
                    style={[styles.filterChip, active && { backgroundColor: '#607D8B', borderColor: '#607D8B' }]}
                  >
                    <Text style={[styles.filterChipText, { color: active ? '#fff' : Colors.textSecondary }]}>{s}</Text>
                  </Pressable>
                );
              })}
            </View>
          </ScrollView>

          <View style={[styles.modalFooter, { paddingBottom: insets.bottom + Spacing.base }]}>
            <Pressable
              onPress={() => setShowFilters(false)}
              style={styles.applyBtn}
            >
              <Text style={styles.applyBtnText}>Show {results.length} Results</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    paddingHorizontal: Spacing.base,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.sm,
  },
  backBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: Spacing.sm,
    ...Shadows.subtle,
  },
  searchInput: {
    flex: 1,
    fontSize: Typography.base,
    color: Colors.textPrimary,
    paddingVertical: 4,
  },
  filterBtn: {
    width: 44,
    height: 44,
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  filterBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: Colors.error,
    width: 16,
    height: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterBadgeText: { fontSize: 10, color: '#fff', fontWeight: '700' },
  quickRow: { marginBottom: Spacing.sm },
  quickScroll: { paddingHorizontal: Spacing.base, gap: Spacing.sm, flexDirection: 'row', alignItems: 'center' },
  quickChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: Radius.full,
    borderWidth: 1.5,
    backgroundColor: Colors.surface,
  },
  quickChipText: { fontSize: 13, fontWeight: Typography.semibold },
  resultsBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.base,
    marginBottom: Spacing.sm,
  },
  resultsText: { fontSize: Typography.sm, color: Colors.textSecondary },
  resultsCount: { fontWeight: Typography.bold, color: Colors.textPrimary },
  sortBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 5,
    borderRadius: Radius.full,
  },
  sortText: { fontSize: 12, color: Colors.primary, fontWeight: Typography.semibold },
  list: { paddingHorizontal: Spacing.base, paddingBottom: Spacing.xxxl },
  empty: { alignItems: 'center', paddingVertical: 64, gap: Spacing.sm },
  emptyTitle: { fontSize: Typography.md, fontWeight: Typography.bold, color: Colors.textSecondary },
  emptySubtext: { fontSize: Typography.sm, color: Colors.textMuted },
  clearBtn: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.md,
    marginTop: Spacing.sm,
  },
  clearBtnText: { color: '#fff', fontWeight: Typography.semibold },
  // Modal
  modalContainer: { flex: 1, backgroundColor: Colors.background },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.base,
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  modalTitle: { fontSize: Typography.lg, fontWeight: Typography.bold, color: Colors.textPrimary },
  resetText: { fontSize: Typography.sm, color: Colors.error, fontWeight: Typography.semibold },
  modalScroll: { padding: Spacing.base, paddingBottom: 100 },
  filterSection: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginTop: Spacing.xl,
    marginBottom: Spacing.sm,
  },
  filterChips: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: Radius.full,
    borderWidth: 1.5,
    backgroundColor: Colors.surface,
    borderColor: Colors.border,
  },
  filterChipText: { fontSize: Typography.sm, fontWeight: Typography.semibold },
  modalFooter: {
    padding: Spacing.base,
    backgroundColor: Colors.surface,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  applyBtn: {
    backgroundColor: Colors.primary,
    borderRadius: Radius.lg,
    paddingVertical: Spacing.md,
    alignItems: 'center',
    ...Shadows.card,
  },
  applyBtnText: { color: '#fff', fontSize: Typography.base, fontWeight: Typography.bold },
});
