<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { GAME_CATALOG } from '../config/gameRules'
import { useGameResults } from '../composables/useGameResults'

const { totalScore, unlockedTier, nextGoal } = useGameResults()
</script>

<template>
  <main class="mx-auto max-w-7xl flex flex-col gap-8 px-4 py-8">
    <section class="border border-gray-200 bg-white p-6 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
      <div class="space-y-3">
        <RouterLink class="pill" to="/">返回首页</RouterLink>
        <h1 class="font-display text-4xl font-bold text-ink">小游戏挑战区</h1>
        <p class="max-w-2xl text-sm leading-6 text-ink/70">
          选一关直接开始，成绩会一直保留，方便你下次继续挑战。
        </p>
      </div>

      <div class="border border-gray-200 bg-gray-50 px-5 py-4">
        <p class="text-xs uppercase tracking-[0.2em] text-gray-500">累计积分</p>
        <p class="mt-2 text-4xl font-semibold text-gray-900">{{ totalScore }}</p>
        <p class="mt-2 text-sm text-gray-600">{{ unlockedTier }} · {{ nextGoal }}</p>
      </div>
    </section>

    <nav class="flex flex-wrap gap-2">
      <RouterLink
        v-for="game in GAME_CATALOG"
        :key="game.id"
        :to="game.route"
        class="secondary-button"
      >
        {{ game.title }}
      </RouterLink>
    </nav>

    <RouterView />
  </main>
</template>
