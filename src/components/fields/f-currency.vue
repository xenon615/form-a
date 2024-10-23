<template lang="pug">
//- input(type='text', :id = 'fid',  v-model='fd', @blur='formatCurrency', class='form-control')
input(type='text', :id = 'fid', @blur='formatCurrency', v-model='fd', class='form-control')
</template>
<script setup>
import { useField} from "./shared"
const props = defineProps({
    parentId: String,
    field: Object,
    data: {
        type: [String, Number],
    }
});

const {fd, fid} = useField(props, 'currency')


const formatNumber = (n) => {
    return n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

const formatCurrency = (evt) => {
    let input_val = fd.value;
    if (input_val === "") {
         return; 
    }
    let original_len = input_val.length
    let input = evt.target
    let caret_pos = input.selectionStart
    

    if (input_val.indexOf(".") >= 0) {
        let decimal_pos = input_val.indexOf(".")
        let left_side = input_val.substring(0, decimal_pos)
        let right_side = input_val.substring(decimal_pos)
        left_side = formatNumber(left_side)
        right_side = formatNumber(right_side)

        if (evt.type === "blur") {
            right_side += "00";
        }
        right_side = right_side.substring(0, 2)
        input_val = "$" + left_side + "." + right_side

    } else {
        input_val = formatNumber(input_val)
        input_val = "$" + input_val

        if (evt.type === "blur") {
            input_val += ".00"
        }
    }
  
    fd.value = input_val
  
    let updated_len = input_val.length
    caret_pos = updated_len - original_len + caret_pos
    input.setSelectionRange(caret_pos, caret_pos)
}
</script>
    