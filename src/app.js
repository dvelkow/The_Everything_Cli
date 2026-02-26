const readline = require('readline');
const chalk = require('chalk');
const {
  printWelcome,
  printHelp,
  printAbout,
  printVersion,
  printUnknown,
  printGoodbye,
} = require('./screen');

const PROMPT = chalk.cyan('  ev > ');

function handleCommand(input) {
  const cmd = input.trim().toLowerCase();

  if (!cmd) return true;

  switch (cmd) {
    case 'help':
      printHelp();
      return true;
    case 'clear':
      printWelcome();
      return true;
    case 'version':
      printVersion();
      return true;
    case 'about':
      printAbout();
      return true;
    case 'exit':
    case 'quit':
    case 'q':
      printGoodbye();
      return false;
    default:
      printUnknown(cmd);
      return true;
  }
}

function startApp() {
  printWelcome();

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: PROMPT,
  });

  rl.prompt();

  rl.on('line', (line) => {
    const keepRunning = handleCommand(line);
    if (keepRunning) {
      rl.prompt();
    } else {
      rl.close();
    }
  });

  rl.on('close', () => {
    process.exit(0);
  });
}

module.exports = { startApp };
