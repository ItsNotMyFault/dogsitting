<template>
    <div>
        <div class="sectionTitle">Login</div>
        <hr>
        <div>
            <button @click="loginFacebook()"> Continue with facebook</button>
        </div>
    </div>
</template>
<script>

import { useAuthStore } from '@/stores/authStore'
import { defineComponent } from 'vue'
export default defineComponent({
    name: 'Login',

    setup() {
        const authStore = useAuthStore()
        return { authStore }
    },

    methods: {
        async loginFacebook() {
            await this.authStore.authenticateUser();


        },
    }
})
</script>