const newFormHandler = async (event) => {
  event.preventDefault();
  var commentBtn = document.getElementById("commentBtn");
  var commentBox = document.getElementById("comment");

  commentBox.classList.remove("hide");
  commentBtn.classList.add("hide");
  console.log('commentBtn pressed');
};

document
.querySelector('.commentBtn')
.addEventListener('click', newFormHandler);

/////////////////////////////////////////////////////////

const newFormHandlerSave = async (event) => {
  event.preventDefault();
  console.log('saveBtn pressed');

  const comment = document.querySelector('#commentID').value.trim();
  const id = event.target.getAttribute('data-id');

  if (comment && id ) {
    const response = await fetch('/api/comments', {
      method: 'POST',
      body: JSON.stringify({ comment, post_id: id }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      res.render('/dashboard');

    } else {
      alert('Failed to save comment');
    }
  }
};

document
.querySelector('.saveCommentBtn')
.addEventListener('click', newFormHandlerSave);