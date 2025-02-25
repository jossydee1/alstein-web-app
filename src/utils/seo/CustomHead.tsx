import Head from "next/head";
import site from "@/site.metadata";

interface CustomHeadProps {
  title?: string;
  description?: string;
  url?: string;
  imageUrl?: string;
  imageAlt?: string;
  canonicalUrl?: string;
  noIndex?: boolean;
  keywords?: string;
  type?: string;
  author?: string;
}

const isProduction =
  process.env.NEXT_PUBLIC_NODE_ENV === "production" ||
  process.env.NODE_ENV === "production";

const CustomHead = (props: CustomHeadProps) => {
  const title = props.title || site.title || "Default Title";
  const description =
    props.description || site.description || "Default Description";
  const url = props.url || site.url || "";
  const type = props.type || site.type || "website";
  const author = props.author || site.author || "Site Author";
  const keywords = props.keywords || site.keywords || "";
  const imageUrl = props.imageUrl || site.cover_image || "/favicon.ico";
  const imageAlt = props.imageAlt || site.cover_image_alt || title;
  const twitter = site.twitter || "";

  return (
    <Head>
      {/* language */}
      <meta httpEquiv="Content-Language" content="en" />

      {/* favicon */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest" />

      {/* determine if the page should be indexed */}
      <meta
        name="robots"
        content={
          isProduction && !props.noIndex ? "index, follow" : "noindex, nofollow"
        }
      />

      {/* Title */}
      <title>{title}</title>

      {/* SEO Meta Tags */}
      {/* Primary Meta Tags */}
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="type" content={type} />
      {type === "article" && <meta name="author" content={author} />}

      {/* Open Graph / Facebook Meta Tags */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:alt" content={imageAlt} />

      {/* Twitter Meta Tags */}
      <meta
        name="twitter:card"
        content={imageUrl ? "summary_large_image" : "summary"}
      />
      <meta name="twitter:site" content={twitter} />
      <meta name="twitter:creator" content={twitter} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta property="twitter:image" content={imageUrl} />
      <meta property="twitter:image:alt" content={imageAlt} />

      {/* canonical url */}
      {props.canonicalUrl && <link rel="canonical" href={props.canonicalUrl} />}
    </Head>
  );
};

export default CustomHead;
