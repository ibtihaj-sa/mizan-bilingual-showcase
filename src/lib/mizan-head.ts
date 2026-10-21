export const pageHead = (title: string, description: string) => () => ({
  meta: [
    { title: `${title} | ميزان MIZAN` },
    { name: "description", content: description },
    { property: "og:title", content: `${title} | ميزان MIZAN` },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ],
});
