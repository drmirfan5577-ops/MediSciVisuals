import React, { memo } from 'react';
import { Linking, Pressable, StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, Radius, Shadows } from '@/constants/theme';
import { Resource } from '@/constants/data';

interface ResourceCardProps {
  resource: Resource;
}

const TYPE_COLORS: Record<string, string> = {
  Website: '#4A90E2',
  Journal: '#E91E63',
  Organization: '#7ED321',
  Repository: '#FF9800',
};

export const ResourceCard = memo(({ resource }: ResourceCardProps) => {
  const typeColor = TYPE_COLORS[resource.type] || Colors.primary;

  const handleOpen = () => {
    Linking.openURL(resource.url).catch(() => {});
  };

  return (
    <Pressable
      onPress={handleOpen}
      style={({ pressed }) => [
        styles.card,
        pressed && { opacity: 0.88, transform: [{ scale: 0.99 }] },
      ]}
    >
      <View style={[styles.iconBox, { backgroundColor: resource.color + '18' }]}>
        <MaterialIcons name={resource.icon as any} size={24} color={resource.color} />
      </View>

      <View style={styles.content}>
        <View style={styles.topRow}>
          <Text style={styles.title} numberOfLines={1}>{resource.title}</Text>
          {resource.verified && (
            <MaterialIcons name="verified" size={16} color={Colors.primary} />
          )}
        </View>

        <View style={styles.typeBadge}>
          <Text style={[styles.typeText, { color: typeColor }]}>{resource.type}</Text>
        </View>

        <Text style={styles.description} numberOfLines={2}>{resource.description}</Text>

        <View style={styles.urlRow}>
          <MaterialIcons name="link" size={13} color={Colors.primary} />
          <Text style={styles.urlText} numberOfLines={1}>{resource.url}</Text>
        </View>
      </View>

      <MaterialIcons name="open-in-new" size={18} color={Colors.textMuted} style={styles.arrow} />
    </Pressable>
  );
});

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: Spacing.md,
    ...Shadows.subtle,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
    flexShrink: 0,
  },
  content: {
    flex: 1,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  title: {
    fontSize: Typography.base,
    fontWeight: Typography.bold,
    color: Colors.textPrimary,
    flex: 1,
  },
  typeBadge: {
    marginBottom: 6,
  },
  typeText: {
    fontSize: 11,
    fontWeight: Typography.semibold,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  description: {
    fontSize: Typography.sm,
    color: Colors.textSecondary,
    lineHeight: 19,
    marginBottom: 6,
  },
  urlRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  urlText: {
    fontSize: 12,
    color: Colors.primary,
    flex: 1,
  },
  arrow: {
    marginLeft: Spacing.sm,
    marginTop: 2,
  },
});
