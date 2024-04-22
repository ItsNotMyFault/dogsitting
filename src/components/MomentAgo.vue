<template>
    <span>{{ value }}</span>
</template>
<script>
import DateFormat from '@utils/DateFormat'
export default {
    name: 'MomentAgo',

    props: {
        date: {
            type: [Date, String],
            required: true
        }
    },

    computed: {
        value() {
            return DateFormat.GetTimeAgo(this.date) || 'invalid date'
        }
    }
}
</script>