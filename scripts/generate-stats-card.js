#!/usr/bin/env node

import { renderStatsCard } from '../src/cards/stats.js';
import { fetchStats } from '../src/fetchers/stats.js';
import fs from 'fs';
import path from 'path';

const username = process.argv[2] || process.env.GITHUB_USERNAME || 'anuraghazra';
const outputDir = process.argv[3] || './output';

async function generateStatsCard() {
  try {
    console.log(`Generating stats card for: ${username}`);

    // Ensure output directory exists
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Fetch stats and render card
    const stats = await fetchStats(username);
    const card = renderStatsCard(stats, {
      show_icons: true,
      theme: 'transparent',
      hide_border: true
    });

    // Write SVG file
    const outputPath = path.join(outputDir, `${username}-stats.svg`);
    fs.writeFileSync(outputPath, card);

    console.log(`Stats card saved to: ${outputPath}`);

  } catch (error) {
    console.error('Error generating stats card:', error.message);
    process.exit(1);
  }
}

generateStatsCard();
