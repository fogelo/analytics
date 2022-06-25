import {createRouter, createWebHistory} from "vue-router";
import AuthPage from "@/pages/AuthPage";
import AnalyticsPage from "@/pages/AnalyticsPage";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/analytics",
            name: "analytics",
            component: AnalyticsPage,
            alias: "/"
        },
        {
            path: "/auth",
            name: "auth",
            component: AuthPage,
        },
    ]
})

export default router