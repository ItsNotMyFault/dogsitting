<template>
    <div class="TeamCard TeamCard-dimensions" @click="navigate()">
        <div class="TeamCard-title">{{ teamName }}</div>
        <div class="TeamCard-image">
            <ImageFileDisplay v-if="image1" :file="image1">
            </ImageFileDisplay>
            <img v-else alt="img" src="@/assets/images/20230814_183252.jpg" />
        </div>
        <div class="TeamCard-image">
            <ImageFileDisplay v-if="image2" :file="image2">
            </ImageFileDisplay>
            <img v-else alt="img" src="@/assets/images/20230817_191711.jpg" />
        </div>
        <div class="TeamCard-image">
            <ImageFileDisplay v-if="image3" :file="image3">
            </ImageFileDisplay>
            <img v-else alt="img" src="@/assets/images/20231021_104551.jpg" />
        </div>
        <div class="TeamCard-image">
            <ImageFileDisplay v-if="image4" :file="image4">
            </ImageFileDisplay>
            <img v-else alt="img" src="@/assets/images/20231021_112758.jpg" />
        </div>
    </div>
</template>
<script>
import Team from '@/model/team'
import ImageFileDisplay from '~/components/inputs/ImageFileDisplay.vue'
export default {
    name: 'TeamCard',

    components: {
        ImageFileDisplay
    },

    props: {
        team: {
            type: Team,
            required: true
        }
    },

    data() {
        return {
            image1: null,
            image2: null,
            image3: null,
            image4: null,
            files: []
        }
    },

    computed: {
        teamName() {
            return this.team?.name || 'undefined'
        }

    },

    methods: {
        navigate() {
            this.$router.push({ path: `/team/${this.team.normalizedIdentifier}` })
        },
        init() {
            this.files = this.team.teamMediaResponses
            this.image1 = this.findFileByPosition(1)
            this.image2 = this.findFileByPosition(2)
            this.image3 = this.findFileByPosition(3)
            this.image4 = this.findFileByPosition(4)
        },
        findFileByPosition(position) {
            const file = this.files.find(file => file.Position === position)
            return file?.FileData || null
        }
    },

    created() {
        this.init()
    }
}
</script>