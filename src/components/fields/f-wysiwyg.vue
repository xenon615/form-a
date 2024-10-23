<template lang="pug">
textarea(rows='10', v-model='fd', :id='fid',  spellcheck="false")
</template>
<script setup>
import {onMounted} from 'vue'
import { useField} from "./shared"
const props = defineProps({
    parentId: String,
    field: Object,
    data: {
        type: [String],
    }
});
const {fd, fid} = useField(props)
onMounted(() => {
    if (!window.wp || !window.wp.editor) {
        return;
    }
    window.wp.editor.initialize(fid, {
        tinymce: {
            wpautop  : true,
            theme    : 'modern',
            skin     : 'lightgray',
            language : 'en',
            formats  : {
                alignleft  : [
                    { selector: 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li', styles: { textAlign: 'left' } },
                    { selector: 'img,table,dl.wp-caption', classes: 'alignleft' }
                ],
                aligncenter: [
                    { selector: 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li', styles: { textAlign: 'center' } },
                    { selector: 'img,table,dl.wp-caption', classes: 'aligncenter' }
                ],
                alignright : [
                    { selector: 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li', styles: { textAlign: 'right' } },
                    { selector: 'img,table,dl.wp-caption', classes: 'alignright' }
                ],
                strikethrough: { inline: 'del' }
            },
            relative_urls       : false,
            remove_script_host  : false,
            convert_urls        : false,
            browser_spellcheck  : true,
            fix_list_elements   : true,
            entities            : '38,amp,60,lt,62,gt',
            entity_encoding     : 'raw',
            keep_styles         : false,
            paste_webkit_styles : 'font-weight font-style color',
            preview_styles      : 'font-family font-size font-weight font-style text-decoration text-transform',
            tabfocus_elements   : ':prev,:next',
            plugins: 'charmap,colorpicker,hr,lists,media,paste,tabfocus,textcolor,fullscreen,wordpress,wpautoresize,wpeditimage,wpemoji,wpgallery,wplink,wpdialogs,wptextpattern,wpview',
            resize     : 'vertical',
            menubar    : false,
            indent     : false,
            toolbar1   : 'bold,italic,strikethrough,bullist,numlist,blockquote,hr,alignleft,aligncenter,alignright,link,unlink,wp_more,spellchecker,wp_adv',
            toolbar2   : 'formatselect,underline,alignjustify,forecolor,pastetext,removeformat,charmap,outdent,indent,undo,redo,wp_help',
            toolbar3   : '',
            toolbar4   : '',
            body_class : 'id post-type-post post-status-publish post-format-standard',
            content_css: '', 
            wpeditimage_disable_captions: false,
            wpeditimage_html5_captions  : true
        },
        quicktags   : true,
    })

    let editor = window.tinymce.get(fid)
    editor.on('Change', function(data) {
        fd.value = editor.getContent()
    });

})
</script>
