<template>
    <div class="reservationCard" @click="navigate">
        <div class="reservationCard-title">
            <span>Team: {{ reservation.team.name }}</span>
            <span>Client: {{ reservation.client.name }}</span>
            <span>created at:
                <MomentAgo :date="reservation.createdAt" />
            </span>
        </div>
        <div>
            Reservation: {{ reservation.title }} <br />
            lodgerCount: ({{ reservation.lodgerCount }})
        </div>
        <div class="reservationCard-period">
            Periode: {{ reservation.dateFrom }} to {{ reservation.dateTo }}
        </div>
        <div class="reservationCard-notes">
            Notes <br />
            Lorem ipsum dolor sit amet consectetur adipisicing elit. At necessitatibus asperiores non, voluptatem eaque
            illum voluptatibus, est dolor iste similique id natus sequi perferendis quae labore beatae cumque. Mollitia,
            modi.
        </div>
        <div class="reservationCard-footer">
            <span v-if="reservation.approvedAt" :class="{ 'reservation-approved': isApproved }">
                approved at:
                <MomentAgo :date="reservation.approvedAt" />
            </span>
            <span v-else>waiting for approval</span>
            <slot name="actions" />
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import Reservation from '@/model/reservation'

// Props
defineProps({
    reservation: {
        type: Reservation,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
})

// Router
const router = useRouter()

// Computed: isApproved
const isApproved = computed(() => reservation.isApproved)

// Methods: navigate
const navigate = () => {
    const adminPath = isAdmin ? '-admin' : ''
    router.push({ path: `/reservation/${reservation.id}/detail${adminPath}` })
}
</script>