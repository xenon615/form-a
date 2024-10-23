<script setup>
import {onMounted, ref, computed} from 'vue'
import { useField} from "./shared"
const props = defineProps({
    parentId: String,
    field: Object,
    data: {
        type: [Number],
    }
});
const {fd, fid} = useField(props)
let attachment = ref({})
let uploader = null

const getAttachment = () => {
    window.wp.media.ajax({
        data: {
            action: 'get-attachment',
            id: fd.value
        }
    }).then((att) => {
        attachment.value = att
    })
}                  

const selectAttachment = () => {
    attachment.value = uploader.state().get('selection').first().toJSON()
    fd.value = attachment.value.id
}

const open = () => {
    uploader.open()
}

const del = () => {
    attachment.value = {}
    fd.value = 0
}

const previewURL = computed(() => {
    let out = '/wp-includes/images/media/default.png'
    // let out  = 'https://fimc.dev.local/wp-content/uploads/2024/01/sh.jpg'
    if (attachment.value.type) {
        if (attachment.value.type == 'image') {
            out = attachment.value.sizes?.thumbnail?.url || attachment.value.url
        } else {
            out = '/wp-includes/images/media/' + (attachment.value.type == 'application' ? 'document' :   attachment.value.type) + '.png';
        }
    }
    // return out
    return 'url(' +  out + ')'
})

onMounted(() => {
    if (!uploader && (typeof window.wp != 'undefined')) {
        uploader = window.wp.media.frames.file_frame = window.wp.media({
            title: 'Choose Image',
            button: {
                text: 'Choose Image'
            }, 
            multiple: false
        });
        uploader.on('select', selectAttachment)
        if (fd.value) {
            getAttachment()
        }
    }
    // attachment.value.id = 11
})
</script>

<template lang="pug">
div
    .image
        .controls
            button(type="button", v-on:click='open()') &#x2710;
            button(type="button", v-on:click='del()', v-if='attachment.id') &#x2716;
</template>
    
<style lang="scss">
    .image {
        height: 150px;
        width: 150px;
        border-radius: 5px;
        background: v-bind(previewURL);
        background-repeat: no-repeat;
        background-position: center;
        background-size: contain;
        display: flex;
        justify-content: flex-end;
        & .controls {
            padding: 5px;
            & button {
                font-size: 1.1em;
                margin: 0px 1px;
            }
        }
    }

</style>