<template>
    <div>
        <img v-if="IsApproved" alt="img" src="@/assets/images/icons/check-icon.png" style="width: 50px; height: 50px" />
        <img v-else alt="img" src="@/assets/images/icons/x-icon.jpg" style="width: 50px; height: 50px" />
    </div>
</template>

<script>

export default {
    name: 'IsApproved',

    props: {
        IsApproved: Boolean
    }
}
</script>