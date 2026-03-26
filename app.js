// ==========================================
// MA SUPPLÉANCE EPS — Zone Total Sport
// ==========================================

// --- i18n ---
var T = {
  fr: {
    appTitle:"MA SUPPLÉANCE", lblLevel:"Niveau scolaire", lblDays:"Nombre de jours",
    lblPeriods:"Périodes / jour", lvlPresc:"Préscolaire / Maternelle", lvlC1:"1er Cycle (1re-2e)",
    lvlC2:"2e Cycle (3e-4e)", lvlC3:"3e Cycle (5e-6e)",
    bankTitle:"BANQUE DE JEUX", bankSub:"Clique sur un jeu pour le copier dans une période!",
    allCat:"Tous", insertBtn:"INSÉRER DANS LA PÉRIODE",
    period:"Période", day:"Jour",
    dayNames:["Lundi","Mardi","Mercredi","Jeudi","Vendredi"],
    notesPlaceholder:"Notes / consignes...",
    timePlaceholder:"ex: 9h00-9h50",
    survLabel:"SURVEILLANCE",
    survPlaceholder:"Lieu / détails...",
    survTimePh:"ex: 10h15",
    duration:"Durée", material:"Matériel", intensity:"Intensité",
    confirmReset:"Effacer toute la planification?",
    selectPeriod:"Sélectionne d'abord une période dans l'agenda (clique sur la case)!",
    inserted:"Jeu inséré!"
  },
  en: {
    appTitle:"MY SUBSTITUTE PLAN", lblLevel:"School level", lblDays:"Number of days",
    lblPeriods:"Periods / day", lvlPresc:"Preschool / Kindergarten", lvlC1:"Cycle 1 (Gr. 1-2)",
    lvlC2:"Cycle 2 (Gr. 3-4)", lvlC3:"Cycle 3 (Gr. 5-6)",
    bankTitle:"GAME BANK", bankSub:"Click a game to copy it into a period!",
    allCat:"All", insertBtn:"INSERT INTO PERIOD",
    period:"Period", day:"Day",
    dayNames:["Monday","Tuesday","Wednesday","Thursday","Friday"],
    notesPlaceholder:"Notes / instructions...",
    timePlaceholder:"e.g. 9:00-9:50",
    survLabel:"SUPERVISION",
    survPlaceholder:"Location / details...",
    survTimePh:"e.g. 10:15",
    duration:"Duration", material:"Material", intensity:"Intensity",
    confirmReset:"Clear all planning?",
    selectPeriod:"Select a period in the agenda first (click a cell)!",
    inserted:"Game inserted!"
  },
  zh: {
    appTitle:"我的代课计划", lblLevel:"学段", lblDays:"天数",
    lblPeriods:"每日课时", lvlPresc:"学前班", lvlC1:"第一学段 (1-2年级)",
    lvlC2:"第二学段 (3-4年级)", lvlC3:"第三学段 (5-6年级)",
    bankTitle:"游戏库", bankSub:"点击游戏将其复制到课时中！",
    allCat:"全部", insertBtn:"插入到课时",
    period:"课时", day:"天",
    dayNames:["周一","周二","周三","周四","周五"],
    notesPlaceholder:"备注/说明...",
    timePlaceholder:"如：9:00-9:50",
    survLabel:"监督",
    survPlaceholder:"地点/详情...",
    survTimePh:"如：10:15",
    duration:"时长", material:"器材", intensity:"强度",
    confirmReset:"清除所有计划？",
    selectPeriod:"请先点击一个课时格子！",
    inserted:"已插入游戏！"
  },
  es: {
    appTitle:"MI SUPLENCIA", lblLevel:"Nivel escolar", lblDays:"Número de días",
    lblPeriods:"Períodos / día", lvlPresc:"Preescolar", lvlC1:"1er Ciclo (1°-2°)",
    lvlC2:"2° Ciclo (3°-4°)", lvlC3:"3er Ciclo (5°-6°)",
    bankTitle:"BANCO DE JUEGOS", bankSub:"¡Haz clic en un juego para copiarlo en un período!",
    allCat:"Todos", insertBtn:"INSERTAR EN EL PERÍODO",
    period:"Período", day:"Día",
    dayNames:["Lunes","Martes","Miércoles","Jueves","Viernes"],
    notesPlaceholder:"Notas / instrucciones...",
    timePlaceholder:"ej: 9:00-9:50",
    survLabel:"VIGILANCIA",
    survPlaceholder:"Lugar / detalles...",
    survTimePh:"ej: 10:15",
    duration:"Duración", material:"Material", intensity:"Intensidad",
    confirmReset:"¿Borrar toda la planificación?",
    selectPeriod:"¡Selecciona primero un período (clic en la celda)!",
    inserted:"¡Juego insertado!"
  }
};

