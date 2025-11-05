<template>
  <div style="display: flex; flex-direction: row; flex-wrap: wrap;">
    <CardAddButton @click="navigate" class="TeamCard-dimensions" />
    <TeamCard v-for="team in list" :key="team" :team="team" />
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import TeamCard from '@/components/team/TeamCard.vue'
import CardAddButton from '~/components/buttons/CardAddButton.vue'
import ListInit from '@/model/mixins/ListInit.js'

// ── Setup router
const router = useRouter()

// ── Use the ListInit mixin logic
// If ListInit exports reactive data or methods, we can reuse it here.
const list = ref([]);

// ── Methods
const navigate = () => {
  router.push({ path: '/team/create' })
}
</script>
