# Kampüs Etkinlikleri — Backend (Express REST API)

Sprint 7: etkinlikleri JSON olarak veren Express sunucusu. Veri şimdilik bellekte (`src/data/events.js`); sunucu yeniden başlayınca POST ile eklenenler kaybolur.

## Çalıştırma

```bash
cd backend
npm install
cp .env.example .env   # PORT değişkeni
npm run dev            # http://localhost:3000 (node --watch ile)
npm start              # izlemeden çalıştırma
```

## Ortam değişkenleri

| Değişken | Örnek | Açıklama |
| --- | --- | --- |
| `PORT` | `3000` | Sunucunun dinlediği port. `.env` dosyasından okunur; yoksa 3000. |

`.env` GitHub'a gönderilmez (`.gitignore`), hangi değişkenlerin gerektiği `.env.example`'da yazar.

## REST sözleşmesi

| Method | Endpoint | Amaç | Başarılı | Hata | Durum |
| --- | --- | --- | --- | --- | --- |
| GET | `/health` | Sunucu ayakta mı | 200 | — | Bu sprint |
| GET | `/events` | Listeyi getir (`?category=Atölye` isteğe bağlı) | 200 | — | Bu sprint |
| GET | `/events/:id` | Tek etkinlik | 200 | 404 | Bu sprint |
| POST | `/events` | Yeni etkinlik (`title`, `category`, `date` zorunlu) | 201 | 400 | Bu sprint |
| PATCH | `/events/:id` | Güncelle | 200 | 400, 404 | Sprint 9 |
| DELETE | `/events/:id` | Sil | 204 | 404 | Sprint 9 |

Status code'lar: 200 tamam · 201 oluşturuldu · 204 içerik yok · 400 eksik/yanlış veri · 404 bulunamadı.

Bütün hatalar aynı biçimde döner:

```json
{ "error": { "message": "Event not found" } }
```

## Dosyalar

| Dosya | İşi |
| --- | --- |
| `src/app.js` | Express uygulaması, middleware (`cors`, `express.json`), `/health`, route'ları bağlar, 404 |
| `src/server.js` | `.env`'i okur, portu dinler |
| `src/routes/event-routes.js` | Hangi adres hangi fonksiyona gider |
| `src/controllers/event-controller.js` | İsteği işler, yanıtı döndürür |
| `src/data/events.js` | Bellek içi 6 etkinlik |
| `requests/kampus-api.json` | Postman collection (v2.1): 6 test isteği |

## Test istekleri

| # | İstek | Beklenen |
| --- | --- | --- |
| 1 | `GET /health` | 200 · `status: "ok"`, `student: "2311012067"` |
| 2 | `GET /events` | 200 · 6 kayıt |
| 3 | `GET /events/event-2` | 200 · event-2 |
| 4 | `GET /events/yok` | 404 · error |
| 5 | `POST /events` (tam body) | 201 · yeni id |
| 6 | `POST /events` (sadece title) | 400 · error |
