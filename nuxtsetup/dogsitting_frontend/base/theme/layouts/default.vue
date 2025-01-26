<script setup lang="ts">
import sidebarItems from "~/utils/sidebarItems";
import type { Group } from "#ui/types";
const { isHelpSlideoverOpen } = useDashboard();
const { isNotificationsSlideoverOpen } = useDashboard();

const runtimeConfig = useRuntimeConfig();
const lightLogo = runtimeConfig.public.theme.light.logo;

const footerLinks = [
	{
		label: "Inviter des personnes",
		icon: "i-fa6-solid-plus",
		to: "/settings/members"
	},
	{
		label: "Aide & Support",
		icon: "i-fa6-solid-circle-question",
		click: () => (isHelpSlideoverOpen.value = true)
	}
];

const groups: Group[] = [
	{
		key: "links",
		label: "Go to",
		commands: sidebarItems.value.map((link) => ({
			...link,
			id: 1,
			shortcuts: link.tooltip?.shortcuts
		}))
	}
];
</script>

<template>
	<UDashboardLayout>
		<UDashboardPanel :width="250" :resizable="{ min: 200, max: 300 }" collapsible>
			<UDashboardNavbar
				class="!border-transparent"
				:ui="{
					left: 'flex-1',
					wrapper: 'h-12 flex-shrink-0 flex items-center border-0 px-4 gap-x-4 min-w-0 bg-primary'
				}"
			>
				<template #toggle>
					<UDashboardNavbarToggle
						icon="i-fa6-solid-bars"
						class="text-white hover:bg-primary-600 hover:text-white"
					/>
				</template>
				<template #left>
					<TeamsDropdown />
				</template>
			</UDashboardNavbar>

			<UDashboardSidebar>
				<template #header>
					<img :src="lightLogo" class="max-h-20" />
				</template>

				<UDashboardSidebarLinks :links="sidebarItems" />

				<UDivider />

				<div class="flex-1" />

				<UDashboardSidebarLinks :links="footerLinks" />

				<UDivider class="sticky bottom-0" />

				<template #footer>
					<!-- ~/components/UserDropdown.vue -->
					<UserDropdown />
				</template>
			</UDashboardSidebar>
		</UDashboardPanel>

		<UDashboardPage>
			<UDashboardPanel grow>
				<UDashboardNavbar
					:ui="{
						left: 'flex-1',
						wrapper: 'h-12 flex-shrink-0 flex items-center border-0 px-4 gap-x-4 min-w-0 bg-primary'
					}"
				>
					<template #toggle>
						<UDashboardNavbarToggle
							icon="i-fa6-solid-bars"
							class="text-white hover:bg-primary-600 hover:text-white"
						/>
					</template>
					<template #left>
						<UDashboardSearchButton
							class="bg-primary-light ml-2 h-7 text-primary"
							label="Rechercher"
						/>
					</template>
					<template #right>
						<UTooltip text="Notifications" :shortcuts="['N']">
							<UButton square @click="isNotificationsSlideoverOpen = true">
								<UChip color="red" inset>
									<UIcon name="i-heroicons-bell-solid" class="w-5 h-5 text-white" />
								</UChip>
							</UButton>
						</UTooltip>

						<CoreI18nLanguageSwitcher />
						<UButton square to="/">
							<UIcon name="i-fa6-solid-gear" class="w-5 h-5 text-white"></UIcon>
						</UButton>
					</template>
				</UDashboardNavbar>
				<slot />
			</UDashboardPanel>
		</UDashboardPage>
		<HelpSlideover />
		<NotificationsSlideover />
		<ClientOnly>
			<LazyUDashboardSearch :groups="groups" />
		</ClientOnly>
	</UDashboardLayout>
</template>
