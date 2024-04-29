export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "Everthorn",
  description: "The hub for all that is Everthorn",
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Guidelines",
      href: "/guidelines",
    },
    {
      title: "Projects",
      href: "/wiki/projects",
    },
    {
      title: "Map",
      href: "/wiki/map",
    },
    {
      title: "Wiki",
      href: "/wiki",
    },
    {
      title: "News",
      href: "/news",
    },
  ],
  links: {
    youtube: "https://www.youtube.com/@everthornMC",
    patreon:
      "https://patreon.com/Everthorn?utm_medium=unknown&utm_source=join_link&utm_campaign=creatorshare_creator&utm_content=copyLink",
  },
  latestupdate: {
    text: "",
    link: "https://www.youtube.com/watch?v=f55FHCfWdwo&pp=ygUJZXZlcnRob3Ju",
    external: true,
  },
}
