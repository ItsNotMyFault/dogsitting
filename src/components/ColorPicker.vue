<template>
    <div>
        asdfsadfasdf
        <div class="css-125zpcz-ColorGridItem e1pcjn8h0" v-show="!isModalVisible" @click="isModalVisible = true">
            <div class="css-1dnl5su-Container-hoverableStyles emqw97l0" tabindex="-1"
                :style="{ backgroundColor: currentColor }"></div>
        </div>
        <Modal v-show="isModalVisible" @close="isModalVisible = false">
            <template #body>
                <div class="colorpicker-modal-container">


                    <!-- <div class="css-125zpcz-ColorGridItem e1pcjn8h0">
                        <div class="css-1dnl5su-Container-hoverableStyles emqw97l0" tabindex="-1"
                            style="background-color: var(--theme-yellow);"></div>
                    </div> -->
                    <div v-for="(color, name) in themeColors" :key="name" class="css-125zpcz-ColorGridItem e1pcjn8h0"
                        @click="pickColor(color)">
                        <div class="css-1dnl5su-Container-hoverableStyles emqw97l0" tabindex="-1"
                            :style="{ backgroundColor: color }"></div>
                    </div>

                    <!-- <div class="css-125zpcz-ColorGridItem e1pcjn8h0">
                        <div class="css-1dnl5su-Container-hoverableStyles emqw97l0" tabindex="-1"
                            style="background-color: rgb(11, 131, 217);"></div>
                    </div>
                    <div class="css-125zpcz-ColorGridItem e1pcjn8h0">
                        <div class="css-1dnl5su-Container-hoverableStyles emqw97l0" tabindex="-1"
                            style="background-color: rgb(158, 91, 217);"></div>
                    </div>
                    <div class="css-125zpcz-ColorGridItem e1pcjn8h0">
                        <div class="css-1dnl5su-Container-hoverableStyles emqw97l0" tabindex="-1"
                            style="background-color: rgb(217, 65, 130);"></div>
                    </div>
                    <div class="css-125zpcz-ColorGridItem e1pcjn8h0">
                        <div class="css-1dnl5su-Container-hoverableStyles emqw97l0" tabindex="-1"
                            style="background-color: rgb(227, 106, 0);"></div>
                    </div>
                    <div class="css-125zpcz-ColorGridItem e1pcjn8h0">
                        <div class="css-1dnl5su-Container-hoverableStyles emqw97l0" tabindex="-1"
                            style="background-color: rgb(191, 112, 0);"></div>
                    </div>
                    <div class="css-125zpcz-ColorGridItem e1pcjn8h0">
                        <div class="css-18k3u0l-Container-checkedStyles-hoverableStyles emqw97l0" tabindex="-1"
                            style="background-color: rgb(45, 166, 8);"></div>
                    </div>
                    <div class="css-125zpcz-ColorGridItem e1pcjn8h0">
                        <div class="css-1dnl5su-Container-hoverableStyles emqw97l0" tabindex="-1"
                            style="background-color: rgb(6, 168, 147);"></div>
                    </div>
                    <div class="css-125zpcz-ColorGridItem e1pcjn8h0">
                        <div class="css-1dnl5su-Container-hoverableStyles emqw97l0" tabindex="-1"
                            style="background-color: rgb(201, 128, 107);"></div>
                    </div>
                    <div class="css-125zpcz-ColorGridItem e1pcjn8h0">
                        <div class="css-1dnl5su-Container-hoverableStyles emqw97l0" tabindex="-1"
                            style="background-color: rgb(70, 91, 179);"></div>
                    </div>
                    <div class="css-125zpcz-ColorGridItem e1pcjn8h0">
                        <div class="css-1dnl5su-Container-hoverableStyles emqw97l0" tabindex="-1"
                            style="background-color: rgb(153, 0, 153);"></div>
                    </div>
                    <div class="css-125zpcz-ColorGridItem e1pcjn8h0">
                        <div class="css-1dnl5su-Container-hoverableStyles emqw97l0" tabindex="-1"
                            style="background-color: rgb(199, 175, 20);"></div>
                    </div>
                    <div class="css-125zpcz-ColorGridItem e1pcjn8h0">
                        <div class="css-1dnl5su-Container-hoverableStyles emqw97l0" tabindex="-1"
                            style="background-color: rgb(86, 102, 20);"></div>
                    </div>
                    <div class="css-125zpcz-ColorGridItem e1pcjn8h0">
                        <div class="css-1dnl5su-Container-hoverableStyles emqw97l0" tabindex="-1"
                            style="background-color: rgb(217, 43, 43);"></div>
                    </div>
                    <div class="css-125zpcz-ColorGridItem e1pcjn8h0">
                        <div class="css-1dnl5su-Container-hoverableStyles emqw97l0" tabindex="-1"
                            style="background-color: rgb(82, 82, 102);"></div>
                    </div> -->
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
export default {
    name: 'ColorPicker',

    components: {
        Modal
    },

    props: {
        value: {
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
        console.log(this.color);
        return {
            themeColors: colors,
            currentColor: this.color,
            isModalVisible: false,
        }
    }

}

</script>