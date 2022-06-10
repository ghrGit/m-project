import { resolve } from "path";
import Unocss from "unocss/vite";
import vue from "@vitejs/plugin-vue";
import { viteBuildInfo } from "../info";
import svgLoader from "vite-svg-loader";
import legacy from "@vitejs/plugin-legacy";
// import vueJsx from "@vitejs/plugin-vue-jsx";
import { viteMockServe } from "vite-plugin-mock";
import VueI18n from "@intlify/vite-plugin-vue-i18n";
import { visualizer } from "rollup-plugin-visualizer";
import removeConsole from "vite-plugin-remove-console";
import viteCompression from "vite-plugin-compression";
import eslintPlugin from "vite-plugin-eslint";

export function getPluginsList(command, VITE_LEGACY) {
    const prodMock = true;
    const lifecycle = process.env.npm_lifecycle_event;
    return [
        vue(),
        eslintPlugin(),
        viteCompression({
            verbose: true,
            disable: false,
            threshold: 10240,
            algorithm: "gzip",
            ext: ".gz"
        }),
        // https://github.com/intlify/bundle-tools/tree/main/packages/vite-plugin-vue-i18n
        VueI18n({
            runtimeOnly: true,
            compositionOnly: true,
            include: [resolve("locales/**")]
        }),
        // jsx、tsx语法支持
        // vueJsx(),
        Unocss(),
        // DefineOptions(),
        // 线上环境删除console
        removeConsole(),
        viteBuildInfo(),
        // svg组件化支持
        svgLoader(),
        // mock支持
        viteMockServe({
            mockPath: "mock",
            localEnabled: command === "serve",
            prodEnabled: command !== "serve" && prodMock,
            injectCode: `
          import { setupProdMockServer } from './mockProdServer';
          setupProdMockServer();
        `,
            logger: false
        }),
        // 是否为打包后的文件提供传统浏览器兼容性支持
        VITE_LEGACY
            ? legacy({
                  targets: ["ie >= 11"],
                  additionalLegacyPolyfills: ["regenerator-runtime/runtime"]
              })
            : null,
        // 打包分析
        lifecycle === "report"
            ? visualizer({
                  open: true,
                  brotliSize: true,
                  filename: "report.html"
              })
            : null
    ];
}
