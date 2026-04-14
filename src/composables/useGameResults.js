import { computed, reactive, watch } from 'vue'
import { GAME_CATALOG, REWARD_STAGES } from '../config/gameRules'

const storageKey = 'club-mini-games-results'

function loadResults() {
  try {
    const raw = window.localStorage.getItem(storageKey)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

const results = reactive(loadResults())

watch(
  results,
  (value) => {
    window.localStorage.setItem(storageKey, JSON.stringify(value))
  },
  { deep: true },
)

function updateResult(payload) {
  const previous = results[payload.id]
  if (!previous || payload.score > previous.score) {
    results[payload.id] = payload
  }
}

function resetAllProgress() {
  Object.keys(results).forEach((key) => {
    delete results[key]
  })
}

const totalScore = computed(() =>
  GAME_CATALOG.reduce((sum, game) => sum + (results[game.id]?.score || 0), 0),
)

const rewardStages = Object.entries(REWARD_STAGES)
  .map(([key, stage]) => ({ key, ...stage }))
  .sort((left, right) => left.threshold - right.threshold)

const unlockedTier = computed(() => {
  const achievedStage = [...rewardStages].reverse().find((stage) => totalScore.value >= stage.threshold)
  if (achievedStage) {
    return achievedStage.name
  }
  return '继续挑战'
})

const nextGoal = computed(() => {
  const nextStage = rewardStages.find((stage) => totalScore.value < stage.threshold)
  if (nextStage) {
    return `距离${nextStage.name}还差 ${nextStage.threshold - totalScore.value} 分`
  }
  return '已达到最高奖励档位'
})

export function useGameResults() {
  return {
    results,
    totalScore,
    unlockedTier,
    nextGoal,
    updateResult,
    resetAllProgress,
  }
}
