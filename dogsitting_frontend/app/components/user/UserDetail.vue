<template>
    <div>
        User detail
        <div class="form">
            <label>
                <span>firstname: </span>
                <span>{{ user.firstName }}</span>
            </label>

            <label>
                <span>lastName: </span>
                <span>{{ user.lastName }}</span>
            </label>

            <label>
                <span>phone: </span>
                <span>{{ user.phonenumber }}</span>
            </label>

            <label>
                <span>email: </span>
                <span>{{ user.email }}</span>
            </label>

            <slot name="teams"></slot>
        </div>
    </div>
</template>

<script>
import User from '#nuxt-auth/types/user'
export default {
    name: 'UserDetail',

    props: {
        user: {
            type: User,
            required: true
        }
    }
}
</script>