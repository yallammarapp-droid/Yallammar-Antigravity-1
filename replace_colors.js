const fs = require('fs');
const path = require('path');

function replaceInDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      replaceInDir(fullPath);
    } else if (file.endsWith('.css')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      if (content.includes('197, 160, 89')) {
        content = content.replace(/197,\s*160,\s*89/g, '45, 106, 79');
        fs.writeFileSync(fullPath, content);
        console.log(`Replaced in ${fullPath}`);
      }
    }
  }
}

replaceInDir(path.join(__dirname, 'src'));
