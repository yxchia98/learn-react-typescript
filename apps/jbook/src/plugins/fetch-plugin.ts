import localforage from "localforage";
import axios from "axios";
import * as esbuild from "esbuild-wasm";

const fileCache = localforage.createInstance({
    name: "filecache",
});

export const fetchPlugin = (inputCode: string) => {
    return {
        name: "fetch-plugin",
        setup(build: esbuild.PluginBuild) {
            // handles index.js files
            build.onLoad({ filter: /(^index\.js$)/ }, () => {
                return {
                    loader: "jsx",
                    contents: inputCode,
                };
            });

            // functio that returns when something is in cache, else esbuilds goes into other functions
            build.onLoad({ filter: /.*/ }, async (args: any) => {
                // check to see if we have already fetched this file
                // and if it is in the cache
                // if it is, return it immediately
                const cachedResult =
                    await fileCache.getItem<esbuild.OnLoadResult>(args.path);
                if (cachedResult) {
                    console.log("already in cache!");
                    return cachedResult;
                }
            });

            // handles .css files
            build.onLoad({ filter: /.css$/ }, async (args: any) => {
                const { data, request } = await axios.get(args.path);

                const escaped = data
                    .replace(/\n/g, "")
                    .replace(/"/g, '\\"')
                    .replace(/'/g, "\\'");

                const contents = `
                const style = document.createElement('style');
                style.innerText = '${escaped}}';
                document.head.appendChild(style);
                `;
                const result: esbuild.OnLoadResult = {
                    loader: "jsx",
                    contents: contents,
                    resolveDir: new URL("./", request.responseURL).pathname,
                };

                await fileCache.setItem(args.path, result);
                return result;
            });

            // for clean jsx files
            build.onLoad({ filter: /.*/ }, async (args: any) => {
                const { data, request } = await axios.get(args.path);

                const contents = data;
                const result: esbuild.OnLoadResult = {
                    loader: "jsx",
                    contents: contents,
                    resolveDir: new URL("./", request.responseURL).pathname,
                };

                await fileCache.setItem(args.path, result);
                return result;
            });
        },
    };
};
