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
            console.log(green(`ðstart`));
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
                            `æ­åæåå®æðï¼æ»ç¨æ¶${endTime - startTime})
                                    .format("mmåssç§")}ï¼æååçå¤§å°ä¸º${fileListTotal}ï¼`
                        )
                    );
                });
            }
        }
    };
}
