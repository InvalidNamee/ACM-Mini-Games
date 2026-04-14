<script setup>
import GuessNumberGame from '../components/GuessNumberGame.vue'
import { useGameResults } from '../composables/useGameResults'

const { results, updateResult } = useGameResults()
</script>

<template>
  <GuessNumberGame :result="results['guess-number']" @complete="updateResult" />
</template>
