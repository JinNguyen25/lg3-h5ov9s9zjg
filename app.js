/* Logi 3級 – app học thi ロジスティクス管理3級. Không phụ thuộc thư viện ngoài. */
(function(){
'use strict';
var KEY='logi3.v1', EXAM_MIN=110, EXAM_N=40, PASS=0.6, SYM=['ア','イ','ウ','エ'];
var $=function(s){return document.querySelector(s)}, app=$('#app');

/* ---------- Dữ liệu ---------- */
var CH=window.CHAPTERS, Q=[], QMAP={};
(window.MOCK_RAW||[]).forEach(function(r){
  var n=(window.MOCK_NOTES||{})[r.id]; if(!n||r.a==null) return;
  Q.push({id:r.id,ch:n[0],q:r.q,o:r.o,a:r.a,vi:n[1],ex:n[2],warn:n[3]||'',src:'mock'});
});
var cnt={};
(window.EXTRA||[]).forEach(function(r){
  cnt[r[0]]=(cnt[r[0]]||0)+1;
  Q.push({id:'x'+r[0]+'_'+cnt[r[0]],ch:r[0],q:r[1],o:r[2],a:r[3],vi:r[4],ex:r[5],warn:'',src:'extra'});
});
Q.forEach(function(q){QMAP[q.id]=q;var b=(window.QBRANCH||{})[q.id];if(b!=null)q.br=b});
var MOCK_ORDER=(window.MOCK_ORDER||[]).filter(function(id){return QMAP[id]});

/* ---------- Lưu trữ ---------- */
function blank(){return {v:1,q:{},exams:[],exam:null,read:{},known:{},mm:{},mmd:{},tests:{},set:{vi:true,shuffle:true}}}
var S=load();
function load(){
  try{var s=JSON.parse(localStorage.getItem(KEY)); if(s&&s.v===1){var b=blank(); for(var k in b) if(s[k]===undefined) s[k]=b[k]; return s}}catch(e){}
  return blank();
}
function save(){try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){toast('Không lưu được tiến độ trên trình duyệt này')}}

/* ---------- Tiện ích ---------- */
function esc(s){return String(s==null?'':s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
function shuffle(a){a=a.slice();for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1)),t=a[i];a[i]=a[j];a[j]=t}return a}
function toast(m){var t=$('#toast');t.textContent=m;t.classList.add('show');clearTimeout(toast.t);toast.t=setTimeout(function(){t.classList.remove('show')},2200)}
function chName(n){var c=CH[n-1];return c?c.jp:''}
function pct(a,b){return b?Math.round(a/b*100):0}
function stat(list){var seen=0,ok=0,tries=0,right=0;list.forEach(function(q){var r=S.q[q.id];if(r){seen++;tries+=r.n;right+=r.ok;if(r.last)ok++}});return {total:list.length,seen:seen,ok:ok,tries:tries,right:right}}
function wrongList(){return Q.filter(function(q){var r=S.q[q.id];return r&&!r.last})}
/* Ôn cách quãng (Leitner): hộp 0–5, khoảng ôn theo ngày. Chỉ lên hộp khi trả lời đúng lúc câu đã đến hạn,
   nên làm đúng nhiều lần trong cùng một buổi không được tính là đã nhớ. */
var IV=[0,1,3,7,14,30], DAY=864e5;
function today(){var d=new Date();return d.getFullYear()*10000+(d.getMonth()+1)*100+d.getDate()}
function norm(r){if(r.box==null){r.box=r.last?1:0;r.days=r.ok?1:0;r.due=(r.t||Date.now())+(r.last?DAY:0)}return r}
function record(id,ok){var r=norm(S.q[id]||(S.q[id]={n:0,ok:0,last:0})),now=Date.now();r.n++;if(ok)r.ok++;r.last=ok?1:0;r.t=now;
  if(ok){var td=today();if(r.d!==td){r.days=(r.days||0)+1;r.d=td}
    if(r.box===0||now>=r.due){r.box=Math.min(5,r.box+1);r.due=now+IV[r.box]*DAY-4*3600e3}}
  else{r.box=0;r.due=now}
  save()}
function dueList(){var now=Date.now();return Q.filter(function(q){var r=S.q[q.id];return r&&norm(r).due<=now}).sort(function(a,b){var x=S.q[a.id],y=S.q[b.id];return x.box-y.box||x.due-y.due})}
/* Cấp độ chương 0–5 (ý tưởng skill map của socratic-tutor): cấp phải "kiếm" được, sai lúc ôn thì tụt. */
var LV=['Chưa bắt đầu','Mới làm quen','Đang học','Khá','Vững','Thành thạo'];
function level(list){var n=list.length,seen=0,lr=0,so=0;list.forEach(function(q){var r=S.q[q.id];if(!r)return;seen++;if(r.last){lr++;if((r.days||0)>=2)so++}});
  var L=0;if(seen>=n*.2)L=1;if(lr>=n*.4)L=2;if(lr>=n*.7)L=3;if(so>=n*.7)L=4;if(so>=n*.9)L=5;return {L:L,n:n,seen:seen,lr:lr,so:so}}
function chQ(n){return Q.filter(function(q){return q.ch===n})}
/* Ôn cách quãng cho từng nhánh sơ đồ: cùng lịch 1–3–7–14–30 ngày như câu hỏi.
   Trừ 4 giờ để buổi học hôm sau (dù sớm hơn giờ hôm nay) vẫn tính là đến hạn. */
function brMark(key,ok){var r=S.mmd[key]||(S.mmd[key]={box:0,due:0}),now=Date.now();S.mm[key]=ok?1:0;
  if(ok){if(r.box===0||now>=r.due){r.box=Math.min(5,r.box+1);r.due=now+IV[r.box]*DAY-4*3600e3}}else{r.box=0;r.due=now}}
/* sai nhẹ (ít câu sai trong nhánh): đưa nhánh về "cần ôn ngay" nhưng không xóa hộp */
function brSoft(key){var r=S.mmd[key]||(S.mmd[key]={box:0,due:0});r.due=Date.now();S.mm[key]=0}
function brDue(){var now=Date.now();return Object.keys(S.mmd).filter(function(k){return S.mmd[k].due<=now}).sort(function(a,b){return S.mmd[a].box-S.mmd[b].box||S.mmd[a].due-S.mmd[b].due})}
function brName(n,i){var b=((window.MINDMAP||{})[n]||{b:[]}).b[i];return b?b.k:''}
function brTag(n,i){var k=n+'-'+i,st=S.mm[k],d=S.mmd[k];if(d&&d.due<=Date.now())return '<span class="tag">Đến hạn ôn</span>';return st==null?'':'<span class="tag '+(st?'':'gray')+'">'+(st?'Đã nhớ':'Cần ôn')+'</span>'}
function pips(L){var h='<span class="pips" title="Cấp '+L+'/5">';for(var i=1;i<=5;i++)h+='<i'+(i<=L?' class="on"':'')+'></i>';return h+'</span>'}
function fmt(sec){sec=Math.max(0,sec|0);var m=Math.floor(sec/60),s=sec%60;return m+':'+(s<10?'0':'')+s}
function setBar(title,back,right){$('#title').textContent=title;var b=$('#back');b.hidden=!back;b.onclick=function(){location.hash=back};$('#bar-right').textContent=right||''}
function setTab(t,focus){document.querySelectorAll('.tabs a').forEach(function(a){a.classList.toggle('on',a.dataset.tab===t)});document.body.classList.toggle('focus',!!focus)}
function meter(p,ok){return '<div class="meter'+(ok?' ok':'')+'"><b style="width:'+p+'%"></b></div>'}

