# spanish

<!-- spanish-study-site -->
## İspanyolca 001–004 çalışma sitesi

Türkçe anlatımlı çalışma sitesi: [Siteyi aç](https://ysoktar.github.io/spanish/).

- Kronolojik konu anlatımları (001 temelleri, 002'nin 10 haftası): her derste adım adım anlatım, çekim tabloları, sık yapılan hatalar ve o konuya ait defter ve slayt örneklerinin tamamı.
- **Defter notları:** ders defterinin 54 sayfası metne aktarıldı; kurallar, tablolar ve her cümlenin Türkçesi. Defterdeki hatalar düzeltildi ve “Dikkat” kutularında belirtildi. Fotoğraflar yayımlanmaz.
- **Slayt notları:** “002 semana 1–10” sunumlarında olup defterde olmayan içerik: kültür kutuları (tapas, öğün saatleri), diyaloglar, ek fiil tabloları ve alıştırmaların cevap anahtarı.
- **İSP 003 ve 004 (A2):** Prisma A2’nin 12 ünitesi; 003 = Ünite 1–6, 004 = Ünite 7–12. Konu sırası Edinumen’in yayımladığı Prisma A2 (Continúa) içindekiler listesinden alındı, anlatımlar genel dil bilgisine göre yazıldı; kitap metni yoktur. Slaytlar gelince güncellenecek.
- **Kitap üniteleri:** Nuevo Prisma A1 (Edición ampliada) ve Prisma A2 ünite haritası, her ünitenin sitedeki dersleriyle. Kitabın metni yer almaz.
- **Hafta 9:** pretérito perfectonun kuruluşu (haber + participio, düzensiz participiolar, dönüşlüler), zaman belirteçleri, Lucía’nın günü ve diyalog; alıştırmaların cevapları.
- **Hafta 10:** pretérito perfecto (ya / todavía no, Madrid), pretérito indefinido (düzenli, dönüşlü, zaman belirteçleri) ve düzensiz indefinido fiillerinin beş grubu; slayttaki alıştırmaların cevap anahtarı.
- **Son konular (slayt bekleniyor):** nesne zamirleri, işaret sözcükleri, karşılaştırma ve üstünlük; genel dil bilgisine dayanır, slayt gelince güncellenecek.
- **Fiil çekimleri:** kurs (001–004) ve çekim (10 zaman) seçimi; her çekimin hangi kursta öğretildiği etiketli (İSP 001–004) ve o çekimi anlatan derslere bağlantı; kurs seçilince yalnızca o kursa kadar öğrenilen çekimler gösterilir; fiil kartında seçili fiilin bütün zamanları ve ilk geçtiği ders.
- **Gramer kuralları:** bütün derslerin kuralları, sık yapılan hataları (✗ → ✓) ve ipuçları tek sayfada; arama, kurs filtresi ve konu dizini.
- **Telefon:** alt gezinme çubuğu, üst çubukta sayfa adı ve arama, dar ekranda kart görünümüne geçen tablolar, kaydırma ipucu, yukarı dön düğmesi. Ana ekrana eklenebilir (PWA); açılan sayfalar çevrimdışı da açılır.
- Ana sayfada “kaldığın yerden devam et”, testlerde klavye kısayolları (A–D / 1–4, Enter).
- Fiil çekimleri, kelime kartları, açıklamalı testler ve paragraf yazma alanı.
- İlerleme, test sonuçları ve yazma taslakları yalnızca tarayıcıda saklanır. Sitenin harici bağlantısı veya izleme kodu yoktur.

### Yapı

| Dosya | Görev |
| --- | --- |
| `content.js` | Dersler, fiiller, kelimeler, sorular, yazma görevleri |
| `notebook.js` | Defter notları (sayfa numaralarıyla) |
| `slides.js` | Slayt notları (hafta numaralarıyla) |
| `conjugations.js` | Çekim motoru: 10 zamanın biçimleri (indefinido, imperfecto, futuro, condicional, subjuntivo, emirler…) ve düzensiz participiolar |
| `lessons-detail.js` | Derslerin ayrıntılı anlatımı ve her derse bağlı defter/slayt notları |
| `app.js`, `index.html`, `styles.css` | Arayüz |
| `manifest.webmanifest`, `sw.js`, `icon-*.png` | Ana ekrana ekleme ve çevrimdışı önbellek |
| `scripts/build.mjs` | `dist/` klasörünü üretir; veri dosyalarını tarayıcı için `data.js` olarak birleştirir |
| `tests/site.test.mjs` | İçerik ve derleme testleri |

### Yerel çalıştırma

Node.js 22 gerekir.

```bash
node --test tests/site.test.mjs
```

```bash
node scripts/build.mjs
```

Ardından `dist/index.html` dosyasını tarayıcıda aç ya da `python3 -m http.server -d dist 8000` ile yerel sunucu başlat.

### Yayın (GitHub Actions)

`main` dalına her gönderimde `.github/workflows/pages.yml` testleri çalıştırır, siteyi derler ve GitHub Pages'e yayımlar. Pull request'lerde yalnızca test ve derleme çalışır.

İlk kurulumda bir kez: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
