<template>
	<div>
		TEAM PAGE ID: {{ teamId }}
		<TeamProfile :teamId="teamId" />
	</div>
</template>
<script setup lang="ts">
import TeamProfile from '@/components/team/TeamProfile.vue';

definePageMeta({
	layout: "dashboard"
});

const route = useRoute();
const teamId = route.params?.id;
console.log("teamId", teamId);

</script>