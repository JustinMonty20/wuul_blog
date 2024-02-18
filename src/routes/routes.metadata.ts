import type { NavMetadata, BlogRoutes } from "../types";

export const routes: NavMetadata[] = [{to: "/", txt: "About"}, {to: "/blog", txt: "Blog"}, {to: "/showcase", txt: "Showcase"}, {to: "/vouches", txt: "Vouches"}];

export const blogRoutes: BlogRoutes = {
    base: [{to: "/", txt: "About"}, {to: "/blog", txt: "Blog"}, {to: "/showcase", txt: "Showcase"}, {to: "/vouches", txt: "Vouches"}],
    alterBaseRouteDepth: function (level: string) {
        return this.base.map((r) => ({
            to: `${level}` + r.to,
            txt: r.txt
        }))
    } 
}
