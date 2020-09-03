async function addCommentsFormHandler (event) {
    event.preventDefault();

    const comments_text = document.querySelector('textarea[name=comments-body').value.trim();
    const posts_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    if (comments_text) {
        const response = await fetch ('/api/comments', {
            method: 'POST',
            body: JSON.stringify({
                posts_id,
                comments_text
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            document.location.reload();
        } else {
            alert('Comment field cannot be empty', response.statusText);
        }
    }
};

document.querySelector('.comments-form').addEventListener('submit', addCommentsFormHandler);