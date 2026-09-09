import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Dimensions,
  ScrollView,
} from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors, Typography, Spacing, Radius, Shadows } from '@/constants/theme';

const { width } = Dimensions.get('window');

const SLIDES = [
  {
    id: '1',
    title: 'Professional Medical\nVisualization',
    subtitle: 'Explore 200+ interactive 3D anatomical models powered by real-time ray-tracing. From beating hearts to neuron firing — all in ultra-HD clarity.',
    image: require('@/assets/images/hero-banner.png'),
    icon: 'biotech',
    accentColor: Colors.primary,
    badge: 'WHO & NIH Verified Sources',
  },
  {
    id: '2',
    title: '12 Languages,\n1 Platform',
    subtitle: 'Auto-generated subtitles and AI voice-over in Urdu, English, Arabic, Persian, and 8 more languages. Every visualization speaks your language.',
    image: require('@/assets/images/cat-nervous.png'),
    icon: 'translate',
    accentColor: Colors.secondary,
    badge: 'AI-Powered Subtitles',
  },
  {
    id: '3',
    title: 'Learn, Quiz &\nTrack Progress',
    subtitle: 'Test your knowledge with category quizzes, bookmark your favorite templates, and access 100+ verified research sources from top institutions.',
    image: require('@/assets/images/cat-chemistry.png'),
    icon: 'school',
    accentColor: '#9C27B0',
    badge: 'Peer-Reviewed Content',
  },
];

export default function OnboardingScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const scrollRef = useRef<ScrollView>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const finishOnboarding = async () => {
    await AsyncStorage.setItem('onboarding_done', 'true');
    router.replace('/(tabs)');
  };

  const next = () => {
    if (activeSlide < SLIDES.length - 1) {
      const nextIdx = activeSlide + 1;
      scrollRef.current?.scrollTo({ x: nextIdx * width, animated: true });
      setActiveSlide(nextIdx);
    } else {
      finishOnboarding();
    }
  };

  const skip = () => finishOnboarding();

  const onScroll = (e: any) => {
    const idx = Math.round(e.nativeEvent.contentOffset.x / width);
    setActiveSlide(idx);
  };

  const slide = SLIDES[activeSlide];

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Skip Button */}
      {activeSlide < SLIDES.length - 1 && (
        <Pressable
          onPress={skip}
          style={[styles.skipBtn, { top: insets.top + 12 }]}
          hitSlop={8}
        >
          <Text style={styles.skipText}>Skip</Text>
        </Pressable>
      )}

      {/* Slides */}
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onScroll}
        scrollEventThrottle={16}
        style={{ flex: 1 }}
      >
        {SLIDES.map((s, idx) => (
          <View key={s.id} style={[styles.slide, { width }]}>
            {/* Hero Image */}
            <View style={styles.imageWrapper}>
              <Image
                source={s.image}
                style={styles.slideImage}
                contentFit="cover"
                transition={400}
              />
              <View style={[styles.imageOverlay, { backgroundColor: s.accentColor + '22' }]} />
              <View style={[styles.badgeRow]}>
                <MaterialIcons name={s.icon as any} size={14} color={s.accentColor} />
                <Text style={[styles.badge, { color: s.accentColor }]}>{s.badge}</Text>
              </View>
            </View>

            {/* Text Content */}
            <View style={styles.textBlock}>
              <Text style={styles.slideTitle}>{s.title}</Text>
              <Text style={styles.slideSubtitle}>{s.subtitle}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Bottom Controls */}
      <View style={[styles.bottomBar, { paddingBottom: insets.bottom + Spacing.base }]}>
        {/* Dots */}
        <View style={styles.dots}>
          {SLIDES.map((_, i) => (
            <Pressable
              key={i}
              onPress={() => {
                scrollRef.current?.scrollTo({ x: i * width, animated: true });
                setActiveSlide(i);
              }}
            >
              <View
                style={[
                  styles.dot,
                  i === activeSlide && { width: 24, backgroundColor: slide.accentColor },
                ]}
              />
            </Pressable>
          ))}
        </View>

        {/* CTA Button */}
        <Pressable
          onPress={next}
          style={({ pressed }) => [
            styles.nextBtn,
            { backgroundColor: slide.accentColor },
            pressed && { opacity: 0.85, transform: [{ scale: 0.97 }] },
          ]}
        >
          <Text style={styles.nextBtnText}>
            {activeSlide === SLIDES.length - 1 ? 'Get Started' : 'Next'}
          </Text>
          <MaterialIcons
            name={activeSlide === SLIDES.length - 1 ? 'check' : 'arrow-forward'}
            size={20}
            color="#fff"
          />
        </Pressable>
      </View>

      {/* Brand footer */}
      <Text style={[styles.brand, { paddingBottom: insets.bottom + 4 }]}>
        MEDI+SCI VISUALS · SMART WORLD ORDER
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  skipBtn: {
    position: 'absolute',
    right: Spacing.base,
    zIndex: 10,
    paddingHorizontal: Spacing.md,
    paddingVertical: 6,
    backgroundColor: Colors.surface,
    borderRadius: Radius.full,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  skipText: {
    color: Colors.textSecondary,
    fontSize: Typography.sm,
    fontWeight: Typography.semibold,
  },
  slide: {
    flex: 1,
  },
  imageWrapper: {
    height: 380,
    position: 'relative',
    overflow: 'hidden',
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    ...Shadows.strong,
  },
  slideImage: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    position: 'absolute',
    inset: 0,
  },
  badgeRow: {
    position: 'absolute',
    bottom: Spacing.base,
    left: Spacing.base,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255,255,255,0.92)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: Radius.full,
  },
  badge: {
    fontSize: 12,
    fontWeight: Typography.semibold,
  },
  textBlock: {
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.xl,
    flex: 1,
  },
  slideTitle: {
    fontSize: 28,
    fontWeight: Typography.bold,
    color: Colors.textPrimary,
    lineHeight: 36,
    marginBottom: Spacing.md,
  },
  slideSubtitle: {
    fontSize: Typography.base,
    color: Colors.textSecondary,
    lineHeight: 26,
  },
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.base,
  },
  dots: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.border,
    transition: 200,
  },
  nextBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    borderRadius: Radius.xl,
    ...Shadows.card,
  },
  nextBtnText: {
    color: '#fff',
    fontSize: Typography.base,
    fontWeight: Typography.bold,
  },
  brand: {
    textAlign: 'center',
    fontSize: 10,
    color: Colors.textMuted,
    letterSpacing: 1,
    paddingTop: 4,
  },
});
