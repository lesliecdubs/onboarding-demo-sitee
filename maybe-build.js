const fs = require('fs');
const toml = require('toml');
const execa = require('execa');

const tomlFile = fs.readFileSync(`${__dirname}/netlify.toml`, 'utf8');
const netlifyConfig = toml.parse(tomlFile);
const requiredEnvVars = Object.keys(netlifyConfig.template.environment);

// if we’re missing the required env vars, we need to
// no-op to avoid a failed build and show the install
// helper page.
if (!requiredEnvVars.every((envVar) => process.env.hasOwnProperty(envVar))) {
  console.log('skipping the build due to missing env vars');
  return;
}

// if we get here, build the site
execa('npm', ['run', 'build']).stdout.pipe(process.stdout);
