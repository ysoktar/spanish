# spanish

<!-- spanish-study-site -->
## İspanyolca 001 + 002 çalışma sitesi

Türkçe anlatımlı çalışma sitesi: [Siteyi aç](https://ysoktar.github.io/spanish/).

- Kronolojik konu anlatımları (001 temelleri, 002'nin 7 haftası): her derste adım adım anlatım, çekim tabloları, sık yapılan hatalar ve o konuya ait defter ve slayt örneklerinin tamamı.
- **Defter notları:** ders defterinin 54 sayfası metne aktarıldı; kurallar, tablolar ve her cümlenin Türkçesi. Defterdeki hatalar düzeltildi ve “Dikkat” kutularında belirtildi. Fotoğraflar yayımlanmaz.
- **Slayt notları:** “002 semana 1–7” sunumlarında olup defterde olmayan içerik: kültür kutuları (tapas, öğün saatleri), diyaloglar, ek fiil tabloları ve alıştırmaların cevap anahtarı.
- Fiil çekimleri, kelime kartları, açıklamalı testler ve paragraf yazma alanı.
- İlerleme, test sonuçları ve yazma taslakları yalnızca tarayıcıda saklanır. Sitenin harici bağlantısı veya izleme kodu yoktur.

### Yapı

| Dosya | Görev |
| --- | --- |
| `content.js` | Dersler, fiiller, kelimeler, sorular, yazma görevleri |
| `notebook.js` | Defter notları (sayfa numaralarıyla) |
| `slides.js` | Slayt notları (hafta numaralarıyla) |
| `lessons-detail.js` | Derslerin ayrıntılı anlatımı ve her derse bağlı defter/slayt notları |
| `app.js`, `index.html`, `styles.css` | Arayüz |
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
