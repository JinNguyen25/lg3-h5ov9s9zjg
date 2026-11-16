/* Lưu sẵn để mở được khi không có mạng. Đổi VERSION mỗi lần cập nhật nội dung. */
const VERSION='logi3-2026-11-16h';
const FILES=['./','index.html','app.css','app.js','data/content.js','data/extra2.js','data/extra3.js','data/mindmap.js','data/qbranch.js','data/mock.js','data/mock-notes.js','manifest.webmanifest','icon.svg','icon-180.png','icon-192.png','icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(VERSION).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==VERSION).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
/* Ưu tiên mạng, mất mạng thì dùng bản lưu. Chỉ lưu phản hồi hợp lệ của chính trang này
   (không lưu trang đăng nhập hay chuyển hướng, ví dụ khi phiên Cloudflare Access hết hạn). */
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(e.request.method!=='GET'||u.origin!==location.origin)return;
  e.respondWith(fetch(e.request).then(r=>{if(r.ok&&r.type==='basic'&&!r.redirected){const cp=r.clone();caches.open(VERSION).then(c=>c.put(e.request,cp))}
    else if(!r.ok||r.redirected){return caches.match(e.request,{ignoreSearch:true}).then(c=>c||r)}return r})
  .catch(()=>caches.match(e.request,{ignoreSearch:true}).then(c=>c||(e.request.mode==='navigate'?caches.match('index.html'):undefined))))});
