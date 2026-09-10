const urls = [
  "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=600&h=800&fit=crop",
  "https://images.unsplash.com/photo-1434389672724-4ea1d7ce7124?w=600&h=800&fit=crop",
  "https://images.unsplash.com/photo-1507925922837-cb3b174ea641?w=600&h=800&fit=crop",
  "https://images.unsplash.com/photo-1544457070-4cd773b4d71e?w=600&h=800&fit=crop"
];

async function check() {
  for (const url of urls) {
    const res = await fetch(url, { method: "HEAD" });
    console.log(res.status, url);
  }
}

check();
