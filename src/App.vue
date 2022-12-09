<script setup>
import fForm from './views/f-form.vue'
const props = defineProps({
    formSlug: String,
});
</script>
<template lang="pug">
//- form#post
f-form(:formSlug= 'formSlug')
</template>

<style lang="scss">
    // @import  'normalize.scss'; 
</style>
