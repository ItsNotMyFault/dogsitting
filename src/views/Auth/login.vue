<template>
    <div>
        <div class="sectionTitle">Login</div>
        <hr>
        <div>
            <button @click="loginFacebook()"> Continue with facebook</button>
            <button @click="test()"> test</button>
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
        async test() {
            await this.authStore.fetchLoggedInUser();
        },
    },
    async onMounted() {
        console.log('on mounted---------------');
        await this.authStore.fetchLoggedInUser();
    }
})
</script>