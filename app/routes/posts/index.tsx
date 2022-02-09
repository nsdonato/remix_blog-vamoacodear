import { Link, useLoaderData } from "remix";
import { getPosts } from "~/post";
import type { Post } from "~/post";

// Recordar: el componente ya es su propia ruta de API
export const loader = async () => {
  return getPosts();
};

// Componente
export default function Posts() {
  const posts = useLoaderData<Post[]>();
  console.log(posts);
  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link to={post.slug}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
