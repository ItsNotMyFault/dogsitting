<template>
    <div>
        <button @click="logoutUser()"
            class="text-red-600 cursor-pointer w-full flex items-center px-4 py-2 text-sm hover:bg-red-50 transition-colors">
            <UIcon name="lucide:log-out" class="mr-3" size="18" />
            <span>Sign Out</span>
        </button>
    </div>
</template>

<script setup lang="ts">
import { useAuthService } from '#core/composables/useAuthServices'
const { logoutUser } = useAuthService()

</script>
<style lang="css">
.login-with-facebook {
    background-color: #1877f2;
    color: #fff;
    border: none;
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    cursor: pointer;
    border-radius: 4px;
    transition: background-color 0.3s ease;
}

.login-with-facebook:hover {
    background-color: #166ada;
}
</style>