<template>
	<UDropdown
		v-slot="{ open }"
		mode="hover"
		:items="[teams, actions]"
		class="w-full"
		:ui="{ width: 'w-full' }"
		:popper="{ strategy: 'absolute' }"
	>
		<UButton :class="[open && 'dark:bg-gray-800']" class="w-full">
			<UAvatar :src="team.avatar.src" size="2xs" />

			<span class="truncate text-white dark:text-white font-semibold">{{ team.label }}</span>
		</UButton>
	</UDropdown>
</template>

<script setup lang="ts">
// const { data } = useAuth();
const data = {
	value: undefined
};
const userData = data.value ? data.value?.user : null;
const teams = [
	{
		label: userData && userData.orgName ? userData.orgName : "NO ORGANISATION",
		avatar: {
			src: "https://images.unsplash.com/photo-1576595003786-359e3e2d70be?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
		},
		click: () => {
			team.value = teams[0];
		}
	}
];

const actions = [
	{
		label: "Gérer les organisations",
		icon: "i-heroicons-cog-8-tooth"
	}
];

const team = ref(teams[0]);
</script>
