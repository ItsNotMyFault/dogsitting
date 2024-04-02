<template>
    <div class="dogCard">
        <div class="dogCard-picture">

        </div>
        <div class="dogCard-description">
            John, 4, berger australien
        </div>
    </div>
</template>
<script>
export default {
    name: 'DogCard',

    props: {
        dog: {
            type: String,
            required: true
        }
    },

    computed: {
        dogDescription() {
            return `${this.dog.name}, ${this.dog.age}, ${this.dog.race}`
        }
    }
}

</script>