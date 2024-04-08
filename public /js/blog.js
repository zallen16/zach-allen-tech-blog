const newCommentFormHandler = async (event) => {
    event.preventDefault();
    console.log('newCommentFormHandler');
    const comment = document.querySelector('#comment').value.trim();
    const blog_id = document.querySelector('.btn-create').value;

    if (comment) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({ comment, blog_id }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.reload();
        } else {
            alert(response.statusText);
        }
    }
};

document 
    .querySelector('.new-comment-form')
    .addEventListener('submit', newCommentFormHandler);