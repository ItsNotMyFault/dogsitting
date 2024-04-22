<template>
    <div>
        <div class="sectionTitle">Logging out...</div>
        <hr>
    </div>
</template>
<script>
import { useAuthStore } from '@/stores/authStore'
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'Logout',

    setup() {
        const authStore = useAuthStore()
        return { authStore }
    },

    async created() {
        await this.authStore.logoutUser();
    }
})

</script>