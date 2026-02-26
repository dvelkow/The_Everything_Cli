const chalk = require('chalk');

const LOGO = `
  ╔═══════════════════════════════════════════════╗
  ║                                               ║
  ║        ███████╗██╗   ██╗                      ║
  ║        ██╔════╝██║   ██║                      ║
  ║        █████╗  ██║   ██║                      ║
  ║        ██╔══╝  ╚██╗ ██╔╝                      ║
  ║        ███████╗ ╚████╔╝                       ║
  ║        ╚══════╝  ╚═══╝                        ║
  ║                                               ║
  ║        T H E   E V E R Y T H I N G   C L I   ║
  ║                                               ║
  ╚═══════════════════════════════════════════════╝
`;

function printWelcome() {
  console.clear();
  console.log(chalk.cyan(LOGO));
  console.log(chalk.gray('  Operate your life through the command line.\n'));
  console.log(chalk.gray('  Type ') + chalk.white('help') + chalk.gray(' to see available commands.'));
  console.log(chalk.gray('  Type ') + chalk.white('exit') + chalk.gray(' to quit.\n'));
}

function printHelp() {
  console.log('');
  console.log(chalk.cyan.bold('  Available commands:'));
  console.log('');
  console.log(chalk.white('  help    ') + chalk.gray('— Show this help menu'));
  console.log(chalk.white('  clear   ') + chalk.gray('— Clear the screen'));
  console.log(chalk.white('  version ') + chalk.gray('— Show current version'));
  console.log(chalk.white('  about   ') + chalk.gray('— What is EV?'));
  console.log(chalk.white('  exit    ') + chalk.gray('— Quit the CLI'));
  console.log('');
}

function printAbout() {
  console.log('');
  console.log(chalk.cyan.bold('  The Everything CLI'));
  console.log(chalk.gray('  One terminal to run your entire life.'));
  console.log(chalk.gray('  Tasks, notes, finances, habits — all from right here.'));
  console.log(chalk.gray('  Built for people who live in the terminal.\n'));
}

function printVersion() {
  const { version } = require('../package.json');
  console.log(chalk.gray(`\n  ev v${version}\n`));
}

function printUnknown(cmd) {
  console.log(chalk.red(`\n  Unknown command: "${cmd}"`));
  console.log(chalk.gray('  Type ') + chalk.white('help') + chalk.gray(' to see available commands.\n'));
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
