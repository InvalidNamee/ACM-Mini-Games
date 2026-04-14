<script setup>
import { ref } from 'vue'

const props = defineProps({
  result: {
    type: Object,
    default: null,
  },
})

const emit = defineEmits(['complete'])

const numbers = ref(createSequence())
const optimalSwaps = ref(inversionCount(numbers.value))
const swaps = ref(0)
const selectedIndex = ref(null)
const message = ref('把序列通过相邻交换整理成升序。')

function randomUniqueNumbers(count, min, max) {
  const pool = new Set()
  while (pool.size < count) {
    pool.add(Math.floor(Math.random() * (max - min + 1)) + min)
  }
  return [...pool]
}

function createSequence() {
  return randomUniqueNumbers(8, 10, 99)
}

function resetGame() {
  numbers.value = createSequence()
  optimalSwaps.value = inversionCount(numbers.value)
  swaps.value = 0
  selectedIndex.value = null
  message.value = '新序列已生成，继续挑战。'
}

function inversionCount(list) {
  let total = 0
  for (let i = 0; i < list.length; i += 1) {
    for (let j = i + 1; j < list.length; j += 1) {
      if (list[i] > list[j]) {
        total += 1
      }
    }
  }
  return total
}

function isSorted(list) {
  return list.every((value, index) => index === 0 || list[index - 1] <= value)
}

function choose(index) {
  if (selectedIndex.value === null) {
    selectedIndex.value = index
    message.value = '再点击一个相邻数字完成交换。'
    return
  }

  if (Math.abs(selectedIndex.value - index) !== 1) {
    selectedIndex.value = index
    message.value = '只能交换相邻的两个数字。'
    return
  }

  const first = Math.min(selectedIndex.value, index)
  const next = [...numbers.value]
  ;[next[first], next[first + 1]] = [next[first + 1], next[first]]
  numbers.value = next
  swaps.value += 1
  selectedIndex.value = null

  if (isSorted(next)) {
    const extraSwaps = Math.max(swaps.value - optimalSwaps.value, 0)
    const score = Math.max(20, 100 - extraSwaps * 14)
    message.value = '排序完成。'
    emit('complete', {
      id: 'adjacent-swap',
      title: '冒泡排序',
      attempts: swaps.value,
      score,
      detail: `用了 ${swaps.value} 次交换，理论满分次数 ${optimalSwaps.value} 次`,
    })
  } else {
    message.value = '交换成功，继续把它排成升序。'
  }
}
</script>

<template>
  <section class="border border-gray-200 bg-white p-6 space-y-5">
    <div class="flex items-start justify-between gap-4">
      <div class="space-y-2">
        <span class="pill">小游戏 2</span>
        <h3 class="text-2xl font-semibold text-ink">冒泡排序</h3>
        <p class="text-sm leading-6 text-ink/70">
          每次只能交换相邻的两个数字，把整个序列整理为从小到大的顺序，系统会统计总交换次数。
        </p>
      </div>
      <button class="secondary-button" type="button" @click="resetGame">换一组序列</button>
    </div>

    <div class="overflow-x-auto border border-gray-200 bg-gray-50 p-4">
      <div class="grid min-w-[760px] grid-cols-8 gap-2">
        <button
          v-for="(value, index) in numbers"
          :key="value"
          type="button"
          class="border border-gray-200 bg-white px-2 py-4 text-center text-gray-900 transition"
          :class="
            selectedIndex === index
              ? 'border-gray-900 bg-gray-100 text-gray-900'
              : 'hover:border-gray-400 hover:bg-gray-100'
          "
          @click="choose(index)"
        >
          <span class="text-[10px] uppercase tracking-[0.12em] text-gray-500">位置 {{ index + 1 }}</span>
          <span class="mt-2 block text-2xl font-semibold md:text-3xl">{{ value }}</span>
        </button>
      </div>
    </div>

    <div class="grid gap-3 md:grid-cols-3">
      <div class="border border-gray-200 bg-gray-50 p-4">
        <p class="text-xs uppercase tracking-[0.2em] text-ink/45">交换次数</p>
        <p class="mt-2 text-3xl font-semibold ">{{ swaps }}</p>
      </div>
      <div class="border border-gray-200 bg-gray-50 p-4">
        <p class="text-xs uppercase tracking-[0.2em] text-ink/45">当前状态</p>
        <p class="mt-2 text-sm text-ink/80">{{ message }}</p>
      </div>
      <div class="border border-gray-200 bg-gray-50 p-4">
        <p class="text-xs uppercase tracking-[0.2em] text-ink/45">理论满分次数</p>
        <p class="mt-2 text-3xl font-semibold ">{{ optimalSwaps }}</p>
      </div>
    </div>

    <div
      v-if="props.result"
      class="border border-gray-200 bg-gray-50 p-4 text-sm text-gray-700"
    >
      本项目最佳成绩：{{ props.result.detail }}，获得 {{ props.result.score }} 分。
    </div>
  </section>
</template>
