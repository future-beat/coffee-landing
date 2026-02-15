import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Brand colors (converted from oklch to hex)
// cream: oklch(0.95 0.03 90) -> approximately #F5F0E8
// espresso: oklch(0.25 0.05 30) -> approximately #3D2E2A

const width = 1200;
const height = 630;

// Create SVG with brand styling
const svg = `
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${width}" height="${height}" fill="#F5F0E8"/>
  <text
    x="50%"
    y="50%"
    text-anchor="middle"
    dominant-baseline="middle"
    font-family="Georgia, serif"
    font-size="72"
    font-weight="400"
    fill="#3D2E2A"
  >Craft Coffee, Elevated</text>
</svg>
`;

const outputPath = join(__dirname, '..', 'app', 'opengraph-image.jpg');

await sharp(Buffer.from(svg))
  .jpeg({ quality: 90 })
  .toFile(outputPath);

console.log(`OG image generated: ${outputPath}`);
