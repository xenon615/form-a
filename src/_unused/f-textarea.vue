<template lang="pug">
textarea(:id = 'field.id',  v-model = 'fd',  cols="30" rows="10")
</template>

<!-- <script>
import { useEmit } from "./shared"
export default {
    props: {
        field: Object,
        data: {}
    },
    setup(props) {
        return useEmit(props)
    }
}

</script> -->

<!-- <script setup>
import { computed } from "vue";
import { inject} from 'vue'
const props = defineProps({
    field: Object,
    data: {
        type: String,
    }
});

const emitter = inject('emitter')
const dd = computed({
  get () {
    return props.data
  },
  set(val) {
    emitter.emit('value-changed', {
        id: props.field.id,
        value: val
    })
  }
})
</script> -->

<script setup>
const props = defineProps({
    field: Object,
    data: {
        type: String,
    }
});
import { useField} from "./shared"
const {fd} = useField(props)
</script>
