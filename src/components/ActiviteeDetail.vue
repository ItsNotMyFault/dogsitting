<template>
    <div style="width: 100%;">
        <div class="sectionTitle">Activitees</div>

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


        <ActivityDetailItem img="20230814_183252">
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
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque officiis enim, placeat dolores, eveniet
                amet
                dolore eligendi magnam itaque veritatis nam. Aliquam sint consequatur tenetur, aspernatur ducimus amet
                unde
                iusto.
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo error ad non modi quam adipisci
                exercitationem
                sequi ea dicta? Optio ipsa pariatur ratione ea a molestias vero repudiandae eos delectus.
            </template>
        </ActivityDetailItem>
        <ActivityDetailItem reverse>
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
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque officiis enim, placeat dolores, eveniet
                amet
                dolore eligendi magnam itaque veritatis nam. Aliquam sint consequatur tenetur, aspernatur ducimus amet
                unde
                iusto.
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo error ad non modi quam adipisci
                exercitationem
                sequi ea dicta? Optio ipsa pariatur ratione ea a molestias vero repudiandae eos delectus.
            </template>
        </ActivityDetailItem>
        <ActivityDetailItem>
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
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque officiis enim, placeat dolores, eveniet
                amet
                dolore eligendi magnam itaque veritatis nam. Aliquam sint consequatur tenetur, aspernatur ducimus amet
                unde
                iusto.
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo error ad non modi quam adipisci
                exercitationem
                sequi ea dicta? Optio ipsa pariatur ratione ea a molestias vero repudiandae eos delectus.
            </template>
        </ActivityDetailItem>
        <ActivityDetailItem reverse>
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
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque officiis enim, placeat dolores, eveniet
                amet
                dolore eligendi magnam itaque veritatis nam. Aliquam sint consequatur tenetur, aspernatur ducimus amet
                unde
                iusto.
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo error ad non modi quam adipisci
                exercitationem
                sequi ea dicta? Optio ipsa pariatur ratione ea a molestias vero repudiandae eos delectus.
            </template>
        </ActivityDetailItem>
    </div>
</template>

<script>
import ActivityDetailItem from '@components/ActivityDetailItem.vue'
export default {
    name: 'ActivityDetail',

    components: {
        ActivityDetailItem
    }
}
</script>