import sharp from 'sharp';
import { existsSync, mkdirSync } from 'node:fs';
import { readdir, writeFile } from 'node:fs/promises';
import { join, dirname, extname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const srcDir = join(__dirname, '..', 'src', 'assets', 'images');
const outDir = join(__dirname, '..', 'public', 'images');

const HERO_IMAGES = ['horsebackRiding', 'river', 'hiking'];
const HERO_WIDTHS = [768];
const QUALITY = 82;

if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });

const files = (await readdir(srcDir)).filter((f) =>
  ['.jpg', '.jpeg', '.png', '.webp'].includes(extname(f).toLowerCase())
) ;

for (const file of files) {
  const name = basename(file, extname(file));
  const input = join(srcDir, file);
  const output = join(outDir, `${name}.webp`);

  await sharp(input)
    .rotate()
    .webp({ quality: QUALITY })
    .toFile(output);

  if (HERO_IMAGES.includes(name)) {
    for (const width of HERO_WIDTHS) {
      await sharp(input)
        .rotate()
        .resize({ width })
        .webp({ quality: QUALITY })
        .toFile(join(outDir, `${name}-${width}.webp`));
    }
  }

  console.log(`OK ${file} -> ${name}.webp`);
}

await writeFile(join(outDir, '.gitkeep'), '');
console.log('Optimización de imágenes completada');