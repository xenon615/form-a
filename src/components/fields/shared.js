import { computed, inject } from "vue";
export function useField(props, ftype) {
    const emitter = inject('emitter')
    const fid = props.parentId + '--' + props.field.name
    // const dozen = 1000000000000
    const fd = computed({
        get () {
            let v = props.data ?? props.field.default 
            // return ftype == 'datetime' && v < dozen ? v * 1000 : v
            return ftype == 'datetime' ? v * 1000 : v
        },
        set(val) {
            // val = ftype == 'datetime' && val > dozen ? Math.floor(val / 1000) : val
            val = ftype == 'datetime' ? Math.floor(val / 1000) : val
            emitter.emit('value-changed', {
                id: fid,
                value: val
            })
        }
    })
    return {fd,fid}
}

// import { computed, inject } from "vue";

// const formatNumber = (n) => {
//     return n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
// }

// export function useField(props, ftype) {
//     const emitter = inject('emitter')
//     const fid = props.parentId + '--' + props.field.name
//     const dozen = 1000000000000
//     const fd = computed({
//         get () {
//             let v = props.data ?? props.field.default 
//             if (ftype == 'datetime' && v < dozen) {
//                 v *= 1000
//             } 
//             // else if (ftype === 'currency' && typeof v != 'string') {
//             //     v = (new Intl.NumberFormat('en-US', {
//             //         style: 'currency',
//             //         currency: 'USD',
//             //     })).format(v);
//             // }
//             return v
//         },
//         set(val) {
//             if (ftype == 'datetime' && val > dozen) {
//                 val = Math.floor(val / 1000)
//             } 
//             // else if (ftype == 'currency') {
//             //     console.log(val)
//             //     val = val.replace(/[\$,]/g, '')
//             //     console.log('replaced', val)    
//             //     val = parseFloat(val)
//             //     console.log('parsed', val)
//             // }

//             emitter.emit('value-changed', {
//                 id: fid,
//                 value: val
//             })
//         }
//     })
//     return {fd,fid}
// }