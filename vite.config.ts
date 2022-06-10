import { UserConfigExport, ConfigEnv, loadEnv } from "vite";
import path from "path";
import { getPluginsList } from "./build/getPlugin";
import { warpperEnv } from "./build/index";
const root: string = process.cwd();
// https://vitejs.dev/config/

export default ({ command, mode }: ConfigEnv): UserConfigExport => {
    const { VITE_LEGACY } = warpperEnv(loadEnv(mode, root));
    return {
        plugins: getPluginsList(command, VITE_LEGACY),
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "src")
            }
        },

        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: '@import "@/assets/style/common.scss";'
                }
            }
        },
        define: {
            __PROJECTNAME__: process.argv[3]
        },
        logLevel: "info",
        server: {
            host: "0.0.0.0",
            port: 3000,
            open: false,
            https: false,
            proxy: {
                "/mng": {
                    target: "", //todo;
                    secure: true, // https 的时候 使用该参数
                    changeOrigin: true // 是否跨域
                }
            }
        },
        build: {
            terserOptions: {
                compress: {
                    drop_console: true,
                    drop_debugger: true
                }
            }
        }
    };
};
