const https = require('https');

function fetchId(keyword) {
  return new Promise((resolve, reject) => {
    https.get(`https://unsplash.com/s/photos/${keyword.replace(/ /g, '-')}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const matches = [...data.matchAll(/href="\/photos\/[a-zA-Z0-9-]+-([a-zA-Z0-9_-]{11})"/g)];
        if (matches.length > 0) {
            const ids = [...new Set(matches.map(m => m[1]))];
            resolve(ids.slice(0, 3));
        } else {
            resolve([]);
        }
      });
    }).on('error', reject);
  });
}

async function run() {
  const terms = [
    "matcha bowl",
    "paper lantern",
    "wooden bench",
    "turtleneck",
    "denim jacket",
    "linen pants",
    "brass pen",
    "bookends",
    "glass carafe",
    "canvas tote bag",
    "sleep mask",
    "silver bracelet"
  ];
  for (const term of terms) {
    const ids = await fetchId(term);
    console.log(term + ": " + ids.join(', '));
  }
}
run();
