import type { GatsbyConfig } from "gatsby"

const config: GatsbyConfig = {
  siteMetadata: {
    title: `Hummingbird React + Gatsby`,
    siteUrl: `https://www.yourdomain.tld`,
  },
  jsxRuntime: "automatic",
  plugins: ["gatsby-plugin-postcss"],
}

export default config
