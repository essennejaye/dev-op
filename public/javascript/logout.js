async function logout() {
    const response = await fetch('api/user/logout', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' }
    });
    if (response.ok) {
        document.location.replace('/');
    } else {
        alert('You are not logged in!', response.statusText);
    }
}
document.querySelector('#logout').addEventListener('click', logout);