/* ---------- Trang chủ ---------- */
function home(){
  setBar('Logi 3級');setTab('home');
  var st=stat(Q), wr=wrongList().length, last=S.exams[S.exams.length-1];
  var h='<div class="card hero"><div class="muted jp">ロジスティクス管理3級</div><div class="big">'+pct(st.ok,st.total)+'%</div><div class="muted">số câu đang làm đúng trên toàn bộ '+st.total+' câu</div>'+
    '<div class="stat3"><div><b>'+st.seen+'</b><span>câu đã làm</span></div><div><b>'+wr+'</b><span>câu đang sai</span></div><div><b>'+(last?pct(last.score,last.total)+'%':'–')+'</b><span>lần thi gần nhất</span></div></div></div>';
  var due=dueList().length, lvs=CH.map(function(c){return level(chQ(c.n)).L}), weak=0;
  lvs.forEach(function(L,i){if(L<lvs[weak])weak=i});
  h+='<div class="btns" style="margin-bottom:6px">';
  if(S.exam) h+='<a class="btn primary block" href="#exam/run">Tiếp tục bài thi đang làm</a>';
  if(due) h+='<button class="btn '+(S.exam?'':'primary ')+'block" data-go="due">Ôn đến hạn hôm nay ('+Math.min(due,20)+(due>20?'/'+due:'')+' câu)</button>';
  var bd=brDue(); if(bd.length) h+='<button class="btn'+(S.exam||due?'':' primary')+' block" data-go="brdue">Ôn '+bd.length+' nhánh sơ đồ đến hạn</button>';
  if(!st.seen) h+='<button class="btn '+(S.exam?'':'primary ')+'block" data-go="diag">Kiểm tra đầu vào 20 câu (2 câu/chương)</button>';
  h+='<button class="btn '+(S.exam||due||!st.seen?'':'primary ')+'block" data-go="quick">Luyện nhanh 10 câu</button>';
  if(wr) h+='<button class="btn block" data-go="wrong">Làm lại '+wr+' câu đang sai</button>';
  h+='</div>';
  if(st.seen){
    var ready=lvs.every(function(L){return L>=4});
    h+='<div class="card muted">'+(ready?'Cả 10 chương đã đạt cấp 4 trở lên. Nên làm <a href="#exam">đề thi thử 40 câu</a> để kiểm tra tổng hợp.':'Nên học tiếp: <b>第'+(weak+1)+'章 '+esc(CH[weak].jp)+'</b> (cấp '+lvs[weak]+'/5). Mục tiêu trước khi thi: mọi chương đạt cấp 4.')+'</div>';
  }
  h+='<h2>Theo chương</h2><div class="list">';
  CH.forEach(function(c,i){
    var s=stat(chQ(c.n));
    h+='<a class="item" href="#learn/'+c.n+'"><span class="num">'+c.n+'</span><span class="grow"><span class="t">'+esc(c.jp)+'</span><div class="s">'+esc(c.vi)+' · '+s.ok+'/'+s.total+' câu đúng</div><div class="lvrow">'+pips(lvs[i])+'<span>Cấp '+lvs[i]+' · '+LV[lvs[i]]+'</span></div></span></a>';
  });
  h+='</div><h2>Về kỳ thi</h2><div class="card muted">40 câu trắc nghiệm 4 lựa chọn · '+EXAM_MIN+' phút · đạt khi đúng khoảng 60% trở lên (24/40). Theo thầy: khoảng 6 phần 10 đề nằm ngay trong 標準テキスト, nhiều câu lặp lại từ đề cũ. Chú ý các từ tuyệt đối: 必ず、常に、のみ、すべて、最も、～する必要はない.<br>Lịch thi, lệ phí: xem trang JAVADA.</div>';
  app.innerHTML=h;
  app.onclick=function(e){var g=e.target.closest('[data-go]');if(!g)return;
    if(g.dataset.go==='quick') startPractice(shuffle(Q).slice(0,10),'Luyện nhanh','#home');
    if(g.dataset.go==='wrong') startPractice(shuffle(wrongList()),'Câu đang sai','#home');
    if(g.dataset.go==='due') startPractice(shuffle(dueList().slice(0,20)),'Ôn đến hạn','#home');
    if(g.dataset.go==='diag') startDiag('#home');
    if(g.dataset.go==='brdue'){var k=brDue()[0];if(k){S.set.recall=true;save();var a=k.split('-');chapter.m='map';location.hash='#learn/'+a[0]+'/'+a[1]}}
  };
}

/* ---------- Lý thuyết ---------- */
function learn(){
  setBar('Lý thuyết');setTab('learn');
  var h='<a class="item" href="#words"><span class="num jp">語</span><span class="grow"><span class="t">用語 · Thuật ngữ</span><div class="s">'+window.TERMS.length+' từ · danh sách và thẻ nhớ</div></span></a><h2>10 chương (標準テキスト 第4版)</h2>';
  CH.forEach(function(c){
    var cards=window.THEORY[c.n]||[], rd=cards.filter(function(_,i){return S.mm[c.n+'-'+i]===1}).length, T=S.tests[c.n]||[], lt=T[T.length-1];
    h+='<a class="item" href="#learn/'+c.n+'"><span class="num">'+c.n+'</span><span class="grow"><span class="t">'+esc(c.jp)+'</span><div class="s">'+esc(c.vi)+' · nhớ '+rd+'/'+cards.length+' nhánh'+(function(){var c2=cards.filter(function(_,i){var d=S.mmd[c.n+'-'+i];return d&&d.due<=Date.now()}).length;return c2?' · <b>'+c2+' nhánh đến hạn ôn</b>':''})()+(lt?' · kiểm tra '+lt.score+'/'+lt.total:'')+'</div>'+meter(pct(rd,cards.length),true)+'</span><span class="pct">›</span></a>';
  });
  app.innerHTML=h;app.onclick=null;
}

/* ---------- Từ điển: gạch chân từ chuyên ngành, chạm để xem nghĩa ----------
   Nguồn: window.TERMS (thuật ngữ theo chương) + window.GLOSS (từ viết tắt, từ kanji bổ sung).
   Mỗi đoạn văn chỉ gạch chân lần xuất hiện đầu tiên của một từ để đỡ rối mắt. */
var GL=[],GLRE=null;
(function(){
  var seen={};
  (window.TERMS||[]).forEach(function(t){if(!seen[t[0]]){seen[t[0]]=1;GL.push([t[0],t[1],t[2]])}});
  (window.GLOSS||[]).forEach(function(t){if(!seen[t[0]]){seen[t[0]]=1;GL.push(t)}});
  if(!GL.length) return;
  var idx=GL.map(function(t,i){return i}).sort(function(a,b){return GL[b][0].length-GL[a][0].length});
  var lat=/^[A-Za-z0-9\-\/\s]+$/;
  var parts=idx.map(function(i){var w=esc(GL[i][0]).replace(/[.*+?^${}()|[\]\\]/g,'\\$&');return lat.test(GL[i][0])?'(?<![A-Za-z0-9])'+w+'(?![A-Za-z0-9])':w});
  try{GLRE=new RegExp(parts.join('|'),'g')}catch(e){GLRE=null}
  GL.forEach(function(t,i){GL.map||0;GL[esc(t[0])]=i});
})();
/* nhận chuỗi ĐÃ escape, trả về HTML có gạch chân */
function gl(html){
  if(!GLRE) return html;
  var used={};
  return html.replace(GLRE,function(m){var i=GL[m];if(i==null||used[m])return m;used[m]=1;return '<button type="button" class="gl" data-g="'+i+'">'+m+'</button>'});
}
function glPop(btn){
  var t=GL[+btn.dataset.g], pop=$('#glpop'); if(!t||!pop) return;
  pop.innerHTML='<div class="gl-w" lang="ja">'+esc(t[0])+'</div>'+(t[1]?'<div class="gl-r" lang="ja">'+esc(t[1])+'</div>':'')+'<div class="gl-m">'+esc(t[2])+'</div>';
  pop.hidden=false;
  var r=btn.getBoundingClientRect(), w=Math.min(320,innerWidth-24), x=Math.max(12,Math.min(innerWidth-w-12,r.left+r.width/2-w/2));
  pop.style.width=w+'px';pop.style.left=x+'px';
  var h=pop.offsetHeight, below=r.bottom+8+h<innerHeight-70;
  pop.style.top=(below?r.bottom+8:Math.max(8,r.top-h-8))+'px';
  document.querySelectorAll('.gl.on').forEach(function(b){b.classList.remove('on')});btn.classList.add('on');
}
function glClose(){var p=$('#glpop');if(p&&!p.hidden){p.hidden=true;document.querySelectorAll('.gl.on').forEach(function(b){b.classList.remove('on')})}}
document.addEventListener('click',function(e){var b=e.target.closest('.gl');if(b){e.stopPropagation();glPop(b);return}if(!e.target.closest('#glpop'))glClose()},true);
window.addEventListener('scroll',glClose,{passive:true});
document.addEventListener('keydown',function(e){if(e.key==='Escape')glClose()});
/* ---------- Sơ đồ tư duy ---------- */
var OPEN={};   /* ý đang mở trong sơ đồ (chỉ trong phiên này) */
function mmPos(i,n){var a=-Math.PI/2+i*2*Math.PI/n;return {x:Math.max(16,Math.min(84,50+36*Math.cos(a))),y:50+38*Math.sin(a)}}
/* Nhánh vẽ thành cây ngang kiểu mind map: tên nhánh → nút con (1–3 từ) → các ý ngắn.
   Đường nối là đường cong màu nhánh, nét to gần gốc và nhỏ dần ra ngoài (quy tắc của Buzan).
   Chế độ tự nhớ lại: các ý ngoài cùng bị che thành ô trống, chạm để lật. */
