import type { GatsbySSR } from "gatsby"
import { ThemeModeScript } from "@hummingbirdui/react"

// Applies the saved theme before first paint to avoid a flash of the wrong theme.
export const onRenderBody: GatsbySSR["onRenderBody"] = ({
  setHeadComponents,
  setHtmlAttributes,
}) => {
  setHtmlAttributes({ lang: "en" })
  setHeadComponents([<ThemeModeScript key="theme-mode-script" />])
}
