export const sendGetRequest = (route, callback) => {
    fetch(`http://localhost:3000${route}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: "include",
    }).then(response => response.json())
    .then(data => {callback(data)})
}