var REV={};   /* ý đã lật ở chế độ tự nhớ lại (trong phiên này) */
function mindmap(n,cards){
  var M=(window.MINDMAP||{})[n]; if(!M) return '';
  var rc=!!S.set.recall, nb=M.b.length, svg='', nodes='';
  M.b.forEach(function(b,i){var p=mmPos(i,nb),st=S.mm[n+'-'+i];
    svg+='<line x1="50" y1="50" x2="'+p.x.toFixed(1)+'" y2="'+p.y.toFixed(1)+'" style="stroke:var(--b'+(i%7)+')"/>';
    nodes+='<button class="mm-n" data-go-b="'+i+'" style="left:'+p.x.toFixed(1)+'%;top:'+p.y.toFixed(1)+'%;--c:var(--b'+(i%7)+')"><i>'+(i+1)+'</i>'+esc(b.k)+(st==null?'':st?' <span class="ok" aria-label="đã nhớ">✓</span>':' <span class="no" aria-label="cần ôn">!</span>')+'</button>'});
  var h='<div class="mm"><svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">'+svg+'</svg><div class="mm-c"><b>第'+n+'章</b><span>'+esc(CH[n-1].vi)+'</span></div>'+nodes+'</div>';
  h+='<div class="card story"><p>'+esc(M.s)+'</p></div>';
  h+='<div class="card"><label class="sw"><span><b>Chế độ tự nhớ lại</b><small class="muted" style="display:block">Che các ý ngoài cùng; nhìn nhánh và nút con, tự nhớ rồi chạm để lật</small></span><input type="checkbox" data-set="recall"'+(rc?' checked':'')+'></label></div>';
  h+='<div class="branches">';
  M.b.forEach(function(b,i){
    var cd=cards[i]||['','',[]];
    h+='<section class="br" id="br'+i+'" style="--c:var(--b'+(i%7)+')"><div class="br-h"><span class="dot">'+(i+1)+'</span><div class="grow"><b>'+esc(b.k)+'</b><div class="jp muted" lang="ja">'+esc(cd[0])+'</div></div>'+brTag(n,i)+'</div>';
    h+='<div class="hookline"><span>Mẹo nhớ</span>'+esc(b.h)+'</div>';
    h+='<div class="tree" data-tree="'+i+'"><svg class="tlinks" aria-hidden="true"></svg><div class="t-root" lang="ja">'+esc(b.k)+'</div><div class="t-kids">';
    b.c.forEach(function(ch,j){
      var k=n+'-'+i+'-'+j, o=OPEN[k], pt=cd[2][ch[2]]||['',''], lx=((window.LECTURE||{})[n]||[])[i], ex=(lx&&lx[1][ch[2]])||pt[1];
      h+='<div class="t-row"><button class="t-sub'+(o?' open':'')+'" data-sub="'+k+'" aria-expanded="'+(o?'true':'false')+'" lang="ja">'+esc(ch[0])+'</button><div class="t-leaves">';
      ch[1].forEach(function(f,m){var rk=k+'-'+m, hid=rc&&!REV[rk];
        h+=hid?'<button class="t-leaf hid" data-lf="'+rk+'" aria-label="Chạm để xem">?</button>':'<span class="t-leaf" lang="ja">'+esc(f)+'</span>'});
      h+='</div>'+(o?'<div class="t-detail"><div class="j" lang="ja">'+gl(esc(pt[0]))+'</div>'+(ex?'<div class="v">'+gl(esc(ex))+'</div>':'')+'</div>':'')+'</div>';
    });
    h+='</div></div>';
    var nq=chQ(n).filter(function(q){return q.br===i}).length;
    h+='<div class="btns">'+(nq?'<button class="btn small" data-brq="'+i+'">Luyện '+nq+' câu</button>':'')+'<button class="btn small" data-mm="'+i+'" data-v="0">Còn quên</button><button class="btn small primary" data-mm="'+i+'" data-v="1">Nhớ hết</button></div>';
    h+='</section>';
  });
  return h+'</div>';
}

