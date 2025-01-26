<template>
    <div>
        asdfsadfasdf
        <div class="css-125zpcz-ColorGridItem" v-show="!isModalVisible" @click="isModalVisible = true">
            <div class="css-1dnl5su-Container-hoverableStyles emqw97l0" tabindex="-1"
                :style="{ backgroundColor: currentColor }"></div>
        </div>
        <Modal v-show="isModalVisible" @close="isModalVisible = false">
            <template #body>
                <div class="colorpicker-modal-container">
                    <div v-for="(color, name) in themeColors" :key="name" @click="pickColor(color)">
                        <ColorCircle :color="color"></ColorCircle>
                    </div>
                </div>
            </template>
        </Modal>

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

import Modal from '@components/modals/Modal.vue'
import ColorCircle from '@components/colorpicker/ColorCircle.vue'

export default {
    name: 'ColorPicker',

    components: {
        Modal,
        ColorCircle
    },

    props: {
        modelValue: {
            type: String,
            default: colors.orange
        }
    },

    methods: {
        pickColor(color) {
            this.isModalVisible = false
            this.currentColor = color
            this.$emit('update:modelValue', color)
        }
    },

    data() {
        return {
            themeColors: Object.keys(colors),
            currentColor: null,
            isModalVisible: false,
        }
    }

}

</script>