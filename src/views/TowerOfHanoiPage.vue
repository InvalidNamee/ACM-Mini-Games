<script setup>
import TowerOfHanoiGame from '../components/TowerOfHanoiGame.vue'
import { useGameResults } from '../composables/useGameResults'

const { results, updateResult } = useGameResults()
</script>

<template>
  <TowerOfHanoiGame :result="results['tower-of-hanoi']" @complete="updateResult" />
</template>
