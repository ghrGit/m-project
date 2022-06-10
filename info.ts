import { readdir, stat } from "fs";
import type { Plugin } from "vite";
// import dayjs, { Dayjs } from "dayjs";
// import { sum } from "lodash-unified";
// import duration from "dayjs/plugin/duration";
import { green } from "picocolors";
// dayjs.extend(duration);

const staticPath = "dist";
const fileListTotal: number[] = [];

const recursiveDirectory = (folder: string, callback: Function): void => {
    readdir(folder, (err, files: string[]) => {
        if (err) throw err;
        let count = 0;
        const checkEnd = () => {
            ++count == files.length && callback();
        };
        files.forEach((item: string) => {
            stat(folder + "/" + item, async (err, stats) => {
                if (err) throw err;
                if (stats.isFile()) {
                    fileListTotal.push(stats.size);
                    checkEnd();
                } else if (stats.isDirectory()) {
                    recursiveDirectory(`${staticPath}/${item}/`, checkEnd);
                }
            });
        });
        files.length === 0 && callback();
    });
};

export function viteBuildInfo(): Plugin {
    let config: { command: string };
    let startTime: any;
    let endTime: any;
    return {
        name: "vite:buildInfo",
        configResolved(resolvedConfig: { command: string }) {
            config = resolvedConfig;
        },
        buildStart() {
            console.log(green(`👏start`));
            if (config.command === "build") {
                startTime = new Date();
            }
        },
        closeBundle() {
            if (config.command === "build") {
                endTime = new Date();
                recursiveDirectory(staticPath, () => {
                    console.log(
                        green(
                            `恭喜打包完成🎉（总用时${endTime - startTime})
                                    .format("mm分ss秒")}，打包后的大小为${fileListTotal}）`
                        )
                    );
                });
            }
        }
    };
}
