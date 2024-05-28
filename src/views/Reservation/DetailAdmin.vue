<template>
    <div class="reservationDetail">
        <div class="sectionTitle">
            Booking ADMIN Détails
        </div>
        <div class="bloc">
            <IsApproved :isApproved="reservation?.isApproved"></IsApproved>
            Reservation Dates: {{ dates }}
            Reserved on: {{ reservation?.createdAt }}
        </div>
        <div class="bloc">
            Gardien: OUI
        </div>
        <div class="bloc">
            Chiens: Liste de chiens ici
        </div>
        <div class="bloc bloc-images">
            <button @click="saveReservationFiles()">SAVE FILES</button>
            <CardAddButton class="imageFileInput">
                <label class="imageFileInput-container">
                    <input type="file" id="file" @change="updateFiles" multiple>
                    <span class="imageFileInput-title">+</span>
                </label>
            </CardAddButton>
            <div v-for="(image, index) in imagesUrls" :key="image" class="bloc-image bloc-image-dimensions">
                <button class="block-imageButton" @click="removeImage(index)">delete</button>
                <img :src="image" alt="Image Preview" style="width: 100%; height: 100%;">
            </div>
        </div>
    </div>
</template>

<script>
import reservationServices from '@services/reservationServices.js'
import ImageFileInput from '@components/inputs/ImageFileInput.vue'
import CardAddButton from '@components/buttons/CardAddButton.vue'
import IsApproved from '@components/IsApproved.vue'

export default {
    name: 'ReservationDetailAdmin',

    components: {
        ImageFileInput,
        CardAddButton,
        IsApproved
    },

    props: {
        id: {
            type: String,
            required: true
        }
    },

    computed: {
        dates() {
            return this.reservation?.dates
        },
        contactInfo() {
            return 'phone: 5345-345-6556'
        },
    },

    methods: {
        removeImage(index) {
            this.imagesUrls.splice(index, 1);
        },
        async readImageFile(file) {
            console.log('file', file);
            if (file && file.type.startsWith('image/')) {
                try {
                    const result = await new Promise((resolve, reject) => {
                        const reader = new FileReader();
                        reader.onload = e => resolve(e.target.result);
                        reader.onerror = e => reject(new Error("File reading error"));
                        reader.readAsDataURL(file);
                    });
                    return result;
                } catch (error) {
                    console.error('Error reading file:', error);
                    return null;
                }
            } else {
                console.warn('file is not an image')
                return null

            }
        },
        async saveReservationFiles() {
            reservationServices.saveReservationFiles(this.id, this.files)
        },
        async updateFiles(event) {
            const files = event.target.files;
            this.files = files
            // this.files = [...this.files, files]
            for (const file of files) {
                const imageUrl = await this.readImageFile(file);
                if (imageUrl) {
                    this.imagesUrls.push(imageUrl);
                }
            }
        },
        navigate() {
            this.$router.push({ path: `/teams/create` })
        }
    },

    data() {
        return {
            reservation: null,
            images: [],
            imagesUrls: [],
            files: []
        }
    },

    async created() {
        this.reservation = await reservationServices.findReservationById(this.id)
    }
}
</script>
