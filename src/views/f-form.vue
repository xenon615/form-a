<template lang="pug">
div.form
    h1 {{form_def.title}}
    .fields
        f-field(v-for='field in form_def.fields', :field='field', parentId = 'f', :data='form_data[field.name]')
    .message {{message}}    
    .buttons(v-if='form_def.buttons')
        button(v-for='b in form_def.buttons', :type='b.type' :class='b.classes', :disabled ='submitting' )
            | {{b.text}}
        .progress(v-if='submitting')
            img(:src='progressUrl')
//- div
    vue-json-pretty(:data="form_data")

</template>

<script setup>
// import VueJsonPretty from 'vue-json-pretty'
// import 'vue-json-pretty/lib/styles.css'

import {inject, onMounted, ref} from 'vue'
import {remoteRequest, loadForm} from '../remote.js'
const base = import.meta.url.indexOf('vue') == -1 ? import.meta.url.split(/\/[^\/]+$/)[0] + '/' : import.meta.url; 
const progressUrl = new URL('../assets/progress.svg', base).href
const props = defineProps({
    formSlug : String    
});

const message = ref('')
const submitting = ref(false)
const form_def = ref({})
const form_data = ref({})
// const isReady = ref(false)

onMounted(() => {
    loadForm(props.formSlug).then((r) => {
        form_def.value = r.def 
        form_data.value = r.data
        if (typeof form_def.value == 'undefined') {
            form_def.value = {fields:[]}
        }
        // isReady.value = true
        handleSubmit();
        initLogic(form_def.value.fields)
    })
})

const handleSubmit = () => {
    const fd = form_def.value;
    let formElement = document.querySelector('#' + props.formSlug).closest('form');
    if (!formElement) {
        return
    }
    formElement.addEventListener('submit', function(e) {
        if (fd.remoteSubmit) {
            e.preventDefault();
            submitting.value = true;
            remoteRequest('submit', props.formSlug, 'POST', form_data.value).then(data => {
                submitting.value = false;
                message.value = data.message ?? ''
                if (data.redirectURL) {
                    window.location.href = data.redirectURL;
                }
                if (window.formA.afterSubmit) {
                    window.formA.afterSubmit(formElement,data);
                }
            });
            return false;
        }

        let dataName = form_def.value.dataName ?? 'FormAData';        
        let  input = document.querySelector('#' + dataName);
        if (!input) {
            input = Object.assign(document.createElement('input'), {
                name: dataName,
                id: dataName ,
                type: 'hidden'
            })
            this.appendChild(input);
        }
        input.setAttribute('value', JSON.stringify(form_data));
        return true;
        /*
        if (editor.$wpData.action == 'add') {
            var publish = document.createElement("input");
            publish.name = 'publish';
            publish.type = 'hidden';
            publish.value = 'Publish';
            publish.id = 'publish';
            this.appendChild(publish);
        }
        */        
    });
}


const emitter = inject('emitter')

const modifyData = (v) => {
    let p = form_data.value
    let path = v.id.split('--')
    let pe
    path.shift()
    while (path.length) {
        pe = path.shift()
        if (!isNaN(pe)) {
            pe = parseInt(pe)
        }
        if (path.length == 0) {
            if (v.action == 'change') {
                p[pe] = v.value
            } else if (v.action == 'delete') {
                p[pe].splice(v.idx, 1)
            } else {
                p[pe].push(v.value)
            }

        } else {
            p = p[pe]
        }
    }
} 

emitter.on('value-changed', (v) => {
    v.action = 'change'
    modifyData(v)
})

emitter.on('row-delete', (v) => {
    v.action = 'delete'
    modifyData(v)
})

emitter.on('row-add', (v) => {
    v.action = 'add'
    modifyData(v)
})

const initLogic = (fields) => {
    fields.forEach(f => {
        if (f.cLogic) {
            f.cLogic.forEach((e, i) => {
                f.cLogic[i].check = getByPath(f.cLogic[i].path) || f.default
            })
        }
        if (f.fields) {
            initLogic(f.fields)
        }
    })
} 

const getByPath = sPath => {
    let path = sPath.split('--');
    let p = form_data.value
    while (path.length) {
        let pe = path.shift()
        if (p[pe]) {
            p = p[pe]
        } else {
            return false
        }
    }
    return p
}

// ---------



</script>

<style  lang="scss">
@import  '../assets/scss/grid.scss'; 
.form {
    & div {
       box-sizing: border-box; 
    }
    & .fields {
        border: 1px solid #d3cbd7;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-items:flex-start;
        margin-bottom: 5px;
        border-radius: 5px;
    }
    & .buttons {
        display: flex;
        padding: 10px;
    }
    & .progress {
        padding-left: 10px;
        display: inline-block;
    }
    & .message {
        padding: 10px;
        font-weight: bold;
    }
}
</style>
