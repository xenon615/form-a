<template lang="pug">
.radio(v-for='(option, idx) in field.options') 
    input(type='checkbox', :id = 'fid + "_" + idx', :value='option.value', v-model='fd', class='form-control')
    label(:for='fid + "_" + idx') {{option.label}}
</template>
<script setup>
import { useField} from "./shared"
const props = defineProps({
    parentId: String,
    field: Object,
    data: {
        type: Array,
        default:  []
    }
});
const {fd, fid} = useField(props)
</script>
<style lang="scss" scoped>
.radio {
    & label {
        display: inline-block;
        padding: 2px;
    }
}
.horizontal .radio {
    display: inline-block;
    padding: 0px 2px;
}

</style>
