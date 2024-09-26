
import { createApp } from 'vue'
import App from '@/components/app/App.vue'
import uiComponenet from "@/ui-componenet";
const app = createApp(App)


uiComponenet.map(component => {
    app.component(component.name, component)
})
app.mount('#app')

