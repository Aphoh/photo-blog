
var wpAuth
if (process.env.WP_AUTH_PASS) {
  wpAuth = {
    htaccess: {
      username: process.env.WP_AUTH_USER,
      password: process.env.WP_AUTH_PASS
    }
  }
}

/** @type {import('gatsby').GatsbyConfig} */
module.exports = {
  siteMetadata: {
    title: ``,
    siteUrl: `https://photo.aphoh.us`
  },
  plugins: [{
    resolve: 'gatsby-source-wordpress',
    options: {
      "url": "https://photo.aphoh.us/graphql",
      auth: wpAuth
    }
  },
    "gatsby-plugin-sass",
    "gatsby-plugin-image",
    "gatsby-plugin-sitemap",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
  {
    resolve: 'gatsby-source-filesystem',
    options: {
      "name": "images",
      "path": "./src/images/"
    },
    __key: "images"
  }]
};
