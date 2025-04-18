import { docsSource } from "@/app/sources/docs";
import { notFound } from "next/navigation";
import { DocsPage } from "@/app/components/docs-page";
import { mdxComponents } from "@/app/mdx-components";
import { getMdxMetadata } from "@/app/metadata";
import { APIMethod } from "@/app/components/api-method";

const rpcMDXComponents = {
  APIMethod,
};

export async function RpcDocsPage({
  slug,
  locale,
}: {
  slug: string[];
  locale: string;
}) {
  const page = docsSource.getPage(slug, locale);
  if (!page) notFound();
  const { body: MDX, toc } = await page.data.load();

  return (
    <DocsPage
      toc={toc}
      full={page.data.full}
      title={page.data.h1 || page.data.title}
      filePath={page.file.path}
      hideTableOfContents={page.data.hideTableOfContents}
      pageTree={docsSource.pageTree[locale]}
      href={page.url}
    >
      <MDX components={{ ...mdxComponents, ...rpcMDXComponents }} />
    </DocsPage>
  );
}

export function getMetadataFromSlug(slug: string[], locale: string) {
  const page = docsSource.getPage(slug, locale);
  if (!page) notFound();
  return getMdxMetadata(page);
}
