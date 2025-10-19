<template>
    <div class="h-screen flex items-center justify-center bg-primary-500">
        <div class="bg-primary text-white">Primary Color</div>
        <div class="bg-secondary">Secondary Color</div>
        <div class="bg-danger">Danger Color</div>
        <div class="bg-white rounded-lg shadow-lg border border-gray-200 p-8">
            <h2 class="text-2xl font-semibold mb-4 text-primary text-center">Login</h2>
            <hr class="mb-4">
            <div class="mb-4">
                <FacebookButton />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import FacebookButton from '../../components/buttons/FacebookButton.vue';
import { ref } from 'vue';




definePageMeta({
    layout: "auth"
});
</script>