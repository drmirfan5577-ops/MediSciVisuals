import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Animated,
  Modal,
  ScrollView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Colors, Typography, Spacing, Radius, Shadows } from '@/constants/theme';
import { TEMPLATES } from '@/constants/data';

const QUALITY_OPTIONS = ['480p', '720p', '1080p', '4K'];
const SUBTITLE_LANGS = ['Off', 'English', 'Urdu', 'Arabic', 'Persian', 'Hindi'];
const VOICE_OPTIONS = ['Original', 'English (AI)', 'Urdu (AI)'];
const THEMES = [
  { id: 'medical', label: 'Medical Blue', bg: '#0A1628', accent: '#4A90E2' },
  { id: 'science', label: 'Science Green', bg: '#0A1A0A', accent: '#7ED321' },
  { id: 'clean', label: 'Clean Light', bg: '#F0F8FF', accent: '#4A90E2' },
  { id: 'cinema', label: 'Cinema Dark', bg: '#0D0D0D', accent: '#E91E63' },
];

export default function PlayerScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const template = TEMPLATES.find((t) => t.id === id) ?? TEMPLATES[0];

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [selectedQuality, setSelectedQuality] = useState('1080p');
  const [selectedSubtitle, setSelectedSubtitle] = useState('English');
  const [selectedVoice, setSelectedVoice] = useState('English (AI)');
  const [selectedTheme, setSelectedTheme] = useState(THEMES[0]);
  const [volume, setVolume] = useState(0.8);
  const [brightness, setBrightness] = useState(0.9);
  const [playbackSpeed, setPlaybackSpeed] = useState('1x');
  const [progress, setProgress] = useState(0.25);
  const [settingsTab, setSettingsTab] = useState<'quality' | 'subtitle' | 'voice' | 'theme'>('quality');
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  const controlsOpacity = useRef(new Animated.Value(1)).current;
  const progressAnim = useRef(new Animated.Value(0.25)).current;

  const theme = selectedTheme;
  const isDark = theme.id !== 'clean';

  const togglePlay = () => {
    setIsPlaying((p) => !p);
  };

  const toggleControls = () => {
    const toValue = showControls ? 0 : 1;
    setShowControls(!showControls);
    Animated.timing(controlsOpacity, { toValue, duration: 200, useNativeDriver: true }).start();
  };

  const SPEEDS = ['0.5x', '0.75x', '1x', '1.25x', '1.5x', '2x'];

  const adjustProgress = (delta: number) => {
    const newP = Math.max(0, Math.min(1, progress + delta));
    setProgress(newP);
    progressAnim.setValue(newP);
  };

  const durationMins = parseInt(template.duration);
  const currentMins = Math.round(progress * durationMins);

  return (
    <View style={[styles.screen, { backgroundColor: theme.bg }]}>
      {/* Player Viewport */}
      <Pressable
        onPress={toggleControls}
        style={[styles.viewport, isFullscreen && { height: '100%' }]}
      >
        <Image
          source={{ uri: template.image }}
          style={styles.videoFrame}
          contentFit="cover"
          transition={200}
        />
        {/* Theme Overlay */}
        <View style={[styles.themeOverlay, { backgroundColor: theme.bg + 'BB' }]} />

        {/* Controls Overlay */}
        <Animated.View style={[styles.controlsOverlay, { opacity: controlsOpacity, paddingTop: insets.top + 8 }]}>
          {/* Top Bar */}
          <View style={styles.topBar}>
            <Pressable onPress={() => router.back()} style={styles.iconBtn} hitSlop={8}>
              <MaterialIcons name="arrow-back" size={20} color="#fff" />
            </Pressable>
            <View style={styles.topCenter}>
              <Text style={styles.playerTitle} numberOfLines={1}>{template.title}</Text>
              <Text style={styles.playerSubtitle}>{template.subtitle}</Text>
            </View>
            <View style={styles.topRight}>
              <Pressable onPress={() => setShowSettingsModal(true)} style={styles.iconBtn} hitSlop={8}>
                <MaterialIcons name="tune" size={20} color="#fff" />
              </Pressable>
              <Pressable onPress={() => setIsFullscreen((f) => !f)} style={styles.iconBtn} hitSlop={8}>
                <MaterialIcons name={isFullscreen ? 'fullscreen-exit' : 'fullscreen'} size={20} color="#fff" />
              </Pressable>
            </View>
          </View>

          {/* Center Controls */}
          <View style={styles.centerControls}>
            <Pressable onPress={() => adjustProgress(-0.1)} style={styles.ctrlBtn} hitSlop={8}>
              <MaterialIcons name="replay-10" size={32} color="rgba(255,255,255,0.9)" />
            </Pressable>
            <Pressable
              onPress={togglePlay}
              style={[styles.playBtn, { backgroundColor: theme.accent }]}
            >
              <MaterialIcons name={isPlaying ? 'pause' : 'play-arrow'} size={36} color="#fff" />
            </Pressable>
            <Pressable onPress={() => adjustProgress(0.1)} style={styles.ctrlBtn} hitSlop={8}>
              <MaterialIcons name="forward-10" size={32} color="rgba(255,255,255,0.9)" />
            </Pressable>
          </View>

          {/* Bottom Controls */}
          <View style={styles.bottomControls}>
            {/* Subtitle display */}
            {selectedSubtitle !== 'Off' && (
              <View style={styles.subtitleBar}>
                <Text style={[styles.subtitleText, { color: theme.accent }]}>
                  {selectedSubtitle === 'Urdu' ? 'جسم کا دل خون کو پمپ کرتا ہے' : 'The heart pumps blood throughout the body'}
                </Text>
              </View>
            )}

            {/* Progress */}
            <View style={styles.progressRow}>
              <Text style={styles.timeText}>{currentMins}m</Text>
              <Pressable
                style={styles.progressTrack}
                onPress={(e) => {
                  const p = e.nativeEvent.locationX / e.nativeEvent.target;
                  setProgress(Math.max(0, Math.min(1, progress)));
                }}
              >
                <View style={[styles.progressFill, { width: `${progress * 100}%`, backgroundColor: theme.accent }]} />
                <View style={[styles.progressThumb, { left: `${progress * 100}%` as any, backgroundColor: theme.accent }]} />
              </Pressable>
              <Text style={styles.timeText}>{durationMins}m</Text>
            </View>

            {/* Bottom Row */}
            <View style={styles.bottomRow}>
              <Pressable onPress={() => setIsMuted((m) => !m)} style={styles.smallBtn} hitSlop={8}>
                <MaterialIcons name={isMuted ? 'volume-off' : 'volume-up'} size={20} color="rgba(255,255,255,0.85)" />
              </Pressable>

              {/* Speed */}
              <Pressable
                onPress={() => {
                  const idx = SPEEDS.indexOf(playbackSpeed);
                  setPlaybackSpeed(SPEEDS[(idx + 1) % SPEEDS.length]);
                }}
                style={styles.speedChip}
              >
                <Text style={[styles.speedText, { color: theme.accent }]}>{playbackSpeed}</Text>
              </Pressable>

              <View style={styles.flex1} />

              {/* Quality badge */}
              <View style={[styles.qualityBadge, { borderColor: theme.accent }]}>
                <Text style={[styles.qualityText, { color: theme.accent }]}>{selectedQuality}</Text>
              </View>

              {/* Subtitle badge */}
              <View style={styles.subtitleBadge}>
                <MaterialIcons name="subtitles" size={14} color={selectedSubtitle !== 'Off' ? theme.accent : 'rgba(255,255,255,0.4)'} />
                <Text style={[styles.subtitleBadgeText, { color: selectedSubtitle !== 'Off' ? theme.accent : 'rgba(255,255,255,0.4)' }]}>
                  {selectedSubtitle === 'Off' ? 'CC Off' : selectedSubtitle}
                </Text>
              </View>
            </View>
          </View>
        </Animated.View>
      </Pressable>

      {/* Info Panel (below player) */}
      {!isFullscreen && (
        <ScrollView style={styles.infoPanel} contentContainerStyle={{ padding: Spacing.base }} showsVerticalScrollIndicator={false}>
          <Text style={[styles.infoTitle, { color: isDark ? '#fff' : Colors.textPrimary }]}>{template.title}</Text>
          <Text style={[styles.infoMeta, { color: isDark ? 'rgba(255,255,255,0.6)' : Colors.textMuted }]}>
            {template.duration} · {template.difficulty} · {template.languages} subtitle languages
          </Text>

          {/* Quick Settings Row */}
          <View style={styles.quickRow}>
            {[
              { icon: 'hd', label: selectedQuality, onPress: () => { setSettingsTab('quality'); setShowSettingsModal(true); }, color: theme.accent },
              { icon: 'subtitles', label: selectedSubtitle, onPress: () => { setSettingsTab('subtitle'); setShowSettingsModal(true); }, color: isDark ? 'rgba(255,255,255,0.7)' : Colors.textSecondary },
              { icon: 'record-voice-over', label: selectedVoice.split(' ')[0], onPress: () => { setSettingsTab('voice'); setShowSettingsModal(true); }, color: isDark ? 'rgba(255,255,255,0.7)' : Colors.textSecondary },
              { icon: 'palette', label: selectedTheme.label.split(' ')[0], onPress: () => { setSettingsTab('theme'); setShowSettingsModal(true); }, color: isDark ? 'rgba(255,255,255,0.7)' : Colors.textSecondary },
            ].map((item, i) => (
              <Pressable
                key={i}
                onPress={item.onPress}
                style={[styles.quickBtn, { backgroundColor: isDark ? 'rgba(255,255,255,0.08)' : Colors.surface, borderColor: isDark ? 'rgba(255,255,255,0.12)' : Colors.border }]}
              >
                <MaterialIcons name={item.icon as any} size={16} color={item.color} />
                <Text style={[styles.quickBtnText, { color: item.color }]} numberOfLines={1}>{item.label}</Text>
              </Pressable>
            ))}
          </View>

          <View style={[styles.divider, { backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : Colors.divider }]} />
          <Text style={[styles.descText, { color: isDark ? 'rgba(255,255,255,0.65)' : Colors.textSecondary }]}>
            {template.description}
          </Text>
          <View style={{ height: insets.bottom + 16 }} />
        </ScrollView>
      )}

      {/* Settings Modal */}
      <Modal visible={showSettingsModal} animationType="slide" presentationStyle="pageSheet" onRequestClose={() => setShowSettingsModal(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Player Settings</Text>
            <Pressable onPress={() => setShowSettingsModal(false)} hitSlop={8}>
              <MaterialIcons name="close" size={22} color={Colors.textPrimary} />
            </Pressable>
          </View>

          {/* Tabs */}
          <View style={styles.settingsTabs}>
            {(['quality', 'subtitle', 'voice', 'theme'] as const).map((tab) => (
              <Pressable
                key={tab}
                onPress={() => setSettingsTab(tab)}
                style={[styles.settingsTab, settingsTab === tab && { backgroundColor: Colors.primary, borderColor: Colors.primary }]}
              >
                <Text style={[styles.settingsTabText, settingsTab === tab && { color: '#fff' }]}>
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </Text>
              </Pressable>
            ))}
          </View>

          <ScrollView contentContainerStyle={styles.modalScroll}>
            {settingsTab === 'quality' && (
              <>
                <Text style={styles.settingGroup}>Output Resolution</Text>
                {QUALITY_OPTIONS.map((q) => (
                  <Pressable
                    key={q}
                    onPress={() => setSelectedQuality(q)}
                    style={[styles.optionRow, q === selectedQuality && { backgroundColor: Colors.primaryLight }]}
                  >
                    <MaterialIcons name="hd" size={20} color={q === selectedQuality ? Colors.primary : Colors.textMuted} />
                    <Text style={[styles.optionLabel, q === selectedQuality && { color: Colors.primary, fontWeight: '700' }]}>{q}</Text>
                    {q === selectedQuality && <MaterialIcons name="check" size={18} color={Colors.primary} />}
                  </Pressable>
                ))}
                <Text style={styles.settingGroup}>Playback Speed</Text>
                <View style={styles.speedGrid}>
                  {SPEEDS.map((s) => (
                    <Pressable
                      key={s}
                      onPress={() => setPlaybackSpeed(s)}
                      style={[styles.speedOption, s === playbackSpeed && { backgroundColor: Colors.primary, borderColor: Colors.primary }]}
                    >
                      <Text style={[styles.speedOptionText, s === playbackSpeed && { color: '#fff' }]}>{s}</Text>
                    </Pressable>
                  ))}
                </View>
              </>
            )}

            {settingsTab === 'subtitle' && SUBTITLE_LANGS.map((l) => (
              <Pressable
                key={l}
                onPress={() => setSelectedSubtitle(l)}
                style={[styles.optionRow, l === selectedSubtitle && { backgroundColor: Colors.primaryLight }]}
              >
                <MaterialIcons name="subtitles" size={20} color={l === selectedSubtitle ? Colors.primary : Colors.textMuted} />
                <Text style={[styles.optionLabel, l === selectedSubtitle && { color: Colors.primary, fontWeight: '700' }]}>{l}</Text>
                {l === selectedSubtitle && <MaterialIcons name="check" size={18} color={Colors.primary} />}
              </Pressable>
            ))}

            {settingsTab === 'voice' && VOICE_OPTIONS.map((v) => (
              <Pressable
                key={v}
                onPress={() => setSelectedVoice(v)}
                style={[styles.optionRow, v === selectedVoice && { backgroundColor: '#F3E5F5' }]}
              >
                <MaterialIcons name="record-voice-over" size={20} color={v === selectedVoice ? '#9C27B0' : Colors.textMuted} />
                <Text style={[styles.optionLabel, v === selectedVoice && { color: '#9C27B0', fontWeight: '700' }]}>{v}</Text>
                {v === selectedVoice && <MaterialIcons name="check" size={18} color="#9C27B0" />}
              </Pressable>
            ))}

            {settingsTab === 'theme' && THEMES.map((t) => (
              <Pressable
                key={t.id}
                onPress={() => setSelectedTheme(t)}
                style={[styles.themeRow, t.id === selectedTheme.id && { borderColor: t.accent, borderWidth: 2 }]}
              >
                <View style={[styles.themeSwatch, { backgroundColor: t.bg }]}>
                  <View style={[styles.themeAccent, { backgroundColor: t.accent }]} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.optionLabel}>{t.label}</Text>
                  <Text style={styles.themeHex}>{t.bg} · {t.accent}</Text>
                </View>
                {t.id === selectedTheme.id && <MaterialIcons name="check-circle" size={20} color={t.accent} />}
              </Pressable>
            ))}
          </ScrollView>

          <View style={[styles.modalFooter, { paddingBottom: insets.bottom + Spacing.base }]}>
            <Pressable onPress={() => setShowSettingsModal(false)} style={styles.applyBtn}>
              <Text style={styles.applyBtnText}>Apply Settings</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  viewport: { height: 300, position: 'relative' },
  videoFrame: { width: '100%', height: '100%' },
  themeOverlay: { position: 'absolute', inset: 0 },
  controlsOverlay: { position: 'absolute', inset: 0, justifyContent: 'space-between', padding: Spacing.base },
  topBar: { flexDirection: 'row', alignItems: 'flex-start', gap: Spacing.sm },
  topCenter: { flex: 1, paddingHorizontal: Spacing.sm },
  playerTitle: { color: '#fff', fontSize: Typography.base, fontWeight: Typography.bold },
  playerSubtitle: { color: 'rgba(255,255,255,0.65)', fontSize: 12 },
  topRight: { flexDirection: 'row', gap: Spacing.sm },
  iconBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(255,255,255,0.15)', alignItems: 'center', justifyContent: 'center' },
  centerControls: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: Spacing.xl },
  ctrlBtn: { width: 52, height: 52, alignItems: 'center', justifyContent: 'center' },
  playBtn: { width: 64, height: 64, borderRadius: 32, alignItems: 'center', justifyContent: 'center', ...Shadows.strong },
  bottomControls: { gap: Spacing.sm },
  subtitleBar: { backgroundColor: 'rgba(0,0,0,0.65)', borderRadius: Radius.sm, padding: Spacing.sm, alignItems: 'center' },
  subtitleText: { fontSize: Typography.base, fontWeight: '600', textAlign: 'center' },
  progressRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  timeText: { color: 'rgba(255,255,255,0.7)', fontSize: 11, minWidth: 24 },
  progressTrack: { flex: 1, height: 4, backgroundColor: 'rgba(255,255,255,0.25)', borderRadius: 2, position: 'relative', overflow: 'visible' },
  progressFill: { height: '100%', borderRadius: 2 },
  progressThumb: { position: 'absolute', top: -5, width: 14, height: 14, borderRadius: 7, marginLeft: -7 },
  bottomRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  smallBtn: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center' },
  speedChip: { backgroundColor: 'rgba(255,255,255,0.15)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: Radius.full },
  speedText: { fontSize: 12, fontWeight: '700' },
  flex1: { flex: 1 },
  qualityBadge: { borderWidth: 1, paddingHorizontal: 8, paddingVertical: 3, borderRadius: Radius.full },
  qualityText: { fontSize: 11, fontWeight: '700' },
  subtitleBadge: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  subtitleBadgeText: { fontSize: 11, fontWeight: '600' },
  infoPanel: { flex: 1 },
  infoTitle: { fontSize: Typography.xl, fontWeight: Typography.bold, marginBottom: Spacing.xs },
  infoMeta: { fontSize: Typography.sm, marginBottom: Spacing.md },
  quickRow: { flexDirection: 'row', gap: Spacing.sm, marginBottom: Spacing.md, flexWrap: 'wrap' },
  quickBtn: { flexDirection: 'row', alignItems: 'center', gap: 5, paddingHorizontal: 12, paddingVertical: 7, borderRadius: Radius.full, borderWidth: 1, maxWidth: '48%' },
  quickBtnText: { fontSize: 12, fontWeight: '600' },
  divider: { height: 1, marginBottom: Spacing.md },
  descText: { fontSize: Typography.sm, lineHeight: 22 },
  // Modal
  modalContainer: { flex: 1, backgroundColor: Colors.background },
  modalHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: Spacing.base, backgroundColor: Colors.surface, borderBottomWidth: 1, borderBottomColor: Colors.border },
  modalTitle: { fontSize: Typography.lg, fontWeight: Typography.bold, color: Colors.textPrimary },
  settingsTabs: { flexDirection: 'row', padding: Spacing.base, gap: Spacing.sm, backgroundColor: Colors.surface, borderBottomWidth: 1, borderBottomColor: Colors.border },
  settingsTab: { flex: 1, paddingVertical: 8, borderRadius: Radius.full, borderWidth: 1.5, borderColor: Colors.border, alignItems: 'center' },
  settingsTabText: { fontSize: 12, fontWeight: '600', color: Colors.textSecondary },
  modalScroll: { padding: Spacing.base, paddingBottom: 100 },
  settingGroup: { fontSize: 12, fontWeight: '700', color: Colors.primary, textTransform: 'uppercase', letterSpacing: 0.8, marginTop: Spacing.base, marginBottom: Spacing.sm },
  optionRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md, padding: Spacing.md, borderRadius: Radius.md, marginBottom: 4 },
  optionLabel: { flex: 1, fontSize: Typography.base, color: Colors.textPrimary },
  speedGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm },
  speedOption: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: Radius.full, borderWidth: 1.5, borderColor: Colors.border, backgroundColor: Colors.surface },
  speedOptionText: { fontSize: Typography.sm, fontWeight: '600', color: Colors.textSecondary },
  themeRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md, padding: Spacing.md, borderRadius: Radius.lg, marginBottom: Spacing.sm, backgroundColor: Colors.surface, borderWidth: 1.5, borderColor: Colors.border },
  themeSwatch: { width: 48, height: 36, borderRadius: Radius.md, overflow: 'hidden', justifyContent: 'flex-end' },
  themeAccent: { height: 8, width: '100%' },
  themeHex: { fontSize: 11, color: Colors.textMuted, marginTop: 2 },
  modalFooter: { padding: Spacing.base, backgroundColor: Colors.surface, borderTopWidth: 1, borderTopColor: Colors.border },
  applyBtn: { backgroundColor: Colors.primary, borderRadius: Radius.lg, paddingVertical: Spacing.md, alignItems: 'center', ...Shadows.card },
  applyBtnText: { color: '#fff', fontSize: Typography.base, fontWeight: Typography.bold },
});
