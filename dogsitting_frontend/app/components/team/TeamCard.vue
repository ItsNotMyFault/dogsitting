<template>
    <div class="relative w-80 h-96 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl group"
        @click="navigate">
        <!-- Team Name Overlay -->
        <div
            class="absolute inset-0 z-10 flex items-center justify-center bg-black/40 group-hover:bg-black/50 transition-all duration-300">
            <h3
                class="text-white text-3xl font-bold tracking-wide text-center px-4 drop-shadow-lg group-hover:scale-110 transition-transform duration-300">
                {{ teamName }}
            </h3>
        </div>

        <!-- Four Corner Images Grid -->
        <div class="relative w-full h-full grid grid-cols-2 grid-rows-2 gap-0.5">
            <!-- Top Left -->
            <div class="relative overflow-hidden group-hover:brightness-110 transition-all duration-300">
                <InputsImageFileDisplay v-if="image1" :file="image1" class="w-full h-full object-cover" />
                <img v-else alt="img" src="@/assets/images/20230814_183252.jpg" class="w-full h-full object-cover" />
            </div>

            <!-- Top Right -->
            <div class="relative overflow-hidden group-hover:brightness-110 transition-all duration-300">
                <InputsImageFileDisplay v-if="image2" :file="image2" class="w-full h-full object-cover" />
                <img v-else alt="img" src="@/assets/images/20230817_191711.jpg" class="w-full h-full object-cover" />
            </div>

            <!-- Bottom Left -->
            <div class="relative overflow-hidden group-hover:brightness-110 transition-all duration-300">
                <InputsImageFileDisplay v-if="image3" :file="image3" class="w-full h-full object-cover" />
                <img v-else alt="img" src="@/assets/images/20231021_104551.jpg" class="w-full h-full object-cover" />
            </div>

            <!-- Bottom Right -->
            <div class="relative overflow-hidden group-hover:brightness-110 transition-all duration-300">
                <InputsImageFileDisplay v-if="image4" :file="image4" class="w-full h-full object-cover" />
                <img v-else alt="img" src="@/assets/images/20231021_112758.jpg" class="w-full h-full object-cover" />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Team from '@/model/team'

const props = defineProps<{
    teamName: string,
    image1: string | File | undefined,
    image2: string | File | undefined,
    image3: string | File | undefined,
    image4: string | File | undefined,
}>()

const router = useRouter()

const teamName = computed(() => {
    return props.teamName || 'undefined'
})

const navigate = () => {
    if (props.teamName) {
        router.push({ path: `/team/${props.teamName}` })
    }
}


</script>