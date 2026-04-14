<script setup>
import AdjacentSwapGame from '../components/AdjacentSwapGame.vue'
import { useGameResults } from '../composables/useGameResults'

const { results, updateResult } = useGameResults()
</script>

<template>
  <AdjacentSwapGame :result="results['adjacent-swap']" @complete="updateResult" />
</template>
