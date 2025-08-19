const chalk = require('chalk');
const { performance } = require('perf_hooks');

// Banner ASCII art
const bannerText = `
╔══════════════════════════════════════════════════════════════╗
║                                                              ║
║   ███╗   ██╗ ██████╗ ██╗   ██╗ █████╗                      ║
║   ████╗ ██║██╔═══██╗██║   ██║██╔══██╗                     ║
║   ██╔██╗ ██║██║   ██║██║   ██║███████║                     ║
║   ██║╚██╗██║██║   ██║╚██╗ ██╔╝██╔══██║                     ║
║   ██║ ╚████║╚██████╔╝ ╚████╔╝ ██║  ██║                     ║
║   ╚═╝  ╚═══╝ ╚═════╝   ╚═══╝  ╚═╝  ╚═╝                     ║
║                                                              ║
║         Xbibz Official - MR. Nexo444 Presents                ║
║      Advanced Vulnerability Scanner v1.0 - All Platforms     ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
`;

// Animasi banner
function displayBanner() {
    console.clear();
    const colors = [
        chalk.red, chalk.green, chalk.yellow, 
    ];
    
    let colorIndex = 0;
    const lines = bannerText.split('\n');
    
    // Animasi ketik
    lines.forEach((line, i) => {
        setTimeout(() => {
            const color = colors[colorIndex % colors.length];
            console.log(color(line));
            colorIndex++;
            
            // Tampilkan loading bar setelah banner selesai
            if (i === lines.length - 1) {
                showLoadingBar();
            }
        }, i * 30);
    });
}

// Loading bar animasi
function showLoadingBar() {
    const barLength = 40;
    let progress = 0;
    
    const loadingInterval = setInterval(() => {
        process.stdout.write('\r[');
        
        for(let i = 0; i < barLength; i++) {
            if(i < progress / barLength * 100) {
                process.stdout.write(chalk.cyan('█'));
            } else {
                process.stdout.write(' ');
            }
        }
        
        process.stdout.write(`] ${Math.floor(progress)}%`);
        
        progress += 2;
        
        if(progress > 100) {
            clearInterval(loadingInterval);
            console.log('\n' + chalk.green('[✓] Sistem siap digunakan!\n'));
        }
    }, 30);
}

module.exports = {
    displayBanner
};