import type { NavMetadata } from "../types";

export const routes: NavMetadata[] = [{to: "/", txt: "About"}, {to: "blogs", txt: "Blogs"}, {to: "showcase", txt: "Showcase"}, {to: "vouches", txt: "Vouches"}];
export const subRoutes:NavMetadata[] = [{to: "../", txt: "About" }, {to: "../blogs", "txt": "Blogs"}, {to: "../showcase", txt: "Showcase"}, {to: "../vouches", txt: "Vouches"}]