/* vẽ đường cong nối các nút của cây (gọi sau mỗi lần dựng trang và khi đổi kích thước) */
function drawTrees(){
  document.querySelectorAll('.tree').forEach(function(t){
    var svg=t.querySelector('.tlinks'), R=t.getBoundingClientRect(), root=t.querySelector('.t-root').getBoundingClientRect(), d='';
    svg.setAttribute('width',R.width);svg.setAttribute('height',R.height);
    function cv(x1,y1,x2,y2,w){var mx=(x1+x2)/2;return '<path d="M'+x1.toFixed(1)+' '+y1.toFixed(1)+' C'+mx.toFixed(1)+' '+y1.toFixed(1)+' '+mx.toFixed(1)+' '+y2.toFixed(1)+' '+x2.toFixed(1)+' '+y2.toFixed(1)+'" stroke-width="'+w+'"/>'}
    var rx=root.right-R.left, ry=root.top+root.height/2-R.top;
    t.querySelectorAll('.t-row').forEach(function(row){
      var sb=row.querySelector('.t-sub').getBoundingClientRect(), sy=sb.top+sb.height/2-R.top;
      d+=cv(rx,ry,sb.left-R.left,sy,4);
      row.querySelectorAll('.t-leaf').forEach(function(lf){var l=lf.getBoundingClientRect();
        d+=cv(sb.right-R.left,sy,l.left-R.left,l.bottom-R.top-2,1.8)});
    });
    svg.innerHTML=d;
  });
}
window.addEventListener('resize',function(){clearTimeout(drawTrees.t);drawTrees.t=setTimeout(drawTrees,120)});
/* Bài kiểm tra chương: 10 câu, mỗi nhánh ít nhất 1 câu, ưu tiên câu đang sai rồi câu chưa làm (lấy từ cả đề khóa học lẫn câu tự soạn) */
function startTest(n){
  var p=chQ(n), wr=shuffle(p.filter(function(q){var r=S.q[q.id];return r&&!r.last})), un=shuffle(p.filter(function(q){return !S.q[q.id]})), ok=shuffle(p.filter(function(q){var r=S.q[q.id];return r&&r.last}));
  var last=((S.tests[n]||[]).slice(-1)[0]||{}).ids||[], fresh=function(a){return a.filter(function(q){return last.indexOf(q.id)<0}).concat(a.filter(function(q){return last.indexOf(q.id)>=0}))};
  /* mỗi nhánh ít nhất 1 câu (nhánh đang "cần ôn" xếp trước), phần còn lại theo thứ tự: câu sai → chưa làm → đã đúng, tránh câu của lần trước */
  var rank={};fresh(wr).concat(fresh(un)).concat(fresh(ok)).forEach(function(q,i){rank[q.id]=i});
  var srt=p.slice().sort(function(a,b){return rank[a.id]-rank[b.id]}), pick=[], used={};
  var nb=((window.MINDMAP||{})[n]||{b:[]}).b.length, br=[];for(var i=0;i<nb;i++)br.push(i);
  var now=Date.now(), w=function(i){var d=S.mmd[n+'-'+i];return d&&d.due<=now?0:S.mm[n+'-'+i]===0?1:2};
  br.sort(function(a,b){return w(a)-w(b)});   /* nhánh đến hạn ôn → nhánh đang "cần ôn" → còn lại */
  br.forEach(function(i){for(var j=0;j<srt.length;j++){if(srt[j].br===i&&!used[srt[j].id]){used[srt[j].id]=1;pick.push(srt[j]);break}}});
  srt.forEach(function(q){if(pick.length<10&&!used[q.id]){used[q.id]=1;pick.push(q)}});
  var list=shuffle(pick.slice(0,10));
  startPractice(list,'Kiểm tra 第'+n+'章','#learn/'+n); P.test=n;
}
function testVerdict(p){return p>=80?['Lần này làm tốt','Mới là 10 câu nên chưa chắc đã vững. Vài ngày nữa kiểm tra lại; đúng ổn định nhiều lần mới tính là hiểu.']:p>=60?['Tạm được','Lần này qua ngưỡng 60% nhưng mẫu 10 câu còn nhỏ, chưa an toàn. Mở sơ đồ, bật "Chế độ tự nhớ lại" và ôn các nhánh còn quên, rồi kiểm tra lại.']:['Chưa vững','Học lại sơ đồ của chương: đọc mẹo nhớ từng nhánh, mở từng ý, sau đó bật chế độ tự nhớ lại trước khi kiểm tra lần nữa.']}
function chapter(n,fb){
  var c=CH[n-1]; if(!c){location.hash='#learn';return}
  setBar('第'+n+'章 '+c.jp,'#learn');setTab('learn');
  var qs=chQ(n), s=stat(qs), cards=window.THEORY[n]||[], v=level(qs), mode=chapter.m||'map', T=(S.tests[n]||[]), last=T[T.length-1];
  var h='<div class="card"><div class="row"><div class="grow"><b>'+esc(c.vi)+'</b><div class="lvrow">'+pips(v.L)+'<span>Cấp '+v.L+' · '+LV[v.L]+' · '+s.ok+'/'+s.total+' câu đang đúng</span></div>'+(last?'<div class="muted" style="margin-top:4px">Lần kiểm tra gần nhất: '+last.score+'/'+last.total+' ('+testVerdict(pct(last.score,last.total))[0]+')</div>':'')+'</div></div>'+
    '<div class="btns" style="margin-top:10px"><button class="btn primary" data-act="test">Kiểm tra hiểu bài (10 câu)</button><button class="btn" data-act="pr">Luyện cả chương ('+qs.length+')</button></div></div>';
  h+='<div class="seg" role="group" aria-label="Cách xem lý thuyết"><button data-m="map" aria-pressed="'+(mode==='map')+'"'+(mode==='map'?' class="on"':'')+'>Sơ đồ tư duy</button><button data-m="text" aria-pressed="'+(mode==='text')+'"'+(mode==='text'?' class="on"':'')+'>Bài giảng chi tiết</button></div>';
  if(mode==='map'){
    var tm=window.TERMS.filter(function(t){return t[3]===n});
    h+=mindmap(n,cards)+(tm.length?'<h2>Thuật ngữ của chương</h2><div class="card">'+tm.map(termRow).join('')+'</div>':'')+'<div class="card muted">Học xong sơ đồ thì bấm <b>Kiểm tra hiểu bài</b> ở đầu trang.</div>';
    app.innerHTML=h;drawTrees();if(document.fonts&&document.fonts.ready)document.fonts.ready.then(drawTrees);
    if(fb!=null){var fe=document.getElementById('br'+fb);if(fe)setTimeout(function(){fe.scrollIntoView({block:'start'})},0)}
    app.onclick=function(e){
      var t=e.target.closest('[data-m]'); if(t){chapter.m=t.dataset.m;chapter(n);return}
      t=e.target.closest('[data-brq]'); if(t){var bi=+t.dataset.brq;startPractice(shuffle(qs.filter(function(q){return q.br===bi})),'Nhánh '+(bi+1)+': '+brName(n,bi),'#learn/'+n+'/'+bi);return}
      t=e.target.closest('[data-sub]'); if(t){var k=t.dataset.sub;
        /* chỉ mở một ô mỗi lúc: mở ô mới thì ô đang mở tự đóng lại */
        if(S.set.recall&&app.querySelector('[data-lf^="'+k+'-"]')){t.closest('.t-row').querySelectorAll('[data-lf]').forEach(function(x){REV[x.dataset.lf]=1})} else {var wasOpen=OPEN[k];OPEN={};if(!wasOpen)OPEN[k]=1}
        /* giữ ô vừa chạm đứng yên trên màn hình, kể cả khi ô phía trên vừa đóng lại */
        var top0=t.getBoundingClientRect().top;chapter(n);var f=app.querySelector('[data-sub="'+k+'"]');
        if(f){window.scrollBy(0,f.getBoundingClientRect().top-top0);f.focus({preventScroll:true})}return}
      t=e.target.closest('[data-lf]'); if(t){REV[t.dataset.lf]=1;var y3=window.scrollY;chapter(n);window.scrollTo(0,y3);return}
      t=e.target.closest('[data-go-b]'); if(t){var el=document.getElementById('br'+t.dataset.goB);if(el)el.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});return}
      t=e.target.closest('[data-mm]'); if(t){var i=+t.dataset.mm,ok=t.dataset.v==='1';brMark(n+'-'+i,ok);if(ok)S.read[n+'-'+i]=1;else delete S.read[n+'-'+i];save();
        Object.keys(REV).forEach(function(r){if(r.indexOf(n+'-'+i+'-')===0)delete REV[r]});var y2=window.scrollY;chapter(n);window.scrollTo(0,y2);toast(ok?'Đã đánh dấu nhớ nhánh '+(i+1):'Nhánh '+(i+1)+' cần ôn lại');return}
      if(e.target.closest('[data-act=test]')) startTest(n);
      if(e.target.closest('[data-act=pr]')) startPractice(S.set.shuffle?shuffle(qs):qs,'第'+n+'章','#learn/'+n);
    };
    app.onchange=function(e){if(e.target.dataset.set==='recall'){S.set.recall=e.target.checked;save();OPEN={};REV={};chapter(n)}};
    return;
  }
  /* Bài giảng chi tiết: chọn ngôn ngữ → mục lục → từng mục (mở đầu, từng ý: câu gốc + giải thích, chú ý khi thi) */
  var lang=S.set.lang||'vi', LV2=(window.LECTURE||{})[n]||[], LJ=(window.LECTURE_JA||{})[n]||[];
  var TIP={vi:'Chú ý khi thi',ja:'試験のポイント'};
  h+='<div class="seg seg-lang" role="group" aria-label="Ngôn ngữ bài giảng">'+[['vi','Tiếng Việt'],['ja','日本語'],['both','Song ngữ']].map(function(x){return '<button data-lang="'+x[0]+'" aria-pressed="'+(lang===x[0])+'"'+(lang===x[0]?' class="on"':'')+'>'+x[1]+'</button>'}).join('')+'</div>';
  h+='<p class="muted gl-hint">Chạm vào từ <span class="gl demo">gạch chân</span> để xem nghĩa.</p>';
  h+='<div class="card lec-toc"><b>'+(lang==='ja'?'この章の構成（全'+cards.length+'節）':'Chương này gồm '+cards.length+' phần')+'</b><ol>'+cards.map(function(cd,i){return '<li><a href="#" data-toc="'+i+'">'+(lang==='ja'?'<span lang="ja">'+esc(cd[0])+'</span>':esc(cd[1])+' <span class="jp muted" lang="ja">'+esc(cd[0])+'</span>')+'</a></li>'}).join('')+'</ol></div>';
  function blk(vi,ja,cls){
    var a=lang!=='vi'&&ja?'<p class="'+cls+' ja" lang="ja">'+gl(esc(ja))+'</p>':'', b=lang!=='ja'&&vi?'<p class="'+cls+(lang==='both'?' vi2':'')+'">'+gl(esc(vi))+'</p>':'';
    return a+b;
  }
  cards.forEach(function(cd,i){
    var k=n+'-'+i, lv=LV2[i], lj=LJ[i];
    h+='<article class="card lec" id="lec'+i+'"><div class="lec-h"><span class="lec-n">'+(i+1)+'</span><div>'+(lang==='ja'?'<h3 lang="ja">'+esc(cd[0])+'</h3>':'<h3>'+esc(cd[1])+'</h3><div class="sub jp" lang="ja">'+esc(cd[0])+'</div>')+'</div></div>';
    h+=blk(lv&&lv[0],lj&&lj[0],'lec-intro');
    cd[2].forEach(function(p,j){
      h+='<section class="lec-pt"><div class="lec-src" lang="ja">'+gl(esc(p[0]))+'</div>'+blk((lv&&lv[1][j])||p[1],lj&&lj[1][j],'lec-p')+'</section>';
    });
    if((lv&&lv[2])||(lj&&lj[2])){
      h+='<div class="lec-tip">';
      if(lang!=='vi'&&lj&&lj[2]) h+='<b>'+TIP.ja+'</b><div lang="ja">'+gl(esc(lj[2]))+'</div>';
      if(lang!=='ja'&&lv&&lv[2]) h+='<b'+(lang==='both'?' style="margin-top:6px"':'')+'>'+TIP.vi+'</b><div>'+gl(esc(lv[2]))+'</div>';
      h+='</div>';
    }
    h+='<label class="sw" style="border-top:1px solid var(--line);margin-top:8px"><span class="muted">Đã đọc mục này</span><input type="checkbox" data-read="'+k+'"'+(S.read[k]?' checked':'')+'></label></article>';
  });
  var terms=window.TERMS.filter(function(t){return t[3]===n});
  if(terms.length){h+='<h2>Thuật ngữ của chương</h2><div class="card">'+terms.map(termRow).join('')+'</div>'}
  app.innerHTML=h;
  app.onclick=function(e){var t=e.target.closest('[data-m]'); if(t){chapter.m=t.dataset.m;chapter(n);return}
    t=e.target.closest('[data-lang]'); if(t){S.set.lang=t.dataset.lang;save();var yy=window.scrollY;chapter(n);window.scrollTo(0,yy);return}
    t=e.target.closest('[data-toc]'); if(t){e.preventDefault();var el=document.getElementById('lec'+t.dataset.toc);if(el)el.scrollIntoView({block:'start'});return}
    if(e.target.closest('[data-act=test]')) startTest(n);
    if(e.target.closest('[data-act=pr]')) startPractice(S.set.shuffle?shuffle(qs):qs,'第'+n+'章','#learn/'+n)};
  app.onchange=function(e){var k=e.target.dataset.read;if(k){if(e.target.checked)S.read[k]=1;else delete S.read[k];save()}};
}
function termRow(t){return '<div class="term"><div class="w" lang="ja">'+esc(t[0])+'<small>'+esc(t[1])+'</small></div><div class="m">'+esc(t[2])+'</div></div>'}
function words(){
  setBar('用語 · Thuật ngữ','#learn');setTab('learn');
  var f=words.f||0, list=window.TERMS.filter(function(t){return !f||t[3]===f});
  var h='<div class="btns" style="margin-bottom:12px"><button class="btn primary" data-act="flash">Học bằng thẻ nhớ ('+list.length+')</button></div><div class="chips"><button class="chip'+(f?'':' on')+'" data-f="0">Tất cả</button>';
  CH.forEach(function(c){h+='<button class="chip'+(f===c.n?' on':'')+'" data-f="'+c.n+'">第'+c.n+'章</button>'});
  h+='</div><div class="card">'+list.map(termRow).join('')+'</div>';
  app.innerHTML=h;
  app.onclick=function(e){var c=e.target.closest('[data-f]');if(c){words.f=+c.dataset.f;words();return}
    if(e.target.closest('[data-act=flash]')) flash(shuffle(list.filter(function(t){return !S.known[t[0]]}).concat([])).concat(shuffle(list.filter(function(t){return S.known[t[0]]}))),0,false)};
}
function flash(list,i,open){
  setBar('Thẻ nhớ','#words',(i+1)+'/'+list.length);setTab('learn',true);
  if(i>=list.length){location.hash='#words';words();return}
  var t=list[i];
  app.innerHTML='<div class="card flash" data-act="flip"><div class="w" lang="ja">'+esc(t[0])+'</div>'+(open?'<div class="y" lang="ja">'+esc(t[1])+'</div><div class="m">'+esc(t[2])+'</div><div class="muted">第'+t[3]+'章</div>':'<div class="muted">Chạm để xem cách đọc và nghĩa</div>')+'</div>'+
    '<div class="dock"><div class="in">'+(open?'<button class="btn" data-k="0">Chưa nhớ</button><button class="btn primary" data-k="1">Đã nhớ</button>':'<button class="btn primary" data-act="flip">Lật thẻ</button>')+'</div></div>';
  app.onclick=function(e){
    var k=e.target.closest('[data-k]');
    if(k){if(k.dataset.k==='1')S.known[t[0]]=1;else delete S.known[t[0]];save();flash(list,i+1,false);return}
    if(e.target.closest('[data-act=flip]')) flash(list,i,!open);
  };
}

