import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native';
import { Image } from 'expo-image';
import { MaterialIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Colors, Typography, Spacing, Radius, Shadows } from '@/constants/theme';
import { TEMPLATES, CATEGORIES, STATS } from '@/constants/data';
import { TemplateCard, StatCard } from '@/components';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const featured = TEMPLATES.filter((t) => t.isFeatured);
  const recent = TEMPLATES.slice(0, 4);

  const handleTemplatePress = (id: string) => {
    router.push({ pathname: '/template-detail', params: { id } });
  };

  return (
    <ScrollView
      style={[styles.container, { paddingTop: insets.top }]}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 24 }}
    >
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerLabel}>MEDI+SCI VISUALS</Text>
          <Text style={styles.headerTitle}>Medical & Scientific{'\n'}Visualization</Text>
        </View>
        <View style={styles.logoBox}>
          <MaterialIcons name="biotech" size={28} color={Colors.primary} />
        </View>
      </View>

      {/* Search Bar (Tap to open full search) */}
      <Pressable
        style={({ pressed }) => [styles.searchContainer, pressed && { opacity: 0.85 }]}
        onPress={() => router.push('/search')}
      >
        <MaterialIcons name="search" size={20} color={Colors.textMuted} />
        <Text style={styles.searchPlaceholder}>Search templates, anatomy, chemistry...</Text>
        <MaterialIcons name="tune" size={18} color={Colors.primary} />
      </Pressable>

      {/* Quick Actions Row */}
      <View style={styles.quickActionsRow}>
        <Pressable
          onPress={() => router.push('/quiz')}
          style={({ pressed }) => [styles.quickAction, { backgroundColor: '#FCE4EC' }, pressed && { opacity: 0.85 }]}
        >
          <MaterialIcons name="quiz" size={22} color="#E91E63" />
          <Text style={[styles.quickActionText, { color: '#E91E63' }]}>Quiz</Text>
        </Pressable>
        <Pressable
          onPress={() => router.push('/search')}
          style={({ pressed }) => [styles.quickAction, { backgroundColor: Colors.primaryLight }, pressed && { opacity: 0.85 }]}
        >
          <MaterialIcons name="filter-list" size={22} color={Colors.primary} />
          <Text style={[styles.quickActionText, { color: Colors.primary }]}>Filter</Text>
        </Pressable>
        <Pressable
          onPress={() => router.push({ pathname: '/viewer', params: { id: 't1' } })}
          style={({ pressed }) => [styles.quickAction, { backgroundColor: Colors.secondaryLight }, pressed && { opacity: 0.85 }]}
        >
          <MaterialIcons name="threed-rotation" size={22} color={Colors.secondary} />
          <Text style={[styles.quickActionText, { color: Colors.secondary }]}>3D View</Text>
        </Pressable>
        <Pressable
          onPress={() => router.push({ pathname: '/player', params: { id: 't1' } })}
          style={({ pressed }) => [styles.quickAction, { backgroundColor: '#FFF3E0' }, pressed && { opacity: 0.85 }]}
        >
          <MaterialIcons name="play-circle" size={22} color="#FF9800" />
          <Text style={[styles.quickActionText, { color: '#FF9800' }]}>Player</Text>
        </Pressable>
      </View>

      {/* Hero Banner */}
      <View style={styles.heroBanner}>
        <Image
          source={require('@/assets/images/hero-banner.png')}
          style={styles.heroImage}
          contentFit="cover"
          transition={300}
        />
        <View style={styles.heroOverlay}>
          <View style={styles.heroBadge}>
            <MaterialIcons name="verified" size={12} color={Colors.secondary} />
            <Text style={styles.heroBadgeText}>WHO & NIH Verified Sources</Text>
          </View>
          <Text style={styles.heroTitle}>Professional{'\n'}Medical Visuals</Text>
          <Text style={styles.heroSubtitle}>200+ 3D animations in 12 languages</Text>
          <Pressable
            style={({ pressed }) => [styles.heroBtn, pressed && { opacity: 0.85 }]}
            onPress={() => router.push('/(tabs)/templates')}
          >
            <Text style={styles.heroBtnText}>Explore Templates</Text>
            <MaterialIcons name="arrow-forward" size={16} color="#fff" />
          </Pressable>
        </View>
      </View>

      {/* Stats Row */}
      <View style={styles.statsRow}>
        {STATS.map((stat) => (
          <StatCard
            key={stat.label}
            label={stat.label}
            value={stat.value}
            icon={stat.icon}
            color={stat.color}
          />
        ))}
      </View>

      {/* Featured Templates */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Featured Templates</Text>
          <Pressable onPress={() => router.push('/(tabs)/templates')}>
            <Text style={styles.seeAll}>See All</Text>
          </Pressable>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={{ flexDirection: 'row', paddingRight: Spacing.base }}>
            {featured.map((t) => (
              <TemplateCard
                key={t.id}
                template={t}
                onPress={() => handleTemplatePress(t.id)}
                compact
              />
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Categories Quick Access */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Browse by System</Text>
        <View style={styles.categoriesGrid}>
          {CATEGORIES.slice(0, 6).map((cat) => (
            <Pressable
              key={cat.id}
              style={({ pressed }) => [
                styles.categoryBox,
                { backgroundColor: cat.bgColor, borderColor: cat.color + '30' },
                pressed && { opacity: 0.8, transform: [{ scale: 0.97 }] },
              ]}
              onPress={() => router.push('/(tabs)/templates')}
            >
              <MaterialIcons name={cat.icon as any} size={24} color={cat.color} />
              <Text style={[styles.categoryBoxTitle, { color: cat.color }]} numberOfLines={2}>
                {cat.title}
              </Text>
              <Text style={[styles.categoryBoxCount, { color: cat.color + 'AA' }]}>
                {cat.count} visuals
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      {/* Recent Templates */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>All Templates</Text>
          <Pressable onPress={() => router.push('/(tabs)/templates')}>
            <Text style={styles.seeAll}>See All</Text>
          </Pressable>
        </View>
        {recent.map((t) => (
          <TemplateCard key={t.id} template={t} onPress={() => handleTemplatePress(t.id)} />
        ))}
      </View>

      {/* Footer Credit */}
      <View style={styles.footerCredit}>
        <MaterialIcons name="local-hospital" size={16} color={Colors.primary} />
        <Text style={styles.footerText}>
          Vision by Dr M Irfan Qadir Thaheem · SMART WORLD ORDER
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: Spacing.base,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: Spacing.md,
    marginBottom: Spacing.base,
  },
  headerLabel: {
    fontSize: 11,
    color: Colors.primary,
    fontWeight: '700',
    letterSpacing: 1.5,
    marginBottom: 4,
  },
  headerTitle: {
    fontSize: Typography.xl,
    fontWeight: Typography.bold,
    color: Colors.textPrimary,
    lineHeight: 28,
  },
  logoBox: {
    width: 50,
    height: 50,
    backgroundColor: Colors.primaryLight,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: Colors.primary + '30',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    marginBottom: Spacing.sm,
    ...Shadows.subtle,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: Spacing.sm,
  },
  searchPlaceholder: {
    flex: 1,
    fontSize: Typography.base,
    color: Colors.textMuted,
  },
  quickActionsRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginBottom: Spacing.base,
  },
  quickAction: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingVertical: Spacing.md,
    borderRadius: Radius.lg,
  },
  quickActionText: {
    fontSize: 11,
    fontWeight: Typography.bold,
  },
  heroBanner: {
    borderRadius: Radius.xl,
    overflow: 'hidden',
    marginBottom: Spacing.base,
    height: 200,
    ...Shadows.strong,
  },
  heroImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  heroOverlay: {
    flex: 1,
    backgroundColor: 'rgba(26, 35, 126, 0.72)',
    padding: Spacing.base,
    justifyContent: 'flex-end',
  },
  heroBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: Spacing.sm,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: Radius.full,
  },
  heroBadgeText: {
    color: Colors.secondary,
    fontSize: 11,
    fontWeight: '600',
  },
  heroTitle: {
    fontSize: Typography.xxl,
    fontWeight: Typography.bold,
    color: '#fff',
    lineHeight: 32,
    marginBottom: 4,
  },
  heroSubtitle: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: Typography.sm,
    marginBottom: Spacing.md,
  },
  heroBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    alignSelf: 'flex-start',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.md,
    gap: 6,
  },
  heroBtnText: {
    color: '#fff',
    fontSize: Typography.sm,
    fontWeight: Typography.semibold,
  },
  statsRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginBottom: Spacing.base,
  },
  section: {
    marginBottom: Spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    fontSize: Typography.md,
    fontWeight: Typography.bold,
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
  },
  seeAll: {
    fontSize: Typography.sm,
    color: Colors.primary,
    fontWeight: Typography.semibold,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  categoryBox: {
    width: '31%',
    borderRadius: Radius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    alignItems: 'center',
    gap: 6,
  },
  categoryBoxTitle: {
    fontSize: 12,
    fontWeight: Typography.bold,
    textAlign: 'center',
    lineHeight: 16,
  },
  categoryBoxCount: {
    fontSize: 11,
    textAlign: 'center',
  },
  footerCredit: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    paddingVertical: Spacing.base,
    backgroundColor: Colors.primaryLight,
    borderRadius: Radius.lg,
    marginBottom: Spacing.base,
  },
  footerText: {
    fontSize: 12,
    color: Colors.primary,
    fontWeight: '500',
  },
});
