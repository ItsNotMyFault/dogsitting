<template>
    <div class="subSectionMenu">
        <div class="subSectionMenu-title link" :class="{ 'active': modelValue === component }"
            v-for="(component) in componentList" :key="component" @click="selectComponent(component)">
            {{ component }}
        </div>
    </div>
</template>

<script>
export default {
    name: 'SubMenu',

    props: {
        componentList: {
            type: Array,
            required: true
        },
        modelValue: {
            type: String,
            required: true
        }
    },

    methods: {
        selectComponent(componentName) {
            this.$emit('update:modelValue', componentName)
        }
    }
}
</script>