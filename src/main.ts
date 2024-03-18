import { createApp } from 'vue'
import { store, key } from '/src/store'
import router from '/src/plugins/router'
import App from '/src/App.vue'
// import 'windi.css'

// @ts-ignore
const app = createApp(App)

// Vuex4 

app.use(store, key)

// Роуты в приложении

app.use(router)

// WebSocket со стором
import VueNativeSock from 'vue-native-websocket-vue3'
app.use(VueNativeSock, import.meta.env.VITE_APP_WS_LOCATION, {store: store,format: "json"})

export const globalProperties = app.config.globalProperties.$socket
import { useDark } from '@vueuse/core';

const isDark = useDark();
isDark.value = localStorage.getItem("darkMode") == "true";
document.documentElement.style.background = isDark.value ? '#15171C': '#E5E7EB'

// примеение анимации динамического пересчета к цифрам (счетчик)
app.directive('counter', {
    mounted: (el: HTMLElement, binding) => {
        console.group('counter');
        console.log('counter:mounted', binding);
        console.log('counter:mounted', binding.arg);
        console.groupEnd();
        //el.setAttribute('val', '100');
        //let oldValue = binding.oldValue ?? binding.value;
        let newValue = binding.value;
        el.textContent = newValue.toLocaleString('RU', {minimumFractionDigits: 2, maximumFractionDigits: 2}).replace(',','.');
    },
    updated: (el: HTMLElement, binding) => {
        console.group('counter');
        console.log('counter:update', binding);
        console.log('counter:update', binding.arg);
        console.groupEnd();
        
        let oldValue = binding.oldValue ?? binding.value;
        let newValue = binding.value;
        if(oldValue - newValue == 0)
            return;

        let startValue = parseInt(oldValue);
        let endValue = parseInt(newValue);
        let duration = Math.floor(5000 / endValue);
        if (duration === 0) duration = 10;
        let changeStep = Math.abs(Math.floor((oldValue - newValue) / 100));
        console.log(changeStep);
        let counter = setInterval(() => {
            if (parseInt(oldValue) - parseInt(newValue) >= 0) {
                startValue -= changeStep;
                el.textContent = startValue.toLocaleString('RU', {minimumFractionDigits: 2, maximumFractionDigits: 2}).replace(',','.');
                if (startValue <= endValue) {
                    el.textContent = newValue.toLocaleString('RU', {minimumFractionDigits: 2, maximumFractionDigits: 2}).replace(',','.');
                    clearInterval(counter);
                }
            } else {
                startValue += changeStep;
                el.textContent = startValue.toLocaleString('RU', {minimumFractionDigits: 2, maximumFractionDigits: 2}).replace(',','.');
                if (startValue >= endValue) {
                    el.textContent = newValue.toLocaleString('RU', {minimumFractionDigits: 2, maximumFractionDigits: 2}).replace(',','.');
                    clearInterval(counter);
                }
            }
        }, 1);
    },
});

app.mount('#app')
