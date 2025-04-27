const fs = require('fs');
const path = require('path');

function updateImports(dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stats = fs.statSync(filePath);
    
    if (stats.isDirectory()) {
      updateImports(filePath);
    } else if (file.endsWith('.jsx')) {
      let content = fs.readFileSync(filePath, 'utf8');
      
      // Update local imports to include .jsx extension
      content = content.replace(
        /from\s+['"]\.\.?\/.*?['"]/g,
        match => {
          if (match.includes('.jsx')) return match;
          if (match.includes('.js')) return match.replace('.js', '.jsx');
          return match.replace(/['"]$/, '.jsx$&');
        }
      );
      
      fs.writeFileSync(filePath, content);
    }
  });
}

updateImports('./src'); 