/* ---------- Luyện tập ---------- */
var P=null;
function practiceMenu(){
  setBar('Luyện tập');setTab('practice');
  var f=practiceMenu.f||{src:'all',ch:0};
  var pool=Q.filter(function(q){return (f.src==='all'||q.src===f.src)&&(!f.ch||q.ch===f.ch)});
  var unseen=pool.filter(function(q){return !S.q[q.id]}), wr=pool.filter(function(q){var r=S.q[q.id];return r&&!r.last});
  var h='<h2>Nguồn câu hỏi</h2><div class="chips">'+[['all','Tất cả'],['mock','Đề thi thử của khóa học'],['extra','Câu tự soạn theo bài giảng']].map(function(x){return '<button class="chip'+(f.src===x[0]?' on':'')+'" data-src="'+x[0]+'">'+x[1]+'</button>'}).join('')+'</div>';
  h+='<h2>Chương</h2><div class="chips"><button class="chip'+(f.ch?'':' on')+'" data-ch="0">Tất cả</button>'+CH.map(function(c){return '<button class="chip'+(f.ch===c.n?' on':'')+'" data-ch="'+c.n+'">第'+c.n+'章</button>'}).join('')+'</div>';
  h+='<div class="card"><b>'+pool.length+' câu</b> phù hợp · '+unseen.length+' chưa làm · '+wr.length+' đang sai'+(f.ch?'<div class="muted jp">'+esc(chName(f.ch))+'</div>':'')+'</div>';
  h+='<div class="btns"><button class="btn primary block" data-run="all"'+(pool.length?'':' disabled')+'>Làm tất cả '+pool.length+' câu</button><button class="btn block" data-run="ten"'+(pool.length?'':' disabled')+'>10 câu ngẫu nhiên</button><button class="btn block" data-run="new"'+(unseen.length?'':' disabled')+'>Chỉ câu chưa làm ('+unseen.length+')</button><button class="btn block" data-run="wrong"'+(wr.length?'':' disabled')+'>Chỉ câu đang sai ('+wr.length+')</button></div>';
  h+='<h2>Tùy chọn</h2><div class="card"><label class="sw"><span>Hiện bản dịch tiếng Việt của đề</span><input type="checkbox" data-set="vi"'+(S.set.vi?' checked':'')+'></label><label class="sw"><span>Xáo trộn thứ tự câu và phương án</span><input type="checkbox" data-set="shuffle"'+(S.set.shuffle?' checked':'')+'></label><label class="sw"><span>Sai thì cho chọn lại một lần trước khi xem đáp án<small class="muted" style="display:block">Lần đầu sai vẫn tính là sai</small></span><input type="checkbox" data-set="retry"'+(S.set.retry!==false?' checked':'')+'></label></div>';
  h+='<p class="muted">Đề thi thử của khóa học lấy từ file Excel đề và file 解答・解説 (nguồn ghi trong tài liệu: 過去問題＋解説集). Câu tự soạn được viết theo nội dung bài giảng từng chương, không phải đề chính thức.</p>';
  app.innerHTML=h;
  app.onclick=function(e){
    var b=e.target.closest('[data-src]'); if(b){f.src=b.dataset.src;practiceMenu.f=f;practiceMenu();return}
    b=e.target.closest('[data-ch]'); if(b){f.ch=+b.dataset.ch;practiceMenu.f=f;practiceMenu();return}
    b=e.target.closest('[data-run]'); if(!b||b.disabled) return;
    var sh=function(a){return S.set.shuffle?shuffle(a):a}, m=b.dataset.run;
    var list=m==='all'?sh(pool):m==='ten'?shuffle(pool).slice(0,10):m==='new'?sh(unseen):sh(wr);
    startPractice(list,m==='wrong'?'Câu đang sai':'Luyện tập','#practice');
  };
  app.onchange=function(e){var k=e.target.dataset.set;if(k){S.set[k]=e.target.checked;save()}};
}
function order(q){
  var o=[0,1,2,3]; if(S.set.shuffle) return shuffle(o);
  if(!q||q.src!=='extra') return o;
  /* câu tự soạn: hoán vị cố định theo mã câu để vị trí đáp án không bị lệch về một phía */
  var h=0,i; for(i=0;i<q.id.length;i++) h=(h*31+q.id.charCodeAt(i))>>>0;
  for(i=3;i>0;i--){h=(h*1103515245+12345)>>>0; var j=h%(i+1),t=o[i];o[i]=o[j];o[j]=t}
  return o;
}
function startPractice(list,title,back){
  if(!list.length){toast('Không có câu nào');return}
  P={list:list,i:0,title:title,back:back||'#practice',right:0,done:0,ord:order(list[0]),pick:null,miss:[],x:[]};
  if(location.hash!=='#quiz') location.hash='#quiz'; else quiz();
}
/* Kiểm tra đầu vào: 2 câu mỗi chương, ưu tiên câu chưa làm, một câu dễ (đề khóa học) và một câu tự soạn nếu có */
function startDiag(back){
  var ids=[];CH.forEach(function(c){var p=chQ(c.n),u=p.filter(function(q){return !S.q[q.id]});if(u.length<2)u=p;
    var m=shuffle(u.filter(function(q){return q.src==='mock'})),x=shuffle(u.filter(function(q){return q.src!=='mock'}));
    ids=ids.concat((m.slice(0,1).concat(x)).concat(m.slice(1)).slice(0,2))});
  startPractice(ids,'Kiểm tra đầu vào',back);
}
function qBlock(q,ord,pick,reveal,num,total,x){
  x=x||[];
  var h='<div class="qhead"><span><span class="tag">第'+q.ch+'章</span><span class="tag gray">'+(q.src==='mock'?'Đề khóa học':'Tự soạn')+'</span></span><span>'+num+' / '+total+'</span></div>';
  h+='<div class="qtext" lang="ja">'+esc(q.q)+'</div>'+(S.set.vi||reveal||x.length?'<div class="qvi">'+esc(q.vi)+'</div>':'');
  if(x.length&&!reveal) h+='<div class="warnbox retry"><b>Chưa đúng.</b> Phương án vừa chọn đã bị gạch. Đọc lại đề (bản dịch đã hiện ở trên), chú ý các từ như 必ず・のみ・最も, rồi chọn lại.</div>';
  ord.forEach(function(oi,pos){
    var cls='opt',off=reveal||x.indexOf(oi)>=0; if(reveal){if(oi===q.a)cls+=' right';else if(oi===pick||x.indexOf(oi)>=0)cls+=' wrong'} else if(x.indexOf(oi)>=0) cls+=' wrong'; else if(oi===pick) cls+=' sel';
    h+='<button class="'+cls+'" data-o="'+oi+'"'+(off?' disabled':'')+'><span class="k">'+SYM[pos]+'</span><span lang="ja">'+esc(q.o[oi])+'</span></button>';
  });
  if(reveal){
    var ok=pick===q.a&&!x.length, rightPos=SYM[ord.indexOf(q.a)];
    var ex=q.ex.replace(/[㋐㋑㋒㋓]/g,function(c){var orig='㋐㋑㋒㋓'.indexOf(c);return '【'+SYM[ord.indexOf(orig)]+'】'});
    h+='<div class="explain'+(ok?'':' no')+'"><b class="h">'+(x.length?(pick===q.a?'Đúng ở lần thử thứ hai (vẫn tính là sai)':'Sai')+' · Đáp án: '+rightPos:(pick==null?'Chưa chọn':ok?'Đúng':'Sai')+' · Đáp án: '+rightPos)+'</b>'+esc(ex)+'</div>';
    if(q.br!=null) h+='<div class="qbr">Thuộc nhánh '+(q.br+1)+' · '+esc(brName(q.ch,q.br))+' — <a href="#learn/'+q.ch+'/'+q.br+'">xem sơ đồ</a></div>';
    if(q.warn) h+='<div class="warnbox"><b>Lưu ý nguồn:</b> '+esc(q.warn.replace(/[㋐㋑㋒㋓]/g,function(c){return '【'+SYM[ord.indexOf('㋐㋑㋒㋓'.indexOf(c))]+'】'}))+'</div>';
  }
  return h;
}
function quiz(){
  if(!P){location.hash='#practice';return}
  setTab('practice',true);
  if(P.i>=P.list.length){
    setBar('Kết quả',P.back);
    var h='<div class="card result"><div class="muted">'+esc(P.title)+'</div><div class="score">'+P.right+' / '+P.done+'</div><div class="pass'+(P.right/P.done>=PASS?'':' no')+'">'+pct(P.right,P.done)+'%</div></div>';
    if(P.test){
      var by={};P.list.forEach(function(q){if(q.br==null)return;var b=by[q.br]||(by[q.br]={n:0,ok:0});b.n++;if(P.miss.indexOf(q.id)<0)b.ok++});
      /* nối kết quả với lịch ôn nhánh: sai từ một nửa trở lên → về hộp 0; sai ít → cần ôn ngay; đúng hết khi nhánh đang đến hạn → lên hộp */
      if(!P.saved){Object.keys(by).forEach(function(b){var x=by[b],k=P.test+'-'+b,d=S.mmd[k];
        if(x.ok<x.n){if((x.n-x.ok)*2>=x.n)brMark(k,false);else brSoft(k)}else if(d&&d.due<=Date.now())brMark(k,true)})}
      if(!P.saved){P.saved=1;var T=S.tests[P.test]||(S.tests[P.test]=[]);T.push({t:Date.now(),score:P.right,total:P.done,ids:P.list.map(function(q){return q.id})});if(T.length>10)T.shift();save()}
      var vd=testVerdict(pct(P.right,P.done)), lv=level(chQ(P.test));
      h+='<div class="card"><b>'+vd[0]+'</b><p class="muted" style="margin:6px 0 0">'+vd[1]+'</p><div class="lvrow">'+pips(lv.L)+'<span>Cấp chương hiện tại: '+lv.L+'/5 · '+LV[lv.L]+'</span></div></div>';
      var bk=Object.keys(by).map(Number).sort(function(a,b){return a-b});
      if(bk.length){h+='<h2>Theo nhánh sơ đồ</h2><div class="card">';bk.forEach(function(b){var x=by[b],bad=x.ok<x.n;
        h+='<div class="row brres"><span class="grow">'+(b+1)+'. '+esc(brName(P.test,b))+'</span><span class="pct'+(bad?' no':'')+'">'+x.ok+'/'+x.n+'</span>'+(bad?'<a class="btn small" href="#learn/'+P.test+'/'+b+'">Ôn nhánh</a>':'')+'</div>'});
        h+='<p class="muted" style="margin:8px 0 0">Nhánh có câu sai được đánh dấu "Đến hạn ôn" trong sơ đồ. Câu hỏi được gắn vào nhánh tự động theo từ khóa nên đôi khi lệch sang nhánh gần đó.</p></div>'}
    }
    h+='<div class="btns">';
    if(P.test) h+='<a class="btn block'+(P.miss.length?'':' primary')+'" href="#learn/'+P.test+'">Về sơ đồ chương</a>';
    if(P.miss.length) h+='<button class="btn primary block" data-act="again">Làm lại '+P.miss.length+' câu sai</button>';
    h+='<a class="btn block" href="'+P.back+'">Xong</a></div>';
    app.innerHTML=h;
    app.onclick=function(e){if(e.target.closest('[data-act=again]')){var m=P.miss.map(function(id){return QMAP[id]});startPractice(shuffle(m),'Câu vừa sai',P.back)}};
    return;
  }
  var q=P.list[P.i], reveal=P.reveal;
  setBar(P.title,P.back,P.right+' đúng');
  app.innerHTML=qBlock(q,P.ord,P.pick,reveal,P.i+1,P.list.length,P.x)+
    '<div class="dock"><div class="in">'+(reveal?'<button class="btn primary" data-act="next">'+(P.i+1<P.list.length?'Câu tiếp':'Xem kết quả')+'</button>':(P.x.length?'<button class="btn" data-act="show">Xem đáp án</button>':'')+'<button class="btn primary" data-act="check"'+(P.pick==null?' disabled':'')+'>Kiểm tra</button>')+'</div></div>';
  app.onclick=function(e){
    var o=e.target.closest('[data-o]');
    if(o&&!P.reveal&&!o.disabled){P.pick=+o.dataset.o;quiz();return}
    var a=e.target.closest('[data-act]'); if(!a||a.disabled) return;
    if(a.dataset.act==='check'){var ok=P.pick===q.a;
      if(P.x.length){P.reveal=true}                      /* lần thử thứ hai: đã tính sai ở lần đầu */
      else{P.done++;record(q.id,ok);if(ok){P.right++;P.reveal=true}else{P.miss.push(q.id);
        if(S.set.retry!==false){P.x=[P.pick];P.pick=null}else P.reveal=true}}
      quiz();window.scrollTo(0,0)}
    if(a.dataset.act==='show'){P.pick=null;P.reveal=true;quiz();window.scrollTo(0,0)}
    if(a.dataset.act==='next'){P.i++;P.pick=null;P.reveal=false;P.x=[];P.ord=order(P.list[P.i]);quiz();window.scrollTo(0,0)}
  };
}

