/*
  Script to check if dependencies are all pinned. 

  Script should run before committing and in the CI pipeline.
*/

import jsonLock from '../package-lock.json' with { type: 'json' };
import json from '../package.json' with { type: 'json' };

type InstalledCheckType = {
  dependency: string;
  packageVersion: string;
  packageLockVersion: string;
};

class Validator {
  private readonly fgRed = '\x1b[31m';
  private readonly fgGreen = '\x1b[32m';
  private readonly fgYellow = '\x1b[33m';
  private readonly reset = '\x1b[0m';

  private readonly prefixes = ['^', '~'];

  private readonly badDependencies: string[] = [];
  private readonly notInstalledDeps: InstalledCheckType[] = [];
  private readonly notInstalledDevDeps: InstalledCheckType[] = [];

  validate() {
    console.log();
    console.log('Checking if all dependencies are pinned');

    this.checkPrefix('dependencies');
    this.checkPrefix('devDependencies');

    this.checkOverridePrefix();

    console.log('Checking if all dependencies are installed');

    this.checkInstalled('dependencies');
    this.checkInstalled('devDependencies');

    if (this.badDependencies.length !== 0) {
      console.error('Error: non pinned dependencies:');
      this.badDependencies.forEach(error => console.error(error));
      process.exit(1);
    }

    if (
      this.notInstalledDeps.length !== 0 ||
      this.notInstalledDevDeps.length !== 0
    ) {
      this.notInstalledDeps.forEach(
        ({ dependency, packageVersion, packageLockVersion }) =>
          console.log(
            `${dependency}: installed: ${this.fgRed}${packageVersion}${this.reset}, expected: ${this.fgGreen}${packageLockVersion}${this.reset}`
          )
      );
      this.notInstalledDevDeps.forEach(
        ({ dependency, packageVersion, packageLockVersion }) =>
          console.log(
            `${dependency}: installed: ${this.fgRed}${packageVersion}${this.reset}, expected: ${this.fgGreen}${packageLockVersion}${this.reset}`
          )
      );
      console.log(
        `Invoke ${this.fgGreen} npm install ${this.reset} to install missing packages`
      );
      console.log();
      process.exit(1);
    }

    console.log(`Check complete: ${this.fgGreen}no errors${this.reset}`);
    console.log();
    process.exit(0); // Everything was ok!
  }

  private checkInstalled(type: 'dependencies' | 'devDependencies') {
    // Find all dependencies that have a different version in the pack-lock.json compared to the package.json
    const mismatches = Object.entries(jsonLock.packages[''][type])
      .filter(([k, v]) => (json[type] as Record<string, string>)[k] !== v)
      .map(([k, v]) => ({
        dependency: k,
        packageVersion: v,
        packageLockVersion: (json[type] as Record<string, string>)[k]
      }));

    if (mismatches.length !== 0) {
      if (type === 'dependencies') {
        this.notInstalledDeps.push(...mismatches);
      } else {
        this.notInstalledDevDeps.push(...mismatches);
      }
    }
  }

  private checkPrefix(type: 'dependencies' | 'devDependencies') {
    Object.entries(json[type]).forEach(([key, value]) => {
      this.prefixes.forEach(prefix => {
        if (value.startsWith(prefix)) {
          this.badDependencies.push(
            ` dependency ${this.fgYellow}${key}${this.reset} is not locked remove ${prefix}`
          );
        }
      });
    });
  }

  private checkOverridePrefix() {
    Object.entries(json.overrides).forEach(([key, value]) => {
      Object.entries(value).forEach(([subKey, subValue]) => {
        this.prefixes.forEach(prefix => {
          if (subValue.startsWith(prefix)) {
            this.badDependencies.push(
              ` Override dependency ${this.fgYellow}${subKey}${this.reset} of dependency ${this.fgYellow}$${key}${this.reset} is not locked remove ${prefix}`
            );
          }
        });
      });
    });
  }
}

new Validator().validate();
