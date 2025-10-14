import axios from 'axios';
import { exec } from 'child_process';
import { formatDistanceToNow } from 'date-fns';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import packageJson from '../package.json' with { type: 'json' };

// eslint-disable-next-line @typescript-eslint/naming-convention
const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
// eslint-disable-next-line @typescript-eslint/naming-convention
const __dirname = path.dirname(__filename); // get the name of the directory
const fileName = 'diff.json';

// Via api
function latestVersionApi(packageName: string) {
  return axios
    .get(`https://registry.npmjs.org/${packageName}/latest`)
    .then(res => res.data.version);
}

// Via NPM command
function latestVersionCmd(packageName: string): Promise<string> {
  return new Promise((resolve, reject) =>
    exec(`npm view ${packageName} version --json`, (error, stdout, stderr) => {
      if (error) {
        reject(new Error(stderr));
        return;
      }

      resolve(JSON.parse(stdout));
    })
  );
}

function check(
  packageName: string,
  version: string
): Promise<{
  packageName: string;
  versionReleaseDate: string;
  currentBetweenNow: string;
  latestBetweenNow: string;
  currentVersion: string;
  latest: string;
}> {
  return new Promise(async (resolve, reject) => {
    const latest = await latestVersionApi(packageName);
    exec(`npm show ${packageName} time --json`, (error, stdout, stderr) => {
      if (error) {
        reject(new Error(stderr));
        return;
      }

      // The NPM output (JSON string) is in 'stdout'
      const npmData = JSON.parse(stdout);

      resolve({
        packageName,
        versionReleaseDate: npmData[version],
        currentBetweenNow: formatDistanceToNow(new Date(npmData[version])),
        latestBetweenNow: formatDistanceToNow(new Date(npmData[latest])),
        currentVersion: version,
        latest
      });
    });
  });
}

const sortedKeys = Object.keys(packageJson.dependencies).toSorted();

(async () => {
  const results = await Promise.all(
    sortedKeys.map(key =>
      check(key, (packageJson.dependencies as Record<string, string>)[key])
    )
  );
  const filtered = results.filter(v => v.currentVersion !== v.latest);

  // Output to log
  filtered.forEach(result =>
    console.log(
      result.packageName,
      result.currentVersion,
      result.latest,
      result.latestBetweenNow
    )
  );

  // Write to file
  fs.writeFile(`${__dirname}/${fileName}`, JSON.stringify(filtered, null, 2), err => {
    if (err) throw err;
    console.log(`\nData written to: ${__dirname}/${fileName}`);
  });
})();
