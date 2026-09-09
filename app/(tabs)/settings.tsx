import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Switch,
  Modal,
  FlatList,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useAlert } from '@/template';
import { Colors, Typography, Spacing, Radius, Shadows } from '@/constants/theme';
import { LANGUAGES } from '@/constants/data';

export default function SettingsScreen() {
  const insets = useSafeAreaInsets();
  const { showAlert } = useAlert();

  const [selectedLang, setSelectedLang] = useState('en');
  const [voiceOverEnabled, setVoiceOverEnabled] = useState(true);
  const [subtitlesEnabled, setSubtitlesEnabled] = useState(true);
  const [autoPlayEnabled, setAutoPlayEnabled] = useState(false);
  const [hqRenderEnabled, setHqRenderEnabled] = useState(true);
  const [showLangModal, setShowLangModal] = useState(false);

  const currentLang = LANGUAGES.find((l) => l.code === selectedLang);

  const QUALITY_OPTIONS = ['480p (SD)', '720p (HD)', '1080p (Full HD)', '4K UHD', '8K Ultra'];
  const [selectedQuality, setSelectedQuality] = useState('1080p (Full HD)');

  const VOICE_OPTIONS = ['Urdu (Pakistani)', 'English (International)'];
  const [selectedVoice, setSelectedVoice] = useState('English (International)');

  const handleAbout = () => {
    showAlert(
      'Medi+Sci Visuals Generator',
      'Version 1.0 Enterprise Edition\n\nVision by Dr M Irfan Qadir Thaheem\nSMART WORLD ORDER\n\nPhilosophy: "In this world nothing is impossible, you just have to fulfill the requirements according to the destination."',
      [{ text: 'OK', style: 'default' }]
    );
  };

  const handleContact = () => {
    showAlert(
      'Contact Information',
      'Email: dr.mirfan5577@gmail.com\nWhatsApp: 0300-4737757\nWeb: drmirfan5577-ops.github.io/SmartWorldOrder',
      [{ text: 'Close', style: 'cancel' }]
    );
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>

        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerIcon}>
            <MaterialIcons name="tune" size={22} color={Colors.primary} />
          </View>
          <View>
            <Text style={styles.headerTitle}>Settings</Text>
            <Text style={styles.headerSub}>Customize your experience</Text>
          </View>
        </View>

        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.profileAvatar}>
            <MaterialIcons name="account-circle" size={40} color={Colors.primary} />
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Dr M Irfan Qadir Thaheem</Text>
            <Text style={styles.profileRole}>Professional Edition</Text>
            <View style={styles.profileBadge}>
              <MaterialIcons name="star" size={12} color="#FFD700" />
              <Text style={styles.profileBadgeText}>SMART WORLD ORDER</Text>
            </View>
          </View>
        </View>

        {/* Language Section */}
        <SectionHeader title="Language & Subtitles" icon="translate" />

        <View style={styles.card}>
          <Pressable
            style={({ pressed }) => [styles.settingRow, pressed && { opacity: 0.75 }]}
            onPress={() => setShowLangModal(true)}
          >
            <View style={styles.settingLeft}>
              <View style={[styles.settingIcon, { backgroundColor: Colors.primaryLight }]}>
                <MaterialIcons name="language" size={20} color={Colors.primary} />
              </View>
              <View>
                <Text style={styles.settingLabel}>Content Language</Text>
                <Text style={styles.settingValue}>{currentLang?.flag} {currentLang?.name}</Text>
              </View>
            </View>
            <MaterialIcons name="chevron-right" size={20} color={Colors.textMuted} />
          </Pressable>

          <View style={styles.divider} />

          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <View style={[styles.settingIcon, { backgroundColor: '#E3F2FD' }]}>
                <MaterialIcons name="subtitles" size={20} color="#1976D2" />
              </View>
              <View>
                <Text style={styles.settingLabel}>Subtitles</Text>
                <Text style={styles.settingValue}>Auto-generated in selected language</Text>
              </View>
            </View>
            <Switch
              value={subtitlesEnabled}
              onValueChange={setSubtitlesEnabled}
              trackColor={{ false: Colors.border, true: Colors.primary + '60' }}
              thumbColor={subtitlesEnabled ? Colors.primary : '#ccc'}
            />
          </View>
        </View>

        {/* Voice Over */}
        <SectionHeader title="Voice Over" icon="record-voice-over" />

        <View style={styles.card}>
          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <View style={[styles.settingIcon, { backgroundColor: '#F3E5F5' }]}>
                <MaterialIcons name="record-voice-over" size={20} color="#9C27B0" />
              </View>
              <View>
                <Text style={styles.settingLabel}>Enable Voice Over</Text>
                <Text style={styles.settingValue}>AI-generated narration</Text>
              </View>
            </View>
            <Switch
              value={voiceOverEnabled}
              onValueChange={setVoiceOverEnabled}
              trackColor={{ false: Colors.border, true: '#9C27B0' + '60' }}
              thumbColor={voiceOverEnabled ? '#9C27B0' : '#ccc'}
            />
          </View>

          {voiceOverEnabled && (
            <>
              <View style={styles.divider} />
              <Text style={styles.voiceLabel}>Voice Style</Text>
              <View style={styles.voiceOptions}>
                {VOICE_OPTIONS.map((v) => (
                  <Pressable
                    key={v}
                    onPress={() => setSelectedVoice(v)}
                    style={({ pressed }) => [
                      styles.voiceOption,
                      selectedVoice === v && styles.voiceOptionActive,
                      pressed && { opacity: 0.8 },
                    ]}
                  >
                    <MaterialIcons
                      name="mic"
                      size={16}
                      color={selectedVoice === v ? Colors.primary : Colors.textMuted}
                    />
                    <Text style={[
                      styles.voiceOptionText,
                      selectedVoice === v && { color: Colors.primary, fontWeight: '700' },
                    ]}>
                      {v}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </>
          )}
        </View>

        {/* Display Settings */}
        <SectionHeader title="Display & Rendering" icon="display-settings" />

        <View style={styles.card}>
          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <View style={[styles.settingIcon, { backgroundColor: '#FFF3E0' }]}>
                <MaterialIcons name="hd" size={20} color="#FF9800" />
              </View>
              <View>
                <Text style={styles.settingLabel}>High Quality Rendering</Text>
                <Text style={styles.settingValue}>Physically-based rendering (PBR)</Text>
              </View>
            </View>
            <Switch
              value={hqRenderEnabled}
              onValueChange={setHqRenderEnabled}
              trackColor={{ false: Colors.border, true: '#FF9800' + '60' }}
              thumbColor={hqRenderEnabled ? '#FF9800' : '#ccc'}
            />
          </View>

          <View style={styles.divider} />

          <Text style={styles.voiceLabel}>Output Quality</Text>
          <View style={styles.qualityOptions}>
            {QUALITY_OPTIONS.map((q) => (
              <Pressable
                key={q}
                onPress={() => setSelectedQuality(q)}
                style={({ pressed }) => [
                  styles.qualityOption,
                  selectedQuality === q && styles.qualityOptionActive,
                  pressed && { opacity: 0.8 },
                ]}
              >
                <Text style={[
                  styles.qualityOptionText,
                  selectedQuality === q && { color: Colors.primary, fontWeight: '700' },
                ]}>
                  {q}
                </Text>
                {selectedQuality === q && (
                  <MaterialIcons name="check" size={14} color={Colors.primary} />
                )}
              </Pressable>
            ))}
          </View>

          <View style={styles.divider} />

          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <View style={[styles.settingIcon, { backgroundColor: Colors.secondaryLight }]}>
                <MaterialIcons name="play-circle" size={20} color={Colors.secondary} />
              </View>
              <View>
                <Text style={styles.settingLabel}>Auto-Play Templates</Text>
                <Text style={styles.settingValue}>Start animation automatically</Text>
              </View>
            </View>
            <Switch
              value={autoPlayEnabled}
              onValueChange={setAutoPlayEnabled}
              trackColor={{ false: Colors.border, true: Colors.secondary + '60' }}
              thumbColor={autoPlayEnabled ? Colors.secondary : '#ccc'}
            />
          </View>
        </View>

        {/* Compliance */}
        <SectionHeader title="Security & Compliance" icon="security" />
        <View style={styles.card}>
          {[
            { label: 'AES-256 Encryption', icon: 'lock', color: '#4CAF50', value: 'Active' },
            { label: 'HIPAA Ready', icon: 'health-and-safety', color: '#2196F3', value: 'Compliant' },
            { label: 'Content Verification', icon: 'verified-user', color: '#9C27B0', value: 'Enabled' },
            { label: 'Display Standard', icon: 'brightness-high', color: '#FF9800', value: 'Luminous Pro' },
          ].map((item, idx, arr) => (
            <React.Fragment key={item.label}>
              <View style={styles.settingRow}>
                <View style={styles.settingLeft}>
                  <View style={[styles.settingIcon, { backgroundColor: item.color + '18' }]}>
                    <MaterialIcons name={item.icon as any} size={20} color={item.color} />
                  </View>
                  <Text style={styles.settingLabel}>{item.label}</Text>
                </View>
                <View style={[styles.statusChip, { backgroundColor: item.color + '18' }]}>
                  <Text style={[styles.statusText, { color: item.color }]}>{item.value}</Text>
                </View>
              </View>
              {idx < arr.length - 1 && <View style={styles.divider} />}
            </React.Fragment>
          ))}
        </View>

        {/* App Info */}
        <SectionHeader title="About" icon="info" />
        <View style={styles.card}>
          <Pressable
            style={({ pressed }) => [styles.settingRow, pressed && { opacity: 0.75 }]}
            onPress={handleAbout}
          >
            <View style={styles.settingLeft}>
              <View style={[styles.settingIcon, { backgroundColor: Colors.primaryLight }]}>
                <MaterialIcons name="info" size={20} color={Colors.primary} />
              </View>
              <View>
                <Text style={styles.settingLabel}>About This App</Text>
                <Text style={styles.settingValue}>Version 1.0 Enterprise</Text>
              </View>
            </View>
            <MaterialIcons name="chevron-right" size={20} color={Colors.textMuted} />
          </Pressable>

          <View style={styles.divider} />

          <Pressable
            style={({ pressed }) => [styles.settingRow, pressed && { opacity: 0.75 }]}
            onPress={handleContact}
          >
            <View style={styles.settingLeft}>
              <View style={[styles.settingIcon, { backgroundColor: Colors.secondaryLight }]}>
                <MaterialIcons name="contact-support" size={20} color={Colors.secondary} />
              </View>
              <View>
                <Text style={styles.settingLabel}>Contact & Support</Text>
                <Text style={styles.settingValue}>WhatsApp · Email · Web</Text>
              </View>
            </View>
            <MaterialIcons name="chevron-right" size={20} color={Colors.textMuted} />
          </Pressable>
        </View>

        {/* Philosophy Quote */}
        <View style={styles.quoteBox}>
          <MaterialIcons name="format-quote" size={24} color={Colors.primary} />
          <Text style={styles.quoteText}>
            "In this world nothing is impossible, you just have to fulfill the requirements according to the destination."
          </Text>
          <Text style={styles.quoteAuthor}>— Dr M Irfan Qadir Thaheem</Text>
        </View>

        <View style={{ height: Spacing.xl + insets.bottom }} />
      </ScrollView>

      {/* Language Picker Modal */}
      <Modal
        visible={showLangModal}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowLangModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Select Language</Text>
            <Pressable onPress={() => setShowLangModal(false)} hitSlop={8}>
              <MaterialIcons name="close" size={24} color={Colors.textPrimary} />
            </Pressable>
          </View>
          <FlatList
            data={LANGUAGES}
            keyExtractor={(item) => item.code}
            contentContainerStyle={{ padding: Spacing.base }}
            renderItem={({ item }) => {
              const isSelected = item.code === selectedLang;
              return (
                <Pressable
                  onPress={() => { setSelectedLang(item.code); setShowLangModal(false); }}
                  style={({ pressed }) => [
                    styles.langOption,
                    isSelected && styles.langOptionSelected,
                    pressed && { opacity: 0.8 },
                  ]}
                >
                  <Text style={styles.langFlag}>{item.flag}</Text>
                  <View style={styles.langInfo}>
                    <Text style={[styles.langName, isSelected && { color: Colors.primary }]}>
                      {item.name}
                    </Text>
                    <Text style={styles.langNative}>{item.nativeName}</Text>
                  </View>
                  {isSelected && (
                    <MaterialIcons name="check-circle" size={20} color={Colors.primary} />
                  )}
                </Pressable>
              );
            }}
          />
        </View>
      </Modal>
    </View>
  );
}

function SectionHeader({ title, icon }: { title: string; icon: string }) {
  return (
    <View style={sectionStyles.row}>
      <MaterialIcons name={icon as any} size={16} color={Colors.primary} />
      <Text style={sectionStyles.title}>{title}</Text>
    </View>
  );
}

const sectionStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: Spacing.xl,
    marginBottom: Spacing.sm,
    paddingHorizontal: Spacing.base,
  },
  title: {
    fontSize: 12,
    color: Colors.primary,
    fontWeight: '700',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scroll: {
    paddingHorizontal: Spacing.base,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    marginTop: Spacing.md,
    marginBottom: Spacing.base,
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
  headerSub: {
    fontSize: Typography.sm,
    color: Colors.textMuted,
  },
  profileCard: {
    backgroundColor: Colors.primary,
    borderRadius: Radius.xl,
    padding: Spacing.base,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    ...Shadows.strong,
  },
  profileAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    color: '#fff',
    fontSize: Typography.base,
    fontWeight: Typography.bold,
    marginBottom: 2,
  },
  profileRole: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: Typography.sm,
    marginBottom: 6,
  },
  profileBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: Radius.full,
  },
  profileBadgeText: {
    color: '#FFD700',
    fontSize: 11,
    fontWeight: '700',
  },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    overflow: 'hidden',
    ...Shadows.subtle,
    borderWidth: 1,
    borderColor: Colors.border,
    marginHorizontal: 0,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.md,
    minHeight: 56,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    flex: 1,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  settingLabel: {
    fontSize: Typography.base,
    fontWeight: Typography.semibold,
    color: Colors.textPrimary,
  },
  settingValue: {
    fontSize: 12,
    color: Colors.textMuted,
    marginTop: 1,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.divider,
    marginHorizontal: Spacing.md,
  },
  voiceLabel: {
    fontSize: Typography.sm,
    fontWeight: Typography.semibold,
    color: Colors.textSecondary,
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.xs,
  },
  voiceOptions: {
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.md,
    gap: Spacing.xs,
  },
  voiceOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: Radius.md,
    backgroundColor: Colors.background,
    borderWidth: 1.5,
    borderColor: Colors.border,
    marginBottom: Spacing.xs,
  },
  voiceOptionActive: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primaryLight,
  },
  voiceOptionText: {
    fontSize: Typography.sm,
    color: Colors.textSecondary,
  },
  qualityOptions: {
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.md,
  },
  qualityOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.sm,
    borderRadius: Radius.md,
    marginBottom: Spacing.xs,
  },
  qualityOptionActive: {
    backgroundColor: Colors.primaryLight,
  },
  qualityOptionText: {
    fontSize: Typography.sm,
    color: Colors.textSecondary,
  },
  statusChip: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: Radius.full,
  },
  statusText: {
    fontSize: 12,
    fontWeight: Typography.semibold,
  },
  quoteBox: {
    backgroundColor: Colors.primaryLight,
    borderRadius: Radius.xl,
    padding: Spacing.base,
    alignItems: 'center',
    marginTop: Spacing.xl,
    borderWidth: 1,
    borderColor: Colors.primary + '30',
    gap: Spacing.sm,
  },
  quoteText: {
    fontSize: Typography.sm,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    fontStyle: 'italic',
  },
  quoteAuthor: {
    fontSize: 12,
    color: Colors.primary,
    fontWeight: Typography.semibold,
  },
  // Modal
  modalContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.base,
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  modalTitle: {
    fontSize: Typography.lg,
    fontWeight: Typography.bold,
    color: Colors.textPrimary,
  },
  langOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    borderRadius: Radius.lg,
    marginBottom: Spacing.sm,
    backgroundColor: Colors.surface,
    gap: Spacing.md,
    borderWidth: 1.5,
    borderColor: Colors.border,
  },
  langOptionSelected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primaryLight,
  },
  langFlag: {
    fontSize: 28,
  },
  langInfo: {
    flex: 1,
  },
  langName: {
    fontSize: Typography.base,
    fontWeight: Typography.semibold,
    color: Colors.textPrimary,
  },
  langNative: {
    fontSize: Typography.sm,
    color: Colors.textMuted,
  },
});
