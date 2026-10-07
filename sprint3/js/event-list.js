import { events } from "./data.js";

const list = document.querySelector("#etkinlik-listesi");

// "12-10-2026" → "12 Ekim 2026"
function okunurTarih(tarih) {
  const [gun, ay, yil] = tarih.split("-").map(Number);
  return new Date(yil, ay - 1, gun).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}

// "12-10-2026" → "2026-10-12" (sıralama için)
function siralamaAnahtari(tarih) {
  return tarih.split("-").reverse().join("-");
}

function createCard(event) {
  return `<article class="kart">
    <h2>${event.title}</h2>
    <p class="etiket">${event.category}</p>
    <p>Tarih: ${okunurTarih(event.date)}, ${event.time}</p>
    <p>Yer: ${event.location}</p>
    <p>Kontenjan: ${event.capacity} kişi</p>
    <p>${event.description}</p>
    <a href="etkinlik-detay.html?id=${event.id}">Detayları gör</a>
  </article>`;
}

function render(dizi) {
  list.innerHTML = dizi.map(createCard).join("");
}

// Ana sayfa: data-limit varsa sadece tarihi en yakın etkinlikler
if (list.dataset.limit) {
  const yaklasan = [...events]
    .sort((a, b) => siralamaAnahtari(a.date).localeCompare(siralamaAnahtari(b.date)))
    .slice(0, Number(list.dataset.limit));
  render(yaklasan);
} else {
  render(events);
}

// Etkinlikler sayfası: arama + kategori filtresi
const filtreFormu = document.querySelector("#filtre-formu");

if (filtreFormu) {
  const arama = document.querySelector("#arama");
  const kategoriFiltre = document.querySelector("#kategori-filtre");
  const sonucSatiri = document.querySelector("#sonuc");

  // Kategori seçenekleri veriden, her biri bir kez
  const kategoriler = [...new Set(events.map((e) => e.category))];
  kategoriFiltre.innerHTML += kategoriler
    .map((k) => `<option value="${k}">${k}</option>`)
    .join("");

  function filtrele() {
    const aranan = arama.value.trim().toLocaleLowerCase("tr-TR");
    const secilen = kategoriFiltre.value;

    const sonuc = events.filter((e) => {
      const metin = `${e.title} ${e.category} ${e.location} ${e.description}`
        .toLocaleLowerCase("tr-TR");
      const metinUyuyor = metin.includes(aranan);
      const kategoriUyuyor = secilen === "" || e.category === secilen;
      return metinUyuyor && kategoriUyuyor;
    });

    render(sonuc);

    if (sonuc.length === 0) {
      sonucSatiri.textContent = "Aramanıza uygun etkinlik bulunamadı.";
    } else {
      sonucSatiri.textContent = `${sonuc.length} etkinlik listeleniyor.`;
    }
  }

  arama.addEventListener("input", filtrele);
  kategoriFiltre.addEventListener("change", filtrele);
  filtreFormu.addEventListener("submit", (e) => e.preventDefault());

  filtrele();
}
