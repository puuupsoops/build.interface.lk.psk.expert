import { createApp } from 'vue';
import { store, key } from '/src/store';
import { createPinia  } from 'pinia';
import App from '/src/App.vue';
import router from '/src/plugins/router';
import VueNativeSock from 'vue-native-websocket-vue3';
import { useDark } from '@vueuse/core';

// import 'windi.css'

// Pinia (new store for migrate)
const pinia = createPinia();

// @ts-ignore
const app = createApp(App);

// Роуты в приложении
app.use(router);

// Vuex4 
app.use(store, key);

app.use(pinia);

// WebSocket со стором
app.use(VueNativeSock, import.meta.env.VITE_APP_WS_LOCATION, { store: store, format: "json" });

export const globalProperties = app.config.globalProperties.$socket;


const isDark = useDark();
isDark.value = localStorage.getItem("darkMode") == "true";
document.documentElement.style.background = isDark.value ? '#15171C' : '#E5E7EB';

// примеение анимации динамического пересчета к цифрам (счетчик)
app.directive('counter', {
    mounted: (el: HTMLElement, binding) => {
        /*
        console.group('counter');
        console.log('counter:mounted', binding);
        console.log('counter:mounted', binding.arg);
        console.groupEnd();
        */
        //el.setAttribute('val', '100');
        //let oldValue = binding.oldValue ?? binding.value;
        let newValue = binding.value;
        el.textContent = newValue.toLocaleString('RU', {minimumFractionDigits: 2, maximumFractionDigits: 2}).replace(',','.');
    },
    updated: (el: HTMLElement, binding) => {
        /*
        console.group('counter');
        console.log('counter:update', binding);
        console.log('counter:update', binding.arg);
        console.groupEnd();
        */
        let oldValue = binding.oldValue ?? binding.value;
        let newValue = binding.value;
        if(oldValue - newValue == 0)
            return;

        let startValue = parseInt(oldValue);
        let endValue = parseInt(newValue);
        let duration = Math.floor(5000 / endValue);
        if (duration === 0) duration = 10;
        let changeStep = Math.abs(Math.floor((oldValue - newValue) / 100));
        //console.log(changeStep);
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

app.config.errorHandler = (err, instance, info) => {
    console.group('errorHandler');
    console.error('Vue error:', err);
    console.log('Instance:', instance);
    console.log('Where:', info);
    console.groupEnd();
}

if (typeof window !== 'undefined') {
    app.mount('#app');
}
