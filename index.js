#!/usr/bin/env node

import chalk from 'chalk';
import inquirer from 'inquirer';
import path from 'path';
import { fileURLToPath } from 'url';
import { checkDependencies } from './modules/utils.js';
import { showBanner } from './modules/utils.js';
import { mainMenu } from './modules/utils.js';
import { runScanner } from './modules/scanner.js';
import { checkForUpdates } from './modules/updater.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Auto-install dependencies
await checkDependencies();

// Main execution
(async () => {
  await showBanner();
  
  // Check for updates
  const shouldUpdate = await checkForUpdates();
  if (shouldUpdate) {
    const { update } = await inquirer.prompt([{
      type: 'confirm',
      name: 'update',
      message: chalk.yellow('Update tersedia! Mau update sekarang?'),
      default: true
    }]);
    
    if (update) {
      console.log(chalk.cyan('\n[🔄] Mengupdate...'));
      // Update logic here
      process.exit(0);
    }
  }

  // Main menu
  while (true) {
    const { choice } = await mainMenu();
    
    switch (choice) {
      case 'Scan Targetnya':
        await runScanner();
        break;
      case 'Update Tool':
        console.log(chalk.cyan('\n[🔄] Mengecek update...'));
        await checkForUpdates(true);
        break;
      case 'Keluar':
        console.log(chalk.red('\n[👋] Sampai jumpa!'));
        process.exit(0);
    }
  }
})();
