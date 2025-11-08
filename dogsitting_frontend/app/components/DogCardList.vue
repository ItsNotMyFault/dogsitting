<template>
    <div style="display: flex; flex-direction: row; flex-wrap: wrap;">
        <DogCard :dog="dog" v-for="dog in list" :key="dog" />
    </div>
</template>
<script>
import DogCard from '@/components/DogCard.vue'
import ListInit from '@/model/mixins/ListInit.js'

export default {
    name: 'DogCardList',

    mixins: [ListInit],

    components: {
        DogCard
    },
}
</script>