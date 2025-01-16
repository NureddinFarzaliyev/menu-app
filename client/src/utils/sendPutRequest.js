export const sendPutRequest = (route, body, callback) => {
    fetch(`http://localhost:3000${route}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body),
        credentials: "include",
    }).then(response => response.json())
    .then(data => {callback(data)})
}