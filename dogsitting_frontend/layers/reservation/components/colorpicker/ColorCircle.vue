<template>
    <div class="colorCircle-content">
        <div class="colorcircle" :class="{ 'small': small }" tabindex="-1"
            :style="{ backgroundColor: thecolor, border: 'solid 2px black' }">
        </div>
        <slot></slot>
    </div>
</template>
<script>

const colors = {
    lightblue: 'var(--theme-lightblue)',
    purple: 'var(--theme-purple)',
    pink: 'var(--theme-pink)',
    orange: 'var(--theme-orange)',
    lightbrown: 'var(--theme-lightbrown)',
    green: 'var(--theme-green)',
    turquoise: 'var(--theme-turquoise)',
    blue: 'var(--theme-blue)',
    darkpurple: 'var(--theme-darkpurple)',
    yellow: 'var(--theme-yellow)',
    darkgreen: 'var(--theme-darkgreen)',
    red: 'var(--theme-red)',
    grey: 'var(--theme-grey)'
}

export default {
    name: 'ColorCircle',

    props: {
        color: {
            type: String,
            default: 'orange'
        },
        small: Boolean
    },

    computed: {
        thecolor() {
            return Object.keys(colors).find(keyColor => keyColor === this.color) || colors.orange
        }
    }
}

</script>