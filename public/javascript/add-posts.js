async function newPostFormHandler(event) {
    event.preventDefault();

    const title = document.querySelector('input[name="posts-title"]').value.trim();
    const posts_text = document.querySelector('textarea[name="posts-text"]').value.trim();

    const response = await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({
            title,
            posts_text
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
}
document.querySelector('.new-post-form').addEventListener('submit', newPostFormHandler);