var currentLang = localStorage.getItem('suppl_lang') || 'fr';
function t(k){ return (T[currentLang]||T.fr)[k] || T.fr[k] || k; }

function setLang(lang){
  currentLang = lang;
  localStorage.setItem('suppl_lang', lang);
  document.querySelectorAll('[data-i18n]').forEach(function(el){
    var k = el.getAttribute('data-i18n');
    if(T[lang][k] !== undefined) el.textContent = T[lang][k];
  });
  document.querySelectorAll('.lang-btn').forEach(function(b){
    b.classList.toggle('lang-active', b.textContent.trim() === ({fr:'FR',en:'EN',zh:'中文',es:'ES'})[lang]);
  });
  refreshAll();
}

// --- STATE ---
var selectedCell = null; // {day, period}
var agendaData = JSON.parse(localStorage.getItem('suppl_agenda') || '{}');
var currentGameForInsert = null;

function saveAgenda(){
  localStorage.setItem('suppl_agenda', JSON.stringify(agendaData));
}

function getKey(d,p){ return d+'-'+p; }
function getSurvKey(d,i){ return 'surv-'+d+'-'+i; }
function getTimeKey(d,p){ return 'time-'+d+'-'+p; }

// --- BUILD AGENDA ---
function refreshAll(){
  buildAgenda();
  buildBank();
}

