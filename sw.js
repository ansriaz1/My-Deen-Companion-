const cacheName="deen-companion-pro-v1";
const filesToCache=["/","index.html","style.css","script.js","verses.json","hadiths.json","duas.json","prayerTimes.json","manifest.json","icon.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(cacheName).then(c=>c.addAll(filesToCache)));});
self.addEventListener("fetch",e=>{e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)));});