/* ---------- Thi thử ---------- */
var tick=null;
function examMenu(){
  setBar('Thi thử');setTab('exam');clearInterval(tick);
  var h='';
  if(S.exam) h+='<div class="card"><b>Đang có bài thi dở</b><div class="muted">Đã chọn '+Object.keys(S.exam.ans).length+'/'+S.exam.ids.length+' câu · còn '+fmt((S.exam.end-Date.now())/1000)+'</div><div class="btns" style="margin-top:10px"><a class="btn primary" href="#exam/run">Làm tiếp</a><button class="btn" data-act="drop">Hủy bài này</button></div></div>';
  h+='<div class="card"><b>Đề thi thử của khóa học</b><div class="muted">'+MOCK_ORDER.length+' câu đúng thứ tự đề thầy phát (25/09/2026) · '+EXAM_MIN+' phút</div><button class="btn '+(S.exam?'':'primary ')+'block" style="margin-top:10px" data-new="mock">Bắt đầu</button></div>';
  h+='<div class="card"><b>Đề trộn ngẫu nhiên</b><div class="muted">'+EXAM_N+' câu lấy đều từ 10 chương trong toàn bộ '+Q.length+' câu · '+EXAM_MIN+' phút</div><button class="btn block" style="margin-top:10px" data-new="mix">Bắt đầu</button></div>';
  h+='<p class="muted">Trong lúc thi không hiện đáp án. Hết giờ bài tự nộp. Đạt khi đúng từ 60% (24/40).</p>';
  if(S.exams.length){h+='<h2>Lịch sử</h2>';S.exams.slice().reverse().slice(0,10).forEach(function(x){var p=pct(x.score,x.total);
    h+='<div class="item"><span class="num">'+p+'</span><span class="grow"><span class="t" style="font-family:var(--ui)">'+x.score+'/'+x.total+' · '+(p>=60?'Đạt':'Chưa đạt')+'</span><div class="s">'+(x.kind==='mock'?'Đề khóa học':'Đề trộn')+' · '+new Date(x.t).toLocaleString('vi-VN',{dateStyle:'short',timeStyle:'short'})+' · '+fmt(x.used)+'</div></span></div>'})}
  app.innerHTML=h;
  app.onclick=function(e){
    if(e.target.closest('[data-act=drop]')){if(confirm('Hủy bài thi đang làm? Các câu đã chọn sẽ mất.')){S.exam=null;save();examMenu()}return}
    var b=e.target.closest('[data-new]'); if(!b) return;
    if(S.exam&&!confirm('Bắt đầu đề mới sẽ hủy bài đang làm dở. Tiếp tục?')) return;
    var ids;
    if(b.dataset.new==='mock') ids=MOCK_ORDER.slice();
    else{ids=[];var rest=[];CH.forEach(function(c){var p=shuffle(Q.filter(function(q){return q.ch===c.n}));ids=ids.concat(p.slice(0,4).map(function(q){return q.id}));rest=rest.concat(p.slice(4))});
      ids=ids.concat(shuffle(rest).slice(0,Math.max(0,EXAM_N-ids.length)).map(function(q){return q.id})).slice(0,EXAM_N);
      ids.sort(function(a,b){return QMAP[a].ch-QMAP[b].ch})}
    var ord={};ids.forEach(function(id){ord[id]=b.dataset.new==='mock'?[0,1,2,3]:shuffle([0,1,2,3])});
    S.exam={kind:b.dataset.new,ids:ids,ord:ord,ans:{},i:0,start:Date.now(),end:Date.now()+EXAM_MIN*60000};save();location.hash='#exam/run';
  };
}
function examRun(){
  var X=S.exam; if(!X){location.hash='#exam';return}
  setTab('exam',true);clearInterval(tick);
  function left(){return (X.end-Date.now())/1000}
  function draw(){
    if(left()<=0){finish();return}
    var q=QMAP[X.ids[X.i]], n=Object.keys(X.ans).length;
    setBar('Thi thử · '+n+'/'+X.ids.length,'#exam',fmt(left()));
    var h;
    if(X.grid){
      h='<h2>Chọn câu để chuyển tới</h2><div class="grid40">'+X.ids.map(function(id,i){return '<button class="'+(X.ans[id]!=null?'done':'')+(i===X.i?' cur':'')+'" data-j="'+i+'">'+(i+1)+'</button>'}).join('')+'</div><p class="muted">Đã chọn '+n+' câu, còn '+(X.ids.length-n)+' câu trống.</p><div class="dock"><div class="in"><button class="btn" data-act="grid">Quay lại câu '+(X.i+1)+'</button><button class="btn primary" data-act="submit">Nộp bài</button></div></div>';
    }else{
      var keep=S.set.vi;S.set.vi=false;
      h=qBlock(q,X.ord[q.id],X.ans[q.id],false,X.i+1,X.ids.length);S.set.vi=keep;
      h+='<div class="dock"><div class="in"><button class="btn nar" data-act="prev" aria-label="Câu trước"'+(X.i?'':' disabled')+'>‹</button><button class="btn" data-act="grid">Danh sách câu</button>'+(X.i+1<X.ids.length?'<button class="btn primary" data-act="nextq">Tiếp ›</button>':'<button class="btn primary" data-act="submit">Nộp bài</button>')+'</div></div>';
    }
    app.innerHTML=h;
  }
  function finish(){
    clearInterval(tick);
    var score=0;X.ids.forEach(function(id){var ok=X.ans[id]===QMAP[id].a;if(ok)score++;if(X.ans[id]!=null)record(id,ok)});
    var res={t:Date.now(),kind:X.kind,score:score,total:X.ids.length,used:Math.min(EXAM_MIN*60,Math.round((Date.now()-X.start)/1000)),ids:X.ids,ans:X.ans,ord:X.ord};
    S.exams.push(res);if(S.exams.length>30)S.exams.shift();
    S.exams.forEach(function(x,i){if(i<S.exams.length-3){delete x.ids;delete x.ans;delete x.ord}});
    S.exam=null;save();location.hash='#exam/result';
  }
  app.onclick=function(e){
    var o=e.target.closest('[data-o]');
    if(o){var id=X.ids[X.i],v=+o.dataset.o;if(X.ans[id]===v)delete X.ans[id];else X.ans[id]=v;save();draw();return}
    var j=e.target.closest('[data-j]'); if(j){X.i=+j.dataset.j;X.grid=false;save();draw();window.scrollTo(0,0);return}
    var a=e.target.closest('[data-act]'); if(!a||a.disabled) return;
    var act=a.dataset.act;
    if(act==='prev'){X.i--;draw();window.scrollTo(0,0)}
    if(act==='nextq'){X.i++;draw();window.scrollTo(0,0)}
    if(act==='grid'){X.grid=!X.grid;draw();window.scrollTo(0,0)}
    if(act==='submit'){var e2=X.ids.length-Object.keys(X.ans).length;if(confirm(e2?'Còn '+e2+' câu chưa chọn. Nộp bài?':'Nộp bài?'))finish()}
    save();
  };
  draw();
  tick=setInterval(function(){if(location.hash!=='#exam/run'){clearInterval(tick);return}if(left()<=0)finish();else $('#bar-right').textContent=fmt(left())},1000);
}
function examResult(){
  var R=S.exams[S.exams.length-1]; if(!R||!R.ids){location.hash='#exam';return}
  setBar('Kết quả thi thử','#exam');setTab('exam');
  var p=pct(R.score,R.total), by={};
  R.ids.forEach(function(id){var q=QMAP[id],b=by[q.ch]||(by[q.ch]={n:0,ok:0});b.n++;if(R.ans[id]===q.a)b.ok++});
  var h='<div class="card result"><div class="score">'+R.score+' / '+R.total+'</div><div class="pass'+(p>=60?'':' no')+'">'+p+'% · '+(p>=60?'Đạt':'Chưa đạt (cần 60%)')+'</div><div class="muted" style="margin-top:8px">Thời gian: '+fmt(R.used)+'</div></div><h2>Theo chương</h2><div class="card">';
  Object.keys(by).forEach(function(c){var b=by[c];h+='<div style="margin-bottom:10px"><div class="row"><span class="grow jp">第'+c+'章 '+esc(chName(+c))+'</span><span class="pct">'+b.ok+'/'+b.n+'</span></div>'+meter(pct(b.ok,b.n),b.ok/b.n>=PASS)+'</div>'});
  h+='</div><h2>Xem lại từng câu</h2><div class="grid40">'+R.ids.map(function(id,i){return '<button class="'+(R.ans[id]===QMAP[id].a?'r':'w')+'" data-j="'+i+'">'+(i+1)+'</button>'}).join('')+'</div><div id="rev"></div>';
  app.innerHTML=h;
  app.onclick=function(e){var j=e.target.closest('[data-j]');if(!j)return;var i=+j.dataset.j,id=R.ids[i];
    $('#rev').innerHTML='<div class="card">'+qBlock(QMAP[id],R.ord[id],R.ans[id],true,i+1,R.ids.length)+'</div>';$('#rev').scrollIntoView({behavior:'smooth',block:'start'})};
}

