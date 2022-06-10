<script lang="ts">
import { toRefs, onMounted, reactive } from "vue";
import { useMainStore } from "@/store/main";
import { GET_COUNTRYS } from "@/components/api";
export default {
    props: {
        msg: {
            type: String
        }
    },
    setup() {
        const mainStore = useMainStore();
        const updateName = () => {
            mainStore.$patch({
                name: "名称被修改了,nameLength也随之改变了"
            });
        };
        const state = reactive({
            countryList: []
        });
        const getCountrys = async () => {
            state.countryList = await GET_COUNTRYS();
        };
        onMounted(() => {
            getCountrys();
        });
        return {
            updateName,
            ...toRefs(state),
            mainStore
        };
    }
};
</script>

<template>
    <h1 @click="updateName">{{ mainStore.name }}</h1>
    -------{{ JSON.stringify(countryList) }}
    <p>
        Recommended IDE setup:
        <a href="https://code.visualstudio.com/" target="_blank">VS Code</a>
        +
        <a href="https://github.com/johnsoncodehk/volar" target="_blank"
            >Volar</a
        >
    </p>

    <p>
        See
        <code>README.md</code> for more information.
    </p>

    <p>
        <a href="https://vitejs.dev/guide/features.html" target="_blank"
            >Vite Docs</a
        >
        |
        <a href="https://v3.vuejs.org/" target="_blank">Vue 3 Docs</a>
    </p>

    <!-- <button type="button" @click="count++">count is: {{ count }}</button> -->
    <p>
        Edit
        <code>components/HelloWorld.vue</code> to test hot module replacement.
    </p>
</template>

<style scoped lang="scss">
a {
    color: $test-color;
}

label {
    margin: 0 0.5em;
    font-weight: bold;
}

code {
    background-color: #eee;
    padding: 2px 4px;
    border-radius: 4px;
    color: #304455;
}
</style>
