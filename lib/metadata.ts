import type { Metadata } from "next";

const siteName = "Million Dollar Dot Net Snippets";
const siteUrl = "https://mds-mu-six.vercel.app";
const defaultDescription =
  "A premium .NET consultant acceleration framework with guided onboarding, auditable proof, and cross-browser release discipline.";

export function createMetadata({
  title,
  description = defaultDescription,
  path = "/"
}: {
  title: string;
  description?: string;
  path?: string;
}): Metadata {
  const pageTitle = title === siteName ? siteName : `${title} | ${siteName}`;
  const url = new URL(path, siteUrl).toString();

  return {
    title: pageTitle,
    description,
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: path
    },
    openGraph: {
      title: pageTitle,
      description,
      url,
      siteName,
      type: "website",
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: `${siteName} premium product preview`
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
      images: ["/opengraph-image"]
    }
  };
}

export const rootMetadata = createMetadata({
  title: siteName,
  description:
    "Guided framework onboarding for consultants, architects, and technical leads who need high-leverage .NET delivery building blocks."
});
