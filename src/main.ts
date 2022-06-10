import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index";
import { getRequest, postRequest } from "@/utils/http";
import { createPinia } from "pinia";
import "uno.css";
const app = createApp(App);
app.config.globalProperties.$getRequest = getRequest;
app.config.globalProperties.$postRequest = postRequest;
app.config.globalProperties.$loading = () => {};
app.config.globalProperties.$message = (str: string) => {
    console.log(str);
};

app.use(router);
app.use(createPinia());
app.mount("#app");
