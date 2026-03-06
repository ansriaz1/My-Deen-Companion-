let lang='en';
function changeLang(){lang=document.getElementById('lang-select').value;loadVerse();loadHadith();}

function openTab(tab){document.querySelectorAll(".tab-content").forEach(c=>c.classList.remove("active"));document.getElementById(tab).classList.add("active");document.querySelectorAll(".tab-btn").forEach(b=>b.classList.remove("active"));event.currentTarget.classList.add("active");}
function toggleMode(){document.body.classList.toggle("light-mode");}

async function loadVerse(){const res=await fetch('verses.json');const verses=await res.json();const v=verses[Math.floor(Math.random()*verses.length)];document.getElementById('verse-text').innerText=v[lang];}
async function loadHadith(){const res=await fetch('hadiths.json');const hadiths=await res.json();const h=hadiths[Math.floor(Math.random()*hadiths.length)];document.getElementById('hadith-text').innerText=h[lang];}
loadVerse();loadHadith();

let count=localStorage.getItem("tasbeeh")||0;
let tasStreak=localStorage.getItem("tas-streak")||0;
let tasHistory=localStorage.getItem("tas-history")||0;
document.getElementById("tasbeeh-count").innerText=count;
document.getElementById("tasbeeh-streak").innerText=tasStreak;
document.getElementById("tasbeeh-history").innerText=tasHistory;
function increaseTasbeeh(){count++;tasStreak++;tasHistory++;document.getElementById("tasbeeh-count").innerText=count;document.getElementById("tasbeeh-streak").innerText=tasStreak;document.getElementById("tasbeeh-history").innerText=tasHistory;localStorage.setItem("tasbeeh",count);localStorage.setItem("tas-streak",tasStreak);localStorage.setItem("tas-history",tasHistory);}
function resetTasbeeh(){count=tasStreak=tasHistory=0;document.getElementById("tasbeeh-count").innerText=count;document.getElementById("tasbeeh-streak").innerText=tasStreak;document.getElementById("tasbeeh-history").innerText=tasHistory;localStorage.setItem("tasbeeh",0);localStorage.setItem("tas-streak",0);localStorage.setItem("tas-history",0);}

const prayers=['Fajr','Zuhr','Asr','Maghrib','Isha'];
function savePrayers(){let data={};prayers.forEach(p=>data[p.toLowerCase()]=document.getElementById(p.toLowerCase()).checked);localStorage.setItem('prayers',JSON.stringify(data));let streak=localStorage.getItem('prayer-streak')||0;streak++;localStorage.setItem('prayer-streak',streak);let hist=localStorage.getItem('prayer-history')||0;hist++;localStorage.setItem('prayer-history',hist);document.getElementById('prayer-streak').innerText=streak;document.getElementById('prayer-history').innerText=hist;notifyPrayer("Prayer Reminder","Time for your prayer!");}
let saved=JSON.parse(localStorage.getItem('prayers'))||{};
prayers.forEach(p=>{if(saved[p.toLowerCase()])document.getElementById(p.toLowerCase()).checked=true;});
document.getElementById('prayer-streak').innerText=localStorage.getItem('prayer-streak')||0;
document.getElementById('prayer-history').innerText=localStorage.getItem('prayer-history')||0;

const deeds=["Help parents","Give charity","Smile","Read Quran","Pray extra rakah","Make dua","Feed someone","Visit sick","Forgive someone","Share knowledge"];
function newDeed(){document.getElementById("deed-text").innerText=deeds[Math.floor(Math.random()*deeds.length)];}

function shareText(id){const text=document.getElementById(id).innerText;if(navigator.share){navigator.share({text:text}).catch(err=>console.log(err));}else{alert("Copy to share:\n\n"+text);}}

function notifyPrayer(title,msg){if("Notification" in window && Notification.permission==="granted") new Notification(title,{body:msg});else if(Notification.permission!=="granted") Notification.requestPermission();}

function updateDate(){const date=new Date();document.getElementById("greg-date").innerText=date.toDateString();const hijri=Math.floor(date.getTime()/86400000)+227015;document.getElementById("hijri-date").innerText="Hijri Day: "+hijri;}
setInterval(updateDate,60000);updateDate();

if(window.DeviceOrientationEvent){window.addEventListener('deviceorientation', function(event){let alpha=event.alpha;document.getElementById('qibla').style.transform="rotate("+alpha+"deg)";});}

function renderProgress(){const t=localStorage.getItem('tas-streak')||0;const p=localStorage.getItem('prayer-streak')||0;const svg=`<svg width="300" height="100"><rect x="0" y="50" width="${t*10}" height="20" fill="#22c55e"/><rect x="0" y="80" width="${p*10}" height="20" fill="#16a34a"/></svg>`;document.getElementById('progress-chart').innerHTML=svg;}
setInterval(renderProgress,60000);renderProgress();