function buildAgenda(){
  var nDays = parseInt(document.getElementById('sel-days').value);
  var nPeriods = parseInt(document.getElementById('sel-periods').value);
  var container = document.getElementById('agenda-container');
  var dayNames = t('dayNames');
  var dayColors = ['day-color-0','day-color-1','day-color-2','day-color-3','day-color-4'];

  var html = '<div class="agenda-days-wrap">';

  for(var d=0; d<nDays; d++){
    html += '<div class="agenda-day-col">';

    // Day header
    html += '<div class="agenda-day-header '+dayColors[d%5]+'">';
    html += '<h3>'+dayNames[d%5]+'</h3>';
    html += '<span>'+t('day')+' '+(d+1)+'</span>';
    html += '</div>';

    // Day body
    html += '<div class="agenda-day-body">';

    for(var p=1; p<=nPeriods; p++){
      var key = getKey(d,p);
      var timeKey = getTimeKey(d,p);
      var data = agendaData[key] || {};
      var timeVal = agendaData[timeKey] || '';
      var isSelected = selectedCell && selectedCell.day===d && selectedCell.period===p;

      html += '<div class="period-card'+(isSelected?' selected':'')+'" id="pc-'+d+'-'+p+'">';

      // Header with period badge + time input
      html += '<div class="period-card-header">';
      html += '<span class="period-badge">P'+p+'</span>';
      html += '<input type="text" class="period-time-input" placeholder="'+t('timePlaceholder')+'" value="'+escAttr(timeVal)+'" onchange="saveTime('+d+','+p+',this.value)" />';
      html += '</div>';

      // Body (clickable for selection + game display)
      html += '<div class="period-card-body" onclick="selectCell('+d+','+p+')" style="position:relative">';

      if(data.game){
        html += '<div class="cell-cat">'+escHtml(data.cat||'')+'</div>';
        html += '<div class="cell-game">'+escHtml(data.game)+'</div>';
        html += '<div class="cell-desc">'+escHtml(data.desc||'')+'</div>';
        html += '<button class="cell-clear visible" onclick="event.stopPropagation();clearCell('+d+','+p+')">&times;</button>';
      }

      html += '<textarea class="cell-notes" placeholder="'+t('notesPlaceholder')+'" oninput="saveNotes('+d+','+p+',this.value)" onclick="event.stopPropagation()">'+(data.notes||'')+'</textarea>';
      html += '</div>'; // period-card-body

      html += '</div>'; // period-card

      // Surveillance between periods (except after last)
      if(p < nPeriods){
        var survKey = getSurvKey(d,p);
        var survData = agendaData[survKey] || {};
        html += '<div class="surv-card">';
        html += '<span class="surv-badge">👁 '+t('survLabel')+'</span>';
        html += '<input type="text" class="surv-time" placeholder="'+t('survTimePh')+'" value="'+escAttr(survData.time||'')+'" onchange="saveSurv('+d+','+p+',\'time\',this.value)" />';
        html += '<input type="text" class="surv-input" placeholder="'+t('survPlaceholder')+'" value="'+escAttr(survData.text||'')+'" onchange="saveSurv('+d+','+p+',\'text\',this.value)" />';
        html += '</div>';
      }
    }

    // Final surveillance (after last period — e.g. end of day)
    var survKeyEnd = getSurvKey(d,nPeriods);
    var survDataEnd = agendaData[survKeyEnd] || {};
    html += '<div class="surv-card">';
    html += '<span class="surv-badge">👁 '+t('survLabel')+'</span>';
    html += '<input type="text" class="surv-time" placeholder="'+t('survTimePh')+'" value="'+escAttr(survDataEnd.time||'')+'" onchange="saveSurv('+d+','+nPeriods+',\'time\',this.value)" />';
    html += '<input type="text" class="surv-input" placeholder="'+t('survPlaceholder')+'" value="'+escAttr(survDataEnd.text||'')+'" onchange="saveSurv('+d+','+nPeriods+',\'text\',this.value)" />';
    html += '</div>';

    html += '</div>'; // agenda-day-body
    html += '</div>'; // agenda-day-col
  }

  html += '</div>'; // agenda-days-wrap
  container.innerHTML = html;
}

function selectCell(d,p){
  selectedCell = {day:d, period:p};
  document.querySelectorAll('.period-card').forEach(function(el){ el.classList.remove('selected'); });
  var card = document.getElementById('pc-'+d+'-'+p);
  if(card) card.classList.add('selected');
}

function clearCell(d,p){
  var key = getKey(d,p);
  if(agendaData[key]){
    var notes = agendaData[key].notes || '';
    agendaData[key] = notes ? {notes:notes} : undefined;
    if(!notes) delete agendaData[key];
    else agendaData[key] = {notes:notes};
    saveAgenda();
    buildAgenda();
  }
}

function saveNotes(d,p,val){
  var key = getKey(d,p);
  if(!agendaData[key]) agendaData[key] = {};
  agendaData[key].notes = val;
  saveAgenda();
}

function saveTime(d,p,val){
  var key = getTimeKey(d,p);
  agendaData[key] = val;
  saveAgenda();
}

function saveSurv(d,p,field,val){
  var key = getSurvKey(d,p);
  if(!agendaData[key]) agendaData[key] = {};
  agendaData[key][field] = val;
  saveAgenda();
}

// --- GAME BANK ---
function getGamesForLevel(){
  var level = document.getElementById('sel-level').value;
  return JEUX_BANK[level] ? JEUX_BANK[level].jeux : [];
}

function getCategories(games){
  var cats = {};
  games.forEach(function(g){ cats[g.cat] = true; });
  return Object.keys(cats);
}

