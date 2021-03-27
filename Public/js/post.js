const newFormHandler = async (event) => {
    event.preventDefault();
  
    const name = document.querySelector('#post-Title').value.trim();
    const description = document.querySelector('#post-description').value.trim();
  
    if (name && description) {
      const response = await fetch(`/api/post`, {
        method: 'POST',
        body: JSON.stringify({ name, description }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to create post');
      }
    }
  };

  document
  .querySelector('.new-post-form')
  .addEventListener('submit', newFormHandler);