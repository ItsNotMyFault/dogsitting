<template>
    <button class="loginControls" @click="isOpen = !isOpen">
        <div class="icons">
            <IconHamburger></IconHamburger>
        </div>
        <div class="icons">
            <IconUser></IconUser>
        </div>
        <div class="loginControls-modal" v-if="isOpen" @blur="isOpen = false">
            <span v-if="isLoggedIn === false">
                <RouterLink class="loginControls-modalLink" to="/login">login</RouterLink>
            </span>
            <span v-else>
                <RouterLink class="loginControls-modalLink" to="/logout">logout</RouterLink>
                <hr>
                User
                <RouterLink class="loginControls-modalLink" to="/my-profile">my profile</RouterLink>
                <RouterLink class="loginControls-modalLink" to="/my-reservations">reservations</RouterLink>
                <span v-if="hasUserTeam">
                    Team
                    <RouterLink class="loginControls-modalLink" to="/my-team">Settings</RouterLink>
                    <RouterLink class="loginControls-modalLink" to="/team-reservations">team reservations</RouterLink>
                    <RouterLink class="loginControls-modalLink" to="/team-calendar">team calendar</RouterLink>
                </span>
            </span>
        </div>
    </button>
</template>

<script>
import { useAuthStore } from '@/stores/authStore'

import IconUser from '@/components/icons/IconUser.vue'
import IconHamburger from '@/components/icons/IconHamburger.vue'
import { defineComponent, ref } from 'vue'
export default {
    name: 'LoginControls',


    computed: {
        isLoggedIn() {
            return this.authStore.getIsLoggedIn
        },
        hasUserTeam() {
            return this.authStore.getHasUserTeam
        }
    },


    components: {
        IconUser,
        IconHamburger,
    },

    data() {
        return {
            authStore: null,
            isOpen: false
        }
    },

    created() {
        this.authStore = useAuthStore();
    }
}
</script>
