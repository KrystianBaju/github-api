function BuildUrl(owner, repository) {
    this.owner = owner;
    this.repository = repository;
}

const HttpCodes = {
    success: 200,
    notFound: 404
};

BuildUrl.prototype.getUrl = function () {
    const slash = "/";
    const url = "https://api.github.com/repos";
    return url + slash + this.owner + slash + this.repository;
};

let owner = document.getElementById("owner").value;
let repository = document.getElementById("repository").value;
let url = new BuildUrl(owner, repository);

function connect() {
    fetch(url.getUrl())
        .then(resp => {
            if (resp.status === HttpCodes.success) {
                return resp.json();
            } else {
                return Promise.reject(resp);
            }
        })
        .then(data => {
            document.getElementById("stars").innerHTML = data.watchers;
        })
        .catch(error => {
            if (error.status === HttpCodes.notFound) {
                let notFound = "The server can not find requested resource";
                document.getElementById("stars").innerHTML = notFound + error.status;
            }
        });
}




