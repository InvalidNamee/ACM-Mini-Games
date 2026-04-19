<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  result: {
    type: Object,
    default: null,
  },
})

const emit = defineEmits(['complete'])

const DISKS = Object.freeze([4, 3, 2, 1])
const PERFECT_STEPS = 15

const towers = ref(createTowers())
const selectedTower = ref(null)
const moves = ref(0)
const message = ref('把四层圆盘从左侧移动到右侧，每次只能移动最上面的一个。')

function createTowers() {
  return [DISKS.slice(), [], []]
}

function topDisk(index) {
  const tower = towers.value[index]
  return tower[tower.length - 1]
}

function resetGame() {
  towers.value = createTowers()
  selectedTower.value = null
  moves.value = 0
  message.value = '新一轮开始，目标是把四层圆盘全部移到右侧。'
}

function scoreFromMoves(totalMoves) {
  const extraMoves = Math.max(totalMoves - PERFECT_STEPS, 0)
  return Math.min(100, Math.max(20, 100 - Math.floor(Math.log2(extraMoves)) * 20))
}

function selectTower(index) {
  if (selectedTower.value === null) {
    if (!towers.value[index].length) {
      message.value = '这根柱子是空的，请先选择有圆盘的柱子。'
      return
    }
    selectedTower.value = index
    message.value = `已选中 ${index + 1} 号柱，请点击目标柱。`
    return
  }

  if (selectedTower.value === index) {
    selectedTower.value = null
    message.value = '已取消选择。'
    return
  }

  const from = selectedTower.value
  const movingDisk = topDisk(from)
  const targetDisk = topDisk(index)

  if (targetDisk && targetDisk < movingDisk) {
    selectedTower.value = null
    message.value = '大圆盘不能放在小圆盘上。'
    return
  }

  const next = towers.value.map((tower) => [...tower])
  next[from].pop()
  next[index].push(movingDisk)
  towers.value = next
  selectedTower.value = null
  moves.value += 1

  if (next[2].length === DISKS.length) {
    const score = scoreFromMoves(moves.value)
    message.value = '挑战完成。'
    emit('complete', {
      id: 'tower-of-hanoi',
      title: '四层汉诺塔',
      attempts: moves.value,
      score,
      detail: `用了 ${moves.value} 步，理论满分次数 ${PERFECT_STEPS} 步`,
    })
    return
  }

  message.value = `已完成第 ${moves.value} 步。`
}

function diskWidth(disk) {
  return `${44 + disk * 24}px`
}

const completedDisks = computed(() => towers.value[2].length)
</script>

<template>
  <section class="border border-gray-200 bg-white p-6 space-y-5">
    <div class="flex items-start justify-between gap-4">
      <div class="space-y-2">
        <span class="pill">小游戏 3</span>
        <h3 class="text-2xl font-semibold text-ink">四层汉诺塔</h3>
        <p class="text-sm leading-6 text-ink/70">
          把四层圆盘从左侧移动到右侧。每次只能移动一层，且大圆盘不能压在小圆盘上。
        </p>
      </div>
      <button class="secondary-button" type="button" @click="resetGame">重新开始</button>
    </div>

    <div class="grid gap-3 md:grid-cols-3">
      <div class="border border-gray-200 bg-gray-50 p-4">
        <p class="text-xs uppercase tracking-[0.2em] text-ink/45">当前步数</p>
        <p class="mt-2 text-3xl font-semibold ">{{ moves }}</p>
      </div>
      <div class="border border-gray-200 bg-gray-50 p-4">
        <p class="text-xs uppercase tracking-[0.2em] text-ink/45">理论满分次数</p>
        <p class="mt-2 text-3xl font-semibold ">{{ PERFECT_STEPS }}</p>
      </div>
      <div class="border border-gray-200 bg-gray-50 p-4">
        <p class="text-xs uppercase tracking-[0.2em] text-ink/45">已移至目标柱</p>
        <p class="mt-2 text-3xl font-semibold ">{{ completedDisks }}/4</p>
      </div>
    </div>

    <div class="border border-gray-200 bg-gray-50 p-4">
      <div class="grid gap-4 md:grid-cols-3">
        <button
          v-for="(tower, index) in towers"
          :key="index"
          type="button"
          class="relative flex h-72 flex-col justify-end border border-gray-200 bg-white px-3 pb-4 pt-6 transition"
          :class="
            selectedTower === index
              ? 'border-gray-900 bg-gray-100'
              : 'hover:border-gray-400 hover:bg-gray-50'
          "
          @click="selectTower(index)"
        >
          <span class="absolute left-1/2 top-8 h-40 w-2 -translate-x-1/2 bg-gray-200"></span>
          <span class="absolute bottom-3 left-4 right-4 h-3 bg-gray-200"></span>
          <span class="absolute left-4 top-4 text-xs uppercase tracking-[0.18em] text-gray-500">
            {{ index + 1 }} 号柱
          </span>
          <div class="relative z-10 flex flex-col-reverse items-center gap-2">
            <div
              v-for="disk in tower"
              :key="disk"
              class="flex h-6 items-center justify-center border border-gray-300 text-xs font-semibold text-white"
              :style="{ width: diskWidth(disk), background: disk === 4 ? '#c8a24a' : disk === 3 ? '#9c4f5a' : disk === 2 ? '#5d7681' : '#7c9d68' }"
            >
              {{ disk }}
            </div>
          </div>
        </button>
      </div>
    </div>

    <div class="border border-gray-200 bg-gray-50 p-4 text-sm text-gray-700">
      {{ message }}
    </div>

    <div
      v-if="props.result"
      class="border border-gray-200 bg-gray-50 p-4 text-sm text-gray-700"
    >
      本项目最佳成绩：{{ props.result.detail }}，获得 {{ props.result.score }} 分。
    </div>
  </section>
</template>
