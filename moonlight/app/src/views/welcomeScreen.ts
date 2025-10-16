import {ref} from 'vue'


const template = `

<div> 
hey home 
</div>
`
export default {
    template,
    setup() {
        const count = ref(0)
        return {count}
    },
}