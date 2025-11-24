<template>
	<template v-if="Array.isArray(id) && id.length > 1">
		<CoreFormGroupField v-if="remainingIds.length > 0" :id="remainingIds">
			<UFormField :key="String(firstId)" :name="String(firstId)" class="mb-1" :help="help" :required="required">
				<template #label>
					<slot name="label">
						<span v-if="!isCheckbox">{{ label ?? "" }}</span>
					</slot>
				</template>
				<template #default="{ error }">
					<div :class="[
						error ? 'ring-red-500' : 'ring-gray-300',
						disabled ? 'opacity-50 cursor-not-allowed' : ''
					]">
						<slot>
							<span v-if="error">error => {{ error }}</span>
						</slot>
					</div>
				</template>
			</UFormField>
		</CoreFormGroupField>
	</template>
	<div v-else>
		<UFormField :key="String(firstId)" :name="String(firstId)" class="mb-1" :help="help" :required="required">
			<template #label>
				<slot name="label">
					<span v-if="!isCheckbox">{{ label ?? "" }}</span>
				</slot>
			</template>
			<template #default="{ error }">
				<div :class="[
					error ? 'ring-red-500' : 'ring-gray-300',
					disabled ? 'opacity-50 cursor-not-allowed' : ''
				]">
					<slot :error="typeof error === 'string' ? error : undefined">
						<span v-if="error">error => {{ error }}</span>
					</slot>
				</div>
			</template>
		</UFormField>
	</div>
</template>

<script setup lang="ts">
const props = defineProps<{
	required?: boolean;
	disabled?: boolean;
	isCheckbox?: boolean;
	label?: string | undefined;
	help?: string | undefined;
	id: string | string[];
}>();

const remainingIds = computed(() => {
	const copiedIds = JSON.parse(JSON.stringify(props.id));
	if (Array.isArray(copiedIds) && copiedIds.length > 1) {
		return copiedIds.slice(1);
	}
	return [];
});

const firstId = computed(() => {
	if (Array.isArray(props.id)) {
		return props.id[0];
	}
	return props.id;
});
</script>
