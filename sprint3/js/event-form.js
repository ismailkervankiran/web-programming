import { events } from "./data.js";

const form = document.querySelector("#etkinlik-formu");
const mesaj = document.querySelector("#form-mesaj");
const guncelleModu = form.dataset.mode === "guncelle";

// Güncelleme sayfası: adresteki id ile etkinliği bul, formu doldur
let etkinlik;

if (guncelleModu) {
  const id = new URLSearchParams(location.search).get("id");
  etkinlik = events.find((e) => e.id === id);

  if (etkinlik) {
    form.elements.ad.value = etkinlik.title;
    form.elements.kategori.value = etkinlik.category;
    // "12-10-2026" → "2026-10-12" (date alanının istediği biçim)
    form.elements.tarih.value = etkinlik.date.split("-").reverse().join("-");
    form.elements.saat.value = etkinlik.time;
    form.elements.yer.value = etkinlik.location;
    form.elements.kontenjan.value = etkinlik.capacity;
    form.elements.aciklama.value = etkinlik.description;
  } else {
    form.outerHTML = `
      <p class="hata-kutusu">Güncellenecek etkinlik seçilmedi. Önce listeden bir etkinlik seçin, detay sayfasındaki "Bu etkinliği güncelle" butonunu kullanın.</p>
      <p><a href="etkinlikler.html" class="buton">Etkinliklere git</a></p>`;
  }
}

// Hatalı alanı işaretle ya da eski hatasını temizle
function alanDurumu(ad, hata) {
  const alan = form.elements[ad];
  const hataYeri = document.querySelector(`#${ad}-hata`);

  if (hata) {
    hataYeri.textContent = hata;
    alan.setAttribute("aria-invalid", "true");
  } else {
    hataYeri.textContent = "";
    alan.removeAttribute("aria-invalid");
  }
}

if (!guncelleModu || etkinlik) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const fd = new FormData(form);
    const tarih = fd.get("tarih");
    const kontenjan = fd.get("kontenjan").trim();

    const data = {
      id: guncelleModu ? etkinlik.id : `event-${events.length + 1}`,
      title: fd.get("ad").trim(),
      category: fd.get("kategori"),
      // "2026-11-24" → "24-11-2026" (data.js ile aynı biçim)
      date: tarih ? tarih.split("-").reverse().join("-") : "",
      time: fd.get("saat"),
      location: fd.get("yer").trim(),
      capacity: kontenjan === "" ? null : Number(kontenjan),
      description: fd.get("aciklama").trim()
    };

    const errors = {};
    if (data.title.length < 3) errors.ad = "Etkinlik adı en az 3 karakter olmalı.";
    if (data.category === "") errors.kategori = "Bir kategori seçin.";
    if (data.date === "") errors.tarih = "Tarih seçin.";
    if (data.time === "") errors.saat = "Saat seçin.";
    if (data.location === "") errors.yer = "Yer bilgisini yazın.";
    if (data.capacity !== null &&
        !(Number.isInteger(data.capacity) && data.capacity >= 1 && data.capacity <= 1000)) {
      errors.kontenjan = "Kontenjan 1 ile 1000 arasında olmalı.";
    }

    ["ad", "kategori", "tarih", "saat", "yer", "kontenjan"].forEach((ad) => {
      alanDurumu(ad, errors[ad]);
    });

    if (Object.keys(errors).length > 0) {
      mesaj.className = "hata-kutusu";
      mesaj.textContent = "Formda hatalı alanlar var. Kırmızı alanları düzeltin.";
      return;
    }

    const basariMetni = guncelleModu
      ? "Etkinlik güncellendi (bu sprintte kaydedilmez):"
      : "Etkinlik oluşturuldu (bu sprintte kaydedilmez):";

    mesaj.className = "basari-kutusu";
    mesaj.innerHTML = `<p>${basariMetni}</p><pre></pre>`;
    mesaj.querySelector("pre").textContent = JSON.stringify(data, null, 2);
  });
}
