(function() {
const dicts = {};
async function loadDict(lang) {
if (dicts[lang]) return dicts[lang];
const res = await fetch(`/i18n/${lang}.json`);
const json = await res.json();
dicts[lang] = json;
return json;
}


async function applyI18n(lang) {
const dict = await loadDict(lang);
document.querySelectorAll('[data-i18n]').forEach(el => {
const key = el.getAttribute('data-i18n');
if (dict[key]) {
if ('title' in el.dataset) {
el.title = dict[key];
}
if (el.tagName.toLowerCase() === 'input' && el.placeholder !== undefined && dict[key]) {
el.placeholder = dict[key];
}
// Default: text content
el.textContent = dict[key];
}
});
}


async function setLang(lang) {
localStorage.setItem(LS_KEY, lang);
setDirLang(lang);
await applyI18n(lang);
}


// Hook up UI
document.addEventListener('click', (e) => {
const btn = e.target.closest('.lang-btn');
if (!btn) return;
const lang = btn.dataset.lang;
if (supported.includes(lang)) setLang(lang);
});


// Initialize
setDirLang(current);
applyI18n(current);


// Optional: dynamically set Google Form link if provided via data attributes or query
const gform = document.getElementById('gform');
const gformLink = document.getElementById('gform-link');
const params = new URLSearchParams(location.search);
const formUrl = params.get('form') || '';
if (gform && formUrl) {
gform.src = formUrl;
if (gformLink) gformLink.href = formUrl;
}
})();
