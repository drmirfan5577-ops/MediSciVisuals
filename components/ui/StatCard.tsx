import React, { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, Radius, Shadows } from '@/constants/theme';

interface StatCardProps {
  label: string;
  value: string;
  icon: string;
  color: string;
}

export const StatCard = memo(({ label, value, icon, color }: StatCardProps) => (
  <View style={styles.card}>
    <View style={[styles.iconBox, { backgroundColor: color + '18' }]}>
      <MaterialIcons name={icon as any} size={22} color={color} />
    </View>
    <Text style={[styles.value, { color }]}>{value}</Text>
    <Text style={styles.label}>{label}</Text>
  </View>
));

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    alignItems: 'center',
    ...Shadows.subtle,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.xs,
  },
  value: {
    fontSize: Typography.lg,
    fontWeight: Typography.bold,
    marginBottom: 2,
  },
  label: {
    fontSize: 11,
    color: Colors.textMuted,
    textAlign: 'center',
    fontWeight: '500',
  },
});
