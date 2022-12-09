<template lang="pug">
div.fields
    f-field(v-for='f in field.fields', :field='f', :data='data[f.name]' :parent-id='parentId + "--" + field.name')
</template>
<script setup>
const props = defineProps({
    parentId: String,
    field: Object,
    data: {
        type: Object,
        default: {}
    }
})


</script>
<style scoped>
</style>