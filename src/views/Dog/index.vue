<template>
    <div class="section">
        <div class="sectionTitle">liste chiens</div>
        <DogCardList :model="model"></DogCardList>
    </div>
</template>
<script>
import DogCardList from '@/components/DogCardList.vue';
import Dog from '@/model/dog'

export default {
    name: 'DogView',

    components: {
        DogCardList
    },

    data() {
        return {
            model: Dog
        }
    },
}
</script>