import { computed, inject } from "vue";
export function useField(props) {
    const emitter = inject('emitter')
    const fid = props.parentId + '--' + props.field.name
    const fd = computed({
        get () {
            return props.data ?? props.field.default
        },
        set(val) {
            emitter.emit('value-changed', {
                id: fid,
                value: val
            })
        }
    })
    return {fd,fid}
}