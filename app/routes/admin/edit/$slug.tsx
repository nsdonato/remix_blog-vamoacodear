import {
  ActionFunction,
  Form,
  redirect,
  useActionData,
  useLoaderData,
  useTransition,
} from "remix";
import type { LoaderFunction } from "remix";
import { createPost, getPostToEdit, Post } from "~/post";
import invariant from "tiny-invariant";

// api del componente
export const loader: LoaderFunction = async ({ params }) => {
  console.log("slug", params.slug);
  invariant(params.slug, "expected params.slug");
  return getPostToEdit(params.slug);
};

type PostError = {
  title?: boolean;
  slug?: boolean;
  markdown?: boolean;
};

export const action: ActionFunction = async ({ request }) => {
  await new Promise((res) => setTimeout(res, 1000));
  const formData = await request.formData();

  const title = formData.get("title");
  const slug = formData.get("slug");
  const markdown = formData.get("markdown");

  const errors: PostError = {};
  if (!title) errors.title = true;
  if (!slug) errors.slug = true;
  if (!markdown) errors.markdown = true;

  if (Object.keys(errors).length) {
    return errors;
  }

  invariant(typeof title === "string");
  invariant(typeof slug === "string");
  invariant(typeof markdown === "string");
  await createPost({ title, slug, markdown });

  return redirect("/admin");
};

// componente
export default function EditPost() {
  const post = useLoaderData<Post>();
  const errors = useActionData();
  const transition = useTransition();

  return (
    <Form method="post">
      <p>
        <label>
          Post Title: {errors?.title ? <em>Title is required</em> : null}
          <input type="text" name="title" value={post.title} />
        </label>
      </p>
      <p>
        <label>
          Post Slug: {errors?.slug ? <em>Slug is required</em> : null}
          <input type="text" name="slug" value={post.slug} />
        </label>
      </p>
      <p>
        <label htmlFor="markdown">Markdown:</label>{" "}
        {errors?.markdown ? <em>Markdown is required</em> : null}
        <br />
        <textarea id="markdown" rows={20} name="markdown">
          {post.body}
        </textarea>
      </p>
      <p>
        <button type="submit">
          {transition.submission ? "Editando..." : "Editar Post"}
        </button>
      </p>
    </Form>
  );
}
