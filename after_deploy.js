var request = require('request');
function setStatus (state, targetUrl, description, context) {
    request.post({
        url:  'https://api.github.com/repos/' + process.env.TRAVIS_REPO_SLUG +
              '/statuses/' + process.env.TRAVIS_COMMIT,
        json: true,
        headers : {
            'Authorization' : 'token ' + process.env.GITHUB_TOKEN,
            'User-Agent' : 'Platform-Pattern-Library'
        },
        body : {
            state : state,
            target_url : targetUrl,
            description : description,
            context : context
        }
    }, function (error, response, body) {
        if (error) {
            return console.error(error);
        }
    });
}

setStatus('success', process.env.DEPLOY_URL, 'Deployed to S3', 'continuous-integration/s3-deploy');
