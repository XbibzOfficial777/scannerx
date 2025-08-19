import chalk from 'chalk';
import inquirer from 'inquirer';
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function checkDependencies() {
  try {
    const dependencies = [
      'axios', 'chalk', 'cli-table3', 'inquirer', 'ora', 'cheerio'
    ];
    
    const missing = [];
    
    for (const dep of dependencies) {
      try {
        await import(dep);
      } catch (e) {
        missing.push(dep);
      }
    }
    
    if (missing.length > 0) {
      console.log(chalk.yellow(`[⚠️] Dependency kurang: ${missing.join(', ')}`));
      console.log(chalk.cyan('[📦] Menginstall dependency...'));
      
      execSync('npm install', { stdio: 'inherit' });
      console.log(chalk.green('[✅] Semua dependency terinstall!'));
    }
  } catch (error) {
    console.error(chalk.red('[❌] Gagal install dependency:'), error);
    process.exit(1);
  }
}

export async function showBanner() {
  const bannerPath = path.join(__dirname, '../assets/banner.txt');
  
  if (fs.existsSync(bannerPath)) {
    const banner = fs.readFileSync(bannerPath, 'utf8');
    console.log(chalk.cyan(banner));
  }
  
  // Animated text
  const text = "MEMUAT SISTEM VULNERABILITY SCANNER...";
  for (let i = 0; i < text.length; i++) {
    process.stdout.write(chalk.magenta(text[i]));
    await new Promise(resolve => setTimeout(resolve, 50));
  }
  console.log('\n');
}

export async function mainMenu() {
  return inquirer.prompt([{
    type: 'list',
    name: 'choice',
    message: chalk.green('[🎯] Pilih aksi:'),
    choices: [
      { name: '🔍 Scan Target', value: 'Scan Target' },
      { name: '🔄 Update Tool', value: 'Update Tool' },
      { name: '🚪 Keluar', value: 'Keluar' }
    ],
    pageSize: 3
  }]);
}

export function validateUrl(url) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}
