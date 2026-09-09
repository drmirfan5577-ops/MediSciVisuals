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
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Colors, Typography, Spacing, Radius, Shadows } from '@/constants/theme';
import { QUIZ_CATEGORIES, QuizQuestion } from '@/constants/quiz-data';

type QuizState = 'select' | 'playing' | 'result';

export default function QuizScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const [state, setState] = useState<QuizState>('select');
  const [selectedCat, setSelectedCat] = useState(QUIZ_CATEGORIES[0]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [showExplanation, setShowExplanation] = useState(false);

  const shakeAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const currentQ: QuizQuestion = selectedCat.questions[currentIdx];
  const totalQ = selectedCat.questions.length;

  const shake = () => {
    Animated.sequence([
      Animated.timing(shakeAnim, { toValue: 8, duration: 60, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -8, duration: 60, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 6, duration: 60, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 0, duration: 60, useNativeDriver: true }),
    ]).start();
  };

  const handleAnswer = (idx: number) => {
    if (answered) return;
    setSelectedAnswer(idx);
    setAnswered(true);

    const isCorrect = idx === currentQ.correct;
    if (isCorrect) {
      setScore((s) => s + 1);
    } else {
      shake();
    }

    setAnswers((prev) => {
      const next = [...prev];
      next[currentIdx] = idx;
      return next;
    });
  };

  const nextQuestion = () => {
    if (currentIdx < totalQ - 1) {
      Animated.sequence([
        Animated.timing(fadeAnim, { toValue: 0, duration: 150, useNativeDriver: true }),
      ]).start(() => {
        setCurrentIdx((i) => i + 1);
        setSelectedAnswer(null);
        setAnswered(false);
        setShowExplanation(false);
        Animated.timing(fadeAnim, { toValue: 1, duration: 200, useNativeDriver: true }).start();
      });
    } else {
      setState('result');
    }
  };

  const restart = () => {
    setCurrentIdx(0);
    setSelectedAnswer(null);
    setAnswered(false);
    setScore(0);
    setAnswers([]);
    setShowExplanation(false);
    fadeAnim.setValue(1);
    setState('playing');
  };

  const startQuiz = (cat: typeof QUIZ_CATEGORIES[0]) => {
    setSelectedCat(cat);
    setCurrentIdx(0);
    setSelectedAnswer(null);
    setAnswered(false);
    setScore(0);
    setAnswers([]);
    setState('playing');
  };

  const percentage = Math.round((score / totalQ) * 100);
  const grade =
    percentage >= 80 ? { label: 'Excellent!', icon: 'emoji-events', color: '#FFD700' }
    : percentage >= 60 ? { label: 'Good Job!', icon: 'thumb-up', color: Colors.secondary }
    : { label: 'Keep Studying', icon: 'school', color: Colors.primary };

  // ── CATEGORY SELECT ─────────────────────────────────────────────────────────
  if (state === 'select') {
    return (
      <View style={[styles.screen, { paddingTop: insets.top }]}>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} hitSlop={8}>
            <MaterialIcons name="arrow-back" size={22} color={Colors.textPrimary} />
          </Pressable>
          <View style={{ flex: 1 }}>
            <Text style={styles.headerTitle}>Quiz & Assessment</Text>
            <Text style={styles.headerSub}>Test your medical knowledge</Text>
          </View>
          <View style={styles.headerIcon}>
            <MaterialIcons name="quiz" size={22} color={Colors.primary} />
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.selectScroll} showsVerticalScrollIndicator={false}>
          <View style={styles.heroBanner}>
            <MaterialIcons name="emoji-events" size={32} color="#FFD700" />
            <Text style={styles.heroTitle}>Challenge Yourself</Text>
            <Text style={styles.heroSub}>5 questions per category · Instant feedback</Text>
          </View>

          <Text style={styles.sectionLabel}>Choose a Category</Text>

          {QUIZ_CATEGORIES.map((cat) => (
            <Pressable
              key={cat.id}
              onPress={() => startQuiz(cat)}
              style={({ pressed }) => [
                styles.catCard,
                { borderLeftColor: cat.color },
                pressed && { opacity: 0.85, transform: [{ scale: 0.98 }] },
              ]}
            >
              <View style={[styles.catIcon, { backgroundColor: cat.bgColor }]}>
                <MaterialIcons name={cat.icon as any} size={28} color={cat.color} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.catTitle}>{cat.title}</Text>
                <Text style={styles.catMeta}>{cat.totalQuestions} questions · Mixed difficulty</Text>
              </View>
              <View style={[styles.startBadge, { backgroundColor: cat.color }]}>
                <Text style={styles.startBadgeText}>Start</Text>
                <MaterialIcons name="arrow-forward" size={14} color="#fff" />
              </View>
            </Pressable>
          ))}

          <View style={{ height: insets.bottom + 24 }} />
        </ScrollView>
      </View>
    );
  }

  // ── RESULT SCREEN ────────────────────────────────────────────────────────────
  if (state === 'result') {
    return (
      <View style={[styles.screen, { paddingTop: insets.top }]}>
        <View style={styles.header}>
          <Pressable onPress={() => setState('select')} hitSlop={8}>
            <MaterialIcons name="arrow-back" size={22} color={Colors.textPrimary} />
          </Pressable>
          <Text style={styles.headerTitle}>Quiz Results</Text>
          <View />
        </View>

        <ScrollView contentContainerStyle={styles.resultScroll}>
          {/* Score Circle */}
          <View style={styles.scoreBox}>
            <View style={[styles.scoreCircle, { borderColor: grade.color }]}>
              <Text style={[styles.scorePercent, { color: grade.color }]}>{percentage}%</Text>
              <Text style={styles.scoreLabel}>{score}/{totalQ} correct</Text>
            </View>
            <MaterialIcons name={grade.icon as any} size={28} color={grade.color} style={{ marginTop: Spacing.sm }} />
            <Text style={[styles.gradeLabel, { color: grade.color }]}>{grade.label}</Text>
            <Text style={styles.catNameResult}>{selectedCat.title}</Text>
          </View>

          {/* Question Review */}
          <Text style={styles.sectionLabel}>Review Answers</Text>
          {selectedCat.questions.map((q, idx) => {
            const given = answers[idx];
            const correct = given === q.correct;
            return (
              <View key={q.id} style={[styles.reviewCard, correct ? styles.reviewCorrect : styles.reviewWrong]}>
                <View style={styles.reviewHeader}>
                  <View style={[styles.reviewNum, { backgroundColor: correct ? Colors.success : Colors.error }]}>
                    <Text style={styles.reviewNumText}>{idx + 1}</Text>
                  </View>
                  <Text style={styles.reviewQ} numberOfLines={2}>{q.question}</Text>
                  <MaterialIcons
                    name={correct ? 'check-circle' : 'cancel'}
                    size={20}
                    color={correct ? Colors.success : Colors.error}
                  />
                </View>
                {!correct && (
                  <Text style={styles.reviewCorrectAns}>
                    Correct: {q.options[q.correct]}
                  </Text>
                )}
              </View>
            );
          })}

          {/* Actions */}
          <View style={styles.resultActions}>
            <Pressable
              onPress={restart}
              style={[styles.actionBtn, { backgroundColor: selectedCat.color }]}
            >
              <MaterialIcons name="replay" size={20} color="#fff" />
              <Text style={styles.actionBtnText}>Retry Quiz</Text>
            </Pressable>
            <Pressable
              onPress={() => setState('select')}
              style={[styles.actionBtn, { backgroundColor: Colors.surface, borderWidth: 1.5, borderColor: Colors.border }]}
            >
              <MaterialIcons name="apps" size={20} color={Colors.textSecondary} />
              <Text style={[styles.actionBtnText, { color: Colors.textSecondary }]}>All Categories</Text>
            </Pressable>
          </View>

          <View style={{ height: insets.bottom + 24 }} />
        </ScrollView>
      </View>
    );
  }

  // ── QUIZ PLAYING ─────────────────────────────────────────────────────────────
  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.quizHeader}>
        <Pressable onPress={() => setState('select')} hitSlop={8}>
          <MaterialIcons name="close" size={22} color={Colors.textPrimary} />
        </Pressable>
        <View style={styles.progressBarContainer}>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${((currentIdx) / totalQ) * 100}%`, backgroundColor: selectedCat.color }]} />
          </View>
        </View>
        <Text style={styles.qCounter}>{currentIdx + 1}/{totalQ}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.quizScroll} showsVerticalScrollIndicator={false}>
        {/* Difficulty badge */}
        <View style={[styles.diffBadge, { backgroundColor: currentQ.difficulty === 'Beginner' ? Colors.success + '20' : currentQ.difficulty === 'Intermediate' ? Colors.warning + '20' : Colors.error + '20' }]}>
          <Text style={[styles.diffText, { color: currentQ.difficulty === 'Beginner' ? Colors.success : currentQ.difficulty === 'Intermediate' ? Colors.warning : Colors.error }]}>
            {currentQ.difficulty}
          </Text>
        </View>

        {/* Category */}
        <View style={styles.catBadge}>
          <MaterialIcons name={selectedCat.icon as any} size={14} color={selectedCat.color} />
          <Text style={[styles.catBadgeText, { color: selectedCat.color }]}>{selectedCat.title}</Text>
        </View>

        {/* Question */}
        <Animated.View style={{ opacity: fadeAnim, transform: [{ translateX: shakeAnim }] }}>
          <Text style={styles.questionText}>{currentQ.question}</Text>
        </Animated.View>

        {/* Options */}
        <View style={styles.optionsContainer}>
          {currentQ.options.map((opt, idx) => {
            const isSelected = selectedAnswer === idx;
            const isCorrect = idx === currentQ.correct;
            let bgColor = Colors.surface;
            let borderColor = Colors.border;
            let textColor = Colors.textPrimary;

            if (answered) {
              if (isCorrect) { bgColor = Colors.success + '18'; borderColor = Colors.success; textColor = Colors.success; }
              else if (isSelected && !isCorrect) { bgColor = Colors.error + '18'; borderColor = Colors.error; textColor = Colors.error; }
            } else if (isSelected) {
              bgColor = selectedCat.color + '18';
              borderColor = selectedCat.color;
              textColor = selectedCat.color;
            }

            return (
              <Pressable
                key={idx}
                onPress={() => handleAnswer(idx)}
                disabled={answered}
                style={({ pressed }) => [
                  styles.option,
                  { backgroundColor: bgColor, borderColor },
                  pressed && !answered && { opacity: 0.8, transform: [{ scale: 0.98 }] },
                ]}
              >
                <View style={[styles.optionLetter, { backgroundColor: borderColor + '25', borderColor }]}>
                  <Text style={[styles.optionLetterText, { color: textColor }]}>
                    {['A', 'B', 'C', 'D'][idx]}
                  </Text>
                </View>
                <Text style={[styles.optionText, { color: textColor }]}>{opt}</Text>
                {answered && isCorrect && (
                  <MaterialIcons name="check-circle" size={20} color={Colors.success} />
                )}
                {answered && isSelected && !isCorrect && (
                  <MaterialIcons name="cancel" size={20} color={Colors.error} />
                )}
              </Pressable>
            );
          })}
        </View>

        {/* Explanation */}
        {answered && (
          <View>
            <Pressable
              onPress={() => setShowExplanation((s) => !s)}
              style={styles.explanationToggle}
            >
              <MaterialIcons name="info" size={16} color={Colors.primary} />
              <Text style={styles.explanationToggleText}>
                {showExplanation ? 'Hide Explanation' : 'Show Explanation'}
              </Text>
              <MaterialIcons name={showExplanation ? 'expand-less' : 'expand-more'} size={18} color={Colors.primary} />
            </Pressable>
            {showExplanation && (
              <View style={styles.explanationBox}>
                <Text style={styles.explanationText}>{currentQ.explanation}</Text>
              </View>
            )}
          </View>
        )}

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Next Button */}
      {answered && (
        <View style={[styles.nextBar, { paddingBottom: insets.bottom + Spacing.sm }]}>
          <Pressable
            onPress={nextQuestion}
            style={({ pressed }) => [
              styles.nextBtn,
              { backgroundColor: selectedCat.color },
              pressed && { opacity: 0.85 },
            ]}
          >
            <Text style={styles.nextBtnText}>
              {currentIdx < totalQ - 1 ? 'Next Question' : 'See Results'}
            </Text>
            <MaterialIcons name="arrow-forward" size={20} color="#fff" />
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    paddingHorizontal: Spacing.base,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.base,
  },
  headerTitle: { fontSize: Typography.xl, fontWeight: Typography.bold, color: Colors.textPrimary },
  headerSub: { fontSize: Typography.sm, color: Colors.textMuted },
  headerIcon: { width: 44, height: 44, backgroundColor: Colors.primaryLight, borderRadius: Radius.md, alignItems: 'center', justifyContent: 'center' },
  heroBanner: {
    backgroundColor: Colors.primaryLight,
    borderRadius: Radius.xl,
    padding: Spacing.xl,
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.xl,
    borderWidth: 1,
    borderColor: Colors.primary + '20',
  },
  heroTitle: { fontSize: Typography.xl, fontWeight: Typography.bold, color: Colors.textPrimary },
  heroSub: { fontSize: Typography.sm, color: Colors.textSecondary, textAlign: 'center' },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: Spacing.md,
    paddingHorizontal: Spacing.base,
  },
  selectScroll: { paddingHorizontal: Spacing.base, paddingTop: Spacing.md },
  catCard: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.base,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    marginBottom: Spacing.md,
    borderLeftWidth: 4,
    ...Shadows.card,
  },
  catIcon: { width: 56, height: 56, borderRadius: Radius.md, alignItems: 'center', justifyContent: 'center' },
  catTitle: { fontSize: Typography.base, fontWeight: Typography.bold, color: Colors.textPrimary, marginBottom: 2 },
  catMeta: { fontSize: Typography.sm, color: Colors.textMuted },
  startBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: Spacing.md, paddingVertical: 8, borderRadius: Radius.full },
  startBadgeText: { color: '#fff', fontSize: Typography.sm, fontWeight: Typography.bold },
  // Quiz Playing
  quizHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.base,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.base,
    gap: Spacing.md,
  },
  progressBarContainer: { flex: 1 },
  progressTrack: { height: 6, backgroundColor: Colors.border, borderRadius: 3 },
  progressFill: { height: '100%', borderRadius: 3 },
  qCounter: { fontSize: Typography.sm, fontWeight: Typography.bold, color: Colors.textSecondary, minWidth: 32 },
  quizScroll: { paddingHorizontal: Spacing.base },
  diffBadge: { alignSelf: 'flex-start', paddingHorizontal: Spacing.sm, paddingVertical: 4, borderRadius: Radius.full, marginBottom: Spacing.sm },
  diffText: { fontSize: 12, fontWeight: Typography.bold },
  catBadge: { flexDirection: 'row', alignItems: 'center', gap: 5, marginBottom: Spacing.base },
  catBadgeText: { fontSize: 13, fontWeight: Typography.semibold },
  questionText: { fontSize: Typography.lg, fontWeight: Typography.bold, color: Colors.textPrimary, lineHeight: 28, marginBottom: Spacing.xl },
  optionsContainer: { gap: Spacing.md, marginBottom: Spacing.base },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    padding: Spacing.md,
    borderRadius: Radius.lg,
    borderWidth: 2,
    ...Shadows.subtle,
  },
  optionLetter: { width: 36, height: 36, borderRadius: 18, borderWidth: 1.5, alignItems: 'center', justifyContent: 'center' },
  optionLetterText: { fontSize: Typography.sm, fontWeight: Typography.bold },
  optionText: { flex: 1, fontSize: Typography.base, lineHeight: 22 },
  explanationToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: Colors.primaryLight,
    padding: Spacing.md,
    borderRadius: Radius.md,
    marginBottom: Spacing.sm,
  },
  explanationToggleText: { flex: 1, fontSize: Typography.sm, color: Colors.primary, fontWeight: Typography.semibold },
  explanationBox: {
    backgroundColor: Colors.primaryLight,
    borderRadius: Radius.md,
    padding: Spacing.md,
    borderLeftWidth: 3,
    borderLeftColor: Colors.primary,
    marginBottom: Spacing.base,
  },
  explanationText: { fontSize: Typography.sm, color: Colors.textSecondary, lineHeight: 22 },
  nextBar: { padding: Spacing.base, backgroundColor: Colors.surface, borderTopWidth: 1, borderTopColor: Colors.border },
  nextBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, borderRadius: Radius.lg, paddingVertical: Spacing.md, ...Shadows.card },
  nextBtnText: { color: '#fff', fontSize: Typography.base, fontWeight: Typography.bold },
  // Result
  resultScroll: { paddingHorizontal: Spacing.base, paddingTop: Spacing.base },
  scoreBox: { alignItems: 'center', paddingVertical: Spacing.xl, marginBottom: Spacing.xl },
  scoreCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 6,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
  },
  scorePercent: { fontSize: 28, fontWeight: Typography.bold },
  scoreLabel: { fontSize: Typography.sm, color: Colors.textMuted },
  gradeLabel: { fontSize: Typography.xl, fontWeight: Typography.bold, marginTop: Spacing.xs },
  catNameResult: { fontSize: Typography.sm, color: Colors.textMuted, marginTop: 4 },
  reviewCard: {
    borderRadius: Radius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    borderWidth: 1.5,
  },
  reviewCorrect: { backgroundColor: Colors.success + '0A', borderColor: Colors.success + '40' },
  reviewWrong: { backgroundColor: Colors.error + '0A', borderColor: Colors.error + '40' },
  reviewHeader: { flexDirection: 'row', alignItems: 'flex-start', gap: Spacing.sm },
  reviewNum: { width: 24, height: 24, borderRadius: 12, alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  reviewNumText: { color: '#fff', fontSize: 11, fontWeight: '700' },
  reviewQ: { flex: 1, fontSize: Typography.sm, color: Colors.textSecondary, lineHeight: 19 },
  reviewCorrectAns: { fontSize: 12, color: Colors.success, marginTop: 6, paddingLeft: 32, fontWeight: '600' },
  resultActions: { gap: Spacing.sm, marginTop: Spacing.xl },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: Spacing.md,
    borderRadius: Radius.lg,
    ...Shadows.subtle,
  },
  actionBtnText: { color: '#fff', fontSize: Typography.base, fontWeight: Typography.bold },
});
