<template>
    <div class="h-screen flex items-center justify-center bg-primary-500">
        <div class="bg-primary text-white">Primary Color</div>
        <div class="bg-secondary">Secondary Color</div>
        <div class="bg-danger">Danger Color</div>
        <div class="bg-white rounded-lg shadow-lg border border-gray-200 p-8">
            <h2 class="text-2xl font-semibold mb-4 text-primary text-center">Login</h2>
            <hr class="mb-4">
            <div class="mb-4">
                <router-link class="loginControls-modalLink" to="/HomeView">HOME VIEW</router-link>
            </div>
            <div class="mb-4">
                <FacebookButton />
            </div>
            <div style="background-color: aqua; color: black; padding: 10px; margin-top: 20px;" class="font-bold">
                authStore.applicationUser: {{ authStore.applicationUser }}<br>
                authStore.isLoggedIn {{ authStore.isLoggedIn }}
                </br>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import FacebookButton from '../../components/buttons/FacebookButton.vue';


import { useAuthStore } from '~/stores/authStore'

const authStore = useAuthStore()

definePageMeta({
    layout: "auth"
});
</script>