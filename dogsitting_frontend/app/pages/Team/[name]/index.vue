<template>
	<div>
		TEA MDETAIL PAGE HERE <br></br>
		<TeamDetail :name="teamName" />
	</div>
</template>
<script setup lang="ts">

definePageMeta({
	layout: "dashboard"
});

const route = useRoute();
const teamName = ref<string>(route?.params?.name as string ?? "");

</script>