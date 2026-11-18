# Kampüs Etkinlik Rehberi — Express & MongoDB REST API (Sprint 8)

Bu servis, Kampüs Etkinlik Rehberi frontend uygulamasının bağlanacağı Node.js + Express + MongoDB (Mongoose ORM) tabanlı kalıcı veri katmanına sahip REST API backend servisidir.

## Öğrenci Bilgileri
* **Adı Soyadı:** Emir Demir
* **Öğrenci Numarası:** 2416501048
* **Bölüm:** Bilgisayar Mühendisliği

---

## Kurulum ve Çalıştırma

Gereksinimler: **Node.js 18+** ve **npm**

```bash
# Backend klasörüne geçin
cd backend

# Bağımlılıkları yükleyin
npm install

# Başlangıç verilerini veritabanına yükleyin (İdempotent seed scripti)
npm run seed

# Geliştirme modunda başlatın (nodemon ile otomatik yenileme)
npm run dev

# Üretim modunda başlatın
npm start
```

Sunucu varsayılan olarak `http://localhost:3000` adresinde çalışır.

---

## Ortam Değişkenleri (.env)

`backend/.env.example` dosyasını referans alarak bir `.env` dosyası oluşturun:

```env
PORT=3000
STUDENT_ID=2416501048
MONGODB_URI=mongodb+srv://<kullanici>:<sifre>@cluster0.ab12c.mongodb.net/kampus?retryWrites=true&w=majority
```

> **Önemli Güvenlik Kuralı:** `.env` ve `node_modules` dosyaları `.gitignore` ile korunmakta olup kesinlikle GitHub'a gönderilmemelidir.

---

## REST Sözleşmesi

| Method | Yol (Path) | Açıklama | Başarılı Durum Kodu | Hata Durum Kodu | Gövde (Body) / Parametre |
|---|---|---|---|---|---|
| `GET` | `/health` | Sağlık kontrolü ve öğrenci no | `200 OK` | - | - |
| `GET` | `/events` | MongoDB'deki tüm etkinlikler (kategori filtresi: `?category=Atölye`) | `200 OK` | `500` | Query: `category` (opsiyonel) |
| `GET` | `/events/:id` | Tek etkinlik detayı | `200 OK` | `404 Not Found` | Parametre: `:id` (Geçersiz format veya bulunamayan ID 404 döner, asla 500 dönmez) |
| `POST` | `/events` | Yeni etkinlik ekleme | `201 Created` | `400 Bad Request` | JSON Body: `title`, `category`, `capacity` (min: 1), `date`, `time`, `location`, `description` |
| `PUT` | `/events/:id` | Etkinlik güncelleme | `200 OK` | `400 / 404` | Parametre: `:id`, JSON Body: Güncellenecek alanlar |
| `DELETE` | `/events/:id` | Etkinlik silme | `200 OK` | `404` | Parametre: `:id` |

### Hata Yanıt Formatı (400 / 404)
```json
{
  "error": {
    "message": "Event not found"
  }
}
```

---

## Postman Testleri

Hazır Postman koleksiyonu `backend/requests/kampus-api.json` yolunda bulunmaktadır.

Koleksiyon içindeki test istekleri:
1. `GET http://localhost:3000/health` (200 OK - `student: 2416501048`)
2. `GET http://localhost:3000/events` (200 OK - MongoDB etkinlik listesi)
3. `GET http://localhost:3000/events/:id` (200 OK - Geçerli `_id` ile etkinlik detayı)
4. `GET http://localhost:3000/events/yok` (404 Not Found - Hatalı formatta ID)
5. `POST http://localhost:3000/events` (201 Created - Tam gövdeli etkinlik)
6. `POST http://localhost:3000/events` (400 Bad Request - Eksik zorunlu alanlar, sunucu çökmez)
