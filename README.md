### 🙋‍♂️ Made by [@thekitze](https://twitter.com/thekitze)  

### Other projects:
- 🏫 [React Academy](https://reactacademy.io) - Interactive React and GraphQL workshops
- 💌 [Twizzy](https://twizzy.app) - A standalone app for Twitter DM
- 💻 [Sizzy](https://sizzy.co) - A tool for testing responsive design on multiple devices at once

--- 

# JSUI

🛠 A tool for visually organizing, creating and managing JavaScript projects.  
It doesn't matter if it's a frontend or a backend app or what framework it's using. If it has a `package.json`, it belongs here.

## [⬇️ Download latest version](https://github.com/kitze/JSUI/releases/latest)

[💸 Support on Open Collective](https://opencollective.com/jsui)  
[🐦 Follow updates on Twitter](https://twitter.com/jsui_app)  

---

# Features

- Organize and group apps
- Generate new apps
- Search apps
- Quick actions
- Kill a port
- Project dashboard
- Search project files
- Run scripts
- Manage dependencies
- Apply plugins
- Generate new files

![JSUI](https://i.imgur.com/tDHfoRV.png)

## Organize

- Import existing projects
- Manage and organize projects in groups
- Collapse, rename or delete groups
- Mark a project with a red border if it's not using Git yet

## Quick actions

- Open the project in Finder
- Open the project in your editor of choice (configurable in Settings)
- Quick preview of package.json
- Open the GitHub/Bitbucket/GitLab page for the project
- Start the project
- Remove the project from the dashboard

## Search

- Easily search all of your projects by pressing `Cmd + Shift + P`
- Choosing a project will navigate to the project dashboard
- Expect more Alfred-like functionality soon

![](https://i.imgur.com/XwYX8EE.gif)

## Generate an app

- Generate a new app using a popular cli
- Supports React, Vue, Angular, Gatsby, React Native, Expo, etc.
- Configure advanced options for each generator

![generate project](https://i.imgur.com/mCIkz1t.gif)

## Kill a port

- For times when something annoying is running on a port and the process just can't be killed

![kill a port](https://i.imgur.com/OvrnaFU.gif)

---

## Project dashboard

![project dashboard](https://i.imgur.com/UPJOmcC.png)

### Files

> Note: This feature must be enabled from the Settings first

- Index and display a list of all of the folders and files in a project
- Click a file to quickly preview it
- Press `Cmd + Shift + N` to quickly navigate and preview a file

![files](https://i.imgur.com/yuyleHe.gif)

### Run scripts

- See a list of all the scripts and run them with a press of a button
- Run multiple scripts at once
- The scripts run in an integrated Terminal that supports multiple tabs so you can see the output, or you can minimize it if you don't care

![scripts](https://i.imgur.com/bdtrVK4.gif)

## Dependencies

- See two separate lists of the project dependencies and dev dependencies
- Easily install a dependency and specify a version
- Move a dependency to dev dependencies and vice-versa
- Update the version of a dependency to the latest version

![dependencies](https://i.imgur.com/LxQe2mf.gif)

## Plugins

- Plugins have the ability to install new dependencies, remove dependencies, modify scripts, remove and add new files to a project
- Right now the following plugins are available: - **Storybook**: Installs storybook and adds the needed files to the project - **Plop**: Adds the `plop` generator to the project. It also adds a default `plop-templates` folder, a `plopfile.js`. - **Add .env**: Adds an `.env` file to the project. Soon this file will be editable through UI. - **Rewire**: Installs `react-app-rewired` and adds a default `config-overrides.js` file

> Note: plugins will be separated from the repo soon so anyone can publish their own plugin

![plugins](https://i.imgur.com/83OaMMM.gif)

## Generate files

- Automatically detect a `plopfile.js` and quickly generate files from existing templates.
- If `plopfile.js` is not present or you are not familiar with [plop](https://github.com/amwmedia/plop) run the `Plop` plugin and it will generate the needed files for you

![](https://i.imgur.com/nJQsQwE.gif)

## Environment / Build Setup:

Do this if you want to run the latest code from `master` locally.  
Otherwise please download the [latest stable version here](https://github.com/kitze/JSUI/releases).

```
# clone repo
git clone https://github.com/kitze/JSUI.git

# install yarn (assuming you don't  have Yarn already installed)
npm install -g yarn

# install dependencies
yarn install #or npm install

# start app in dev mode
yarn start

# build electron packages
yarn build
```

## Contributors

Thanks to everyone who contributes to this project.
<a href="https://github.com/kitze/jsui/graphs/contributors"><img src="https://opencollective.com/jsui/contributors.svg?width=890" /></a>

## Backers

Thank you to all our backers! 🙏 [[Become a backer](https://opencollective.com/jsui#backer)]

<a href="https://opencollective.com/jsui#backers" target="_blank"><img src="https://opencollective.com/jsui/backers.svg?width=890"></a>

## Sponsors

Support JSUI by becoming a sponsor. Your logo will show up here with a link to your website. [[Become a sponsor](https://opencollective.com/jsui#sponsor)]

<a href="https://opencollective.com/jsui/sponsor/0/website" target="_blank"><img src="https://opencollective.com/jsui/sponsor/0/avatar.svg"></a>
<a href="https://opencollective.com/jsui/sponsor/1/website" target="_blank"><img src="https://opencollective.com/jsui/sponsor/1/avatar.svg"></a>
<a href="https://opencollective.com/jsui/sponsor/2/website" target="_blank"><img src="https://opencollective.com/jsui/sponsor/2/avatar.svg"></a>
<a href="https://opencollective.com/jsui/sponsor/3/website" target="_blank"><img src="https://opencollective.com/jsui/sponsor/3/avatar.svg"></a>
<a href="https://opencollective.com/jsui/sponsor/4/website" target="_blank"><img src="https://opencollective.com/jsui/sponsor/4/avatar.svg"></a>
<a href="https://opencollective.com/jsui/sponsor/5/website" target="_blank"><img src="https://opencollective.com/jsui/sponsor/5/avatar.svg"></a>
<a href="https://opencollective.com/jsui/sponsor/6/website" target="_blank"><img src="https://opencollective.com/jsui/sponsor/6/avatar.svg"></a>
<a href="https://opencollective.com/jsui/sponsor/7/website" target="_blank"><img src="https://opencollective.com/jsui/sponsor/7/avatar.svg"></a>
<a href="https://opencollective.com/jsui/sponsor/8/website" target="_blank"><img src="https://opencollective.com/jsui/sponsor/8/avatar.svg"></a>
<a href="https://opencollective.com/jsui/sponsor/9/website" target="_blank"><img src="https://opencollective.com/jsui/sponsor/9/avatar.svg"></a>
