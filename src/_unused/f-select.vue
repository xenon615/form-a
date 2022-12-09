<template lang="pug">
select(:id = 'field.id',  v-model = 'fd')
    option(v-for='o in field.options' ,:value='o.value') {{o.label}}
</template>

<script setup>
const props = defineProps({
    field: Object,
    data: {
        type: String,
    }
});
// import { useField} from "./shared"
const {fd} = useField(props)
</script>
