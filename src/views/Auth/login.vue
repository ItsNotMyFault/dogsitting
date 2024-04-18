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
import AuthService from "@/services/authServices.js";
export default {
    name: 'Login',

    methods: {
        async loginFacebook() {
            console.log("loginFacebook");
            await AuthService.FacebookOauthLogin()
        },
    }
}
</script>