var currentFilter = 'all';

function buildBank(){
  var games = getGamesForLevel();
  var cats = getCategories(games);

  var filterHTML = '<button class="bank-filter-btn'+(currentFilter==='all'?' active':'')+'" onclick="filterBank(\'all\')">'+t('allCat')+'</button>';
  cats.forEach(function(c){
    filterHTML += '<button class="bank-filter-btn'+(currentFilter===c?' active':'')+'" onclick="filterBank(\''+escAttr(c)+'\')">'+escHtml(c)+'</button>';
  });
  document.querySelector('.bank-filters').innerHTML = filterHTML;

  var filtered = currentFilter==='all' ? games : games.filter(function(g){ return g.cat === currentFilter; });
  var html = '';
  filtered.forEach(function(g, i){
    html += '<div class="bank-card" data-cat="'+escAttr(g.cat)+'" onclick="showGame('+i+')">';
    html += '<div class="card-cat">'+escHtml(g.cat)+'</div>';
    html += '<div class="card-title">'+escHtml(g.titre)+'</div>';
    html += '<div class="card-desc">'+escHtml(g.desc)+'</div>';
    html += '<div class="card-tags">';
    html += '<span class="card-tag">⏱ '+g.duree+'</span>';
    html += '<span class="card-tag">🔥 '+g.intensite+'</span>';
    if(g.materiel && g.materiel !== 'Aucun') html += '<span class="card-tag">🎒 '+escHtml(g.materiel)+'</span>';
    html += '</div></div>';
  });
  document.getElementById('bank-grid').innerHTML = html;
}

function filterBank(cat){
  currentFilter = cat;
  buildBank();
}

// --- GAME MODAL ---
function showGame(idx){
  var games = currentFilter==='all' ? getGamesForLevel() : getGamesForLevel().filter(function(g){ return g.cat===currentFilter; });
  var g = games[idx];
  if(!g) return;
  currentGameForInsert = g;

  document.getElementById('modal-game-title').textContent = g.titre;
  document.getElementById('modal-game-meta').innerHTML =
    '<span>📂 '+escHtml(g.cat)+'</span>'+
    '<span>⏱ '+escHtml(g.duree)+'</span>'+
    '<span>🔥 '+escHtml(g.intensite)+'</span>'+
    (g.materiel!=='Aucun'?'<span>🎒 '+escHtml(g.materiel)+'</span>':'');
  document.getElementById('modal-game-desc').innerHTML = '<p>'+escHtml(g.desc)+'</p>';

  var btn = document.getElementById('btn-insert');
  btn.style.display = 'block';
  btn.textContent = t('insertBtn');

  document.getElementById('gameModal').classList.add('open');
}

function closeModal(){
  document.getElementById('gameModal').classList.remove('open');
  currentGameForInsert = null;
}

function insertGameToPeriod(){
  if(!selectedCell){
    alert(t('selectPeriod'));
    return;
  }
  if(!currentGameForInsert) return;

  var key = getKey(selectedCell.day, selectedCell.period);
  var existing = agendaData[key] || {};
  agendaData[key] = {
    game: currentGameForInsert.titre,
    cat: currentGameForInsert.cat,
    desc: currentGameForInsert.desc,
    notes: existing.notes || ''
  };
  saveAgenda();
  closeModal();
  buildAgenda();
}

// --- RESET ---
function resetAll(){
  if(confirm(t('confirmReset'))){
    agendaData = {};
    localStorage.removeItem('suppl_agenda');
    selectedCell = null;
    buildAgenda();
  }
}

// --- UTILS ---
function escHtml(s){ if(!s) return ''; var d=document.createElement('div'); d.textContent=s; return d.innerHTML; }
function escAttr(s){ return s?s.replace(/"/g,'&quot;').replace(/'/g,'&#39;'):''; }

// --- INIT ---
setLang(currentLang);
