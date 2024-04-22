<template>
    <button class="loginControls" @click="isOpen = !isOpen">
        <div class="icons">
            <IconHamburger></IconHamburger>
        </div>
        <div class="icons">
            <IconUser></IconUser>
        </div>
        <div class="loginControls-modal" v-if="isOpen" @blur="isOpen = false">
            <span v-if="isLoggedIn === true">
                <RouterLink class="loginControls-modalLink" to="/logout">logout</RouterLink>
            </span>
            <span v-else>
                <RouterLink class="loginControls-modalLink" to="/login">login</RouterLink>
            </span>
            <hr>
            <span v-if="isLoggedIn === true">
                User
                <RouterLink class="loginControls-modalLink" to="/my-profile">my profile</RouterLink>
                <RouterLink class="loginControls-modalLink" to="/my-reservations">reservations</RouterLink>
            </span>
            <span>
                Team
                <RouterLink class="loginControls-modalLink" to="/my-team">profile</RouterLink>
                <RouterLink class="loginControls-modalLink" to="/team-reservations">team reservations</RouterLink>
            </span>
        </div>
    </button>
</template>

<script>
import { useAuthStore } from '@/stores/authStore'

import IconUser from '@/components/icons/IconUser.vue'
import IconHamburger from '@/components/icons/IconHamburger.vue'
import { defineComponent, ref } from 'vue'
export default defineComponent({
    name: 'LoginControls',

    setup() {
        const isOpen = ref(false)
        const authStore = useAuthStore();

        return { isOpen, authStore }
    },

    computed: {
        isLoggedIn() {
            return this.authStore.getIsLoggedIn
        },
    },


    components: {
        IconUser,
        IconHamburger
    },
})
</script>
