<template lang="pug">
input(:type='field.type', :id = 'fid',  v-model='fd', class='form-control')
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
