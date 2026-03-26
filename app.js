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
    duration:"Durée", material:"Matériel", intensity:"Intensité",
    confirmReset:"Effacer toute la planification?",
    selectPeriod:"Sélectionne d'abord une période dans l'agenda!",
    inserted:"Jeu inséré!",
    catPoursuite:"Poursuite",catCoop:"Coopération",catManip:"Manipulation",
    catBallon:"Ballon chasseur",catSport:"Sport collectif",catOppo:"Opposition"
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
    duration:"Duration", material:"Material", intensity:"Intensity",
    confirmReset:"Clear all planning?",
    selectPeriod:"Select a period in the agenda first!",
    inserted:"Game inserted!",
    catPoursuite:"Chase",catCoop:"Cooperation",catManip:"Manipulation",
    catBallon:"Dodgeball",catSport:"Team sport",catOppo:"Opposition"
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
    duration:"时长", material:"器材", intensity:"强度",
    confirmReset:"清除所有计划？",
    selectPeriod:"请先选择一个课时！",
    inserted:"已插入游戏！",
    catPoursuite:"追逐",catCoop:"合作",catManip:"操作",
    catBallon:"躲避球",catSport:"团队运动",catOppo:"对抗"
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
    duration:"Duración", material:"Material", intensity:"Intensidad",
    confirmReset:"¿Borrar toda la planificación?",
    selectPeriod:"¡Selecciona primero un período en la agenda!",
    inserted:"¡Juego insertado!",
    catPoursuite:"Persecución",catCoop:"Cooperación",catManip:"Manipulación",
    catBallon:"Quemados",catSport:"Deporte colectivo",catOppo:"Oposición"
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

// --- BUILD AGENDA TABLE ---
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

  var html = '<table class="agenda-table">';
  // Header row
  html += '<thead><tr><th class="col-period">'+t('period')+'</th>';
  for(var d=0; d<nDays; d++){
    html += '<th class="col-day '+dayColors[d%5]+'">'+dayNames[d%5]+' <span style="font-family:Schoolbell;font-size:0.75em;opacity:0.8;">('+t('day')+' '+(d+1)+')</span></th>';
  }
  html += '</tr></thead><tbody>';

  // Period rows
  for(var p=1; p<=nPeriods; p++){
    html += '<tr>';
    html += '<td class="period-label">P'+p+'</td>';
    for(var d=0; d<nDays; d++){
      var key = getKey(d,p);
      var data = agendaData[key] || {};
      var isSelected = selectedCell && selectedCell.day===d && selectedCell.period===p;

      html += '<td><div class="period-cell'+(isSelected?' selected':'')+'" data-day="'+d+'" data-period="'+p+'" onclick="selectCell('+d+','+p+')">';

      if(data.game){
        html += '<div class="cell-cat">'+escHtml(data.cat||'')+'</div>';
        html += '<div class="cell-game">'+escHtml(data.game)+'</div>';
        html += '<div class="cell-desc">'+escHtml(data.desc||'')+'</div>';
        html += '<button class="cell-clear visible" onclick="event.stopPropagation();clearCell('+d+','+p+')">&times;</button>';
      }

      html += '<textarea class="cell-notes" placeholder="'+t('notesPlaceholder')+'" oninput="saveNotes('+d+','+p+',this.value)">'+(data.notes||'')+'</textarea>';
      html += '</div></td>';
    }
    html += '</tr>';
  }

  html += '</tbody></table>';
  container.innerHTML = html;
}

function selectCell(d,p){
  selectedCell = {day:d, period:p};
  // Update visual
  document.querySelectorAll('.period-cell').forEach(function(el){ el.classList.remove('selected'); });
  var cell = document.querySelector('.period-cell[data-day="'+d+'"][data-period="'+p+'"]');
  if(cell) cell.classList.add('selected');
}

function clearCell(d,p){
  var key = getKey(d,p);
  if(agendaData[key]){
    var notes = agendaData[key].notes || '';
    agendaData[key] = {notes:notes};
    if(!notes) delete agendaData[key];
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

  // Build filter buttons
  var filterHTML = '<button class="bank-filter-btn'+(currentFilter==='all'?' active':'')+'" onclick="filterBank(\'all\')">'+t('allCat')+'</button>';
  cats.forEach(function(c){
    filterHTML += '<button class="bank-filter-btn'+(currentFilter===c?' active':'')+'" onclick="filterBank(\''+escAttr(c)+'\')">'+escHtml(c)+'</button>';
  });
  document.querySelector('.bank-filters').innerHTML = filterHTML;

  // Build cards
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
