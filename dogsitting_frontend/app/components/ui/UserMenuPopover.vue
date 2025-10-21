<template>
	<div class="relative" ref="dropdownRef">
		<UButton @click="togglePopover"
			class="cursor-pointer flex items-center space-x-3 bg-white rounded-lg border border-gray-200 px-1 py-1 h-[42px] hover:bg-gray-50 transition-colors">
			<div class="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
				<span class="text-white text-sm font-semibold">AG</span>
			</div>
			<div class="hidden md:block text-left">
				<div class="text-sm font-medium text-gray-900 leading-none">
					Alexis Guay
				</div>
				<div class="text-xs text-gray-500">Team : {{ team }}</div>
			</div>
			<Icon name="lucide:chevron-down" class="w-4 h-4 text-gray-400" />
		</UButton>

		<!-- Popover (always visible here for demo, remove v-if) -->
		<div class="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50" v-if="show">
			<!-- User Info Header -->
			<div class="px-4 py-3 border-b border-gray-100">
				<div class="flex items-center space-x-3">
					<div class="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center">
						<span class="text-white font-semibold">AG</span>
					</div>
					<div>
						<div class="font-medium text-gray-900">Alexis Guay</div>
						<div class="text-sm text-gray-500">alexis@example.com</div>
						<div class="text-xs text-gray-400">Team : {{ team }}</div>
					</div>
				</div>
			</div>

			<!-- Menu Items -->
			<div class="pt-2 space-y-2">
				<button
					class="bg-white cursor-pointer w-full flex items-center  px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 transition-colors">
					<Icon name="lucide:user" class="mr-3" size="18" />
					<span>My Profile</span>
				</button>
				<button
					class="bg-primary cursor-pointer w-full flex items-center px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 transition-colors">
					<Icon name="lucide:calendar" class="mr-3" size="18" />
					<span>Reservations</span>
				</button>
				<button
					class="cursor-pointer w-full flex items-center px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 transition-colors">
					<Icon name="lucide:users" class="mr-3" size="18" />
					<span>Team Settings</span>
				</button>
			</div>
			<!-- Logout -->
			<div class="border-t border-gray-100">
				<button
					class="text-red-600 cursor-pointer w-full flex items-center px-4 py-2 text-sm hover:bg-red-50 transition-colors">
					<UIcon name="lucide:log-out" class="mr-3" size="18" />
					<span>Sign Out</span>
				</button>
			</div>

			<!-- Footer -->
			<div class="border-t border-gray-100 px-4 py-3">
				<div class="flex items-center justify-between text-xs text-gray-500">
					<span>Version 1.0.0</span>
					<span>9:45 PM</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { onClickOutside } from "@vueuse/core";
import { useAuthStore } from '~/stores/authStore'
const show = ref(false);
const dropdownRef = ref();
const { team } = useAuthStore();

const togglePopover = () => {
	show.value = !show.value;
};

onClickOutside(dropdownRef, () => {
	show.value = false;
});
</script>
