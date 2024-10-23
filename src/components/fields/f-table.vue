    <script setup>
    import { inject, computed , onMounted} from 'vue';
    const emitter = inject('emitter')
    const props = defineProps({
        parentId: String,
        field: Object,
        data: {
            type: Array,
            default: () => []
        },
    })
    
    const flabels = computed(() => {
        const t = [];
        props.field.fields.forEach((e) => {
            if (e.type != 'hidden') {
                t.push({label: e.label, classes: e.classes})
            }
        })
        return t
    })    

    const del = (ev,i) => {
        ev.preventDefault()
        emitter.emit('row-delete', {
            id: props.parentId + '--' + props.field.name,
            idx: i
        })
    } 
    
    const add = (ev) => {
        ev.preventDefault()
        emitter.emit('row-add', {
            id: props.parentId + '--' + props.field.name,
            value: {}
        })
    }

    const moveRow = (ev, idx, direction) => {
        ev.preventDefault()
        let new_idx = direction + idx;
        if (typeof props.data[new_idx] != 'undefined') {
            props.data.splice(Math.min(idx, new_idx), 2, props.data[Math.max(new_idx, idx)], props.data[Math.min(new_idx, idx)]);
        }
    }

    const norm  = () => {
        props.field.fields.forEach((e, i ) => {

            if (e.label) {
                if (typeof e.label == 'object') {
                    e.label.position = 'none'
                } else {
                    e.label = {
                        text: e.label,
                        position: 'none'
                    }
                }
                
            }
        })
    }

    onMounted(() => {
        norm()
    }) 
    
    </script>
    
<template lang="pug">
.table    
    .row.thead
        .th(v-for='l in flabels ', class="col", :class='l.classes') {{ l.label.text}}
        .controls.col-1
    .row(v-for='(r, ridx) in data', :key='ridx')
        template(v-for='(f, fidx) in field.fields')    
            .td(v-if='f.type != "hidden"', class="col", :class='f.classes')
                f-field( :field='f', :key='fidx' ,:data='r[f.name]' :parent-id='parentId + "--" + field.name + "--" + ridx')
            f-field(v-if='f.type == "hidden"', :field='f', :key='fidx' ,:data='r[f.name]' :parent-id='parentId + "--" + field.name + "--" + ridx')
        .controls.col-1
            a(href='#', @click='moveRow($event, ridx, -1)') &#x2191;
            a(href='#', @click='del($event, ridx)') &#xd7;
            a(href='#', @click='moveRow($event, ridx, 1)') &#x2193;
.buttons
    a(href='#', @click='add($event)') &#x271A;
</template>
        
<style scoped lang="scss">

.table {
    margin-top: 10px;
    border: 1px solid #777;
    & .row {
        display: flex;
        border: none;
        border-bottom: 1px solid  #777;
        
        & .th, .td {
            border-right: 1px solid  #777;
            text-align: center;
        }
        & .th {
            padding: 5px;
            font-weight: bold;
        }

        & .controls {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-basis: 10%;    
            border:none;    
        }
    }
    & :last-child {
        border:none;
    }
}
a {
    font-size: 2em;
    font-weight: bold;
    color: #777;
    text-decoration: none;
    &:hover {
        color: #333;
    }
}

</style>

