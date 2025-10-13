<template>
    <div class="cardAddButton">
        <label class="cardAddButton-container">
            <span class="cardAddButton-title">+</span>
            <slot></slot>
        </label>
    </div>
</template>
<script>
export default {
    name: 'CardAddButton',
}
</script>