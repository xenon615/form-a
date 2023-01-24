<template lang="pug">
textarea(:id = 'fid',  v-model = 'fd',  , :rows='field.rows || 5', class='form-control')
</template>
<script setup>
import { useField} from "./shared"
const props = defineProps({
    parentId: String,
    field: Object,
    data: {
        type: [String, Number],
    }
});
const {fd, fid} = useField(props)
</script>
