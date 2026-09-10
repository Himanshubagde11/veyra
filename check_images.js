const urls = [
  "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&h=800&fit=crop",
  "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&h=800&fit=crop",
  "https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?w=600&h=800&fit=crop",
  "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&h=800&fit=crop",
  "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600&h=800&fit=crop",
  "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=600&h=800&fit=crop",
  "https://images.unsplash.com/photo-1524061611746-99b384f8841a?w=600&h=800&fit=crop",
  "https://images.unsplash.com/photo-1601925345759-583eb7200780?w=600&h=800&fit=crop",
  "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=800&fit=crop",
  "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&h=800&fit=crop",
  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=800&fit=crop",
  "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&h=800&fit=crop",
  "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=800&fit=crop",
  "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&h=800&fit=crop",
  "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&h=800&fit=crop"
];

async function check() {
  for (const url of urls) {
    const res = await fetch(url, { method: "HEAD" });
    console.log(res.status, url);
  }
}

check();
