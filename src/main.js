
import { createApp } from 'vue'
import App from './App.vue'
import mitt from 'mitt'

const components = import.meta.globEager('./components/**/*.vue')

// const app = createApp(App)
// Object.entries(components).forEach(([path, definition]) => {
//     const componentName = path.split('/').pop().replace(/\.\w+$/, '')
//     app.component(componentName, definition.default)
// })
// app.provide('emitter', mitt())
// app.mount('#app');

let apps = [];
const slots = document.querySelectorAll('.form-a-placeholder')
if (slots.length > 0 ) {
    slots.forEach((s, idx) => {
        apps.push(createApp(App, {formSlug: s.id}))
        Object.entries(components).forEach(([path, definition]) => {
            const componentName = path.split('/').pop().replace(/\.\w+$/, '')
            apps[idx].component(componentName, definition.default)
        })
        apps[idx].provide('emitter', mitt())
        apps[idx].mount('#' + s.id);
    })
    
}


