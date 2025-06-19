const rootElem = document.getElementById('areaSelector');

// 都道府県リストをfetch
async function getPrefs() {
    const res = await fetch('./prefectures.json');
    return await res.json();
}

// 市区町村リストをfetch
async function getCities(prefCode) {
    const res = await fetch(`./cities/${prefCode}.json`);
    return await res.json();
}

// 都道府県のoptionタグを作成
function createPrefOptionsHtml(prefs) {
    const optionStrs = ['<option value="">都道府県を選択</option>'];
    for (const pref of prefs) {
        optionStrs.push(`<option value="${pref.code}">${pref.name}</option>`);
    }
    rootElem.querySelector('.prefectures').innerHTML = optionStrs.join('');
}

// 市区町村のoptionタグを作成
function createCityOptionsHtml(cities) {
    const optionStrs = ['<option value="">市区町村を選択</option>'];
    for (const city of cities) {
        optionStrs.push(`<option value="${city.code}">${city.name}</option>`);
    }
    rootElem.querySelector('.cities').innerHTML = optionStrs.join('');
}

// 都道府県プルダウン更新
async function updatePref() {
    const prefs = await getPrefs();
    createPrefOptionsHtml(prefs);
}

// 市区町村プルダウン更新
async function updateCity() {
    const prefSelector = rootElem.querySelector('.prefectures');
    const prefCode = prefSelector.value;
    if (!prefCode) {
        createCityOptionsHtml([]);
        return;
    }
    const cities = await getCities(prefCode);
    createCityOptionsHtml(cities);
}

// 初期化
async function initAreaSelector() {
    await updatePref();
    await updateCity();
}

// イベント登録
rootElem.querySelector('.prefectures').addEventListener('change', updateCity);

// 実行
initAreaSelector();
// ここまでが都道府県・市区町村選択のコード