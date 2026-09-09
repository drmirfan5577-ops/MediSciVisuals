import React, { memo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, Radius } from '@/constants/theme';

interface CategoryChipProps {
  title: string;
  icon: string;
  color: string;
  bgColor: string;
  count: number;
  isSelected: boolean;
  onPress: () => void;
}

export const CategoryChip = memo(({
  title, icon, color, bgColor, count, isSelected, onPress,
}: CategoryChipProps) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.chip,
        isSelected && { backgroundColor: color, borderColor: color },
        !isSelected && { backgroundColor: bgColor, borderColor: bgColor },
        pressed && { opacity: 0.8, transform: [{ scale: 0.97 }] },
      ]}
    >
      <MaterialIcons
        name={icon as any}
        size={16}
        color={isSelected ? '#fff' : color}
        style={styles.icon}
      />
      <Text style={[styles.label, { color: isSelected ? '#fff' : color }]}>
        {title}
      </Text>
      <View style={[styles.count, { backgroundColor: isSelected ? 'rgba(255,255,255,0.3)' : color + '20' }]}>
        <Text style={[styles.countText, { color: isSelected ? '#fff' : color }]}>{count}</Text>
      </View>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: Radius.full,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderWidth: 1.5,
    marginRight: Spacing.sm,
    gap: 6,
    minHeight: 40,
  },
  icon: {},
  label: {
    fontSize: Typography.sm,
    fontWeight: '600',
  },
  count: {
    borderRadius: Radius.full,
    paddingHorizontal: 6,
    paddingVertical: 1,
  },
  countText: {
    fontSize: 11,
    fontWeight: '700',
  },
});
