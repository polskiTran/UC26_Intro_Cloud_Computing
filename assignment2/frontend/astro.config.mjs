// @ts-check

import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

import react from "@astrojs/react";
import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
    output: "server",
    adapter: node({ mode: "standalone" }),
    vite: {
        plugins: [tailwindcss()],
        resolve: {
            alias: [{ find: "@", replacement: "/src" }],
        },
        server: {
            host: "0.0.0.0",
            // https: true, // Enable HTTPS with self
            hmr: {
                // host: [
                //     "3.144.215.198",
                //     "ec2-3-144-215-198.us-east-2.compute.amazonaws.com",
                // ],
                host: "3.142.235.1",
            },
        },
    },

    integrations: [react()],
});
