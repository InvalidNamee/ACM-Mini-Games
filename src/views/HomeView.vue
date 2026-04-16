<script setup>
import { RouterLink } from 'vue-router'
import { GAME_CATALOG } from '../config/gameRules'
import { useGameResults } from '../composables/useGameResults'

const { results, totalScore, unlockedTier, nextGoal, resetAllProgress } = useGameResults()
</script>

<template>
  <main class="mx-auto max-w-7xl flex flex-col gap-8 px-4 py-8">
    <section class="border border-gray-200 bg-white p-6 text-gray-900">
      <div class="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div class="space-y-5">
          <span class="pill">第23届社团文化节游园会·<span class="text-ink">ACM俱乐部的摊位</span></span>
          <div class="space-y-4">
            <h1 class="font-display text-4xl font-bold tracking-tight md:text-6xl">玩游戏，拿奖励！</h1>
            <p class="max-w-2xl text-sm leading-7 text-gray-600 md:text-base">
              先选一关开始玩，成绩会自动记录，累计分数越高，能拿到的奖励越好。
            </p>
          </div>

          <div class="border border-gray-200 bg-gray-50 p-4 text-sm leading-6 text-gray-700">
            <p class="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">活动推广</p>
            <p class="mt-2">
              如果你玩得开心，也欢迎来支持 ACM 俱乐部在周四数据科技日晚上的 UPCPC 体验赛 2026。
              现场会有更多算法题和小奖品，名额有限，先到先得。
            </p>
            <p class="mt-2">
              具体报名可以在石光搜索“UPCPC体验赛2026”，记得顺手看看活动公告里的参赛手册。
            </p>
          </div>
        </div>

        <div class="border border-gray-200 bg-gray-50 p-6">
          <p class="text-sm uppercase tracking-[0.25em] text-gray-500">当前总积分</p>
          <p class="mt-4 text-6xl font-semibold text-gray-900">{{ totalScore }}</p>
          <div class="mt-5 border border-gray-200 bg-white p-4">
            <p class="text-sm text-gray-600">当前奖励档位</p>
            <p class="mt-2 text-2xl font-semibold">{{ unlockedTier }}</p>
            <p class="mt-2 text-sm text-gray-600">{{ nextGoal }}</p>
          </div>
          <button class="secondary-button mt-5" type="button" @click="resetAllProgress">
            清空积分记录
          </button>
        </div>
      </div>
    </section>

    <section class="grid gap-6 xl:grid-cols-[0.7fr_1.3fr]">
      <div class="border border-gray-200 bg-white p-6 space-y-5">
        <div class="space-y-2">
          <h2 class="section-title">活动说明</h2>
        </div>

        <div class="grid gap-3">
          <div class="border border-gray-200 bg-gray-50 p-4 text-sm text-gray-700">
            二分答案尽量少猜几次，猜的次数越少越容易拿高分。
          </div>
          <div class="border border-gray-200 bg-gray-50 p-4 text-sm text-gray-700">
            冒泡排序要把乱序数字排整齐，交换越少，成绩越好。
          </div>
          <div class="border border-gray-200 bg-gray-50 p-4 text-sm text-gray-700">
            汉诺塔要把圆盘搬到右边，尽量用更少步数完成。
          </div>
        </div>
      </div>

      <div class="border border-gray-200 bg-white p-6 space-y-5">
        <div class="space-y-2">
          <h2 class="section-title">游戏入口</h2>
        </div>

        <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <article v-for="game in GAME_CATALOG" :key="game.id" class="border border-gray-200 bg-white p-5 flex h-full flex-col">
            <p class="text-sm font-semibold text-ink">{{ game.title }}</p>
            <p class="mt-2 min-h-12 text-sm leading-6 text-ink/60">{{ game.summary }}</p>
            <div class="mt-6 flex flex-1 flex-col justify-between gap-4">
              <template v-if="results[game.id]">
                <div>
                  <p class="text-3xl font-semibold">{{ results[game.id].score }}</p>
                  <p class="mt-2 text-sm text-ink/70">{{ results[game.id].detail }}</p>
                </div>
              </template>
              <template v-else>
                <div>
                  <p class="text-xl font-semibold text-ink/35">未完成</p>
                  <p class="mt-2 text-sm text-ink/55">还没有生成积分记录。</p>
                </div>
              </template>
              <RouterLink class="primary-button w-full" :to="game.route">进入挑战</RouterLink>
            </div>
          </article>
        </div>
      </div>
    </section>
  </main>
</template>
