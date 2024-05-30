<template>
    <div>
        user animals list
        {{ animals }}
    </div>
</template>

<script>
import userServices from '@/services/userServices'

export default {
    name: 'UserAnimals',

    props: {
        userId: {
            type: String,
            required: true
        }
    },

    data() {
        return {
            animals: ["dogo1", "dogo2"]
        }
    },

    created() {
        // this.animals = userServices.getAnimals()
    }


}
</script>