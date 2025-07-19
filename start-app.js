const { spawn } = require('child_process');
const { exec } = require('child_process');

console.log('Starting Vite dev server...');

// Start Vite dev server
const vite = spawn('npm', ['run', 'dev'], {
  stdio: 'inherit',
  shell: true
});

// Wait for Vite to start, then launch Electron
setTimeout(() => {
  console.log('Starting Electron...');
  const electron = spawn('npx', ['electron', '.'], {
    stdio: 'inherit',
    shell: true
  });

  electron.on('close', (code) => {
    console.log(`Electron exited with code ${code}`);
    vite.kill();
    process.exit(code);
  });
}, 3000);

vite.on('close', (code) => {
  console.log(`Vite exited with code ${code}`);
  process.exit(code);
}); 