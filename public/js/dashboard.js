const newFormHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#blog-name').value.trim();
    const funding = document.querySelector('#blog-funding').value.trim();
    const text = document.querySelector('#blog-desc').value.trim();
    
    console.log('title', title);
    console.log('funding', funding);
    // console.log('post', post);

    if (title && funding && text) {
        const response = await fetch(`/api/blogs`, {
            method: 'POST',
            body: JSON.stringify({ title: title, funding: funding, text: text }),
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else { 
            alert('Failed to create blog');
        }
    }
};

const deleteButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');

        const response = await fetch(`/api/blogs/${id}`, {
            method: 'GET',
        });

        const blog = await response.json();

        if (response.ok) {
            document.location.replace('/edit/' + blog.id);
        } else {
            alert('Failed to find blog');
        }
    }
};

const editButtonhandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');

        const response = await fetch(`/api/blogs/${id}`, {
            method: 'GET',
        });

        const blog = await response.json();

        if (response.ok) {
            document.location.replace('/edit/' + blog.id);
        } else {
            alert('Failed to find blog');
        }
    }
};

document
    .querySelector('.new-blog-form')
    .addEventListener('submit', newFormHandler);

    if (document.querySelector('.btn-delete') != null) {
        document
            .querySelector('.btn-delete')
            .addEventListener('click', deleteButtonHandler);
    }

    if (document.querySelector('.btn-edit') != null) {
        document
            .querySelector('.btn-edit')
            .addEventListener('click', editButtonHandler);
    }