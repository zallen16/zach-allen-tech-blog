const editFormHandler = async (event) => {
    event.preventDefault();

    const id = document.querySelector('.btn-update').value;
    const title = document.querySelector('#blog-title').value.trim();
    const funding = document.querySelector('#blog-funding').value.trim();
    const post = document.querySelector('#blog-post').value.trim();

    if (id && title && funding && post) {
        const response = await fetch(`/api/blogs/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ title, funding, post }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to update blog');
        }
    }
};

document
    .querySelector('.edit-blog-form')
    .addEventListener('submit', editFormHandler);