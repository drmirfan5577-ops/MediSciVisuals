import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Colors, Typography, Spacing, Radius, Shadows } from '@/constants/theme';
import { TemplateCard } from '@/components';
import { useBookmarks } from '@/contexts/BookmarkContext';

export default function SavedScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { bookmarks, clearBookmarks } = useBookmarks();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerIcon}>
          <MaterialIcons name="bookmark" size={22} color="#FFD700" />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.headerTitle}>Saved Templates</Text>
          <Text style={styles.headerSub}>{bookmarks.length} bookmarked</Text>
        </View>
        {bookmarks.length > 0 && (
          <Pressable onPress={clearBookmarks} style={styles.clearBtn} hitSlop={8}>
            <MaterialIcons name="delete-sweep" size={18} color={Colors.error} />
            <Text style={styles.clearBtnText}>Clear</Text>
          </Pressable>
        )}
      </View>

      <FlatList
        data={bookmarks}
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
            <View style={styles.emptyIcon}>
              <MaterialIcons name="bookmark-border" size={52} color={Colors.textMuted} />
            </View>
            <Text style={styles.emptyTitle}>No Saved Templates</Text>
            <Text style={styles.emptySubtext}>
              Tap the bookmark icon on any template to save it here for quick access.
            </Text>
            <Pressable
              onPress={() => router.push('/(tabs)/templates')}
              style={styles.browseBtn}
            >
              <MaterialIcons name="explore" size={18} color="#fff" />
              <Text style={styles.browseBtnText}>Browse Templates</Text>
            </Pressable>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
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
    backgroundColor: '#FFF8E1',
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: Typography.xl,
    fontWeight: Typography.bold,
    color: Colors.textPrimary,
  },
  headerSub: {
    fontSize: Typography.sm,
    color: Colors.textMuted,
  },
  clearBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 6,
    backgroundColor: Colors.error + '12',
    borderRadius: Radius.full,
  },
  clearBtnText: {
    fontSize: 13,
    color: Colors.error,
    fontWeight: Typography.semibold,
  },
  list: {
    paddingHorizontal: Spacing.base,
    paddingBottom: Spacing.xxxl,
  },
  empty: {
    alignItems: 'center',
    paddingVertical: 64,
    paddingHorizontal: Spacing.xl,
    gap: Spacing.md,
  },
  emptyIcon: {
    width: 96,
    height: 96,
    backgroundColor: Colors.primaryLight,
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.sm,
  },
  emptyTitle: {
    fontSize: Typography.lg,
    fontWeight: Typography.bold,
    color: Colors.textSecondary,
  },
  emptySubtext: {
    fontSize: Typography.sm,
    color: Colors.textMuted,
    textAlign: 'center',
    lineHeight: 22,
  },
  browseBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    borderRadius: Radius.lg,
    marginTop: Spacing.sm,
    ...Shadows.card,
  },
  browseBtnText: {
    color: '#fff',
    fontSize: Typography.base,
    fontWeight: Typography.bold,
  },
});
