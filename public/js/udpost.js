const updateButtonHandler = async (event) => {
  const id = event.target.getAttribute('data-id');
  const title = document.querySelector('#postTitle').value.trim();
  const content = document.querySelector('#postContent').value.trim();

  if (title && content && id) {
    const response = await fetch(`/api/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        title: title,
        content: content
      }),
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to update post');
    }
  }
};

document.querySelector('#update')
  .addEventListener('click', updateButtonHandler);

const delButtonHandler = async (event) => {
  const id = event.target.getAttribute('data-id');

  if (id) {
    const response = await fetch(`/api/posts/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to delete post');
    }
  }
};
document
  .querySelector('#delete')
  .addEventListener('click', delButtonHandler);