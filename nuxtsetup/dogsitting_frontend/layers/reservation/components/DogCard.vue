<template>
    <div class="dogCard">
        <div class="dogCard-picture">
            <!-- <img src="https://www.aquaportail.com/pictures1610/carottes.jpg"> -->
            <!-- <img src="https://media.geeksforgeeks.org/wp-content/uploads/geeksforgeeks-13.png"
                alt="Click to visit geeksforgeeks.org"> -->
            <img alt="img" src="@/assets/images/20230817_191711.jpg" />
        </div>
        <div class="dogCard-description">
            <!-- dogDescription => {{ dogDescription }} -->
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
            return this.dog.description
        }
    },
}

</script>