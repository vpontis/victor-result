import Head from "next/head";
import React from "react";

export const SocialHead = ({
  title,
  description,
  imageUrl,
  imageSize,
  faviconUrl,
  children,
  twitterCardType = "summary",
}: React.PropsWithChildren<{
  title: string;
  description: string;
  imageUrl: string;
  imageSize: { height: number; width: number };
  faviconUrl?: string;
  twitterCardType?: "summary_large_image" | "summary";
}>) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description || ""} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description || ""} />
      <meta property="og:type" content="article" />

      <meta name="twitter:card" content={twitterCardType} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />

      {imageSize && (
        <>
          <meta
            property="og:image:width"
            content={imageSize.width.toString()}
          />
          <meta
            property="og:image:height"
            content={imageSize.height.toString()}
          />
        </>
      )}

      {imageUrl ? (
        <>
          <meta property="og:image" content={imageUrl} />
          <meta name="twitter:image" content={imageUrl} />
        </>
      ) : null}

      {faviconUrl && (
        <link key="favicon" rel="shortcut icon" href={faviconUrl} />
      )}

      {children}
    </Head>
  );
};
