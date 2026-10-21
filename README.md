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

## Sprint 4 — Vite, TypeScript ve React

`frontend/` klasöründe Vite ile kurulmuş React + TypeScript projesi. Çalıştırmak için: `cd frontend && npm install && npm run dev` (http://localhost:5173).

| Dosya | Görevi |
| --- | --- |
| `package.json` | Proje adını, `dev`/`build` komutlarını ve kullanılan paketleri tanımlar. |
| `package-lock.json` | Yüklenen paketlerin tam sürümlerini kilitler. |
| `node_modules/` | İndirilen paketlerdir; GitHub'a gönderilmez. |
| `tsconfig*.json` | TypeScript derleyici ayarlarıdır. |
| `vite.config.ts` | Vite ayarlarıdır; React eklentisini yükler. |
| `index.html` | Tek HTML sayfasıdır; React'in çizim yaptığı boş `div#root`'u içerir. |
| `src/main.tsx` | React'i başlatır ve `App` bileşenini `#root`'a çizer. |
| `src/App.tsx` | Beş sayfanın (ana sayfa, etkinlikler, detay, ekle, güncelle) hepsini içeren ana bileşendir. |
| `src/App.css` | Sprint 3'teki numaraya göre renk ve font veren CSS'tir. |
| `src/index.css` | Tüm sayfaya genel stil dosyasıdır; bu sprintte boştur. |
| `src/types/campus-event.ts` | Bir etkinliğin tipini (`CampusEvent`) ve kategorileri tarif eder. |
| `src/data/events.ts` | Bu tipe uyan 6 etkinliğin verisidir. |
| `src/utils/filter-events.ts` | Arama, kategori filtresi ve id ile bulma yapan saf fonksiyonlardır. |
| `public/` | Olduğu gibi kopyalanan dosyalardır (`afis.svg`, `favicon.svg`). |

## Sprint 5 — React Bileşenleri

Sprint 4'teki tek parça `App.tsx` dokuz bileşene bölündü; ekran Sprint 4 ile aynı. State (`page`, `selectedId`, `searchText`, `category`) `App.tsx`'te kalır, bileşenler veriyi props ile alır, olayları callback ile bildirir.

| Bileşen | Props |
| --- | --- |
| `components/layout/Header.tsx` | `title`, `text?` |
| `components/layout/Navigation.tsx` | `current`, `onNavigate` |
| `components/layout/Footer.tsx` | — |
| `components/events/EventCard.tsx` | `event`, `onShowDetail` |
| `components/events/EventList.tsx` | `events`, `onShowDetail`, `emptyText?` |
| `components/events/EventFilter.tsx` | `searchText`, `category`, `categories`, `onSearchChange`, `onCategoryChange` |
| `components/events/EventDetail.tsx` | `event`, `onBack`, `onEdit` |
| `components/forms/EventForm.tsx` | `onSubmit` |

Yardımcı dosyalar: `src/types/page.ts` (`PageName` tipi), `src/utils/format-date.ts` (`formatDate`).
