const chalk = require('chalk');

const LOGO_LINES = [
  '',
  '  ✵             ██████   ███    ███  ███    ██  ██████           ✵    ',
  '  ✵ ✵          ██    ██  ████  ████  ████   ██    ██           ✵ ✵    ',
  '  ✵ ✵ ✵        ██    ██  ██ ████ ██  ██ ██  ██    ██         ✵ ✵ ✵    ',
  '  ✵ ✵          ██    ██  ██  ██  ██  ██  ██ ██    ██           ✵ ✵    ',
  '  ✵             ██████   ██      ██  ██   ████  ██████           ✵    ',
  '',
  '                          THE EVERYTHING CLI',
  ''
];

function interpolateColor(color1, color2, factor) {
  const result = color1.slice();
  for (let i = 0; i < 3; i++) {
    result[i] = Math.round(result[i] + factor * (color2[i] - color1[i]));
  }
  return result;
}

const cosmicPurple = [138, 43, 226]; // deep purple
const cosmicCyan = [0, 255, 255];    // bright cyan

function printWelcome() {
  console.clear();
  
  LOGO_LINES.forEach((line, index) => {
    const factor = LOGO_LINES.length > 1 ? index / (LOGO_LINES.length - 1) : 0;
    const [r, g, b] = interpolateColor(cosmicPurple, cosmicCyan, factor);
    console.log(chalk.rgb(r, g, b).bold(line));
  });

  console.log(chalk.gray('  Operate your life through the command line.\n'));
  console.log(chalk.gray('  Type ') + chalk.white('/help') + chalk.gray(' to see available commands.'));
  console.log(chalk.gray('  Type ') + chalk.white('/exit') + chalk.gray(' to quit.\n'));
}

function printHelp() {
  console.log('');
  console.log(chalk.cyan.bold('  Available commands:'));
  console.log('');
  console.log(chalk.white('  /help    ') + chalk.gray('— Show this help menu'));
  console.log(chalk.white('  /clear   ') + chalk.gray('— Clear the screen'));
  console.log(chalk.white('  /version ') + chalk.gray('— Show current version'));
  console.log(chalk.white('  /about   ') + chalk.gray('— What is OMNI?'));
  console.log(chalk.white('  /exit    ') + chalk.gray('— Quit the CLI'));
  console.log('');
}

function printAbout() {
  console.log('');
  console.log(chalk.cyan.bold('  The EVERYTHING CLI'));
  console.log(chalk.gray('  One terminal to run your entire life.'));
  console.log(chalk.gray('  Tasks, notes, finances, habits — all from right here.'));
  console.log(chalk.gray('  Built for people who live in the terminal.\n'));
}

function printVersion() {
  const { version } = require('../package.json');
  console.log(chalk.gray(`\n  omni v${version}\n`));
}

function printUnknown(cmd) {
  console.log(chalk.red(`\n  Unknown command: "${cmd}"`));
  console.log(chalk.gray('  Type ') + chalk.white('/help') + chalk.gray(' to see available commands.\n'));
}

function printGoodbye() {
  console.log(chalk.cyan('\n  See you later. ✌\n'));
}

module.exports = {
  printWelcome,
  printHelp,
  printAbout,
  printVersion,
  printUnknown,
  printGoodbye,
};
