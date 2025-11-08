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
                <span>email: </span>
                <span>{{ user.email }}</span>
            </label>

            <slot name="teams"></slot>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { UserType } from '~/model/user'


defineProps({
    user: {
        type: Object as () => UserType,
        required: true
    }
});
</script>