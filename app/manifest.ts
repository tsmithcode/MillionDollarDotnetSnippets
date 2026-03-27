import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Million Dollar Dot Net Snippets",
    short_name: "MDS",
    description:
      "Premium .NET consultant acceleration framework with guided onboarding, proof, and leadership review.",
    start_url: "/",
    display: "standalone",
    background_color: "#101112",
    theme_color: "#dfa15b",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml"
      }
    ]
  };
}
