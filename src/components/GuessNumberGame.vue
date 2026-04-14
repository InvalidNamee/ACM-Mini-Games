<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  result: {
    type: Object,
    default: null,
  },
})

const emit = defineEmits(['complete'])

const min = ref(1)
const max = ref(64)
const target = ref(createTarget())
  // console.log(target.value); // Developer log removed

const guess = ref('')
const attempts = ref(0)
const message = ref('请输入一个整数开始挑战。')
const finished = ref(false)
const history = ref([])

function targetSteps() {
  return Math.floor(Math.log2(max.value - min.value)) + 1
}

function scoreFromAttempts(value) {
  const baseline = Math.max(targetSteps(), 1)
  const extraSteps = Math.max(value - baseline, 0)
  return Math.max(20, 100 - extraSteps * 12)
}

function createTarget() {
  return Math.floor(Math.random() * (max.value - min.value + 1)) + min.value
}

function resetGame() {
  target.value = createTarget()
  guess.value = ''
  attempts.value = 0
  message.value = '新的数字已经生成，继续试试。'
  finished.value = false
  history.value = []
}

function submitGuess() {
  const value = Number(guess.value)
  if (!Number.isInteger(value)) {
    message.value = '请输入整数。'
    return
  }

  if (value < min.value || value > max.value) {
    message.value = `请输入 ${min.value} 到 ${max.value} 之间的数字。`
    return
  }

  attempts.value += 1
  history.value.unshift(value)

  if (value === target.value) {
    finished.value = true
    const score = scoreFromAttempts(attempts.value)
    message.value = `答对了，目标数字就是 ${target.value}。`
    emit('complete', {
      id: 'guess-number',
      title: '二分答案',
      attempts: attempts.value,
      score,
      detail: `用了 ${attempts.value} 次猜中，理论满分步数 ${targetSteps()} 次`,
    })
    return
  }

  message.value =
    value > target.value ? '猜大了，可以把上界再压低一点。' : '猜小了，可以把下界再抬高一点。'
}

const hint = computed(() => {
  if (!history.value.length) {
    return '试着每次猜中间值，效果最稳。'
  }

  const last = history.value[0]
  return last > target.value ? `上一轮 ${last} 偏大。` : `上一轮 ${last} 偏小。`
})
</script>

<template>
  <section class="border border-gray-200 bg-white p-6 space-y-5">
    <div class="flex items-start justify-between gap-4">
      <div class="space-y-2">
        <span class="pill">小游戏 1</span>
        <h3 class="text-2xl font-semibold text-ink">二分答案</h3>
        <p class="text-sm leading-6 text-ink/70">
          系统会在 {{ min }} 到 {{ max }} 之间随机生成一个整数。你每猜一次，页面都会告诉你偏大还是偏小。
        </p>
      </div>
      <button class="secondary-button" type="button" @click="resetGame">重新开始</button>
    </div>

    <div class="grid gap-3 md:grid-cols-[1fr_auto]">
      <input
        v-model="guess"
        class="input"
        type="number"
        :min="min"
        :max="max"
        placeholder="输入你的猜测"
        :disabled="finished"
        @keyup.enter="submitGuess"
      />
      <button class="primary-button" type="button" :disabled="finished" @click="submitGuess">
        提交答案
      </button>
    </div>

    <div class="grid gap-3 md:grid-cols-3">
      <div class="border border-gray-200 bg-gray-50 p-4">
        <p class="text-xs uppercase tracking-[0.2em] text-ink/45">当前状态</p>
        <p class="mt-2 text-sm text-ink/80">{{ message }}</p>
      </div>
      <div class="border border-gray-200 bg-gray-50 p-4">
        <p class="text-xs uppercase tracking-[0.2em] text-ink/45">提示</p>
        <p class="mt-2 text-sm text-ink/80">{{ hint }}</p>
      </div>
      <div class="border border-gray-200 bg-gray-50 p-4">
        <p class="text-xs uppercase tracking-[0.2em] text-ink/45">理论满分步数</p>
        <p class="mt-2 text-3xl font-semibold ">{{ targetSteps() }}</p>
      </div>
    </div>

    <div class="flex flex-wrap gap-2">
      <span v-for="(value, index) in history" :key="`${value}-${index}`" class="pill">
        {{ value }}
      </span>
      <span v-if="!history.length" class="pill">还没有提交记录</span>
    </div>

    <div
      v-if="props.result"
      class="border border-gray-200 bg-gray-50 p-4 text-sm text-gray-700"
    >
      本项目最佳成绩：{{ props.result.detail }}，获得 {{ props.result.score }} 分。
    </div>
  </section>
</template>
