/* Lưu sẵn để mở được khi không có mạng. Đổi VERSION mỗi lần cập nhật nội dung
   (app đọc VERSION này để biết có bản mới và hiện nút "Cập nhật"). */
const VERSION='logi3-20261116-1434';
const FILES=['./','index.html','app.css','app.js','data/content.js','data/extra2.js','data/extra3.js','data/mindmap.js','data/lecture.js','data/lecture2.js','data/lecture_ja.js','data/lecture_ja2.js','data/glossary.js','data/qbranch.js','data/mock.js','data/mock-notes.js','manifest.webmanifest','icon.svg','icon-180.png','icon-192.png','icon-512.png'];
/* cache:'reload' để bản cài mới không lấy nhầm file cũ từ bộ nhớ đệm HTTP của trình duyệt */
self.addEventListener('install',e=>{e.waitUntil(caches.open(VERSION).then(c=>c.addAll(FILES.map(f=>new Request(f,{cache:'reload'})))).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==VERSION).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('message',e=>{if(e.data==='version'&&e.source)e.source.postMessage({version:VERSION});if(e.data==='skip')self.skipWaiting()});
/* Ưu tiên mạng (luôn hỏi lại máy chủ, không dùng bản đệm HTTP cũ), mất mạng thì dùng bản lưu.
   Chỉ lưu phản hồi hợp lệ của chính trang này (không lưu trang đăng nhập hay chuyển hướng). */
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(e.request.method!=='GET'||u.origin!==location.origin||u.pathname.endsWith('/sw.js'))return;
  const req=new Request(e.request.url,{cache:'no-cache',credentials:'same-origin'});
  e.respondWith(fetch(req).then(r=>{if(r.ok&&r.type==='basic'&&!r.redirected){const cp=r.clone();caches.open(VERSION).then(c=>c.put(e.request,cp))}
    else if(!r.ok||r.redirected){return caches.match(e.request,{ignoreSearch:true}).then(c=>c||r)}return r})
  .catch(()=>caches.match(e.request,{ignoreSearch:true}).then(c=>c||(e.request.mode==='navigate'?caches.match('index.html'):undefined))))});
