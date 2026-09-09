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
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAlert } from '@/template';
import { useBookmarks } from '@/contexts/BookmarkContext';
import { Colors, Typography, Spacing, Radius, Shadows } from '@/constants/theme';
import { TEMPLATES } from '@/constants/data';

export default function TemplateDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { showAlert } = useAlert();

  const template = TEMPLATES.find((t) => t.id === id);
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const bookmarked = template ? isBookmarked(template.id) : false;

  if (!template) {
    return (
      <View style={styles.notFound}>
        <MaterialIcons name="error-outline" size={48} color={Colors.textMuted} />
        <Text style={styles.notFoundText}>Template not found</Text>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backBtnText}>Go Back</Text>
        </Pressable>
      </View>
    );
  }

  const difficultyColor = {
    Beginner: Colors.success,
    Intermediate: Colors.warning,
    Advanced: Colors.error,
  }[template.difficulty];

  const handlePlay = () => {
    showAlert(
      'Open In',
      'Choose how to open this visualization:',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: '3D Viewer', style: 'default', onPress: () => router.push({ pathname: '/viewer', params: { id: template!.id } }) },
        { text: 'Media Player', style: 'default', onPress: () => router.push({ pathname: '/player', params: { id: template!.id } }) },
      ]
    );
  };

  const handleShare = () => {
    showAlert('Share Template', 'Sharing options would open here with WhatsApp, Email, and Link copy.', [
      { text: 'OK' }
    ]);
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} bounces={true}>
        {/* Hero Image */}
        <View style={styles.heroContainer}>
          <Image
            source={{ uri: template.image }}
            style={styles.heroImage}
            contentFit="cover"
            transition={300}
          />
          <View style={[styles.heroGradient, { paddingTop: insets.top + 8 }]}>
            <View style={styles.heroTopBar}>
              <Pressable
                onPress={() => router.back()}
                style={({ pressed }) => [styles.iconBtn, pressed && { opacity: 0.7 }]}
              >
                <MaterialIcons name="arrow-back" size={22} color="#fff" />
              </Pressable>
              <View style={styles.heroActions}>
                <Pressable
                  onPress={() => template && toggleBookmark(template)}
                  style={({ pressed }) => [styles.iconBtn, pressed && { opacity: 0.7 }]}
                >
                  <MaterialIcons
                    name={bookmarked ? 'bookmark' : 'bookmark-border'}
                    size={22}
                    color={bookmarked ? '#FFD700' : '#fff'}
                  />
                </Pressable>
                <Pressable
                  onPress={handleShare}
                  style={({ pressed }) => [styles.iconBtn, pressed && { opacity: 0.7 }]}
                >
                  <MaterialIcons name="share" size={22} color="#fff" />
                </Pressable>
              </View>
            </View>
          </View>

          {/* Category Badge */}
          <View style={[styles.categoryBadge, { backgroundColor: template.categoryColor }]}>
            <Text style={styles.categoryBadgeText}>{template.subtitle}</Text>
          </View>
        </View>

        {/* Content */}
        <View style={styles.content}>
          {/* Title & Meta */}
          <Text style={styles.title}>{template.title}</Text>

          <View style={styles.metaRow}>
            <View style={[styles.diffBadge, { backgroundColor: difficultyColor + '20' }]}>
              <Text style={[styles.diffText, { color: difficultyColor }]}>{template.difficulty}</Text>
            </View>
            <View style={styles.metaItem}>
              <MaterialIcons name="schedule" size={14} color={Colors.textMuted} />
              <Text style={styles.metaText}>{template.duration}</Text>
            </View>
            <View style={styles.metaItem}>
              <MaterialIcons name="visibility" size={14} color={Colors.textMuted} />
              <Text style={styles.metaText}>{template.views} views</Text>
            </View>
            <View style={styles.metaItem}>
              <MaterialIcons name="translate" size={14} color={Colors.textMuted} />
              <Text style={styles.metaText}>{template.languages} langs</Text>
            </View>
          </View>

          {/* Description */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Overview</Text>
            <Text style={styles.description}>{template.description}</Text>
          </View>

          {/* Features */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>What You Will See</Text>
            {template.features.map((feature, idx) => (
              <View key={idx} style={styles.featureRow}>
                <View style={[styles.featureDot, { backgroundColor: template.categoryColor }]} />
                <Text style={styles.featureText}>{feature}</Text>
              </View>
            ))}
          </View>

          {/* Platform Info */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Technical Specifications</Text>
            <View style={styles.specsGrid}>
              {[
                { label: 'Resolution', value: 'Up to 4K UHD', icon: 'hd', color: '#FF9800' },
                { label: 'Frame Rate', value: '60 fps', icon: 'speed', color: '#4A90E2' },
                { label: 'Rendering', value: 'PBR + Ray Trace', icon: 'auto-awesome', color: '#9C27B0' },
                { label: 'Format', value: 'Interactive 3D', icon: 'threed-rotation', color: '#7ED321' },
              ].map((spec) => (
                <View key={spec.label} style={styles.specCard}>
                  <MaterialIcons name={spec.icon as any} size={20} color={spec.color} />
                  <Text style={[styles.specValue, { color: spec.color }]}>{spec.value}</Text>
                  <Text style={styles.specLabel}>{spec.label}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Source Verification */}
          <View style={styles.verifiedBanner}>
            <MaterialIcons name="verified" size={20} color={Colors.primary} />
            <View style={{ flex: 1 }}>
              <Text style={styles.verifiedTitle}>Verified & Peer-Reviewed</Text>
              <Text style={styles.verifiedSub}>
                Content verified by WHO, NIH, PubMed sources. For educational & professional use only.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Launch Button */}
      <View style={[styles.launchBar, { paddingBottom: insets.bottom + Spacing.sm }]}>
        <View style={styles.launchInfo}>
          <Text style={styles.launchTitle}>{template.title}</Text>
          <Text style={styles.launchSub}>{template.duration} · {template.difficulty}</Text>
        </View>
        <Pressable
          onPress={handlePlay}
          style={({ pressed }) => [styles.launchBtn, pressed && { opacity: 0.85, transform: [{ scale: 0.97 }] }]}
        >
          <MaterialIcons name="play-arrow" size={22} color="#fff" />
          <Text style={styles.launchBtnText}>Launch</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  notFound: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.md,
    backgroundColor: Colors.background,
  },
  notFoundText: {
    fontSize: Typography.md,
    color: Colors.textSecondary,
  },
  backBtn: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.md,
  },
  backBtnText: {
    color: '#fff',
    fontWeight: Typography.semibold,
  },
  heroContainer: {
    position: 'relative',
    height: 280,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(26, 35, 126, 0.45)',
    padding: Spacing.base,
  },
  heroTopBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heroActions: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryBadge: {
    position: 'absolute',
    bottom: Spacing.base,
    left: Spacing.base,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: Radius.full,
  },
  categoryBadgeText: {
    color: '#fff',
    fontSize: Typography.sm,
    fontWeight: Typography.bold,
  },
  content: {
    padding: Spacing.base,
  },
  title: {
    fontSize: Typography.xxl,
    fontWeight: Typography.bold,
    color: Colors.textPrimary,
    lineHeight: 32,
    marginBottom: Spacing.md,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    flexWrap: 'wrap',
    marginBottom: Spacing.xl,
  },
  diffBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: Radius.full,
  },
  diffText: {
    fontSize: 12,
    fontWeight: Typography.bold,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 13,
    color: Colors.textMuted,
  },
  section: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    fontSize: Typography.md,
    fontWeight: Typography.bold,
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
  },
  description: {
    fontSize: Typography.base,
    color: Colors.textSecondary,
    lineHeight: 26,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  featureDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    flexShrink: 0,
  },
  featureText: {
    fontSize: Typography.base,
    color: Colors.textSecondary,
    flex: 1,
    lineHeight: 22,
  },
  specsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  specCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    borderColor: Colors.border,
    ...Shadows.subtle,
  },
  specValue: {
    fontSize: Typography.sm,
    fontWeight: Typography.bold,
  },
  specLabel: {
    fontSize: 12,
    color: Colors.textMuted,
  },
  verifiedBanner: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.md,
    backgroundColor: Colors.primaryLight,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    borderLeftWidth: 3,
    borderLeftColor: Colors.primary,
    marginBottom: Spacing.xxxl,
  },
  verifiedTitle: {
    fontSize: Typography.base,
    fontWeight: Typography.bold,
    color: Colors.primary,
    marginBottom: 4,
  },
  verifiedSub: {
    fontSize: Typography.sm,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  launchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingTop: Spacing.md,
    paddingHorizontal: Spacing.base,
    gap: Spacing.md,
    ...Shadows.card,
  },
  launchInfo: {
    flex: 1,
  },
  launchTitle: {
    fontSize: Typography.base,
    fontWeight: Typography.bold,
    color: Colors.textPrimary,
    numberOfLines: 1,
  },
  launchSub: {
    fontSize: 12,
    color: Colors.textMuted,
  },
  launchBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    borderRadius: Radius.lg,
    gap: 6,
    ...Shadows.card,
  },
  launchBtnText: {
    color: '#fff',
    fontSize: Typography.base,
    fontWeight: Typography.bold,
  },
});
