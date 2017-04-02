const path = location.pathname;
const fetchOption = {};

const headers = new Headers();
headers.append('Content-Type', 'text/plain');
headers.append('X-Custom-Header', 'custom-header');
fetchOption['headers'] = headers;

if (path.indexOf(/cros-with-credentials/) > -1) {
    fetchOption['credentials'] = 'include';
}

fetch('https://127.0.0.1:3000' + path, fetchOption)
.then(res => {
    const elem = document.querySelector('.response');
    elem.innerHTML = "statusCode: " + res.status + "<br>statusText: " + res.statusText + "<br>cookie: " + document.cookie;
})
.catch(error => {
    const elem = document.querySelector('.response');
    elem.innerHTML = JSON.stringify(error);
});
