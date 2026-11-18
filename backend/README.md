# Kampüs Etkinlikleri — Backend (Express + MongoDB)

Etkinlikleri JSON olarak veren Express sunucusu. Sprint 8'den itibaren veri MongoDB'de (Mongoose ile) duruyor: sunucu kapanıp açılınca POST ile eklenen kayıtlar kaybolmuyor.

## Çalıştırma

```bash
cd backend
npm install
cp .env.example .env   # sonra .env'de MONGODB_URI'yi kendi adresinle değiştir
npm run seed           # veritabanına 6 örnek etkinlik (her çalıştırmada önce siler, yine 6 kayıt)
npm run dev            # http://localhost:3000 (node --watch ile)
npm start              # izlemeden çalıştırma
```

Sunucu önce veritabanına bağlanır, sonra portu dinler. Bağlantı başarılıysa terminalde `MongoDB bağlandı (Atlas): ...mongodb.net/kampus` ya da `(yerel): 127.0.0.1/kampus` yazar. Bağlantı adresi hiçbir zaman ekrana yazdırılmaz.

## Ortam değişkenleri

| Değişken | Örnek (`.env.example`) | Açıklama |
| --- | --- | --- |
| `PORT` | `3000` | Sunucunun dinlediği port; yoksa 3000. |
| `MONGODB_URI` | `mongodb://127.0.0.1:27017/kampus` | MongoDB bağlantı adresi. Gerçek değer (Atlas: `mongodb+srv://...mongodb.net/kampus`) sadece `.env`'de durur. |

`.env` GitHub'a gönderilmez (`.gitignore`). Gerçek Atlas adresi ya da şifresi kodda, README'de, `.env.example`'da veya Postman collection'ında yer almaz.

## REST sözleşmesi

| Method | Endpoint | Amaç | Başarılı | Hata | Durum |
| --- | --- | --- | --- | --- | --- |
| GET | `/health` | Sunucu ayakta mı | 200 | — | Sprint 7 |
| GET | `/events` | Listeyi getir, tarihe göre sıralı (`?category=Atölye` isteğe bağlı) | 200 | — | Sprint 8 |
| GET | `/events/:id` | Tek etkinlik (`:id` = MongoDB `_id`) | 200 | 404 | Sprint 8 |
| POST | `/events` | Yeni etkinlik (`title`, `category`, `date` zorunlu) | 201 | 400 | Sprint 8 |
| PATCH | `/events/:id` | Güncelle | 200 | 400, 404 | Sprint 9 |
| DELETE | `/events/:id` | Sil | 204 | 404 | Sprint 9 |

Status code'lar: 200 tamam · 201 oluşturuldu · 204 içerik yok · 400 eksik/yanlış veri · 404 bulunamadı · 500 beklenmeyen sunucu hatası.

Bütün hatalar aynı biçimde döner:

```json
{ "error": { "message": "Event not found" } }
```

- `/events/yok` gibi biçimi yanlış bir id de, biçimi doğru ama kaydı olmayan bir id de **404** döner (500 değil).
- Schema kuralına uymayan POST (eksik alan, listede olmayan kategori, 3 harften kısa başlık) **400** döner.
- Beklenmeyen bir hata sunucuyu durdurmaz: yanıt `500 · Server error`, ayrıntı sadece terminalde.

## Veri modeli (`src/models/event-model.js`)

| Alan | Tip | Kural |
| --- | --- | --- |
| `title` | String | zorunlu, `trim`, 3–100 karakter |
| `category` | String | zorunlu, `Seminer` · `Atölye` · `Söyleşi` · `Yarışma` |
| `capacity` | Number | en az 0, varsayılan 0 |
| `date` | String | zorunlu (`YYYY-AA-GG`) |
| `time` | String | varsayılan `""` |
| `location` | String | `trim`, varsayılan `""` |
| `description` | String | `trim`, en çok 500 karakter |
| `_id`, `createdAt`, `updatedAt` | — | MongoDB ve `timestamps` kendiliğinden ekler |

## Dosyalar

| Dosya | İşi |
| --- | --- |
| `src/app.js` | Express uygulaması, middleware (`cors`, `express.json`), `/health`, route'lar, 404 ve hata middleware'i |
| `src/server.js` | `.env`'i okur, önce veritabanına bağlanır, sonra portu dinler |
| `src/config/database.js` | `MONGODB_URI` ile MongoDB bağlantısı |
| `src/models/event-model.js` | Event schema'sı ve modeli |
| `src/routes/event-routes.js` | Hangi adres hangi fonksiyona gider |
| `src/controllers/event-controller.js` | `Event.find` / `findById` / `create` ile isteği işler |
| `src/data/seed-events.js` | 6 örnek etkinlik (id'siz) |
| `src/seed.js` | `npm run seed`: önce `deleteMany`, sonra `insertMany` |
| `requests/kampus-api.json` | Postman collection (v2.1): 6 test isteği |

## Test istekleri (`requests/kampus-api.json`)

| # | İstek | Beklenen |
| --- | --- | --- |
| 1 | `GET /health` | 200 · `status: "ok"`, `student: "2311012067"` |
| 2 | `GET /events` | 200 · seed sonrası 6 kayıt, her kayıtta `_id`, `createdAt`, `updatedAt` |
| 3 | `GET /events/{{eventId}}` | 200 · 2. isteğin listesindeki ilk kaydın `_id`'si (koleksiyon değişkeni) |
| 4 | `GET /events/yok` | 404 · error |
| 5 | `POST /events` (tam body) | 201 · yeni `_id` ve `createdAt` |
| 6 | `POST /events` (sadece title) | 400 · error (date ve category zorunlu) |

Kalıcılık testi: `npm run seed` → `npm run dev` → 5. istek (POST) → sunucuyu Ctrl+C ile durdur → tekrar `npm run dev` → `GET /events` 7 kayıt, yeni etkinlik listede.
