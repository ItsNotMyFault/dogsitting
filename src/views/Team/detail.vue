<template>
    <div>
        <div class="sectionTitle">
            <div>
                <span @click="showCalendar = false"> {{ teamName }}</span> - <span class="link"
                    @click="showCalendar = true"> calendar</span>
            </div>
        </div>
        <br>
        <ClientCalendar v-if="showCalendar" :teamName="normalizedTeamName"></ClientCalendar>
        <div>
            <ActivityCard img="20230814_183252">
                <template #title>
                    TITLE
                </template>
                <template #image>
                    <img alt="img" src="@/assets/images/20230817_191711.jpg" />
                </template>
                <template #description>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Alias
                    perspiciatis, quos temporibus veniam iste excepturi minus ea esse. Qui ipsam culpa non iste animi
                    aspernatur
                    numquam ipsa unde ut? Eaque.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque officiis enim, placeat dolores,
                    eveniet
                    amet
                    dolore eligendi magnam itaque veritatis nam. Aliquam sint consequatur tenetur, aspernatur ducimus
                    amet
                    unde
                    iusto.
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo error ad non modi quam adipisci
                    exercitationem
                    sequi ea dicta? Optio ipsa pariatur ratione ea a molestias vero repudiandae eos delectus.
                </template>
            </ActivityCard>
            <ActivityCard reverse>
                <template #title>
                    TITLE
                </template>
                <template #image>
                    <img alt="img" src="@/assets/images/20240204_124524.jpg" />
                </template>
                <template #description>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Alias
                    perspiciatis, quos temporibus veniam iste excepturi minus ea esse. Qui ipsam culpa non iste animi
                    aspernatur
                    numquam ipsa unde ut? Eaque.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque officiis enim, placeat dolores,
                    eveniet
                    amet
                    dolore eligendi magnam itaque veritatis nam. Aliquam sint consequatur tenetur, aspernatur ducimus
                    amet
                    unde
                    iusto.
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo error ad non modi quam adipisci
                    exercitationem
                    sequi ea dicta? Optio ipsa pariatur ratione ea a molestias vero repudiandae eos delectus.
                </template>
            </ActivityCard>
            <ActivityCard>
                <template #title>
                    TITLE
                </template>
                <template #image>
                    <img alt="img" src="@/assets/images/20231118_112354.jpg" />
                </template>
                <template #description>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Alias
                    perspiciatis, quos temporibus veniam iste excepturi minus ea esse. Qui ipsam culpa non iste animi
                    aspernatur
                    numquam ipsa unde ut? Eaque.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque officiis enim, placeat dolores,
                    eveniet
                    amet
                    dolore eligendi magnam itaque veritatis nam. Aliquam sint consequatur tenetur, aspernatur ducimus
                    amet
                    unde
                    iusto.
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo error ad non modi quam adipisci
                    exercitationem
                    sequi ea dicta? Optio ipsa pariatur ratione ea a molestias vero repudiandae eos delectus.
                </template>
            </ActivityCard>
            <ActivityCard reverse>
                <template #title>
                    TITLE
                </template>
                <template #image>
                    <img alt="img" src="@/assets/images/20240308_151349.jpg" />
                </template>
                <template #description>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Alias
                    perspiciatis, quos temporibus veniam iste excepturi minus ea esse. Qui ipsam culpa non iste animi
                    aspernatur
                    numquam ipsa unde ut? Eaque.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque officiis enim, placeat dolores,
                    eveniet
                    amet
                    dolore eligendi magnam itaque veritatis nam. Aliquam sint consequatur tenetur, aspernatur ducimus
                    amet
                    unde
                    iusto.
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo error ad non modi quam adipisci
                    exercitationem
                    sequi ea dicta? Optio ipsa pariatur ratione ea a molestias vero repudiandae eos delectus.
                </template>
            </ActivityCard>
        </div>
    </div>
</template>
<script>
import ActivityCard from '@components/ActivityCard.vue'
import ClientCalendar from '@components/calendar/ClientCalendar.vue'
import teamServices from '@services/teamServices.js'


export default {
    name: 'TeamDetail',

    props: {
        name: {
            type: String,
            required: true
        }
    },

    components: {
        ActivityCard,
        ClientCalendar
    },

    computed: {
        teamName() {
            console.log('TITLE this.team', this.team);
            return this.team ? this.team.name : null
        },
        normalizedTeamName() {
            return this.team ? this.team.normalizedName : null
        }
    },

    data() {
        return {
            showCalendar: false,
            title: null,
            team: null,

        }
    },

    methods: {
        submitForm() {
            console.log('submit form');
        }
    },

    async created() {
        const response = await teamServices.getTeamByNormalizedName(this.name).then(response => {
            this.team = response
            this.showCalendar = true
        })
        console.log('response', response);


    }
}
</script>
