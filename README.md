https://web-programming-ismail.vercel.app

# Kampüs Etkinlikleri

Web Programlama dersi projesi. Fakültedeki seminer, atölye ve söyleşileri listeleyen bir uygulama.

- **Canlı adres:** https://web-programming-ismail.vercel.app
- **Hazırlayan:** İsmail Kervankıran

## Sprint 1 — HTML, Git ve Yayına Alma

`sprint1/` klasöründe yalnızca HTML ile yazılmış sayfalar (CSS ve JavaScript yok):

- `index.html` — ana sayfa, etkinlik listesi
- `etkinlik-detay.html` — etkinlik detayı
- `etkinlik-ekle.html` — etkinlik ekleme formu
- `etkinlik-guncelle.html` — etkinlik güncelleme formu

## Sprint 2 — CSS ve Responsive Tasarım

`sprint2/` klasörü Sprint 1'in kopyası üzerine CSS giydirilmiş hali:

- `css/2311012067.css` — numaradan türetilen renk (ton 347) ve font (Palatino Linotype)
- `etkinlikler.html` — tüm etkinlikler kart olarak (yeni sayfa)
- Ana sayfada tablo yerine yaklaşan 2 etkinlik kartı
- Telefonda tek sütun, geniş ekranda birden fazla sütun

## Görsel kaynağı

`afis.jpg`: "2019 University of Michigan Green Career Fair" — University of Michigan School for Environment and Sustainability, [CC BY 2.0](https://creativecommons.org/licenses/by/2.0), [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:2019_University_of_Michigan_Green_Career_Fair_(48727056903).jpg)

## Sprint 3 — JavaScript ve DOM

`sprint3/` klasörü Sprint 2'nin kopyası üzerine JavaScript modülleri eklenmiş hali (Live Server ile açılmalı: `http://127.0.0.1:5500/sprint3/`):

- `js/data.js` — 6 etkinliklik veri dizisi
- `js/event-list.js` — kartları veriden üretir; ana sayfada yaklaşan 2 etkinlik, liste sayfasında arama + kategori filtresi
- `js/event-detail.js` — `?id=` ile doğru etkinliği açar, geçersiz id'de hata kutusu
- `js/event-form.js` — ekleme/güncelleme formu doğrulaması, hata ve başarı mesajı
