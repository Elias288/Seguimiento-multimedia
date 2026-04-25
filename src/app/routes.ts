import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  index("routes/loadFile.tsx"),

  layout("./layout/layout.tsx", [
    route("home", "routes/home.tsx"),
    route("info", "routes/info.tsx"),
  ]),
] satisfies RouteConfig;
