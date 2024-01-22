const fs = require('fs');
const readline = require('readline');
const path = require('path');

const filePath = path.join(__dirname, 'output.txt');

const fileStream = fs.createWriteStream(filePath, { flags: 'a' });

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log(
  'Enter text to write to the file. Type "exit" or press Ctrl+C to quit.',
);

const handleInput = (input) => {
  if (input.trim().toLowerCase() === 'exit') {
    console.log('Goodbye!');
    process.exit();
  } else {
    fileStream.write(input + '\n');
    askQuestion();
  }
};

const askQuestion = () => {
  rl.question('Input: ', handleInput);
};

rl.on('SIGINT', () => {
  console.log('\nGoodbye!');
  process.exit();
});

askQuestion();
