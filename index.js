import axios from 'axios';

export async function ipAdresimiAl() {
  return await axios({
    method: 'get',
    url: 'https://apis.ergineer.com/ipadresim',
  }).then(function (response) {
    return response.data;
  });
}

export async function getData() {
  const ip = await ipAdresimiAl();
  const response = await axios.get(`https://apis.ergineer.com/ipgeoapi/${ip}`);
  return response.data;
}

export function cardOlustur(data) {
  const pick = (...keys) => {
    for (const k of keys) {
      if (data[k] !== undefined && data[k] !== null) return data[k];
    }
    return undefined;
  };

  const ip = pick('sorgu', 'ip', 'query');
  const ulke = pick('ülke', 'ulke', 'country', 'country_name');
  const ulkeKodu = pick('ülkeKodu', 'ulkeKodu', 'countryCode', 'country_code');
  const enlem = pick('enlem', 'lat', 'latitude');
  const boylam = pick('boylam', 'lon', 'longitude');
  const sehir = pick('şehir', 'sehir', 'city');
  const saatdilimi = pick('saatdilimi', 'saat_dilimi', 'timezone', 'time_zone');
  const parabirimi = pick(
    'parabirimi',
    'paraBirimi',
    'para_birimi',
    'currency'
  );
  const isp = pick('isp', 'org', 'organization');

  const card = document.createElement('div');
  card.className = 'card';

  const img = document.createElement('img');
  img.src =
    'https://flaglog.com/codes/standardized-rectangle-120px/' +
    ulkeKodu +
    '.png';
  card.appendChild(img);

  const info = document.createElement('div');
  info.className = 'card-info';

  const h3 = document.createElement('h3');
  h3.className = 'ip';
  h3.textContent = ip;
  info.appendChild(h3);

  const pUlke = document.createElement('p');
  pUlke.className = 'ulke';
  pUlke.textContent = `${ulke} (${ulkeKodu})`;
  info.appendChild(pUlke);

  const pLoc = document.createElement('p');
  pLoc.textContent = `Enlem: ${enlem} Boylam: ${boylam}`;
  info.appendChild(pLoc);

  const pSehir = document.createElement('p');
  pSehir.textContent = `Şehir: ${sehir}`;
  info.appendChild(pSehir);

  const pSaat = document.createElement('p');
  pSaat.textContent = `Saat dilimi: ${saatdilimi}`;
  info.appendChild(pSaat);

  const pPara = document.createElement('p');
  pPara.textContent = `Para birimi: ${parabirimi}`;
  info.appendChild(pPara);

  const pIsp = document.createElement('p');
  pIsp.textContent = `ISP: ${isp}`;
  info.appendChild(pIsp);

  card.appendChild(info);

  return card;
}
