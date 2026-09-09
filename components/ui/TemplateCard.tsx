import React, { memo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, Radius, Shadows } from '@/constants/theme';
import { Template } from '@/constants/data';

interface TemplateCardProps {
  template: Template;
  onPress: () => void;
  compact?: boolean;
}

export const TemplateCard = memo(({ template, onPress, compact }: TemplateCardProps) => {
  const difficultyColor = {
    Beginner: Colors.success,
    Intermediate: Colors.warning,
    Advanced: Colors.error,
  }[template.difficulty];

  if (compact) {
    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          styles.compactCard,
          pressed && { opacity: 0.85, transform: [{ scale: 0.98 }] },
        ]}
      >
        <Image
          source={{ uri: template.image }}
          style={styles.compactImage}
          contentFit="cover"
          transition={200}
        />
        <View style={styles.compactContent}>
          <View style={[styles.categoryDot, { backgroundColor: template.categoryColor }]} />
          <Text style={styles.compactSubtitle} numberOfLines={1}>{template.subtitle}</Text>
          <Text style={styles.compactTitle} numberOfLines={2}>{template.title}</Text>
          <View style={styles.metaRow}>
            <MaterialIcons name="schedule" size={12} color={Colors.textMuted} />
            <Text style={styles.metaText}>{template.duration}</Text>
            <MaterialIcons name="visibility" size={12} color={Colors.textMuted} style={{ marginLeft: 8 }} />
            <Text style={styles.metaText}>{template.views}</Text>
          </View>
        </View>
      </Pressable>
    );
  }

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        pressed && { opacity: 0.9, transform: [{ scale: 0.98 }] },
      ]}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: template.image }}
          style={styles.image}
          contentFit="cover"
          transition={200}
        />
        <View style={[styles.categoryBadge, { backgroundColor: template.categoryColor }]}>
          <Text style={styles.categoryBadgeText}>{template.subtitle}</Text>
        </View>
        {template.isFeatured && (
          <View style={styles.featuredBadge}>
            <MaterialIcons name="star" size={12} color="#fff" />
            <Text style={styles.featuredText}>Featured</Text>
          </View>
        )}
      </View>

      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>{template.title}</Text>
        <Text style={styles.description} numberOfLines={2}>{template.description}</Text>

        <View style={styles.footer}>
          <View style={styles.metaItems}>
            <View style={styles.metaItem}>
              <MaterialIcons name="schedule" size={13} color={Colors.textMuted} />
              <Text style={styles.metaText}>{template.duration}</Text>
            </View>
            <View style={styles.metaItem}>
              <MaterialIcons name="translate" size={13} color={Colors.textMuted} />
              <Text style={styles.metaText}>{template.languages} langs</Text>
            </View>
            <View style={styles.metaItem}>
              <MaterialIcons name="visibility" size={13} color={Colors.textMuted} />
              <Text style={styles.metaText}>{template.views}</Text>
            </View>
          </View>

          <View style={[styles.diffBadge, { backgroundColor: difficultyColor + '20' }]}>
            <Text style={[styles.diffText, { color: difficultyColor }]}>{template.difficulty}</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    marginBottom: Spacing.md,
    overflow: 'hidden',
    ...Shadows.card,
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 160,
  },
  categoryBadge: {
    position: 'absolute',
    bottom: Spacing.sm,
    left: Spacing.sm,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: Radius.full,
  },
  categoryBadgeText: {
    color: '#fff',
    fontSize: Typography.xs,
    fontWeight: Typography.semibold,
  },
  featuredBadge: {
    position: 'absolute',
    top: Spacing.sm,
    right: Spacing.sm,
    backgroundColor: '#FFD700',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: Radius.full,
    gap: 3,
  },
  featuredText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: Typography.bold,
  },
  content: {
    padding: Spacing.md,
  },
  title: {
    fontSize: Typography.base,
    fontWeight: Typography.bold,
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
    lineHeight: 22,
  },
  description: {
    fontSize: Typography.sm,
    color: Colors.textSecondary,
    lineHeight: 20,
    marginBottom: Spacing.md,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  metaItems: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  metaText: {
    fontSize: 12,
    color: Colors.textMuted,
  },
  diffBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 3,
    borderRadius: Radius.full,
  },
  diffText: {
    fontSize: 11,
    fontWeight: Typography.semibold,
  },
  // Compact styles
  compactCard: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    overflow: 'hidden',
    width: 200,
    marginRight: Spacing.md,
    ...Shadows.card,
  },
  compactImage: {
    width: '100%',
    height: 120,
  },
  compactContent: {
    padding: Spacing.sm,
  },
  categoryDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginBottom: 4,
  },
  compactSubtitle: {
    fontSize: 11,
    color: Colors.textMuted,
    marginBottom: 2,
  },
  compactTitle: {
    fontSize: Typography.sm,
    fontWeight: Typography.bold,
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
    lineHeight: 18,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
});
