<template lang="pug">
select(:id = 'fid',  v-model = 'fd', class='form-control')
    option(v-for='o in field.options', :value='o.value') {{o.label}}
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
