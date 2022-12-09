<template lang="pug">
input(type='file', :id = 'fid',  @change='fileChanged', class='form-control')
</template>
<script setup>
import { useField} from "./shared"
const props = defineProps({
    parentId: String,
    field: Object,
    data: {
        type: Object,
    }
});
const {fd, fid} = useField(props)
const fileChanged = (e) => {
    fd.value = e.target.files[0];
}
</script>
    