<template>
    <div class="section">
        <div class="sectionTitle">Teams</div>
        <TeamCardList :model="Team"></TeamCardList>
    </div>
</template>
<script setup lang="ts">
import TeamCardList from '@/components/team/TeamCardList.vue'

import Team from '@/model/team'

definePageMeta({
    layout: "dashboard"
});


</script>
