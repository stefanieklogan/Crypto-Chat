const displayCommentInput = async (event) => {
  event.preventDefault();

  const commentBtn = document.querySelector('#commentBtn');
  const commentDiv = document.querySelector('#commentDiv');

  commentBtn.classList.add('hide');
  commentDiv.classList.remove('hide');
};
document.querySelector('#commentBtn')
  .addEventListener('click', displayCommentInput);

const saveComment = async (event) => {
  event.preventDefault();

  const comment = document.querySelector('#commentText').value.trim();
  const id = event.target.getAttribute('data-id');

  if (comment && id) {
    const response = await fetch('/api/comments', {
      method: 'POST',
      body: JSON.stringify({
        comment, post_id: id
      }),
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (response.ok) {
      location.reload();
    } else {
      alert('Failed to save comment');
    }
  }
};
document.querySelector('#saveCommentBtn')
  .addEventListener('click', saveComment);