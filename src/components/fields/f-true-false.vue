<template lang="pug">
input(type='checkbox', :id = 'fid',  :value = 'true', v-model='fd', class='form-control')
</template>
<script setup>
import { useField} from "./shared"
const props = defineProps({
    parentId: String,
    field: Object,
    data: {
        type: [Boolean],
        default: false
    }
});
const {fd, fid} = useField(props)
</script>
<style lang="scss" scoped>
</style>
