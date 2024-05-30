<template>
    <div class="bloc">
        <div class="form">
            {{ animal }}
            <button @click="save">Save</button>
            saving => {{ saving }}
        </div>
    </div>
</template>
<script>
import Animal from '@model/animal'
import authServices from '@services/authServices'
import userServices from '@services/userServices'
export default {
    name: 'AnimalForm',

    data() {
        return {
            user: new Animal(),
            saving: false
        }
    },

    methods: {
        async save() {
            this.saving = true
        }
    },


    async created() {
        this.user = await authServices.GetCurrentUser();
    }

}
</script>
