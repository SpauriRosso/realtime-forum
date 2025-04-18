export async function getPosts(category) {
  const res = await fetch(!category ? '/api/posts' : `/api/posts?category=${category}`, { method: 'POST' });
  const result = await res.json();
  if (result.code !== 200) {
    // to do
    // display a error msg
    return;
  }
  return result.data.posts;
}
