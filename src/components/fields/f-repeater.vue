<template lang="pug">
.row(v-for='(r, ridx) in data', :key='ridx')
    div.fields.col.col-17
        f-field(v-for='(f, fidx) in field.fields', :field='f', :key='fidx' ,:data='r[f.name]' :parent-id='parentId + "--" + field.name + "--" + ridx')
    div.del.col.col-1
        button(type='button', @click='del(ridx)') &mdash;
.buttons
    button(type='button', @click='add()') Add
</template>
<script setup>
import { inject } from 'vue';
const emitter = inject('emitter')
const props = defineProps({
    parentId: String,
    field: Object,
    data: {
        type: Array,
        default: () => []
    },
})

const del = (i) => {
    emitter.emit('row-delete', {
        id: props.parentId + '--' + props.field.name,
        idx: i
    })
} 

const add = () => {
    emitter.emit('row-add', {
        id: props.parentId + '--' + props.field.name,
        value: {}
    })
}
</script>

<style scoped lang="scss">
.row {
    display: flex;
    flex-direction: row;
    align-items:flex-start;
    & .del {
        display: flex;
        align-items: center;
        justify-content: center;
        align-self: center;
    }
}
</style>