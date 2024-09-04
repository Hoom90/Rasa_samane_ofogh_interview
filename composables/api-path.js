export default {
  getAllPosts: "/posts",
  addPost: "/posts/",
  putPost: (id) => "/posts/1",
  // putPost: (id) `/posts/${id}`,
  deletePost: (id) => "/posts/1",
  // deletePost: (id) => `/posts/${id}`,
  getAllCommentsByPostId: (id) => "/comments?postId=1",
  // getAllCommentsByPostId: (id) => `/comments?postId=${id}`,
};
