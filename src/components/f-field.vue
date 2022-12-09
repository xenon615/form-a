<template lang="pug">
div(:class='classes()',  v-if='isVisible')
    label(v-if='field.label.text && field.label.position == "before"', :for='parentId + "--" + props.field.name') {{field.label.text}}
    component(:is='ftype()'  :field='field', :data='sdata()', :parent-id='parentId' , :required='field.validators && field.validators.required')
    label(v-if='field.label.text && field.label.position == "after"', :for='parentId + "--" + props.field.name') {{field.label.text}}
.line-break(v-if='field.breakAfter')    
</template>
<script setup>
import {inject, ref, computed} from 'vue'
const props = defineProps({
    parentId: String,
    field: Object,
    data: {}
})


const classes = () => {
    return (props.field.classes ? `${props.field.classes.join(' ')} ` : '')  + 'form-group col f-' + props.field.type
}

const sdata = () => {
    let v     
    if (typeof props.data == 'undefined') {
        if (props.field.default) {
            v = props.field.default
        } else if (props.field.type == 'repeater') {
            v =  [];
        } else if (props.field.type == 'group') {
            v = {}
        } 
        // else {
        //     v =  null;
        // }
        emitter.emit('value-changed', {
            id: props.parentId + '--' + props.field.name,
            value: v
        })
    } else {
        v =  props.data;
    }
    return v;
}
const isVisible = ref(true)
const ftype = () => {
    const textVariants = ['text', 'email', 'password', 'number', 'date']
    return 'f-' + (textVariants.includes(props.field.type) ? 'text' : props.field.type)
}

const norm  = () => {
    if (typeof props.field.label == 'string') {
        props.field.label = {
            text: props.field.label,
            position: 'before'
        }
    }
}

const emitter = inject('emitter')
if (props.field.cLogic) {
    emitter.on('value-changed', (v) => {
        let idx = props.field.cLogic.findIndex(e => {
            return 'f--' + e.path === v.id
        })
        if (idx !== -1) {
            props.field.cLogic[idx].check = v.value
        }
        checkVisibility();
    })

    const checkVisibility = () => {
        let result = false;
            props.field.cLogic.forEach(e => {
            result = compare(result, compare(e.value, e.check, e.compare), e.relation);
        });
        isVisible.value = result
    }

    const compare = ($a, $b , $operator) => {
        switch($operator) {
            case '==':
                return $a == $b;
            case '!=':
                return $a != $b;
            case 'or':
            case '||':
                return $a || $b;
            case 'and':
            case '&&':
                return $a && $b;    
            default: 
            return false;
        }
    } 
    
    checkVisibility();
}
norm();
</script>
<style lang="scss">
.line-break {
  flex-basis: 100%;
  height: 0;
}
.form-group {
    padding: 10px;
    & label {
        display: block;
        font-weight: bolder;
        margin-bottom: 2px;
    }
    &.f-true-false label {
        display: inline-block;
        padding: 0px 5px;
    }
    & .form-control {
        margin: 3px 0px;
        border-radius: 5px;
        border: 1px #ccc solid;
        width: 95%;
        padding: 3px 5px;
        &[type="checkbox"], &[type="radio"] {
            width: initial;
        }
        &:focus {
            border-color: #5b9dd9;
            box-shadow: 0 0 2px rgba(30,140,190,.8);
        }
    }
    &.f-group > label, &.f-repeater > label{
        font-size: 1.3em;
        padding: 5px
    }
}


</style>