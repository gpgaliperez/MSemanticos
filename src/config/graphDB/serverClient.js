const {ServerClient, ServerClientConfig} = require('graphdb').server;
const {RDFMimeType} = require('graphdb').http;

const serverConfig = new ServerClientConfig('http://rdf4j-compliant-server/')
    .setTimeout(5000)
    .setHeaders({
        'Accept': RDFMimeType.SPARQL_RESULTS_JSON
    })
    .setKeepAlive(true);

const server = new ServerClient(serverConfig);
s
server.getRepositoryIDs().then(ids => {
    // work with ids
    console.log("Repository id " + ids)

}).catch(err => console.log(err));

server.hasRepository('TestTest').then(exists => {
    if (exists) {
        // repository exists -> delete it for example
        console.log("existe repositorio TestTest " + exists)
    }
}).catch(err => console.log(err));
