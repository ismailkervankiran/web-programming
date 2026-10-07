import { events } from "./data.js";

const container = document.querySelector("#detay");
const baslik = document.querySelector("#sayfa-basligi");

// "12-10-2026" → Date
function tarihNesnesi(tarih) {
  const [gun, ay, yil] = tarih.split("-").map(Number);
  return new Date(yil, ay - 1, gun);
}

// Adresten gelen metni HTML'e güvenle yazmak için
function kacis(metin) {
  const div = document.createElement("div");
  div.textContent = metin;
  return div.innerHTML;
}

const id = new URLSearchParams(location.search).get("id");
const event = events.find((e) => e.id === id);

if (!event) {
  document.title = "Etkinlik bulunamadı";
  baslik.textContent = "Etkinlik bulunamadı";

  const mesaj = id
    ? `"${kacis(id)}" numaralı bir etkinlik yok. Listeden bir etkinlik seçin.`
    : "Bir etkinlik seçilmedi. Listeden bir etkinlik seçin.";

  container.innerHTML = `
    <p class="hata-kutusu">${mesaj}</p>
    <p><a href="etkinlikler.html" class="buton">← Listeye dön</a></p>`;
} else {
  const tarih = tarihNesnesi(event.date);
  const uzunTarih = tarih.toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
  const kisaTarih = tarih.toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long"
  });

  document.title = event.title;
  baslik.textContent = event.title;

  container.innerHTML = `
    <figure>
      <div class="afis">
        <p class="afis-baslik">${event.title.replace(/\s*\d{4}$/, "")}</p>
        <p class="afis-yil">${tarih.getFullYear()}</p>
        <p>${kisaTarih} · ${event.location}</p>
      </div>
      <figcaption>${event.title} afişi</figcaption>
    </figure>

    <section class="kunye">
      <h2>Etkinlik Künyesi</h2>
      <dl>
        <dt>Tarih</dt>
        <dd>${uzunTarih}, ${event.time}</dd>
        <dt>Yer</dt>
        <dd>${event.location}</dd>
        <dt>Kategori</dt>
        <dd>${event.category}</dd>
        <dt>Kontenjan</dt>
        <dd>${event.capacity} kişi</dd>
      </dl>
    </section>

    <section class="aciklama">
      <h2>Açıklama</h2>
      <p>${event.description}</p>
      <p class="butonlar">
        <a href="etkinlikler.html" class="buton">← Listeye dön</a>
        <a href="etkinlik-guncelle.html?id=${event.id}" class="buton">Bu etkinliği güncelle</a>
      </p>
    </section>`;
}
