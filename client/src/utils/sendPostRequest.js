export const sendPostRequest = (route, body, callback) => {
    fetch(`http://localhost:3000${route}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body),
        credentials: "include",
    }).then(response => response.json())
    .then(data => {callback(data)})
}