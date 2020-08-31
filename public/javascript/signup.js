async function signupFormHandler(event) {
    event.preventDefault();

    const username = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    if (username && password) {
        const response = await fetch('/api/user/', {
            method: 'post',
            body: JSON.stringify({
                username,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok) {
            console.log('success');
            // document.location.replace('/');
        } else {
            console.log('unsuccessful');
            alert('That username is already taken. Please enter a different username.', response.statusText);
        }
    }
}
document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);