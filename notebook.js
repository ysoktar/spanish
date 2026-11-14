// Defter notları: 54 sayfalık el yazısı ders defterinin metne aktarılmış hâli.
// Fotoğraflar yayımlanmaz; yalnızca içerik, düzeltilmiş ve düzenlenmiş olarak burada durur.
// Kişisel bilgi içeren serbest paragraflar aynı dil bilgisini kullanan genel örneklerle değiştirildi.
const NP=(h,rows)=>({t:"pairs",h,rows});          // İspanyolca → Türkçe satırlar
const NT=(h,head,rows)=>({t:"table",h,head,rows}); // tablo
const NR=(h,rows)=>({t:"rules",h,rows});           // kural / açıklama satırları
const NF=text=>({t:"note",text});                  // dikkat / düzeltme notu
const NN=(id,course,pages,title,summary,blocks)=>({id,course,pages,title,summary,blocks});

export const notebook=[
NN("n-pronunciacion","001",[2,3],"Alfabe ve okunuş","Harflerin sesleri, c/g/q kuralları ve her harf için örnek sözcük.",[
 NR("Okunuş kuralları",[
  ["c","e, i önünde s/peltek s (cinco); a, o, u önünde k (casa, cama, cuatro)."],
  ["g","a, o, u önünde g (gato, gustar); e, i önünde gırtlaktan h (general, gitano)."],
  ["gue / gui","u okunmaz, g sert kalır: Guernica, guerrero."],
  ["que / qui","u okunmaz, k sesi: qué, quién, querer."],
  ["h","Okunmaz: ¡Hola!"],
  ["j","Gırtlaktan h: junio, julio."],
  ["ñ","ny sesi: España, año, español."],
  ["ll","Bölgeye göre y, ş, j veya c gibi: Mallorca, llamarse, calle."],
  ["v","b gibi okunur: vivir, Valencia."],
  ["y","yo’daki gibi y; tek başına “i” sesi verir ve “ve” bağlacıdır."],
  ["z","Peltek z veya s: zapatos."],
  ["x","ks ya da h: taxi, examen; México’da h."]
 ]),
 NP("Harf harf örnek sözcükler",[
  ["árbol","ağaç"],["beber","içmek"],["cama · casa","yatak · ev"],["cuatro · cinco","dört · beş"],["dinero","para"],["enero · febrero","ocak · şubat"],
  ["gato · general · gitano","kedi · genel · çingene"],["gustar","hoşa gitmek"],["junio · julio","haziran · temmuz"],["inglés","İngiliz(ce)"],["kilo","kilo"],
  ["lunes · martes","pazartesi · salı"],["nueve · ocho","dokuz · sekiz"],["año","yıl"],["llamarse","adı … olmak"],["calle","cadde, sokak"],
  ["perro","köpek"],["rey","kral"],["sábado","cumartesi"],["tener","sahip olmak"],["uno","bir"],["vivir","yaşamak"],["zapatos","ayakkabılar"]
 ])
]),
NN("n-articulos","001",[4],"Artikeller: el, la, los, las","Cinsiyet ve çoğul kuralları, istisna isimler.",[
 NT("Belirli artikel",["","Tekil","Çoğul"],[["Eril","el libro","los libros"],["Dişil","la mesa","las mesas"]]),
 NR("Cinsiyet ipuçları",[
  ["el","Genelde -o ve -or ile biten isimler: el libro, el profesor."],
  ["la","Genelde -a, -dad, -ción, -sión ile biten isimler: la mesa, la ciudad, la educación, la profesión."],
  ["el / la","-ista ve -ante ile bitenler iki cinsiyette aynı kalır: el/la taxista, el/la futbolista, el/la estudiante."]
 ]),
 NR("Çoğul yapma",[
  ["Ünlüyle biten + s","turco → turcos, turca → turcas, mesa → mesas"],
  ["Ünsüzle biten + es","profesor → profesores, ciudad → ciudades, profesión → profesiones, educación → educaciones"]
 ]),
 NF("İstisnalar: el tema, el sistema, el problema, el día, el mapa (-a ile bittiği hâlde eril); la mano, la foto, la moto (-o ile bittiği hâlde dişil).")
]),
NN("n-presente-regular","001",[5,6],"Düzenli fiiller: presente","-ar, -er, -ir fiillerinin şimdiki zaman çekimi ve ilk cümleler.",[
 NT("Çekim ekleri",["Şahıs","-ar","-er","-ir"],[["yo","-o","-o","-o"],["tú","-as","-es","-es"],["él / ella / usted","-a","-e","-e"],["nosotros/as","-amos","-emos","-imos"],["vosotros/as","-áis","-éis","-ís"],["ellos / ellas / ustedes","-an","-en","-en"]]),
 NT("Örnek çekimler",["Şahıs","hablar (konuşmak)","comer (yemek)","vivir (yaşamak)"],[["yo","hablo","como","vivo"],["tú","hablas","comes","vives"],["él / ella","habla","come","vive"],["nosotros","hablamos","comemos","vivimos"],["vosotros","habláis","coméis","vivís"],["ellos / ellas","hablan","comen","viven"]]),
 NR("Aynı kalıpla çekilen diğer fiiller",[["-ar","estudiar (çalışmak/okumak), trabajar (çalışmak)"],["-er","beber (içmek), leer (okumak)"],["-ir","escribir (yazmak), subir (çıkmak), partir (ayrılmak)"]]),
 NP("Cümleler",[
  ["(Yo) hablo español.","İspanyolca konuşurum."],["(Yo) no hablo español.","İspanyolca konuşmam."],["¿Hablas español?","İspanyolca konuşur musun?"],
  ["Emre come pizza. / Emre no come pizza.","Emre pizza yer. / Emre pizza yemez."],["Eylül y yo bebemos café con leche en el jardín.","Eylül ve ben bahçede sütlü kahve içeriz."],
  ["Laura trabaja en un banco.","Laura bir bankada çalışır."],["¿Melisa y Emre estudian español con el profesor Aydın?","Melisa ve Emre Aydın hocayla İspanyolca çalışıyor mu?"],
  ["¿Canan escribe una carta a Eylül a veces?","Canan bazen Eylül’e mektup yazar mı?"]
 ]),
 NP("Küçük sözcükler",[["siempre","her zaman"],["a veces","bazen"],["la carta","mektup"],["en · de · a","-de · -in · -e"]]),
 NF("Olumsuzluk için fiilden hemen önce no gelir: Emre no come pizza.")
]),
NN("n-pizarra","001",[7,8,9],"Tahta cümleleri ve kelimeler","Derste tahtaya yazılan cümlelerin düzeltilmiş hâli.",[
 NP("Cümleler",[
  ["Mi novia me canta.","Sevgilim bana şarkı söylüyor."],["Mi tía bebe té a veces.","Teyzem bazen çay içer."],
  ["Estudio español porque es un idioma muy bonito.","İspanyolca öğreniyorum çünkü çok güzel bir dil."],["¿Quieres bailar conmigo?","Benimle dans etmek ister misin?"],
  ["La profesora habla español y explica muy bien.","Öğretmen İspanyolca konuşuyor ve çok iyi anlatıyor."],["¿Cantas bien?","İyi şarkı söyler misin?"],
  ["Mi tía normalmente trabaja mucho y llega tarde a casa.","Teyzem genelde çok çalışır ve eve geç gelir."],["Tengo dos hermanos y una hermana.","İki erkek kardeşim ve bir kız kardeşim var."],
  ["Nosotros dibujamos el pájaro verde.","Yeşil kuşu çiziyoruz."],["Mi novio siempre mira la tele.","Sevgilim hep televizyon izler."],
  ["Nosotros compramos fruta fresca.","Taze meyve alırız."],["Mis amigos y yo cantamos en voz alta.","Arkadaşlarım ve ben yüksek sesle şarkı söyleriz."],
  ["Ahmet hace deporte en el gimnasio.","Ahmet spor salonunda spor yapar."],["El profesor necesita explicar la lección.","Öğretmenin dersi anlatması gerekiyor."],
  ["Tú quieres viajar.","Sen seyahat etmek istiyorsun."],["Mi amigo come en casa con su familia.","Arkadaşım evde ailesiyle yemek yer."],
  ["Ankara es una ciudad muy bonita.","Ankara çok güzel bir şehir."],["Ella toca el piano.","O piyano çalar."],
  ["No necesito ChatGPT para escribir tres frases.","Üç cümle yazmak için ChatGPT’ye ihtiyacım yok."],["Voy a la universidad por la mañana.","Sabahları üniversiteye giderim."],
  ["¿Abres la ventana, por favor?","Pencereyi açar mısın lütfen?"]
 ]),
 NP("Kelimeler",[
  ["gastar dinero","para harcamak"],["la granja","çiftlik"],["la ciudad","şehir"],["mucho/a/os/as","çok"],["el verano","yaz"],["afuera / las afueras","dışarı / şehrin dışı"],
  ["mirar","bakmak, izlemek"],["la noche","gece"],["la estrella","yıldız"],["el pájaro","kuş"],["dibujar","çizmek"],["verde","yeşil"],["el cuaderno","defter"],
  ["viajar","seyahat etmek"],["cenar","akşam yemeği yemek"],["las tonterías","saçmalık"],["¿por qué?","neden?"],["porque","çünkü"]
 ]),
 NR("Yakında gelecek fiiller",[["saber","bilmek (öğrenilmiş bilgi)"],["conocer","tanımak (kişi, yer); kişiden önce a: Conozco a Ana."],["jugar","oynamak (u → ue: juego)"],["dar","vermek (doy)"]]),
 NF("Defterdeki düzeltmeler: “un idioma muy bonita” → bonito (idioma eril); “la profesora hablo” → habla; “compramas” → compramos; “en vos alta” → en voz alta; “necesite explicar le lección” → necesita explicar la lección. “la mañana” sabah, “mañana” tek başına yarın.")
]),
NN("n-reflexivos","001",[10],"Dönüşlü fiiller ve tanışma","me/te/se/nos/os/se zamirleri; kendini ve başkasını tanıtma.",[
 NT("Dönüşlü çekim",["Şahıs","llamarse","ducharse","lavarse","levantarse"],[["yo","me llamo","me ducho","me lavo","me levanto"],["tú","te llamas","te duchas","te lavas","te levantas"],["él / ella","se llama","se ducha","se lava","se levanta"],["nosotros","nos llamamos","nos duchamos","nos lavamos","nos levantamos"],["vosotros","os llamáis","os ducháis","os laváis","os levantáis"],["ellos / ellas","se llaman","se duchan","se lavan","se levantan"]]),
 NT("Üç fiil daha",["Şahıs","bañarse (banyo yapmak)","apellidarse (soyadı … olmak)","despertarse (uyanmak, e→ie)"],[["yo","me baño","me apellido","me despierto"],["tú","te bañas","te apellidas","te despiertas"],["él / ella","se baña","se apellida","se despierta"],["nosotros","nos bañamos","nos apellidamos","nos despertamos"],["vosotros","os bañáis","os apellidáis","os despertáis"],["ellos / ellas","se bañan","se apellidan","se despiertan"]]),
 NR("Aynı grupta",[["acostarse","yatmak (o → ue: me acuesto)"],["vestirse","giyinmek (e → i: me visto)"],["casarse","evlenmek"],["afeitarse","tıraş olmak"]]),
 NP("Tanıtım kalıbı",[
  ["Soy Aydın. Soy de Turquía. Soy turco.","Ben Aydın. Türkiye’denim. Türküm."],["Hablo inglés, español, turco y portugués. Vivo en Ankara.","İngilizce, İspanyolca, Türkçe ve Portekizce konuşurum. Ankara’da yaşarım."],
  ["Ella es Sofía Vergara. Es de Colombia. Es colombiana.","Bu Sofía Vergara. Kolombiyalı."],["Habla inglés y español. Vive en Miami.","İngilizce ve İspanyolca konuşur. Miami’de yaşar."],
  ["Ella es Ester Expósito. Es de España. Es española.","Bu Ester Expósito. İspanyol."],["Habla español. Vive en Madrid.","İspanyolca konuşur. Madrid’de yaşar."]
 ]),
 NF("Zamir çekimli fiilden önce gelir: me levanto, te duchas. Nosotros/vosotros’ta despertarse kök değiştirmez: nos despertamos.")
]),
NN("n-genero-plural","001",[11,14],"İsim cinsiyeti, çoğul ve sıfat uyumu","-z → -ces, karışık cinsiyetli isimler, sıfatların isme uyması.",[
 NP("Cümleler",[
  ["Compro chocolate para repartir en clase el miércoles.","Çarşamba sınıfta dağıtmak için çikolata alıyorum."],["Mis clases de español son los miércoles y los sábados.","İspanyolca derslerim çarşamba ve cumartesi."],
  ["Me levanto para ir a la universidad.","Üniversiteye gitmek için kalkarım."],["Nosotros aprendemos español en clase.","Sınıfta İspanyolca öğreniriz."],
  ["Serp y Hilmi van al cine.","Serp ve Hilmi sinemaya gidiyor."],["¿Cómo estáis?","Nasılsınız?"],["Libro del alumno","Öğrenci kitabı"],["Todos los días me lavo la cara.","Her gün yüzümü yıkarım."]
 ]),
 NR("Kurallar",[
  ["a + el = al","Voy al cine (a el değil)."],["de + el = del","El libro del alumno (de el değil)."],
  ["-z → -ces","el lápiz → los lápices; el pez → los peces; la nariz → las narices"],
  ["y → e","i/hi ile başlayan sözcükten önce: español e inglés"],
  ["Vücut ve iyelik","İspanyolca vücut için iyelik yerine artikel kullanır: me lavo la cara (mi cara değil)."]
 ]),
 NP("Artikeliyle öğren",[
  ["el dependiente / la dependienta","tezgâhtar"],["el / la policía","polis"],["el / la periodista","gazeteci"],["la yegua","kısrak"],["la dirección","adres, yön"],
  ["el tema · el día · el mapa · el problema","konu · gün · harita · sorun"],["el cartel · el garaje · el tomate · el café","afiş · garaj · domates · kahve"],["los sacapuntas","kalemtıraş"],
  ["la lección · la canción · la leche","ders · şarkı · süt"],["la foto · la moto · la mano","fotoğraf · motosiklet · el"],["el martes · el tres · el mar","salı · üç · deniz"]
 ]),
 NT("Sıfat uyumu (yalnız -o → -a değişir)",["İsim","Tekil","Çoğul"],[["libro (eril)","el libro rojo","los libros rojos"],["mesa (dişil)","la mesa roja","las mesas rojas"],["ventana","la ventana blanca","las ventanas blancas"],["cuaderno / silla","el cuaderno verde · la silla verde","los cuadernos verdes · las sillas verdes"],["ordenador","el ordenador gris","los ordenadores grises"],["libro + naranja","el libro naranja","los libros naranjas"]]),
 NP("Zıtlar",[["grande × pequeño/a","büyük × küçük"],["El libro es rojo. / Los libros son rojos.","Kitap kırmızı. / Kitaplar kırmızı."]])
]),
NN("n-irregulares","001",[12],"Düzensiz fiiller","querer, tener, ser, ir, ver, hacer, estar, salir.",[
 NT("Çekimler",["Şahıs","querer","tener","ser","ir","ver"],[["yo","quiero","tengo","soy","voy","veo"],["tú","quieres","tienes","eres","vas","ves"],["él / ella","quiere","tiene","es","va","ve"],["nosotros","queremos","tenemos","somos","vamos","vemos"],["vosotros","queréis","tenéis","sois","vais","veis"],["ellos / ellas","quieren","tienen","son","van","ven"]]),
 NT("Çekimler (devam)",["Şahıs","hacer","estar","salir"],[["yo","hago","estoy","salgo"],["tú","haces","estás","sales"],["él / ella","hace","está","sale"],["nosotros","hacemos","estamos","salimos"],["vosotros","hacéis","estáis","salís"],["ellos / ellas","hacen","están","salen"]]),
 NR("Düzensizlerin de düzeni var",[["Kök değişimi","quiero, tienes… ama nosotros/vosotros’ta kök değişmez: queremos, tenemos."],["Yalnız yo düzensiz","hago, salgo, pongo, veo"],["o → ue","poder (puedo), volver (vuelvo)"],["poder","yardımcı fiil gibi mastarla kullanılır: Puedo venir."]])
]),
NN("n-numeros","001",[13],"Sayılar 0–101","Sayı kalıpları, örnek alıştırma ve dört işlem.",[
 NT("0–30",["0–10","11–20","21–30"],[["cero · uno · dos · tres","once · doce · trece","veintiuno · veintidós · veintitrés"],["cuatro · cinco · seis","catorce · quince · dieciséis","veinticuatro · veinticinco · veintiséis"],["siete · ocho · nueve · diez","diecisiete · dieciocho · diecinueve · veinte","veintisiete · veintiocho · veintinueve · treinta"]]),
 NR("Kalıplar",[["16–19","dieci- + birler: dieciséis, diecinueve"],["21–29","veinti- + birler, tek sözcük: veintidós"],["31’den sonra","onlar + y + birler: treinta y uno, cuarenta y dos, cincuenta y tres"],["Onlar","treinta, cuarenta, cincuenta, sesenta, setenta, ochenta, noventa"],["100 / 101","cien / ciento uno"]]),
 NP("Alıştırma",[["18 · 14 · 24","dieciocho · catorce · veinticuatro"],["43 · 49 · 54","cuarenta y tres · cuarenta y nueve · cincuenta y cuatro"],["64 · 67 · 71","sesenta y cuatro · sesenta y siete · setenta y uno"],["96 · 99 · 100","noventa y seis · noventa y nueve · cien"]]),
 NP("Dört işlem",[["+ más","artı"],["− menos","eksi"],["× por","çarpı"],["÷ entre","bölü"],["= igual","eşittir"],["Dos más tres igual a cinco.","İki artı üç eşittir beş."]])
]),
NN("n-hay","001",[15,19],"Hay, estar ve mucho/poco","Sınıfta ne var? Belirsiz varlık için hay, yer için estar.",[
 NP("¿Qué hay en la clase?",[
  ["Hay muchos libros.","Çok kitap var."],["Hay muchos bolígrafos.","Çok tükenmez kalem var."],["Hay unos rotuladores.","Birkaç keçeli kalem var."],["Hay unas mesas y unas sillas.","Birkaç masa ve sandalye var."],
  ["Hay una papelera y un borrador.","Bir çöp kutusu ve bir silgi var."],["Hay una cafetería en el jardín.","Bahçede bir kafeterya var."],["Hay muchas manzanas en la caja.","Kutuda çok elma var."],["Hay unas manzanas en mi mochila.","Çantamda birkaç elma var."]
 ]),
 NR("Hay mi, estar mı?",[["hay","haber fiilinden; belirsiz şeylerin varlığı: Hay un banco cerca."],["estar","Belirli bir şeyin yeri: El banco está cerca. · Estoy en mi casa. · Estamos en el estadio."],["un / el","Un libro de Yavuz (Yavuz’un kitaplarından biri) · El libro de Yavuz (Yavuz’un o kitabı)"]]),
 NR("mucho / poco",[["Sıfat olarak uyum gösterir","mucha leche, muchas mesas, muchos libros, mucho trabajo"],["Fiilden sonra değişmez","Hoy trabajo mucho."],["poco","az: pocos alumnos"]]),
 NP("Kelimeler",[["cerca de × lejos de","yakınında × uzağında"],["debajo de / abajo","altında"],["detrás de / atrás","arkasında"],["alto × bajo","uzun × kısa/alçak"],["la caja","kutu"],["guapo/a","yakışıklı / güzel"],["todo / toda / todos / todas","bütün, her"],["creo que · para mí","bence"]]),
 NP("Örnek paragraf: kampüs",[["La facultad está en el campus.","Fakülte kampüste."],["El aparcamiento está delante de la facultad.","Otopark fakültenin önünde."],["El comedor está debajo de la facultad.","Yemekhane fakültenin altında."],["Hay muchos árboles al lado de la facultad.","Fakültenin yanında çok ağaç var."],["La residencia está un poco lejos.","Yurt biraz uzakta."],["La facultad está entre una cafetería y un colegio nuevo.","Fakülte bir kafeteryayla yeni bir okulun arasında."]]),
 NF("Defterdeki düzeltmeler: “mucho libro” → muchos libros; “Mi casa es en…” → está en (yer için estar); “muchos libros rojo” → rojos.")
]),
NN("n-escucha","001",[16],"Dinleme stratejisi","Dinleme sınavında nasıl not alınır; duyulan anahtar sözcükler.",[
 NR("Adımlar",[["1. Sakin ol","Her sözcüğü anlamak zorunda değilsin."],["2. İlk dinleme","Kimin konuştuğunu ve konuyu yakala; dil bilgisine takılma."],["3. Zamanlama","Soruları önceden oku, cevabın geleceği anı bekle."],["4. Tahmin","Boş bırakma; duyduğun sözcüklerden mantıklı tahmin yap."]]),
 NP("Notlardaki anahtar sözcükler",[["el apellido","soyadı"],["veinte / veintiún años","yirmi / yirmi bir yaşında"],["el gato · el deporte","kedi · spor"],["con mis amigos","arkadaşlarımla"],["voy a la residencia","yurda gidiyorum"],["a las doce","saat on ikide"],["el sábado pasado","geçen cumartesi"],["la fiesta · el supermercado","parti · süpermarket"],["la chaqueta · la camiseta","ceket · tişört"],["tres conferencias","üç konferans"],["el abogado","avukat"],["mi clase favorita","en sevdiğim ders"]])
]),
NN("n-posesivos","001",[17,20],"İyelik sıfatları ve yaş","mi, tu, su, nuestro, vuestro; ¿Cuántos años tienes?",[
 NT("İyelik sıfatları",["Sahip","Tekil isim","Çoğul isim"],[["yo","mi libro","mis libros"],["tú","tu casa","tus casas"],["él / ella / usted","su mesa","sus mesas"],["nosotros","nuestro cuaderno · nuestra manzana","nuestros cuadernos · nuestras manzanas"],["vosotros","vuestro mapa · vuestra camiseta","vuestros mapas · vuestras camisetas"],["ellos / ustedes","su bandera","sus banderas"]]),
 NT("Belirsiz artikel (bir / birkaç)",["Belirli","Belirsiz"],[["el","un"],["la","una"],["los","unos"],["las","unas"]]),
 NP("Yaş sorma",[["¿Cuántos años tiene tu madre?","Annen kaç yaşında?"],["Mi madre tiene 47 años. / Tiene 47 años.","Annem 47 yaşında."]]),
 NR("Aksan anlamı değiştirir",[["tu / tú","senin / sen"],["te / té","seni / çay"],["mi / mí","benim / ben (edattan sonra: para mí)"]]),
 NP("Günlük rutin örneği",[["Me levanto a las nueve.","Dokuzda kalkarım."],["No desayuno por la mañana.","Sabahları kahvaltı yapmam."],["Salgo de casa a las nueve y cuarto.","Dokuzu çeyrek geçe evden çıkarım."],["Mis clases normalmente terminan a las seis y veinte.","Derslerim genelde altıyı yirmi geçe biter."],["el desayuno / desayunar","kahvaltı / kahvaltı yapmak"]]),
 NF("“Salir de casa” evden çıkmak demektir; “partir mi casa” evimi bölmek anlamına gelir. “Mis lecciones terminan”: özne çoğulsa fiil de çoğul.")
]),
NN("n-familia","001",[18],"Aile","Aile bireyleri ve örnek aile ağacı.",[
 NP("Kim kimdir?",[["La madre de mi madre es mi abuela.","Annemin annesi büyükannemdir."],["La hija de mi padre es mi hermana.","Babamın kızı kız kardeşimdir."],["El hermano de mi padre es mi tío.","Babamın erkek kardeşi amcamdır."],["Los nietos de mi abuelo son mis primos.","Dedemin torunları kuzenlerimdir."]]),
 NP("Örnek aile ağacı",[["Me llamo Aydın. Tengo treinta y cinco años.","Adım Aydın. Otuz beş yaşındayım."],["Mi padre es Idris. Tiene sesenta y un años.","Babam İdris. Altmış bir yaşında."],["Mi madre es Fadime. Tiene cincuenta y siete años.","Annem Fadime. Elli yedi yaşında."],["Tengo tres hermanos.","Üç kardeşim var."],["Mehmet es mi hermano. Tiene treinta años.","Mehmet erkek kardeşim. Otuz yaşında."],["Paula es mi hermana. Tiene catorce años.","Paula kız kardeşim. On dört yaşında."],["Miguel es mi hermano. Tiene tres años.","Miguel erkek kardeşim. Üç yaşında."]]),
 NP("Kelimeler",[["caminar","yürümek"],["el camino","yol"],["la luna · el sol","ay · güneş"],["el cuñado / la cuñada","enişte, kayınbirader / görümce, baldız"],["el primo / la prima","kuzen"]]),
 NF("Eril isimden önce uno → un olur: sesenta y un años, veintiún años.")
]),
NN("n-descripcion","001",[21],"Fiziksel tanımlama ve mekânlar","ser, tener, llevar, estar ile birini anlatmak; şehirdeki yerler.",[
 NR("Hangi fiil?",[["ser","boy, kilo, saç rengi: alto × bajo, gordo × delgado, rubio × moreno × pelirrojo"],["tener","göz ve saç özellikleri: los ojos marrones, el pelo corto × largo, liso × rizado"],["llevar","takılan/giyilen: llevar gafas, llevar barba (tener barba da olur)"],["estar","durum: casado × soltero × divorciado, cansado"]]),
 NP("Örnek",[["Soy profesora. Soy alta y delgada.","Öğretmenim. Uzun boylu ve zayıfım."],["Tengo el pelo corto y los ojos negros.","Kısa saçlıyım, gözlerim siyah."],["Estoy cansada.","Yorgunum."],["Nombre: Yusuf · Apellido: Çakır · Nacionalidad: turca","Ad · Soyad · Uyruk"],["Yusuf es turco.","Yusuf Türk."]]),
 NF("el pelo tekildir (saç), los ojos çoğuldur (gözler): El pelo es largo. Los ojos son verdes."),
 NP("Şehirde",[["un teatro · un cine · un hotel","tiyatro · sinema · otel"],["una farmacia · un restaurante · un banco","eczane · restoran · banka"],["una tienda de ropa · una zapatería","giyim mağazası · ayakkabıcı"],["una librería","kitapçı"],["una tienda de electrodomésticos","beyaz eşya mağazası"],["un café","kafe"]])
]),
NN("n-verbos-importantes","001",[22,25],"001 tekrarı: önemli fiiller","Sınav öncesi listelenen fiiller ve ulaşım.",[
 NP("Fiiller",[["ir · venir","gitmek · gelmek"],["querer · preferir","istemek · tercih etmek"],["poder","-ebilmek"],["tomar · coger","almak, içmek · almak, binmek"],["pasear (por)","gezinmek"],["practicar · hacer deporte","pratik yapmak · spor yapmak"],["disfrutar","keyif almak"],["costar","tutmak (fiyat)"],["saber · conocer(se)","bilmek · tanımak, tanışmak"],["mirar · ver","bakmak · görmek"],["ayudar","yardım etmek"],["salir","çıkmak"],["subir × bajar","çıkmak × inmek"],["escuchar","dinlemek"],["levantarse","kalkmak"]]),
 NT("saber",["Fiil","yo","tú","él","nosotros","vosotros","ellos"],[["saber","sé","sabes","sabe","sabemos","sabéis","saben"]]),
 NP("Kalıplar",[["venir a / venir de","-e gelmek / -den gelmek"],["salir de compras / ir de compras","alışverişe çıkmak / gitmek"],["ir en avión · en tren · en coche","uçakla · trenle · arabayla gitmek"],["ir a pie","yürüyerek gitmek"],["Quiero escribir un texto bonito para el examen de español.","İspanyolca sınavı için güzel bir metin yazmak istiyorum."]])
]),
NN("n-preposiciones","001",[23],"Yer edatları","Bir şey nerede? Zıt çiftlerle.",[
 NT("Edatlar",["İspanyolca","Türkçe","Zıddı"],[["delante de","önünde","detrás de (arkasında)"],["cerca de","yakınında","lejos de (uzağında)"],["encima de","üstünde","debajo de (altında)"],["a la izquierda de","solunda","a la derecha de (sağında)"],["al lado de","yanında","—"],["entre … y …","… ile … arasında","—"]]),
 NP("Örnek",[["El libro está encima de la mesa.","Kitap masanın üstünde."],["La farmacia está entre el banco y el cine.","Eczane bankayla sinemanın arasında."],["Mi casa está cerca de la universidad.","Evim üniversiteye yakın."]]),
 NF("de + el = del: al lado del banco, delante del cine.")
]),
NN("n-cambio-raiz","001",[24],"Kök değişimi alıştırması","Boşluk doldurma cevapları.",[
 NP("Cevaplar",[["vivo · tiene · están","yaşarım · var/sahip · -dalar"],["preferimos · puedo · hacen","tercih ederiz · -ebilirim · yaparlar"],["quiere · te lavas · os apellidáis","ister · yıkanırsın · soyadınız …"],["es · voy · se despierta","-dir · giderim · uyanır"],["juegan","oynarlar (jugar u → ue)"],["vuelves · duerme","dönersin · uyur"],["empezamos · comienza · pienso","başlarız · başlar · düşünürüm"]]),
 NF("Kök değişimi nosotros/vosotros’ta olmaz: empezamos, jugamos; ama tú vuelves, él duerme, yo pienso.")
]),
NN("n-hora","002",[26,27],"Saat: ¿Qué hora es?","Es la una / son las…, y / menos, cuarto, media, en punto.",[
 NR("Kurallar",[["Es la una","Yalnız saat 1 için tekil: Es la una y cinco."],["Son las …","Diğer saatler: Son las dos, son las diez."],["y","Saatin geçtiği dakikalar (1–30): y cinco, y diez, y cuarto, y veinte, y veinticinco, y media."],["menos","Saate kalan dakikalar: Son las nueve menos cinco (21.55)."],["cuarto / media","çeyrek / buçuk"],["en punto","tam: cümlenin sonuna gelir."],["de la mañana / tarde / noche","Sona eklenebilir; gece 1–6 arası de la madrugada."]]),
 NT("Dönüştür",["Saat","İspanyolca"],[["10.10","Son las diez y diez."],["16.20","Son las cuatro y veinte de la tarde."],["06.30","Son las seis y media de la mañana."],["01.08","Es la una y ocho de la madrugada."],["12.00","Son las doce en punto. / Es el mediodía."],["24.00","Son las doce de la noche. / Es la medianoche."],["20.55","Son las nueve menos cinco de la noche."],["03.17","Son las tres y diecisiete de la madrugada."],["12.45","Es la una menos cuarto de la tarde."]]),
 NR("Günün bölümleri",[["la mañana","sabah (yaklaşık 6–14)"],["la tarde","öğleden sonra (14–21)"],["la noche","akşam/gece (21–1)"],["la madrugada","gece yarısından sonra (1–6)"]]),
 NF("Defterdeki düzeltme: “seis y medio” → seis y media (media hora). 12.45 “de la mañana” değil, öğleden sonraya geçtiği için de la tarde.")
]),
NN("n-horarios","002",[28],"Saatler ve programlar","¿A qué hora…? Açılış-kapanış saatleri, de… a / desde… hasta.",[
 NP("Soru-cevap",[["¿A qué hora te levantas?","Kaçta kalkarsın?"],["Me levanto a las siete de la mañana.","Sabah yedide kalkarım."],["¿A qué hora abren los bancos?","Bankalar kaçta açılır?"],["Los bancos abren a las ocho y media de la mañana.","Bankalar sabah sekiz buçukta açılır."],["¿A qué hora cierran las farmacias?","Eczaneler kaçta kapanır?"],["Las farmacias cierran a las seis en punto de la tarde.","Eczaneler akşam altıda kapanır."],["¿Qué horario tiene el Museo del Prado?","Prado Müzesi’nin çalışma saatleri ne?"],["Abre a las diez de la mañana y cierra a las ocho de la noche.","Sabah onda açılır, akşam sekizde kapanır."],["¿Qué días abren los supermercados?","Süpermarketler hangi günler açık?"],["Abren de lunes a domingo.","Pazartesiden pazara açıklar."]]),
 NT("¿A qué hora?",["Saat","Cevap"],[["19.45","A las ocho menos cuarto de la tarde."],["07.00","A las siete en punto de la mañana."],["12.30","A las doce y media del mediodía."],["22.00","A las diez en punto de la noche."],["06.15","A las seis y cuarto de la mañana."]]),
 NR("Kurallar",[["¿Qué hora es? / ¿A qué hora…?","Şu an saat kaç? / Saat kaçta?"],["a las …","Saat …’de: a las siete, a la una."],["de … a … / desde … hasta …","…’den …’e kadar: de nueve a cinco."],["cerrar (e → ie) · abrir","kapatmak (cierra) · açmak"],["el horario","çalışma saatleri, program"]])
]),
NN("n-meses-frecuencia","002",[29],"Aylar, mevsimler ve sıklık","Los meses, las estaciones, siempre… nunca.",[
 NT("Los meses del año",["","","",""],[["enero","febrero","marzo","abril"],["mayo","junio","julio","agosto"],["septiembre","octubre","noviembre","diciembre"]]),
 NP("Las estaciones del año",[["la primavera","ilkbahar"],["el verano","yaz"],["el otoño","sonbahar"],["el invierno","kış"]]),
 NT("Sıklık zarfları (çoktan aza)",["İspanyolca","Türkçe"],[["siempre","her zaman"],["casi siempre","neredeyse her zaman"],["todos los días","her gün"],["a menudo","sık sık"],["a veces","bazen"],["casi nunca","neredeyse hiç"],["nunca","asla, hiç"]]),
 NF("la estación hem mevsim hem (tren/otobüs) istasyon demektir. Aylar ve günler İspanyolcada küçük harfle yazılır.")
]),
NN("n-irregulares-002","002",[30,31],"002: düzensiz ve kök değiştiren fiiller","Kişiye göre düzensizler ve e→ie, o→ue, u→ue örnekleri.",[
 NR("Tamamen veya yo’da düzensiz",[["ir · ser · tener · hacer · dar · estar","gitmek · olmak · sahip olmak · yapmak · vermek · olmak/bulunmak"],["poner · venir · salir","koymak · gelmek · çıkmak (pongo, vengo, salgo)"],["ver · saber · conocer","görmek · bilmek · tanımak (veo, sé, conozco)"]]),
 NT("Kök değişimi",["Fiil","Tür","yo","nosotros"],[["empezar (başlamak)","e → ie","empiezo","empezamos"],["comenzar (başlamak)","e → ie","comienzo","comenzamos"],["pensar (düşünmek)","e → ie","pienso","pensamos"],["dormir (uyumak)","o → ue","duermo","dormimos"],["poder (-ebilmek)","o → ue","puedo","podemos"],["jugar (oynamak)","u → ue","juego","jugamos"]]),
 NP("Alıştırma cümleleri",[["Ricardo trabaja en una granja en las afueras de la ciudad.","Ricardo şehrin dışında bir çiftlikte çalışıyor."],["Mi amiga siempre lee muchos libros en verano.","Arkadaşım yazın hep çok kitap okur."],["Por las noches siempre miramos las estrellas.","Geceleri hep yıldızlara bakarız."],["Tomás es muy romántico, siempre me trae rosas.","Tomás çok romantik, bana hep gül getirir."],["Hola, ¿qué cantáis vosotras?","Merhaba, ne söylüyorsunuz?"],["Dibujo un elefante gris y un pájaro verde en mi cuaderno.","Defterime gri bir fil ve yeşil bir kuş çiziyorum."],["Ramiro, ¿cómo te sientes? ¿Estás bien?","Ramiro, nasıl hissediyorsun? İyi misin?"],["Creo que prefiero no salir de casa hoy.","Sanırım bugün evden çıkmamayı tercih ediyorum."],["Nosotros vivimos en el centro de Madrid.","Madrid’in merkezinde yaşıyoruz."],["Mi hija siempre come arroz con leche. Es su comida favorita.","Kızım hep sütlaç yer. En sevdiği yemek."],["Lo siento, no puedo acompañarte al dentista.","Üzgünüm, seninle dişçiye gelemem."]]),
 NP("Kelimeler",[["traer","getirmek (traigo)"],["sentirse","hissetmek (me siento)"],["creer","inanmak, sanmak"],["hoy","bugün"],["el arroz · la leche","pirinç · süt"]])
]),
NN("n-cuantificadores","002",[32,33],"Nicelik belirten sözcükler","Todos, la mayoría, muchos, pocos, nadie; vez / veces.",[
 NP("Çoktan aza",[["Todos los alumnos toman apuntes en clase.","Bütün öğrenciler derste not alır."],["La mayoría de los españoles duerme la siesta.","İspanyolların çoğu öğle uykusu uyur."],["Muchos españoles pasan las vacaciones en Portugal.","Birçok İspanyol tatilini Portekiz’de geçirir."],["Pocos alumnos juegan al baloncesto en el colegio.","Az sayıda öğrenci okulda basketbol oynar."],["Muy pocos españoles cenan temprano.","Çok az İspanyol erken akşam yemeği yer."],["Nadie habla conmigo.","Kimse benimle konuşmuyor."],["Casi nadie …","Neredeyse kimse …"]]),
 NR("Fiil tekil mi çoğul mu?",[["la mayoría (de)","Anlamı çoğul, yapısı tekil → fiil tekil: la mayoría duerme."],["nadie","Her zaman tekil: nadie habla."],["todos / muchos / pocos","Çoğul fiil: muchos pasan."]]),
 NP("vez = kere",[["una vez","bir kere"],["dos veces","iki kere"],["a veces","bazen"]]),
 NF("vez dişildir: una vez (un vez değil); çoğulu veces.")
]),
NN("n-gustar","002",[34,35,36],"Gustar ve benzeri fiiller","me/te/le/nos/os/les + gusta / gustan.",[
 NT("Yapı",["Vurgu (isteğe bağlı)","Zamir (zorunlu)","Fiil"],[["A mí","me","gusta + tekil isim / mastar"],["A ti","te","gustan + çoğul isim"],["A él / ella / usted","le",""],["A nosotros/as","nos",""],["A vosotros/as","os",""],["A ellos / ellas / ustedes","les",""]]),
 NP("Örnekler",[["(A mí) me gusta bailar.","Dans etmeyi severim."],["No me gusta bailar.","Dans etmeyi sevmem."],["Me gusta beber té pero no me gusta el café.","Çay içmeyi severim ama kahveyi sevmem."],["¿(A vosotros) os gusta ir de vacaciones?","Tatile gitmeyi sever misiniz?"],["(A nosotros) nos gusta el flamenco.","Flamenkoyu severiz."],["(A ella) le gusta el chocolate.","O çikolatayı sever."],["A Hazal le gusta el chocolate.","Hazal çikolatayı sever."]]),
 NR("Kurallar",[["A mí gusta ✗","Zamir zorunlu: A mí me gusta. “A mí” kısmı yalnız vurgu içindir."],["no","Zamirden önce: No me gusta."],["Artikel","İsimler artikeliyle gelir: me gusta el café (me gusta café değil)."],["İsimle","Kişi adı veya isimle a zorunlu: A Hazal le gusta…"]]),
 NP("Alıştırma cevapları",[["A María y a mí nos gustan las pizzas.","María ve ben pizzaları severiz."],["os encanta · te interesan · le gusta","bayılıyorsunuz · ilgini çekiyor · seviyor"],["les preocupa · me gusta · le duelen","onları endişelendiriyor · seviyorum · ağrıyor"],["os apetece · les gustan","canınız çekiyor · seviyorlar"],["A mí me encantan los dibujos animados.","Çizgi filmlere bayılırım."],["¿A ti te duele la garganta?","Boğazın ağrıyor mu?"],["A él le gustan los videojuegos.","O video oyunlarını sever."],["A nosotros nos preocupa el medioambiente.","Çevre bizi endişelendiriyor."]]),
 NP("Kelimeler",[["la cabeza · la garganta · la pierna","baş · boğaz · bacak"],["el riesgo · el deporte","risk · spor"],["la horchata","horchata (yer bademi içeceği)"],["el plato · el pescado","tabak, yemek · balık (yemek)"],["el videojuego","video oyunu"],["el medioambiente","çevre"]])
]),
NN("n-cantidad","002",[35,37,39],"Ne kadar seviyorsun? Miktar zarfları","nada, bastante, mucho, muchísimo ve gustar gibi fiiller.",[
 NT("Miktar zarfları",["Zarf","Anlam","Örnek"],[["nada","hiç (olumsuz cümlede)","No me gusta nada el sushi."],["bastante","oldukça","Me gustan bastante las películas de terror."],["mucho","çok","Me gustan mucho las naranjas."],["muchísimo","çok çok","Me gusta muchísimo el café con leche."]]),
 NP("Örnekler",[["No me gusta mucho el helado.","Dondurmayı pek sevmem."],["Me gustan los gatos. No me gustan mucho los perros.","Kedileri severim. Köpekleri pek sevmem."],["A mí no me gusta mucho despertarme temprano porque me gusta dormir hasta mediodía.","Erken uyanmayı pek sevmem çünkü öğlene kadar uyumayı severim."]]),
 NT("Gustar gibi çalışan fiiller",["Fiil","Anlam","Tekil / çoğul"],[["encantar","bayılmak","encanta / encantan"],["interesar","ilgisini çekmek","interesa / interesan"],["apetecer","canı çekmek","apetece / apetecen"],["importar","önemsemek","importa / importan"],["doler (o → ue)","ağrımak","duele / duelen"],["preocupar","endişelendirmek","preocupa / preocupan"]]),
 NP("Örnek",[["Me encanta beber té verde.","Yeşil çay içmeye bayılırım."],["Me encantan las flores.","Çiçeklere bayılırım."],["Me duele la cabeza. / Me duelen los pies.","Başım ağrıyor. / Ayaklarım ağrıyor."]]),
 NF("Sınav notu: 7. ünitenin tamamı, 8. ünitede gustar/encantar ve yiyecek isimleri.")
]),
NN("n-comida","002",[38,40,41,42],"Yiyecek ve içecekler","Meyve, sebze, baklagil, süt ürünleri, tatlılar, öğünler.",[
 NP("Las frutas",[["la manzana","elma"],["la naranja","portakal"],["el melón","kavun"],["el limón","limon"],["la sandía","karpuz"],["el plátano","muz"],["la fresa","çilek"],["la piña","ananas"],["el aguacate","avokado"],["la pera","armut"],["el mango · el kiwi","mango · kivi"],["el melocotón","şeftali"]]),
 NP("Las verduras",[["el tomate","domates"],["la patata","patates"],["la cebolla","soğan"],["el pepino","salatalık"],["la zanahoria","havuç"],["las espinacas","ıspanak"],["el pimiento","biber"],["la lechuga","marul"],["el ajo","sarımsak"]]),
 NP("Las legumbres y los lácteos",[["el arroz","pirinç"],["el garbanzo","nohut"],["la lenteja","mercimek"],["el frijol","fasulye"],["la leche","süt"],["el queso","peynir"],["el yogur","yoğurt"],["la mantequilla","tereyağı"]]),
 NP("Los postres y la bollería",[["la miel","bal"],["la mermelada","reçel"],["el chocolate","çikolata"],["el pastel","kek, pasta"],["la galleta","bisküvi, kurabiye"],["el churro","churro (kızarmış hamur tatlısı)"],["el arroz con leche","sütlaç"],["el pan","ekmek"],["el cruasán","kruvasan"],["el bollo","çörek"],["la tostada","kızarmış ekmek"],["el bocadillo","sandviç"],["la hamburguesa","hamburger"],["el huevo","yumurta"]]),
 NP("La comida y las bebidas",[["la carne","et"],["el pescado","balık (yemek)"],["el pollo","tavuk"],["la pasta","makarna"],["la sopa","çorba"],["el agua","su"],["el café · el té","kahve · çay"],["el zumo","meyve suyu"],["la cerveza","bira"],["el vino","şarap"]]),
 NP("Öğünler",[["desayunar","kahvaltı yapmak"],["almorzar (o → ue)","öğle yemeği yemek"],["merendar (e → ie)","ikindi atıştırması yapmak"],["cenar","akşam yemeği yemek"],["el primer plato","başlangıç"],["el segundo plato","ana yemek"],["el postre","tatlı"],["soler + mastar","-meyi alışkanlık edinmek: Suelo cenar a las nueve."]]),
 NF("Defterdeki düzeltme: el pescado ve el café erildir (la değil). el agua dişildir ama a ile başlayıp vurgu onda olduğu için el alır: el agua fría.")
]),
NN("n-futuro","002",[44,45,46],"Gelecek: ir a + mastar","Planlanmış gelecek ve zaman ifadeleri.",[
 NT("Yapı: ir (presente) + a + mastar",["Şahıs","ir","Örnek"],[["yo","voy","voy a bailar"],["tú","vas","vas a comer"],["él / ella / usted","va","va a salir"],["nosotros","vamos","vamos a estudiar"],["vosotros","vais","vais a viajar"],["ellos / ellas","van","van a cenar"]]),
 NT("Dönüşlü fiille (iki sıra da doğru)",["Şahıs","Zamir sonda","Zamir başta"],[["yo","voy a ducharme","me voy a duchar"],["tú","vas a ducharte","te vas a duchar"],["él / ella","va a ducharse","se va a duchar"],["nosotros","vamos a ducharnos","nos vamos a duchar"],["vosotros","vais a ducharos","os vais a duchar"],["ellos / ellas","van a ducharse","se van a duchar"]]),
 NP("Zaman ifadeleri",[["mañana","yarın"],["esta mañana / tarde / noche","bu sabah / öğleden sonra / akşam"],["esta semana · este mes · este año","bu hafta · bu ay · bu yıl"],["este verano · este fin de semana","bu yaz · bu hafta sonu"],["la semana que viene · el mes que viene","gelecek hafta · gelecek ay"],["el próximo mes · la próxima semana · el próximo año","gelecek ay · gelecek hafta · gelecek yıl"],["dentro de una semana · dentro de un año","bir hafta içinde · bir yıl içinde"]]),
 NP("Örnekler",[["El próximo mes voy a hacer un examen de español.","Gelecek ay İspanyolca sınavına gireceğim."],["¿La semana que viene vas a ir a la fiesta?","Gelecek hafta partiye gidecek misin?"],["Dentro de un año vamos a mudarnos a España.","Bir yıl içinde İspanya’ya taşınacağız."]]),
 NP("Alıştırma cevapları",[["van · voy · vais","gidiyorlar · gidiyorum · gidiyorsunuz"],["va a estar · van a convocar","olacak · toplayacaklar"],["voy a hacer · vas a limpiar","yapacağım · temizleyeceksin"],["van a mudarse · voy a irme · va a llamarse","taşınacaklar · gideceğim · adı … olacak"]]),
 NP("Kelimeler",[["disponible","uygun, müsait"],["el piso","kat; daire"],["la excursión","gezi"],["la huelga","grev"],["convocar","toplantıya çağırmak"],["ahora mismo","tam şu anda"],["limpiar · el polvo","temizlemek · toz"],["a partir de","-den itibaren"],["el vecino","komşu"],["mudarse","taşınmak"],["recoger","toplamak; (çocuğu okuldan) almak"],["¿adónde? · ¿dónde?","nereye? · nerede?"]]),
 NF("quién her zaman tekil fiil alır (¿Quién viene?), quiénes çoğul (¿Quiénes vienen?).")
]),
NN("n-gerundio","002",[47,48,49],"Şu an ne yapıyorsun? Estar + gerundio","Şimdiki zamanın sürekli hâli, düzensiz gerundiolar.",[
 NT("Yapı",["Şahıs","estar","+ gerundio"],[["yo","estoy","hablando"],["tú","estás","comiendo"],["él / ella / usted","está","viviendo"],["nosotros","estamos",""],["vosotros","estáis",""],["ellos / ellas","están",""]]),
 NR("Gerundio yapımı",[["-ar → -ando","hablar → hablando"],["-er → -iendo","beber → bebiendo"],["-ir → -iendo","vivir → viviendo"]]),
 NT("Düzensizler",["Mastar","Gerundio","Anlam"],[["ir","yendo","gitmek"],["leer","leyendo","okumak"],["oír","oyendo","duymak"],["dormir","durmiendo","uyumak"],["decir","diciendo","söylemek"]]),
 NT("Dönüşlü fiille",["Zamir başta","Zamir sonda (aksanlı)"],[["me estoy duchando","estoy duchándome"],["te estás duchando","estás duchándote"],["se está duchando","está duchándose"],["nos estamos duchando","estamos duchándonos"],["os estáis duchando","estáis duchándoos"],["se están duchando","están duchándose"]]),
 NP("Alıştırma 1",[["¿Qué estás haciendo?","Ne yapıyorsun?"],["Luisa está leyendo un libro de aventuras increíbles.","Luisa inanılmaz maceralarla dolu bir kitap okuyor."],["No deseo salir porque estoy jugando con mi perrita.","Çıkmak istemiyorum çünkü köpeğimle oynuyorum."],["Emily está trabajando en Inglaterra.","Emily İngiltere’de çalışıyor."],["Mis vecinos están lavando mucha ropa.","Komşularım çok çamaşır yıkıyor."],["El profesor está diciendo algo importante.","Öğretmen önemli bir şey söylüyor."],["Vosotros estáis oyendo el aullido de los lobos.","Kurtların ulumasını duyuyorsunuz."],["Mari y su hija están sufriendo por la pérdida de su tío.","Mari ve kızı amcalarının kaybıyla acı çekiyor."],["Sofía está cantando una canción de cuna.","Sofía bir ninni söylüyor."],["Nosotros estamos hablando sobre cultura general.","Genel kültür hakkında konuşuyoruz."],["Mi hermano está yendo a su trabajo.","Kardeşim işine gidiyor."]]),
 NP("Alıştırma 2",[["Los niños están jugando en el jardín.","Çocuklar bahçede oynuyor."],["Adrián y yo estamos estudiando francés.","Adrián ve ben Fransızca çalışıyoruz."],["En este momento están saliendo de casa.","Şu anda evden çıkıyorlar."],["¿Qué está leyendo?","Ne okuyor?"],["Ahora estoy haciendo la comida.","Şimdi yemek yapıyorum."],["¿Dónde está durmiendo el gato?","Kedi nerede uyuyor?"],["Laura y Alba se están lavando las manos.","Laura ve Alba ellerini yıkıyor."],["¿Estáis escuchando las noticias?","Haberleri dinliyor musunuz?"],["Está comiendo un bocadillo.","Sandviç yiyor."],["¿Estás escribiendo poemas de amor?","Aşk şiirleri mi yazıyorsun?"]]),
 NP("Kelimeler",[["caminar = andar","yürümek"],["desear","arzulamak, istemek"],["sufrir","acı çekmek"],["ahora · en este momento","şimdi · şu anda"],["la revista","dergi"],["hacer los deberes","ödev yapmak"]])
]),
NN("n-opinion-causa","002",[50,51],"Fikir bildirme, neden ve amaç","creo que, me parece que; por qué / porque / para.",[
 NP("Fikir bildirme",[["creer → creo que …","sanırım …"],["pensar (e → ie) → pienso que …","düşünüyorum ki …"],["opinar → opino que …","fikrim şu ki …"],["parecer → me parece que …","bana öyle geliyor ki … (gustar gibi)"],["estar de acuerdo","katılmak"],["estar en desacuerdo = no estar de acuerdo","katılmamak"]]),
 NR("Neden ve amaç",[["¿Por qué?","Neden? (ayrı, aksanlı)"],["porque + çekimli fiil","çünkü: Estudio porque tengo examen."],["¿Para qué?","Ne için, hangi amaçla?"],["para + mastar","-mek için: Estudio para aprobar."],["para que + subjuntivo","İleri seviye konusu; şimdilik gerekmez."]])
]),
NN("n-imperativo","002",[52,53,54],"Olumlu emir: imperativo afirmativo","tú, vosotros, usted, ustedes için emir.",[
 NT("Ekler",["Şahıs","-ar","-er","-ir"],[["tú","-a","-e","-e"],["vosotros/as","-ad","-ed","-id"],["usted","-e","-a","-a"],["ustedes","-en","-an","-an"]]),
 NT("Düzenli örnekler",["Şahıs","bailar","beber","escribir","trabajar","vender"],[["tú","baila","bebe","escribe","trabaja","vende"],["vosotros","bailad","bebed","escribid","trabajad","vended"],["usted","baile","beba","escriba","trabaje","venda"],["ustedes","bailen","beban","escriban","trabajen","vendan"]]),
 NT("Düzensizler (vosotros hep düzenli)",["Şahıs","ir","salir","tener","venir","hacer","poner"],[["tú","ve","sal","ten","ven","haz","pon"],["vosotros","id","salid","tened","venid","haced","poned"],["usted","vaya","salga","tenga","venga","haga","ponga"],["ustedes","vayan","salgan","tengan","vengan","hagan","pongan"]]),
 NR("Dönüşlü fiiller",[["Zamir sona eklenir","tú + te, vosotros + os, usted + se, ustedes + se"],["peinarse (saç taramak)","péinate · peinaos · péinese · péinense"],["vosotros’ta d düşer","levantad + os → levantaos; poned + os → poneos; vestid + os → vestíos"]]),
 NP("Alıştırma",[["Guzmán, llama al taxi, tenemos que salir ya.","Guzmán, taksi çağır, hemen çıkmamız lazım."],["Niños, haced los deberes después de la comida.","Çocuklar, yemekten sonra ödevlerinizi yapın."],["Señora Martín, vaya a la oficina de turismo.","Bayan Martín, turizm ofisine gidin."],["Papá, pon los libros en la estantería.","Baba, kitapları rafa koy."],["Señores, vengan a la sala de espera, por favor.","Beyler, bekleme salonuna gelin lütfen."],["Beba más agua para estar en forma.","Formda kalmak için daha çok su için."],["Profesora, escriba las palabras en la pizarra, por favor.","Hocam, sözcükleri tahtaya yazın lütfen."],["Estudiad matemáticas, mañana tenéis examen.","Matematik çalışın, yarın sınavınız var."],["María, ven a la cocina, la cena ya está preparada.","María, mutfağa gel, akşam yemeği hazır."],["Cerrad la puerta, por favor.","Kapıyı kapatın lütfen."]]),
 NP("Kelimeler",[["cerrar (e → ie)","kapatmak"],["cortar","kesmek"],["pedir (e → i)","istemek, sipariş vermek"],["huir","kaçmak"],["sentarse · probarse","oturmak · denemek (kıyafet)"],["decir · dar · ser · traer","söylemek (di) · vermek (da) · olmak (sé) · getirmek (trae)"]])
])
];
