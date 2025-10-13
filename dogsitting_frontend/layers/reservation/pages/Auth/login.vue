<template>
    <div>
        <div class="sectionTitle">Login</div>
        <hr>
        <div>
            <button @click="loginFacebook"> Continue with facebook</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore'

const authStore = useAuthStore()

const loginFacebook = async () => {
    await authStore.authenticateUser()
}
</script>