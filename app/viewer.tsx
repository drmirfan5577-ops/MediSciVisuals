import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Animated,
  Modal,
} from 'react-native';
import { Image } from 'expo-image';
import { MaterialIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Colors, Typography, Spacing, Radius, Shadows } from '@/constants/theme';
import { TEMPLATES } from '@/constants/data';

const ANNOTATION_LABELS = [
  { id: 'a1', x: '35%', y: '28%', label: 'Primary Region', color: Colors.primary },
  { id: 'a2', x: '60%', y: '45%', label: 'Secondary Region', color: '#E91E63' },
  { id: 'a3', x: '25%', y: '62%', label: 'Support Structure', color: Colors.secondary },
  { id: 'a4', x: '70%', y: '70%', label: 'Connection Point', color: '#FF9800' },
];

const SPEEDS = ['0.5x', '1x', '1.5x', '2x'];
const ROTATION_VIEWS = ['Front View', 'Side View', 'Back View', 'Cross-Section'];

export default function ViewerScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const template = TEMPLATES.find((t) => t.id === id) ?? TEMPLATES[0];

  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showAnnotations, setShowAnnotations] = useState(true);
  const [speed, setSpeed] = useState('1x');
  const [currentView, setCurrentView] = useState('Front View');
  const [progress, setProgress] = useState(0.3);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [showViewMenu, setShowViewMenu] = useState(false);
  const [activeAnnotation, setActiveAnnotation] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1.0);

  const progressAnim = useRef(new Animated.Value(0.3)).current;

  const handlePlayPause = () => {
    setIsPlaying((p) => !p);
    if (!isPlaying) {
      Animated.timing(progressAnim, {
        toValue: Math.min(progress + 0.2, 1),
        duration: 3000,
        useNativeDriver: false,
      }).start(({ finished }) => {
        if (finished) setIsPlaying(false);
      });
    } else {
      progressAnim.stopAnimation((v) => setProgress(v));
    }
  };

  const handleRewind = () => {
    const newP = Math.max(0, progress - 0.1);
    setProgress(newP);
    progressAnim.setValue(newP);
  };

  const handleForward = () => {
    const newP = Math.min(1, progress + 0.1);
    setProgress(newP);
    progressAnim.setValue(newP);
  };

  const zoomIn = () => setZoom((z) => Math.min(z + 0.25, 3.0));
  const zoomOut = () => setZoom((z) => Math.max(z - 0.25, 0.5));

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  const ViewerContent = () => (
    <View style={[styles.viewerContainer, isFullscreen && styles.fullscreenContainer]}>
      {/* 3D Canvas Area */}
      <View style={[styles.canvas, isFullscreen && styles.fullscreenCanvas]}>
        <Image
          source={{ uri: template.image }}
          style={[styles.canvasImage, { transform: [{ scale: zoom }] }]}
          contentFit="cover"
          transition={200}
        />
        {/* Overlay UI */}
        <View style={[styles.canvasOverlay, { paddingTop: isFullscreen ? insets.top + 8 : 12 }]}>
          {/* Top Row */}
          <View style={styles.canvasTopRow}>
            <Pressable
              onPress={() => isFullscreen ? setIsFullscreen(false) : router.back()}
              style={styles.overlayBtn}
              hitSlop={8}
            >
              <MaterialIcons name="arrow-back" size={20} color="#fff" />
            </Pressable>
            <View style={styles.viewBadge}>
              <MaterialIcons name="threed-rotation" size={13} color={Colors.secondary} />
              <Text style={styles.viewBadgeText}>{currentView}</Text>
            </View>
            <View style={styles.topActions}>
              <Pressable
                onPress={() => setShowAnnotations((v) => !v)}
                style={[styles.overlayBtn, showAnnotations && { backgroundColor: Colors.primary }]}
                hitSlop={8}
              >
                <MaterialIcons name="label" size={18} color="#fff" />
              </Pressable>
              <Pressable
                onPress={() => setIsFullscreen((f) => !f)}
                style={styles.overlayBtn}
                hitSlop={8}
              >
                <MaterialIcons name={isFullscreen ? 'fullscreen-exit' : 'fullscreen'} size={18} color="#fff" />
              </Pressable>
            </View>
          </View>

          {/* Annotation pins */}
          {showAnnotations && ANNOTATION_LABELS.map((ann) => (
            <Pressable
              key={ann.id}
              style={[styles.annotationPin, { left: ann.x as any, top: ann.y as any }]}
              onPress={() => setActiveAnnotation(activeAnnotation === ann.id ? null : ann.id)}
            >
              <View style={[styles.pinDot, { backgroundColor: ann.color }]}>
                <View style={[styles.pinPulse, { borderColor: ann.color }]} />
              </View>
              {activeAnnotation === ann.id && (
                <View style={[styles.pinLabel, { borderLeftColor: ann.color }]}>
                  <Text style={[styles.pinLabelText, { color: ann.color }]}>{ann.label}</Text>
                </View>
              )}
            </Pressable>
          ))}

          {/* Zoom Controls */}
          <View style={styles.zoomControls}>
            <Pressable onPress={zoomIn} style={styles.zoomBtn} hitSlop={4}>
              <MaterialIcons name="add" size={18} color="#fff" />
            </Pressable>
            <Text style={styles.zoomText}>{zoom.toFixed(1)}x</Text>
            <Pressable onPress={zoomOut} style={styles.zoomBtn} hitSlop={4}>
              <MaterialIcons name="remove" size={18} color="#fff" />
            </Pressable>
          </View>

          {/* Spin Hint */}
          <View style={styles.rotateHint}>
            <MaterialIcons name="rotate-3d" size={14} color="rgba(255,255,255,0.7)" />
            <Text style={styles.rotateHintText}>Swipe to rotate</Text>
          </View>
        </View>
      </View>

      {/* Playback Controls */}
      {!isFullscreen && (
        <View style={styles.controls}>
          {/* Progress Bar */}
          <View style={styles.progressContainer}>
            <View style={styles.progressTrack}>
              <Animated.View style={[styles.progressFill, { width: progressWidth }]} />
              <Animated.View style={[styles.progressThumb, { left: progressWidth }]} />
            </View>
            <View style={styles.timeRow}>
              <Text style={styles.timeText}>
                {Math.round(progress * parseInt(template.duration)) + ' min'}
              </Text>
              <Text style={styles.timeText}>{template.duration}</Text>
            </View>
          </View>

          {/* Buttons Row */}
          <View style={styles.btnRow}>
            {/* Speed */}
            <Pressable
              onPress={() => setShowSpeedMenu(true)}
              style={styles.controlChip}
            >
              <MaterialIcons name="speed" size={16} color={Colors.primary} />
              <Text style={styles.controlChipText}>{speed}</Text>
            </Pressable>

            {/* Rewind */}
            <Pressable onPress={handleRewind} style={styles.ctrlBtn} hitSlop={8}>
              <MaterialIcons name="replay-10" size={28} color={Colors.textSecondary} />
            </Pressable>

            {/* Play/Pause */}
            <Pressable
              onPress={handlePlayPause}
              style={({ pressed }) => [
                styles.playBtn,
                pressed && { opacity: 0.85, transform: [{ scale: 0.95 }] },
              ]}
            >
              <MaterialIcons name={isPlaying ? 'pause' : 'play-arrow'} size={30} color="#fff" />
            </Pressable>

            {/* Forward */}
            <Pressable onPress={handleForward} style={styles.ctrlBtn} hitSlop={8}>
              <MaterialIcons name="forward-10" size={28} color={Colors.textSecondary} />
            </Pressable>

            {/* View Rotation */}
            <Pressable
              onPress={() => setShowViewMenu(true)}
              style={styles.controlChip}
            >
              <MaterialIcons name="threed-rotation" size={16} color={Colors.secondary} />
              <Text style={[styles.controlChipText, { color: Colors.secondary }]}>View</Text>
            </Pressable>
          </View>
        </View>
      )}
    </View>
  );

  return (
    <View style={[styles.screen, { paddingTop: isFullscreen ? 0 : insets.top }]}>
      {isFullscreen ? (
        <ViewerContent />
      ) : (
        <>
          <ViewerContent />
          <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
            {/* Info Block */}
            <View style={styles.infoBlock}>
              <Text style={styles.infoTitle}>{template.title}</Text>
              <View style={styles.infoBadges}>
                <View style={[styles.badge, { backgroundColor: template.categoryColor + '18' }]}>
                  <Text style={[styles.badgeText, { color: template.categoryColor }]}>{template.subtitle}</Text>
                </View>
                <View style={[styles.badge, { backgroundColor: Colors.primaryLight }]}>
                  <MaterialIcons name="translate" size={12} color={Colors.primary} />
                  <Text style={[styles.badgeText, { color: Colors.primary }]}>{template.languages} languages</Text>
                </View>
                <View style={[styles.badge, { backgroundColor: Colors.secondaryLight }]}>
                  <MaterialIcons name="schedule" size={12} color={Colors.secondary} />
                  <Text style={[styles.badgeText, { color: Colors.secondary }]}>{template.duration}</Text>
                </View>
              </View>
            </View>

            {/* View Selector */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Rotation Views</Text>
              <View style={styles.viewRow}>
                {ROTATION_VIEWS.map((v) => (
                  <Pressable
                    key={v}
                    onPress={() => setCurrentView(v)}
                    style={[
                      styles.viewChip,
                      currentView === v && { backgroundColor: Colors.primary, borderColor: Colors.primary },
                    ]}
                  >
                    <Text style={[
                      styles.viewChipText,
                      { color: currentView === v ? '#fff' : Colors.textSecondary },
                    ]}>
                      {v}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>

            {/* Annotations List */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Annotations</Text>
              {ANNOTATION_LABELS.map((ann) => (
                <Pressable
                  key={ann.id}
                  onPress={() => setActiveAnnotation(activeAnnotation === ann.id ? null : ann.id)}
                  style={[styles.annRow, activeAnnotation === ann.id && { backgroundColor: ann.color + '12' }]}
                >
                  <View style={[styles.annDot, { backgroundColor: ann.color }]} />
                  <Text style={styles.annLabel}>{ann.label}</Text>
                  <MaterialIcons name={activeAnnotation === ann.id ? 'visibility' : 'visibility-off'} size={16} color={Colors.textMuted} />
                </Pressable>
              ))}
            </View>

            <View style={{ height: insets.bottom + 24 }} />
          </ScrollView>
        </>
      )}

      {/* Speed Menu */}
      <Modal visible={showSpeedMenu} transparent animationType="fade" onRequestClose={() => setShowSpeedMenu(false)}>
        <Pressable style={styles.menuOverlay} onPress={() => setShowSpeedMenu(false)}>
          <View style={styles.menuBox}>
            <Text style={styles.menuTitle}>Playback Speed</Text>
            {SPEEDS.map((s) => (
              <Pressable
                key={s}
                onPress={() => { setSpeed(s); setShowSpeedMenu(false); }}
                style={[styles.menuItem, s === speed && { backgroundColor: Colors.primaryLight }]}
              >
                <Text style={[styles.menuItemText, s === speed && { color: Colors.primary, fontWeight: '700' }]}>{s}</Text>
                {s === speed && <MaterialIcons name="check" size={16} color={Colors.primary} />}
              </Pressable>
            ))}
          </View>
        </Pressable>
      </Modal>

      {/* View Menu */}
      <Modal visible={showViewMenu} transparent animationType="fade" onRequestClose={() => setShowViewMenu(false)}>
        <Pressable style={styles.menuOverlay} onPress={() => setShowViewMenu(false)}>
          <View style={styles.menuBox}>
            <Text style={styles.menuTitle}>Rotation View</Text>
            {ROTATION_VIEWS.map((v) => (
              <Pressable
                key={v}
                onPress={() => { setCurrentView(v); setShowViewMenu(false); }}
                style={[styles.menuItem, v === currentView && { backgroundColor: Colors.secondaryLight }]}
              >
                <MaterialIcons name="threed-rotation" size={16} color={v === currentView ? Colors.secondary : Colors.textMuted} />
                <Text style={[styles.menuItemText, v === currentView && { color: Colors.secondary, fontWeight: '700' }]}>{v}</Text>
                {v === currentView && <MaterialIcons name="check" size={16} color={Colors.secondary} />}
              </Pressable>
            ))}
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.background },
  viewerContainer: { backgroundColor: '#0A1628' },
  fullscreenContainer: { flex: 1 },
  canvas: { height: 300, position: 'relative', overflow: 'hidden' },
  fullscreenCanvas: { height: '100%' },
  canvasImage: { width: '100%', height: '100%' },
  canvasOverlay: {
    position: 'absolute',
    inset: 0,
    backgroundColor: 'rgba(10,22,40,0.35)',
    padding: Spacing.base,
  },
  canvasTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  overlayBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: 'rgba(0,0,0,0.45)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: Radius.full,
  },
  viewBadgeText: { color: Colors.secondary, fontSize: 12, fontWeight: '600' },
  topActions: { flexDirection: 'row', gap: Spacing.sm },
  annotationPin: { position: 'absolute' },
  pinDot: { width: 14, height: 14, borderRadius: 7, alignItems: 'center', justifyContent: 'center' },
  pinPulse: { position: 'absolute', width: 22, height: 22, borderRadius: 11, borderWidth: 1.5, opacity: 0.5 },
  pinLabel: {
    position: 'absolute',
    left: 18,
    top: -4,
    backgroundColor: 'rgba(255,255,255,0.95)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: Radius.sm,
    borderLeftWidth: 2,
    minWidth: 120,
  },
  pinLabelText: { fontSize: 11, fontWeight: '600' },
  zoomControls: {
    position: 'absolute',
    right: Spacing.base,
    bottom: Spacing.xl,
    alignItems: 'center',
    gap: 4,
  },
  zoomBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  zoomText: { color: '#fff', fontSize: 11, fontWeight: '700' },
  rotateHint: {
    position: 'absolute',
    bottom: Spacing.sm,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  rotateHintText: { color: 'rgba(255,255,255,0.6)', fontSize: 11 },
  controls: { backgroundColor: Colors.surface, padding: Spacing.base, borderBottomWidth: 1, borderBottomColor: Colors.border },
  progressContainer: { marginBottom: Spacing.md },
  progressTrack: { height: 4, backgroundColor: Colors.border, borderRadius: 2, overflow: 'visible', position: 'relative' },
  progressFill: { height: '100%', backgroundColor: Colors.primary, borderRadius: 2 },
  progressThumb: {
    position: 'absolute',
    top: -5,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: Colors.primary,
    marginLeft: -7,
    ...Shadows.card,
  },
  timeRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 6 },
  timeText: { fontSize: 11, color: Colors.textMuted },
  btnRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: Spacing.base },
  controlChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: Radius.full,
    minWidth: 52,
  },
  controlChipText: { fontSize: 12, color: Colors.primary, fontWeight: '700' },
  ctrlBtn: { width: 48, height: 48, alignItems: 'center', justifyContent: 'center' },
  playBtn: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.strong,
  },
  infoBlock: { padding: Spacing.base },
  infoTitle: { fontSize: Typography.xl, fontWeight: Typography.bold, color: Colors.textPrimary, marginBottom: Spacing.sm },
  infoBadges: { flexDirection: 'row', gap: Spacing.sm, flexWrap: 'wrap' },
  badge: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: Spacing.sm, paddingVertical: 4, borderRadius: Radius.full },
  badgeText: { fontSize: 12, fontWeight: '600' },
  section: { paddingHorizontal: Spacing.base, marginBottom: Spacing.xl },
  sectionTitle: { fontSize: Typography.md, fontWeight: Typography.bold, color: Colors.textPrimary, marginBottom: Spacing.md },
  viewRow: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm },
  viewChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: Radius.full,
    borderWidth: 1.5,
    borderColor: Colors.border,
    backgroundColor: Colors.surface,
  },
  viewChipText: { fontSize: Typography.sm, fontWeight: Typography.semibold },
  annRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.sm,
    borderRadius: Radius.md,
    marginBottom: Spacing.xs,
  },
  annDot: { width: 10, height: 10, borderRadius: 5 },
  annLabel: { flex: 1, fontSize: Typography.base, color: Colors.textSecondary },
  // Modal menus
  menuOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', alignItems: 'center' },
  menuBox: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.xl,
    padding: Spacing.base,
    width: 220,
    ...Shadows.strong,
  },
  menuTitle: { fontSize: Typography.base, fontWeight: Typography.bold, color: Colors.textPrimary, marginBottom: Spacing.md, textAlign: 'center' },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.sm,
    borderRadius: Radius.md,
    marginBottom: 4,
  },
  menuItemText: { flex: 1, fontSize: Typography.base, color: Colors.textSecondary },
});
