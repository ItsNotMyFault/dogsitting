<template>
    <div>
        Login with Facebook
        <button class="login-with-facebook btn btn-facebook" @click="facebookOauthLogin()">
            <i class="fa fa-facebook mr-1"></i>
            Login with Facebook
        </button>
    </div>
</template>

<script setup lang="ts">
import { useAuthService } from "#core/composables/useAuthServices"
const { facebookOauthLogin } = useAuthService()

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