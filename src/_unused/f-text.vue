

<!-- <script setup>
import { inject} from 'vue'
const props = defineProps({
    field: Object,
    data: {}
})
const emitter = inject('emitter')
const announce = () => {
    console.log(props.data)
    emitter.emit('value-changed', {
        id: props.field.id,
        value: props.data
    })
}
</script> -->
<!-- <script>
import { inject} from 'vue'
export default {
    props: {
        field: Object,
        data: {}
    },
    setup(props) {
        const emitter = inject('emitter')
        const  announce = () => {
            emitter.emit('value-changed', {
                id: props.field.id,
                value: props.data
            })
        }
        return {announce}
    }
}
</script> -->

<!-- <script setup>
import { inject} from 'vue'
const props = defineProps({
    field: Object,
    data: {
        required: true
    }
})
const emitter = inject('emitter')
const announce = () => {
    console.log(props.data)
    emitter.emit('value-changed', {
        id: props.field.id,
        value: props.data
    })
}
</script> -->

<template lang="pug">
input(:id = 'field.id',  type = 'text',  v-model='fd')
</template>

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

