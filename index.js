const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
    return inquirer.prompt([
        {
            name: "title",
            message: "What is the title of this application?"
        },
        {
            name: "description",
            message: "Describe the application."
        },
        {
            name: "installation",
            message: "What are the steps for installing this application?"
        },
        {
            name: "usage",
            message: "How is the application used; examples/links?"
        },
        {
            name: "contributing",
            message: "Are you open to contributions, and what can people do?"
        },
        {
            name: "tests",
            message: "How do you run the application?"
        },
        {
            type: "list",
            name: "license",
            message: "Which license would you like for your application?",
            choices: ["MIT", "APACHE 2.0", "GPL 3.0", "BSD 3", "None"],
            default: "MIT",
        },
        {
            name: "gitHubName",
            message: "What is your GitHub username?"
        },
        {
            name: "email",
            message: "What is your email?"
        },
    ]);
}

function renderLicenseBadge(license) {
    if (license !== "None") {
      return `![GitHub license](https://img.shields.io/badge/license-${license}-blue.svg)`
    }
    return ''
  }
  
  function renderLicenseLink(license) {
    if (license !== "None") {
      return (
        `\n* [License](#license)\n`
      )
    }
    return ''
  }
  
  function renderLicenseSection(license) {
    if (license !== "None") {
      return (
        `## License
  
  This project is licensed under the ${license} license.`
      )
    }
    return ''
  }
function generateREADME(promptAnswers) {
return `# ${promptAnswers.title}
${renderLicenseBadge(promptAnswers.license)}

## Table of Contents 

* [Description](#description)

* [Installation](#installation)

* [Usage](#usage)
${renderLicenseLink(promptAnswers.license)}
* [Contributing](#contributing)

* [Tests](#tests)

* [Questions](#questions)

## Description

${promptAnswers.description}

## Installation

${promptAnswers.installation}

## Usage

${promptAnswers.usage}

${renderLicenseSection(promptAnswers.license)}

## Contributing

${promptAnswers.contributing}

## Tests

${promptAnswers.tests}

## Questions

If you have any questions or issues, you can reach me at the email ${promptAnswers.email} or check out my github [${promptAnswers.gitHubName}](https://github.com/${promptAnswers.gitHubName}/).`
};

async function init() {
  
  try {
    const answers = await promptUser();

    const readme = generateREADME(answers);

    await writeFileAsync("README.md", readme);

    console.log("Successfully wrote to readme.md");
  } catch(err) {
    console.log(err);
  }
};

init();
