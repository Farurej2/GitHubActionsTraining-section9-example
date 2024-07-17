const core = require('@actions/core');
const github = require('@actions/github'); // extra data like step name etc. Has only SOME data, not all from github
const exec = require('@actions/exec');

function run() {
    // 1) Get some input values
    const bucket = core.getInput('bucket', { require: true });
    const bucketRegion = core.getInput('bucket-region', { require: true });
    const distFolder = core.getInput('dist-folder', { require: true });

    // 2) Upload files
    const s3Uri = `s3://${bucket}`;
    exec.exec(`aws s3 sync ${distFolder} ${s3Uri} --region ${bucketRegion}`);

    const websiteUrl = `https://${bucket}.s3-website-${bucketRegion}.amazonaws.com`;
    core.setOutput('website-url', websiteUrl);
}

run();