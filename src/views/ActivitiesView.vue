<template>
    <div style="width: 100%;">
        <div class="sectionTitle">Activiteeeees</div>
        <div style="display: flex; flex-direction: row; flex-wrap: wrap;">
            <div class="test" @click="() => console.log('test')">
                <div class="title">MARCHE</div>
                <div class="innertest">
                    <img alt="img" src="@/assets/images/20230814_183252.jpg" />
                </div>
                <div class="innertest">
                    <img alt="img" src="@/assets/images/20230817_191711.jpg" />
                </div>
                <div class="innertest">

                    <img alt="img" src="@/assets/images/20231021_104551.jpg" />
                </div>
                <div class="innertest">

                    <img alt="img" src="@/assets/images/20231021_112758.jpg" />
                </div>
                <div class="innertest">
                    <img alt="img" src="@/assets/images/20231021_112758.jpg" />
                </div>
            </div>
            <div class="test">
                asdfsdf
            </div>
            <div class="test">
                asdfsdf
            </div>
            <div class="test">
                asdfsdf
            </div>
            <div class="test">
                asdfsdf
            </div>
        </div>

    </div>
</template>

<script>
import ActivityCard from '@components/ActivityCard.vue'
export default {
    name: 'ActivitiesView',

    components: {
        ActivityCard
    }
}
</script>