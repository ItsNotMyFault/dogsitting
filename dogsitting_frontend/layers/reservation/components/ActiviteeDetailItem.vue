<template>
    <div class="activityCard" :class="{ 'activityCard-reverse': reverse }">
        <div class="activityCard-image">
            <slot name="image"></slot>
        </div>
        <!-- <img alt="img" :src="imagePath" /> -->
        <div class="activityCard-content">
            <div class="activityCard-title">
                <slot name="title"></slot>
            </div>
            <div class="activityCard-description">
                <slot name="description"></slot>
            </div>
        </div>

    </div>
</template>


<script>
export default {
    name: 'ActivityDetailItem',

    props: {
        reverse: Boolean
    },
}
</script>