/* ---------- Tiến độ ---------- */
function stats(){
  setBar('Tiến độ');setTab('stats');
  var st=stat(Q), due=dueList().length, sum=0;
  var h='<div class="card"><div class="row"><div class="grow"><b>'+st.ok+' / '+st.total+' câu đang đúng</b><div class="muted">Đã làm '+st.seen+' câu · '+st.tries+' lượt trả lời · tỉ lệ đúng '+pct(st.right,st.tries)+'% · '+due+' câu đến hạn ôn</div></div></div>'+meter(pct(st.ok,st.total),true)+'</div><h2>Bản đồ kỹ năng</h2><div class="card">';
  CH.forEach(function(c){var v=level(chQ(c.n));sum+=v.L;
    h+='<div class="lvline"><div class="row"><span class="grow jp">第'+c.n+'章 '+esc(c.jp)+'</span>'+pips(v.L)+'<span class="pct">'+v.L+'/5</span></div><div class="s muted">'+LV[v.L]+' · đã làm '+v.seen+'/'+v.n+' · đang đúng '+v.lr+' · vững (đúng ở ≥2 ngày) '+v.so+'</div></div>'});
  h+='<div class="row" style="border-top:1px solid var(--line);padding-top:10px"><b class="grow">Tổng</b><span class="pct">'+pct(sum,50)+'%</span></div>'+meter(pct(sum,50),true)+'</div>';
  h+='<div class="btns" style="margin:10px 0"><button class="btn" data-act="diag">Kiểm tra đầu vào 20 câu</button>'+(due?'<button class="btn primary" data-act="due">Ôn '+Math.min(due,20)+' câu đến hạn</button>':'')+'</div>';
  h+='<details class="card muted"><summary><b>Cách tính cấp</b></summary><p>Cấp tính theo câu hỏi của từng chương, phải tự làm mới lên được, và tụt xuống nếu lúc ôn lại làm sai:</p><p>1 – đã làm ≥20% số câu · 2 – đang đúng ≥40% · 3 – đang đúng ≥70% · 4 – ≥70% số câu đang đúng và đã đúng ở ít nhất 2 ngày khác nhau · 5 – như cấp 4 nhưng ≥90%.</p><p>Ôn cách quãng: câu làm đúng sẽ quay lại sau 1, 3, 7, 14, 30 ngày; làm sai thì về đầu. Làm đúng nhiều lần trong cùng một buổi không làm câu lên hộp. Mục tiêu trước khi thi: mọi chương đạt cấp 4, rồi làm đề thi thử 40 câu.</p><p>Ý tưởng lấy từ skill socratic-tutor của Jane Street (MIT), chỉnh lại cho đề trắc nghiệm.</p></details>';
  h+='<h2>Ứng dụng</h2><div class="card"><div class="row"><div class="grow"><b>'+(UPD.has?'Có bản mới':'Phiên bản')+'</b><div class="muted">Đang dùng: '+verName(UPD.cur)+(UPD.latest?' · Mới nhất: '+verName(UPD.latest):'')+'</div></div><button class="btn'+(UPD.has?' primary':'')+'" data-upd>Cập nhật</button></div><p class="muted" style="margin:8px 0 0">Bấm Cập nhật để tải bản mới nhất và mở lại app. Tiến độ học được giữ nguyên.</p></div>';
  h+='<h2>Sao lưu</h2><div class="card"><p class="muted">Tiến độ chỉ lưu trên trình duyệt của máy này. Muốn chuyển sang máy khác: xuất file ở máy cũ rồi nhập ở máy mới.</p><div class="btns"><button class="btn" data-act="exp">Xuất tiến độ</button><button class="btn" data-act="imp">Nhập tiến độ</button><button class="btn" data-act="reset">Xóa tiến độ</button></div></div>';
  h+='<h2>Nguồn dữ liệu</h2><div class="card muted">'+Q.filter(function(q){return q.src==='mock'}).length+' câu từ đề thi thử của khóa học RKU 2026 (file Excel đề + PDF 解答・解説 30/09/2026), '+Q.filter(function(q){return q.src==='extra'}).length+' câu tự soạn theo bài giảng 10 chương (標準テキスト 第4版対応). Giải thích tiếng Việt là bản viết lại; '+Q.filter(function(q){return q.warn}).length+' câu có ghi chú "Lưu ý nguồn" ở chỗ lời giải gốc đáng ngờ hoặc luật đã đổi. Đây là tài liệu ôn tập cá nhân, không phải đề chính thức của JAVADA.</div>';
  app.innerHTML=h;
  app.onclick=function(e){var a=e.target.closest('[data-act]');if(!a)return;
    if(a.dataset.act==='diag') startDiag('#stats');
    if(a.dataset.act==='due') startPractice(shuffle(dueList().slice(0,20)),'Ôn đến hạn','#stats');
    if(a.dataset.act==='exp'){var bl=new Blob([JSON.stringify(S)],{type:'application/json'}),u=URL.createObjectURL(bl),l=document.createElement('a');l.href=u;l.download='logi3-tien-do-'+new Date().toISOString().slice(0,10)+'.json';document.body.appendChild(l);l.click();l.remove();setTimeout(function(){URL.revokeObjectURL(u)},1000)}
    if(a.dataset.act==='imp') $('#import-file').click();
    if(a.dataset.act==='reset'&&confirm('Xóa toàn bộ tiến độ trên máy này? Không khôi phục được.')){S=blank();save();stats();toast('Đã xóa tiến độ')}
  };
}
$('#import-file').addEventListener('change',function(){
  var f=this.files[0],me=this; if(!f) return;
  var r=new FileReader();
  r.onload=function(){try{var d=JSON.parse(r.result);if(!d||d.v!==1||typeof d.q!=='object') throw 0;
    if(!confirm('Thay tiến độ hiện tại bằng file này?')) return;
    var b=blank();for(var k in b) if(d[k]===undefined) d[k]=b[k];S=d;save();toast('Đã nhập tiến độ');route()}catch(e){toast('File không đúng định dạng của app này')}me.value=''};
  r.readAsText(f);
});


