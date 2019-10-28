const shell = require('shelljs');
const { inc, valid, prerelease } = require('semver');
const chalk = require('chalk');
const versiony = require('versiony');
const packageJson = require('../package.json');
const prompts = require('prompts');
const branchName = require('current-git-branch');
shell.set('-e');

(async () => {
  const { version } = packageJson;

  console.log(chalk.magenta('Love the smell of a fresh JSUI release. \n'));

  const newVersions = [
    inc(version, 'prerelease', 'alpha'),
    inc(version, 'prerelease', 'beta'),
    inc(version, 'patch'),
    inc(version, 'preminor', 'alpha'),
    inc(version, 'preminor', 'beta'),
    inc(version, 'premajor', 'alpha'),
    inc(version, 'premajor', 'beta'),
    version,
  ];

  // Check if remote history is clean
  const { stdout: history } = shell.exec(
    'git rev-list --count --left-only @{u}..HEAD',
    {
      silent: true,
    }
  );

  if (history && history.trim() !== '0') {
    console.log(
      chalk.red("You have some changes on remote that you haven't pulled.\n")
    );
    process.exit(1);
  }

  // Check if working tree is clean
  const { stdout: status } = shell.exec('git status --porcelain', {
    silent: true,
  });

  if (status !== '') {
    console.log(
      chalk.red(
        "Whatcha got there? Uncommited changes? We don't do that here.\n "
      )
    );
    process.exit(1);
  }

  const versionSuggestor = (input, choices) => {
    const suggestions = choices.filter(
      i => i.title.slice(0, input.length) === input
    );
    if (input !== '' && !suggestions.includes(input)) {
      suggestions.splice(0, 0, input);
    }
    return Promise.resolve(suggestions);
  };

  const response = await prompts({
    type: 'autocomplete',
    name: 'version',
    message:
      "What version do you want to release? (You can type your own if you don't like my suggestions.)",
    suggest: versionSuggestor,
    choices: newVersions.map(v => ({
      title: v,
    })),
  });
  const newVersion = response.version;
  const currentBranch = branchName();
  if (!valid(newVersion)) {
    console.log(chalk.red('Invalid version mate. Try again'));
    process.exit(1);
  }
  if (prerelease(newVersion)) {
    if (currentBranch !== 'development') {
      console.log(
        chalk.red(
          'Alpha and beta releases are only allowed on development branch.'
        )
      );
      process.exit(1);
    }
  } else if (currentBranch !== 'master') {
    console.log(
      chalk.red(
        'Sorry, rules are rules. You need to merge development into master and release from master.'
      )
    );
    process.exit(1);
  }

  if (newVersion !== version) {
    console.log(chalk.blue('Bumping version in package.json and commiting.'));
    versiony.version(newVersion).to('./package.json');
    shell.exec(`git add package.json`);
    shell.exec(`git commit -m 'Bump: ${newVersion}'`);
    shell.exec(`git push origin ${currentBranch}`);
    console.log(chalk.green('Commited new version succesfully.\n'));
  }
  console.log(
    chalk.blue('Starting a new build. This may take a while. Coffee?')
  );

  console.log(chalk.cyan('\nCleaning stale files...'));
  shell.exec('yarn clean');

  console.log(chalk.cyan('\nInstalling dependencies...'));
  shell.exec('yarn');

  console.log(chalk.cyan('\nCompiling react code...'));
  shell.exec('yarn react:build');

  console.log(chalk.cyan('\nCompiling electron code...'));
  shell.exec('yarn electron:bundle');

  console.log(chalk.cyan('\nBundling your app...'));
  shell.exec(
    'yarn env-cmd -f ./.env.dev electron-builder --win --mac --linux --publish=always'
  );

  console.log(chalk.cyan('\nTagging the release...'));
  shell.exec(`git tag v${newVersion}`);
  shell.exec(`git push origin v${newVersion}`);

  console.log(chalk.blue(`\n ${newVersion} released succesfully 🎉`));
})();
