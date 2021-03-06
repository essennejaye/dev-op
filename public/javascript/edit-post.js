async function editFormHandler(event) {
    event.preventDefault();

    const title = document.querySelector('input[name="post-title"]').value.trim();
    const posts_text = document.querySelector('textarea[name="post-text"]').value.trim();

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
    if (title && posts_text) {
        const response = await fetch (`/api/posts/${id}`,{
            method: 'PUT',
            body: JSON.stringify({
                title,
                posts_text
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            document.location.replace('/dashboard/');
        } else {
            alert('You must fill in title and provide some content', response.statusText);
        }
    }
};

document.querySelector('.edit-post-form').addEventListener('submit', editFormHandler);