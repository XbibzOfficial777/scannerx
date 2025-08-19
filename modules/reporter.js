import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function generateReport(results) {
  const reportDir = path.join(__dirname, '../reports');
  
  if (!fs.existsSync(reportDir)) {
    fs.mkdirSync(reportDir);
  }
  
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const filename = `scan-report-${timestamp}.json`;
  const filepath = path.join(reportDir, filename);
  
  // Create detailed report
  const report = {
    ...results,
    summary: {
      totalVulnerabilities: results.vulnerabilities.length,
      critical: results.vulnerabilities.filter(v => v.type === 'SQL Injection').length,
      medium: results.vulnerabilities.filter(v => v.type === 'XSS').length,
      low: results.vulnerabilities.filter(v => v.type === 'Other').length
    },
    recommendations: generateRecommendations(results)
  };
  
  fs.writeFileSync(filepath, JSON.stringify(report, null, 2));
  
  // Display summary
  console.log(chalk.magenta('\n[📊] Ringkasan Hasil:'));
  console.log(`Total Kerentanan: ${chalk.red(report.summary.totalVulnerabilities)}`);
  console.log(`Kritis: ${chalk.red(report.summary.critical)}`);
  console.log(`Sedang: ${chalk.yellow(report.summary.medium)}`);
  console.log(`Rendah: ${chalk.green(report.summary.low)}`);
  
  console.log(chalk.cyan(`\n[💾] Laporan disimpan di: ${filepath}`));
}

function generateRecommendations(results) {
  const recommendations = [];
  
  if (results.vulnerabilities.some(v => v.type === 'SQL Injection')) {
    recommendations.push('Gunakan prepared statements untuk mencegah SQL Injection');
  }
  
  if (results.vulnerabilities.some(v => v.type === 'XSS')) {
    recommendations.push('Implementasikan Content Security Policy (CSP)');
    recommendations.push('Lakukan sanitasi input pada semua form');
  }
  
  if (!results.waf || results.waf.length === 0) {
    recommendations.push('Pertimbangkan untuk mengimplementasikan WAF');
  }
  
  if (!results.bugBounty) {
    recommendations.push('Pertimbangkan untuk membuat program Bug Bounty');
  }
  
  return recommendations;
}
