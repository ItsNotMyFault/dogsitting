<template>
    <div class="h-screen flex items-center justify-center">
        <div class="bg-white rounded-lg shadow-lg border border-gray-200 p-8">
            <h2 class="text-2xl font-semibold mb-4 text-primary text-center">Login</h2>
            <hr class="mb-4">
            <div class="mb-4">
                login fb:
                <ButtonsFacebookButton />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
// import FacebookButton from '#core/components/buttons/FacebookButton.vue'
definePageMeta({
    layout: "auth"
});
</script>