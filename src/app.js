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

const PROMPT = chalk.rgb(138, 43, 226)('  omni > ');

const COMMANDS = ['/help', '/clear', '/version', '/about', '/exit', '/quit'];

function handleCommand(input) {
  const cmd = input.trim().toLowerCase();

  if (!cmd) return true;

  switch (cmd) {
    case '/help':
      printHelp();
      return true;
    case '/clear':
      printWelcome();
      return true;
    case '/version':
      printVersion();
      return true;
    case '/about':
      printAbout();
      return true;
    case '/exit':
    case '/quit':
    case '/q':
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
    completer: (line) => {
      const hits = COMMANDS.filter((c) => c.startsWith(line));
      return [hits.length ? hits : COMMANDS, line];
    }
  });

  const originalRefresh = rl._refreshLine ? rl._refreshLine.bind(rl) : () => {};

  let lastDropdownLines = 0;

  if (rl._refreshLine) {
    rl._refreshLine = function() {
      // Clear previous dropdown before drawing new line
      if (lastDropdownLines > 0) {
        readline.moveCursor(process.stdout, 0, 1);
        readline.clearScreenDown(process.stdout);
        readline.moveCursor(process.stdout, 0, -1);
        lastDropdownLines = 0;
      }

      originalRefresh();
      
      const line = this.line;
      if (!line || line.length === 0) return;

      const matches = COMMANDS.filter(c => c.startsWith(line));

      if (matches.length > 0 && this.cursor === line.length) {
        const firstMatch = matches[0];
        const ghost = firstMatch.slice(line.length);

        // Print ghost text inline
        process.stdout.write(chalk.gray(ghost));
        readline.moveCursor(process.stdout, -ghost.length, 0);

        // Print dropdown
        const dropdownLines = Math.min(matches.length, 5);
        process.stdout.write('\n');
        
        for (let i = 0; i < dropdownLines; i++) {
          process.stdout.write('    ' + chalk.gray(matches[i]) + '\n');
        }

        lastDropdownLines = dropdownLines;
        readline.moveCursor(process.stdout, 0, -(dropdownLines + 1));
      }
    };
  }

  // Intercept keypress for 'return' to clear the dropdown BEFORE the newline
  process.stdin.on('keypress', (str, key) => {
    if (key && key.name === 'return' && lastDropdownLines > 0) {
      readline.moveCursor(process.stdout, 0, 1);
      readline.clearScreenDown(process.stdout);
      readline.moveCursor(process.stdout, 0, -1);
      lastDropdownLines = 0;
    }
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
