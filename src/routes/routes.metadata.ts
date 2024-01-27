import type { NavMetadata } from "../types";
// TODO: improve this.
export const routes: NavMetadata[] = [{to: "/", txt: "About"}, {to: "/blogs", txt: "Blogs"}, {to: "/showcase", txt: "Showcase"}, {to: "/vouches", txt: "Vouches"}];
export const subRoutes:NavMetadata[] = [{to: "../", txt: "About" }, {to: "../blogs", "txt": "Blogs"}, {to: "../showcase", txt: "Showcase"}, {to: "../vouches", txt: "Vouches"}]
export const deepNestedRoutes:NavMetadata[] = [{to: "../../", txt: "About" }, {to: "../../blogs", "txt": "Blogs"}, {to: "../../../showcase", txt: "Showcase"}, {to: "../../vouches", txt: "Vouches"}]