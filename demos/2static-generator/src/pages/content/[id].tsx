export async function getStaticPaths() {
  const res = await fetch("http://localhost:5000");
  const posts = await res.json();

  const paths = posts.map((post: { id: number; title: string; year: number }) => ({
    params: { id: post.id.toString() },
  }));

  return { paths, fallback: false };
}

//@ts-ignore
export async function getStaticProps({ params }) {
  const res = await fetch("http://localhost:5000");
  const posts = await res.json();
  //@ts-ignore
  const post = posts.find((post) => `${post.id}` === params.id);

  // Pass post data to the page via props
  return { props: { post } };
}

//@ts-ignore
export default function Page({ post }) {
  return <div>{post.title ?? null}</div>;
}
