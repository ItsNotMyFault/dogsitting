<template>
    <button class="loginControls" @click="isOpen = !isOpen">
        <div class="icons">
            <IconHamburger></IconHamburger>
        </div>
        <div class="icons">
            <IconUser></IconUser>
        </div>
        <div class="loginControls-modal" v-if="isOpen" @blur="isOpen = false">
            <RouterLink class="loginControls-modalLink" to="/login">login</RouterLink>
            <hr>
            <RouterLink class="loginControls-modalLink" to="/my-reservations">my reservations</RouterLink>
            <RouterLink class="loginControls-modalLink" to="/my-profile">my profile</RouterLink>
        </div>
    </button>
</template>
<script>
import IconUser from '@/components/icons/IconUser.vue'
import IconHamburger from '@/components/icons/IconHamburger.vue'
export default {

    components: {
        IconUser,
        IconHamburger
    },

    data() {
        return {
            isOpen: false
        }
    }

}
</script>