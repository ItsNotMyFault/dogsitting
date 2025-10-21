<template>
	<UDropdown mode="hover" :items="items" :ui="{ width: 'w-full', item: { disabled: 'cursor-text select-text' } }"
		:popper="{ strategy: 'absolute', placement: 'top' }" class="w-full">
		<template #default="{ open }">
			<UButton color="gray" variant="ghost" class="w-full" :label="userData ? userData.name : 'NO USER'"
				:class="[open && 'bg-gray-50 dark:bg-gray-800']">
				<template #leading>
					<UAvatar src="https://avatars.githubusercontent.com/u/739984?v=4" size="2xs" />
				</template>

				<template #trailing>
					<UIcon name="i-heroicons-ellipsis-vertical" class="w-5 h-5 ml-auto" />
				</template>
			</UButton>
		</template>

		<template #account>
			<div class="text-left">
				<p>Connecté en tant que</p>
				<p class="truncate font-medium text-gray-900 dark:text-white">
					{{ userData ? userData.email : "NO USER" }}
				</p>
			</div>
		</template>
		<template #clearLocalStorage>
			<div>
				<CoreClearLocalStorageButton />
			</div>
		</template>
		<template #clearCookies>
			<div>
				<CoreClearCookiesButton />
			</div>
		</template>
	</UDropdown>
</template>

<script setup lang="ts">
const userData = data.value ? data.value.user : null;

const items = computed(() => [
	[
		{
			slot: "account",
			label: "",
			disabled: true
		},
		{
			slot: "clearLocalStorage",
			label: "",
			disabled: true
		},
		{
			slot: "clearCookies",
			label: "",
			disabled: true
		}
	],
	[
		{
			label: "Paramètres",
			icon: "i-heroicons-cog-8-tooth",
			to: "/settings"
		},
		{
			label: "Menu de commande",
			icon: "i-heroicons-command-line",
			shortcuts: [metaSymbol.value, "K"],
			click: () => {
				isDashboardSearchModalOpen.value = true;
			}
		},
		{
			label: "Aide & Support",
			icon: "i-heroicons-question-mark-circle",
			shortcuts: ["?"],
			click: () => (isHelpSlideoverOpen.value = true)
		}
	],
	[
		{
			label: "Documentation",
			icon: "i-heroicons-book-open",
			to: "https://ui.nuxt.com/pro/getting-started",
			target: "_blank"
		}
	],
	[
		{
			label: "Déconnexion",
			icon: "i-heroicons-arrow-left-on-rectangle",
			click: () => {
				signOut({
					callbackUrl: "http://localhost:3000/auth/login"
				});
			}
		}
	]
]);
</script>
