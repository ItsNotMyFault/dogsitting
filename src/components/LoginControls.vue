<template>
    <button class="loginControls" @click.stop="togglePopup">
        <div class="icons">
            <IconHamburger />
        </div>
        <div class="icons">
            <IconUser />
        </div>
        <div class="loginControls-modal" ref="modal" v-if="isOpen">
            <span v-if="isLoggedIn() === false">
                <router-link class="loginControls-modalLink" to="/login">Login</router-link>
            </span>
            <span v-else>
                <router-link class="loginControls-modalLink" to="/logout">Logout</router-link>
                <hr />
                User:
                <router-link class="loginControls-modalLink" to="/my-profile">My Profile</router-link>
                <router-link class="loginControls-modalLink" to="/my-reservations">Reservations</router-link>
                <span v-if="hasUserTeam()">
                    Team:
                    <router-link class="loginControls-modalLink" to="/my-team">Settings</router-link>
                    <router-link class="loginControls-modalLink" to="/team-reservations">Team Reservations</router-link>
                    <router-link class="loginControls-modalLink" to="/team-calendar">Team Calendar</router-link>
                </span>
            </span>
        </div>
    </button>
</template>

<script>
import { useAuthStore } from '@/stores/authStore';
import IconUser from '@/components/icons/IconUser.vue';
import IconHamburger from '@/components/icons/IconHamburger.vue';
import { defineComponent, ref, onMounted, onBeforeUnmount } from 'vue';

export default defineComponent({
    name: 'LoginControls',
    components: {
        IconUser,
        IconHamburger,
    },
    setup() {
        console.log('setup');
        const authStore = useAuthStore();
        const isOpen = ref(false);
        const modal = ref(null);

        const togglePopup = () => {
            isOpen.value = !isOpen.value;
        };

        const handleClickOutside = (event) => {
            if (isOpen.value && modal.value && !modal.value.contains(event.target)) {
                togglePopup();
            }
        };

        onMounted(() => {
            document.addEventListener('click', handleClickOutside);
        });

        onBeforeUnmount(() => {
            document.removeEventListener('click', handleClickOutside);
        });

        return {
            authStore,
            isOpen,
            modal,
            togglePopup,
            isLoggedIn: () => authStore.getIsLoggedIn,
            hasUserTeam: () => authStore.getHasUserTeam,
        };
    },
});
</script>
