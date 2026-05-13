const fs = require('fs');
const path = require('path');

const componentsDir = path.join(__dirname, '../frontend/src/components');
const viewsDir = path.join(__dirname, 'views');

function convert(fileContent) {
    let content = fileContent;
    // Extract everything between return ( ... );
    const match = content.match(/return\s*\(\s*([\s\S]*?)\s*\);?\s*};?\s*export default/);
    if (!match) return "<!-- Convert Error -->";
    let html = match[1];

    // Replace className with class
    html = html.replace(/className=/g, 'class=');

    // Replace JSX self-closing tags
    html = html.replace(/<img(.*?)>/g, '<img$1>'); // self closing

    // Basic icon replacements to Feather icons (lucide equivalent)
    html = html.replace(/<([A-Z][a-zA-Z0-9]*) (.*?)size=\{([0-9]+)\}(.*?)\/>/g, '<i data-lucide="$1" class="w-[$3px] h-[$3px]"></i>');
    html = html.replace(/<([A-Z][a-zA-Z0-9]*)(.*?)\/>/g, (match, iconName) => {
        if (['img', 'input', 'hr', 'br'].includes(iconName.toLowerCase())) return match;
        // Kebab case icon name
        const kebab = iconName.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase().replace(/^-/, '');
        return `<i data-lucide="${kebab}"></i>`;
    });

    // Remove event handlers and JSX expressions
    html = html.replace(/onClick=\{[^}]+\}/g, '');
    html = html.replace(/onChange=\{[^}]+\}/g, '');
    html = html.replace(/onSubmit=\{[^}]+\}/g, '');
    html = html.replace(/defaultChecked=\{[^}]+\}/g, 'checked');
    html = html.replace(/\{\/\*[\s\S]*?\*\/\}/g, ''); // Comments

    // Fix src variables
    html = html.replace(/src=\{([a-zA-Z0-9_]+)\}/g, 'src="/assets/Layout1/Image/flags/DE@2x.png"');

    // Map over arrays (naive fix)
    html = html.replace(/\{.*\.map.*\((.*?)\)\s*=>\s*\(/g, '<% [1,2,3,4,5].forEach((item) => { %>');
    html = html.replace(/\)\)\}/g, '<% }) %>');

    // Remove JSX curly brace blocks
    html = html.replace(/\{[a-zA-Z0-9_]+\.[a-zA-Z0-9_]+\}/g, 'Sample Text');
    html = html.replace(/\{[a-zA-Z0-9_]+\}/g, 'Sample');

    return html;
}

const pages = {
    'home.ejs': ['Hero.jsx', 'Deals.jsx', 'CategorySection.jsx', 'RecommendedItems.jsx', 'Services.jsx', 'RegionSuppliers.jsx'],
    'products.ejs': ['ProductListing.jsx'],
    'product-detail.ejs': ['ProductDetails.jsx'],
    'partials/header.ejs': ['Header.jsx'],
    'partials/footer.ejs': ['Newsletter.jsx', 'Footer.jsx']
};

for (const [ejsName, jsxFiles] of Object.entries(pages)) {
    let combinedHtml = '';
    
    // Add layout header
    if (!ejsName.startsWith('partials/')) {
        combinedHtml += `<%- include('partials/header') %>\n<main class="flex-grow pb-12">\n`;
    }

    for (const jsxFile of jsxFiles) {
        try {
            const jsxPath = path.join(componentsDir, jsxFile);
            if (fs.existsSync(jsxPath)) {
                const content = fs.readFileSync(jsxPath, 'utf8');
                combinedHtml += convert(content) + '\n';
            } else {
                console.warn(`Missing file: ${jsxPath}`);
            }
        } catch (e) {
            console.error(`Error processing ${jsxFile}:`, e);
        }
    }

    // Add layout footer
    if (!ejsName.startsWith('partials/')) {
        combinedHtml += `</main>\n<%- include('partials/footer') %>\n`;
    }

    // Wrap full HTML
    if (ejsName === 'partials/header.ejs') {
        combinedHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><%= typeof title !== 'undefined' ? title : 'eCommerce' %></title>
    <link href="/css/style.css" rel="stylesheet">
    <script src="https://unpkg.com/lucide@latest"></script>
</head>
<body class="min-h-screen flex flex-col">
` + combinedHtml;
    }
    
    if (ejsName === 'partials/footer.ejs') {
        combinedHtml += `
    <script>
        lucide.createIcons();
    </script>
</body>
</html>`;
    }

    const outPath = path.join(viewsDir, ejsName);
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, combinedHtml);
    console.log(`Created ${outPath}`);
}