/* ---------- Cập nhật ứng dụng ----------
   Phiên bản = VERSION trong sw.js. Bản đang chạy hỏi service worker đang điều khiển trang;
   bản mới nhất đọc thẳng sw.js trên máy chủ. Khác nhau thì hiện thanh "Có bản mới". */
var UPD={cur:null,latest:null,has:false,busy:false};
function verName(v){return v?v.replace(/^logi3-/,''):'—'}
function askCur(){
  if(!('serviceWorker' in navigator)||!navigator.serviceWorker.controller) return Promise.resolve(null);
  return new Promise(function(res){
    var t=setTimeout(function(){res(null)},1500);
    navigator.serviceWorker.addEventListener('message',function f(e){if(e.data&&e.data.version){clearTimeout(t);navigator.serviceWorker.removeEventListener('message',f);res(e.data.version)}});
    navigator.serviceWorker.controller.postMessage('version');
  });
}
function askLatest(){
  if(!navigator.onLine) return Promise.resolve(null);
  return fetch('sw.js?t='+Date.now(),{cache:'no-store'}).then(function(r){return r.ok?r.text():''}).then(function(t){var m=t.match(/VERSION='([^']+)'/);return m?m[1]:null}).catch(function(){return null});
}
function checkUpdate(){
  return Promise.all([UPD.cur?UPD.cur:askCur(),askLatest()]).then(function(v){
    if(v[0])UPD.cur=v[0]; if(v[1])UPD.latest=v[1];
    if(UPD.cur&&UPD.latest&&UPD.cur!==UPD.latest) UPD.has=true;
    updBanner(); if(location.hash==='#stats') stats();
  });
}
function updBanner(){var b=$('#upd');if(b)b.hidden=!UPD.has||UPD.busy}
function doUpdate(){
  if(!navigator.onLine){toast('Cần có mạng để cập nhật');return}
  UPD.busy=true;updBanner();toast('Đang tải bản mới…');
  var done=false;function go(){if(done)return;done=true;location.reload()}
  if(!('serviceWorker' in navigator)){go();return}
  navigator.serviceWorker.getRegistration().then(function(reg){
    if(!reg) return;
    navigator.serviceWorker.addEventListener('controllerchange',go);
    return reg.update().then(function(){return new Promise(function(res){
      var w=reg.installing||reg.waiting; if(!w) return res();
      if(reg.waiting) reg.waiting.postMessage('skip');
      w.addEventListener('statechange',function(){if(w.state==='activated'||w.state==='redundant')res()});
      setTimeout(res,10000);
    })});
  }).catch(function(){}).then(function(){setTimeout(go,300)});
}
document.addEventListener('click',function(e){if(e.target.closest('[data-upd]'))doUpdate()});
if('serviceWorker' in navigator){
  /* service worker mới tự cài trong nền và giành quyền điều khiển → trang đang chạy là bản cũ */
  var hadCtl=!!navigator.serviceWorker.controller;
  navigator.serviceWorker.addEventListener('controllerchange',function(){if(hadCtl&&!UPD.busy){UPD.has=true;updBanner()}hadCtl=true});
}
setTimeout(checkUpdate,1500);
document.addEventListener('visibilitychange',function(){if(document.visibilityState==='visible')checkUpdate()});
/* ---------- Điều hướng ---------- */
function route(){
  var h=location.hash.replace(/^#/,'')||'home', p=h.split('/');
  clearInterval(tick);app.onchange=null;
  if(p[0]==='home') home();
  else if(p[0]==='learn') p[1]?chapter(+p[1],p[2]!=null?+p[2]:null):learn();
  else if(p[0]==='words') words();
  else if(p[0]==='practice') practiceMenu();
  else if(p[0]==='quiz') quiz();
  else if(p[0]==='exam') p[1]==='run'?examRun():p[1]==='result'?examResult():examMenu();
  else if(p[0]==='stats') stats();
  else home();
  if(p[0]!=='quiz'&&!(p[0]==='exam'&&p[1]==='run')&&!(p[0]==='learn'&&p[2]!=null)) window.scrollTo(0,0);
}
window.addEventListener('hashchange',route);
route();
if('serviceWorker' in navigator&&(location.protocol==='https:'||location.hostname==='localhost')) navigator.serviceWorker.register('sw.js').catch(function(){});
window.__logi3={Q:Q,QMAP:QMAP,state:function(){return S}};
})();
