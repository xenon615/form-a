
<template lang="pug">
VueDatePicker(:id = 'fid',  v-model='fd', model-type='timestamp', auto-apply, :enable-time-picker="false", :year-range = 'field.yearRange') 
</template>

<script setup>
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import { useField} from "./shared"

const props = defineProps({
    parentId: String,
    field: Object,
    data: {
        type: [Number],
    }
});

const {fd, fid} = useField(props, 'datetime')
</script>
