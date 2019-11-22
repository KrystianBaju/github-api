function BuildUrl(owner, repository) {
    this.owner = owner;
    this.repository = repository;
}

BuildUrl.prototype.getUrl = function () {
    const slash = "/";
    const url = "https://api.github.com/repos";
    return url + slash + this.owner + slash + this.repository;
};

let owner = document.getElementById("owner").value;
let repository = document.getElementById("repository").value;
const button = document.querySelector("#button-post");
let url = new BuildUrl(owner, repository);

function gitHubApi(url) {
    return fetch(url.getUrl()).then(resp => resp.json())
        .catch(error => {
            let notFound = "The server can not find requested resource";
            document.getElementById("stars").innerHTML = notFound + error.status;
        })
}

button.addEventListener("click", function () {
    gitHubApi(url).then(response => document.getElementById("stars").innerHTML = response.watchers);
});