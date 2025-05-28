import { categories } from '../models/category.js';

export async function createPost(data) {
  if (!categories.includes(data.category)) {
    // TODO: handle no valid option (client injection)
    return;
  }
  const res = await fetch('/api/create-post', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  const result = await res.json();
  if (result.code !== 200) {
    // TODO: handle error
    // display a error msg
    return;
  }
}

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
