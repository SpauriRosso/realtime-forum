export async function getPosts() {
  const res = await fetch('/api/posts', { method: 'POST' });
  const result = await res.json();
  if (result.code !== 200) {
    // to do
    // display a error msg
    return null;
  }
  return result.data.posts;
}
