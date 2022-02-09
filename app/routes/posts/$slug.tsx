import { useLoaderData } from "remix";
import type { LoaderFunction } from "remix";
import { getPost } from "~/post";
import invariant from "tiny-invariant";

// api del componente
export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.slug, "expected params.slug");
  return getPost(params.slug);
};

// componente
export default function PostSlug() {
  const post = useLoaderData();
  return <div dangerouslySetInnerHTML={{ __html: post.html }} />;
}
