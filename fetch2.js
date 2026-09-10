const https = require('https');

function fetchId(keyword) {
  return new Promise((resolve, reject) => {
    https.get(`https://unsplash.com/s/photos/${keyword.replace(/ /g, '-')}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        // Find the __NEXT_DATA__ script
        const match = data.match(/<script id="__NEXT_DATA__" type="application\/json">(.+?)<\/script>/);
        if (match) {
            try {
                const json = JSON.parse(match[1]);
                // This structure might vary, let's just regex search for "id":"xxxxx" where x is 11 chars
                const idMatches = [...match[1].matchAll(/"id":"([a-zA-Z0-9_-]{11})"/g)];
                if (idMatches.length > 0) {
                   const ids = [...new Set(idMatches.map(m => m[1]))];
                   resolve(ids.slice(0, 3));
                   return;
                }
            } catch(e) {}
        }
        
        // If not found, try a generic regex for 11 chars
        const fallback = [...data.matchAll(/"id":"([a-zA-Z0-9_-]{11})"/g)];
        if (fallback.length > 0) {
            resolve([...new Set(fallback.map(m => m[1]))].slice(0, 3));
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
    "turtleneck sweater",
    "denim jacket",
    "linen pants",
    "fountain pen",
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
