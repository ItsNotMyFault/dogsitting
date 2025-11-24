<template>
	<div class="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
		<div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
			<!-- Header -->
			<div class="mb-8">
				<UButton to="/my-team" variant="ghost" icon="i-heroicons-arrow-left" class="mb-4">
					Back to My Team
				</UButton>
				<h1 class="text-3xl font-bold text-gray-900">{{ isEdit ? "Edit Team" : "Create team" }}</h1>
				<p class="mt-2 text-gray-600">Customize your team's information and appearance</p>
			</div>

			<div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
				<!-- Left Column - Form -->
				<div class="space-y-6">
					<!-- Team Information Card -->
					<UCard>
						<template #header>
							<div class="flex items-center gap-2">
								<UIcon name="i-heroicons-information-circle" class="text-xl text-primary" />
								<h2 class="text-xl font-semibold">Team Information</h2>
							</div>
						</template>

						<div class="space-y-4">
							<FormGroupField id="team.name" label="Team Name" required>
								<UInput v-model="team.name" size="lg" placeholder="Enter team name" icon="i-heroicons-user-group" />
							</FormGroupField>
							<UDivider />

							<div class="space-y-3">
								<h3 class="text-sm font-medium text-gray-700">Availability Settings</h3>

								<UCheckbox v-model="team.useAvailabilities" label="Use Availabilities" />

								<UCheckbox v-model="team.useUnavailabilities" label="Use Unavailabilities" />
							</div>

							<UDivider />

							<div class="space-y-3">
								<h3 class="text-sm font-medium text-gray-700">Capacity Settings</h3>

								<FormGroupField id="maxWeekDaysLodgerCount" label="Max Weekday Lodgers">
									<UInput v-model="team.maxWeekDaysLodgerCount" type="number" min="1" max="10" step="1" />
								</FormGroupField>

								<FormGroupField id="maxWeekendDaysLodgerCount" label="Max Weekend Lodgers">
									<UInput v-model="team.maxWeekendDaysLodgerCount" type="number" min="1" max="10" step="1" />
								</FormGroupField>
							</div>
						</div>

						<template #footer>
							<div class="flex justify-end">
								<UButton @click="save" :loading="saving" size="lg" icon="i-heroicons-check" color="primary">
									Save Changes
								</UButton>
							</div>
						</template>
					</UCard>

					<!-- Profile Pictures Card -->
					<UCard>
						<template #header>
							<div class="flex items-center gap-2">
								<UIcon name="i-heroicons-photo" class="text-xl text-primary" />
								<h2 class="text-xl font-semibold">Profile Pictures</h2>
							</div>
							<p class="text-sm text-gray-600 mt-1">Upload up to 4 images for your team card</p>
						</template>

						<div class="grid grid-cols-2 gap-4">
							<div class="space-y-2">
								<label class="text-sm font-medium text-gray-700">Image 1</label>
								<InputsImageFileInput v-model="image1" :preview="false">
								</InputsImageFileInput>
							</div>

							<div class="space-y-2">
								<label class="text-sm font-medium text-gray-700">Image 2</label>
								<InputsImageFileInput v-model="image2" :preview="false">
								</InputsImageFileInput>
							</div>

							<div class="space-y-2">
								<label class="text-sm font-medium text-gray-700">Image 3</label>
								<InputsImageFileInput v-model="image3" :preview="false">
								</InputsImageFileInput>
							</div>

							<div class="space-y-2">
								<label class="text-sm font-medium text-gray-700">Image 4</label>
								<InputsImageFileInput v-model="image4" :preview="false">
								</InputsImageFileInput>
							</div>
						</div>

						<template #footer>
							<div class="flex justify-end">
								<UButton @click="saveImages" :loading="saving" size="lg" icon="i-heroicons-arrow-up-tray"
									color="primary">
									Save Images
								</UButton>
							</div>
						</template>
					</UCard>
				</div>

				<!-- Right Column - Preview -->
				<div class="lg:sticky lg:top-8 h-fit">
					<UCard>
						<template #header>
							<div class="flex items-center gap-2">
								<UIcon name="i-heroicons-eye" class="text-xl text-primary" />
								<h2 class="text-xl font-semibold">Preview</h2>
							</div>
							<p class="text-sm text-gray-600 mt-1">See how your team card will look</p>
						</template>

						<div class="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-lg">
							<TeamCard :teamName="team.name" :image1="image1" :image2="image2" :image3="image3" :image4="image4" />
						</div>
					</UCard>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import Team from "@/model/team";
import { TeamRepositoryHttp } from "@/services/repositories/TeamRepositoryHttp";
import { $fetchClient } from "~/libs/http/adapters/NuxtAdapter";
import type { MediaUploadRequest } from "~/types/media/MediaType";

const teamRepo = new TeamRepositoryHttp($fetchClient);

const props = defineProps({
	id: {
		type: String,
		default: "08dd90bd-f37f-48d8-81c3-b68aaabcf4da"
	},

})

/* -------------------------------------------------------------------------- */
/*   STATE                                                                    */
/* -------------------------------------------------------------------------- */

const team = reactive(new Team(null));
const saving = ref(false);

const files = ref<any[]>([]); // backend returned team files

// images (File OR base64)
const image1 = ref<any>(null);
const image2 = ref<any>(null);
const image3 = ref<any>(null);
const image4 = ref<any>(null);


function findFileByPosition(position: number) {
	const file = files.value.find((f) => f.position === position);
	console.log("file found", file);
	return file?.fileData ?? null;
}

/* -------------------------------------------------------------------------- */
/*   METHODS                                                                   */
/* -------------------------------------------------------------------------- */

function saveImages() {
	const pictures: MediaUploadRequest[] = [];

	if (image1.value instanceof File)
		pictures.push({ file: image1.value, position: 1 });

	if (image2.value instanceof File)
		pictures.push({ file: image2.value, position: 2 });

	if (image3.value instanceof File)
		pictures.push({ file: image3.value, position: 3 });

	if (image4.value instanceof File)
		pictures.push({ file: image4.value, position: 4 });

	console.log("pictures", pictures);

	saving.value = true;
	teamRepo.saveTeamFiles(team.id, pictures).finally(() => {
		saving.value = false;
	});
}

function save() {
	saving.value = true;
	teamRepo.update(team.id, { name: team.name }).finally(() => {
		saving.value = false;
	});
}

const isEdit = computed(() => !!props.id)

/* -------------------------------------------------------------------------- */
/*   LIFECYCLE                                                                 */
/* -------------------------------------------------------------------------- */

const init = async (teamId: string) => {
	team.id = teamId;
	const teamData = await teamRepo.get(teamId);
	Object.assign(team, teamData);

	files.value = await teamRepo.getTeamFiles(teamId);

	console.log("files.value", files.value);

	console.log("files.value?.length", files.value?.length);

	if (files.value?.length > 0) {
		image1.value = findFileByPosition(1);
		image2.value = findFileByPosition(2);
		image3.value = findFileByPosition(3);
		image4.value = findFileByPosition(4);

	}
}

onMounted(async () => {
	if (props.id) {
		init(props.id)
	}
});
</script>

<style scoped></style>