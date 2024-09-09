const firstAidScenarios = [
    "Bahar pikniği sırasında, bir arkadaş grubu piknik alanında futbol oynarken, bir köpek aniden belirir ve topun peşinden koşmaya başlar. Oyunun heyecanıyla birlikte, köpek yanlışlıkla bir öğrenciyi ısırır. Öğrenci hafifçe yaralanmıştır, ve arkadaşları hemen ilk yardım uygulamak istemektedir.",
    "Arkadaş grubunuzla piknik yaparken, bir arkadaşınız futbol oynamak isterken düşüp bileğini burkuyor. Acı içinde yerde yatarken, siz ve diğer arkadaşlarınız hemen yardım etmek istiyorsunuz.",
    "Bir kamp gezisi sırasında, grubunuzun bir üyesi gece yürüyüşü sırasında ayağını bir taşa takıp düşüyor ve kolunu çarpması sonucu ciddi bir şekilde incitiyor. Kolunda açık bir kırık olduğundan şüpheleniyorsunuz.",
    "Sıcak bir yaz günü, arkadaşlarınızla yüzme havuzunda eğlenirken, bir arkadaşınız suyun içinde aniden kramp giriyor ve batmaya başlıyor. Hızla yardıma koşuyorsunuz.",
    "Okul kafeteryasında öğle yemeği sırasında, bir arkadaşınız yanlışlıkla büyük bir lokmayı boğazına kaçırır ve nefes almakta zorlanmaya başlar. Çevredekiler paniklemeye başlarken, siz hızla yardım etmek istiyorsunuz.",
    "Bir hafta sonu bisiklet turunda, arkadaşınız hızla giderken dengesini kaybeder ve düşer. Kolu açık bir şekilde sıyrılmış ve kanamaktadır.",
    "Sınıf içinde bir öğrenci, aniden baş dönmesi şikayetiyle yere düşer ve bilincini kaybeder.",
    "Kimya dersi sırasında, bir öğrenci yanlışlıkla elini asidik bir solüsyona batırır ve acı içinde bağırır.",
    "Yaz kampında, bir grup öğrenci ormanda yürüyüş yaparken, biri zehirli bir bitkiye dokunur ve cildinde kızarıklıklar oluşmaya başlar.",
    "Spor salonunda çalışırken, bir arkadaşınız ağırlık kaldırırken sırtında bir ağrı hisseder ve yere düşer.",
    "Okul gezisi sırasında, bir öğrenci arı tarafından sokulur ve sokulan yer hızla şişmeye başlar.",
    "Yoğun bir trafikte seyir halindeyken önünüzdeki araç aniden durur ve siz fren yapamadan araca çarparsınız. Aracınızın ön kısmı hasar görürken, siz hafif bir sarsıntı hissedersiniz. Diğer aracın sürücüsü ise başını direksiyona çarpmış ve bilincini kaybetmiş gibi görünmektedir.",
    "Sınıfta ders işlerken aniden bir deprem meydana gelir. Sarsıntı başladığında öğrenciler panikle koşuşturmaya başlar.",
    "Kamp yaparken aniden başlayan şiddetli yağmur sonucu çadırınızın etrafı suyla dolmaya başlar ve sel riski oluşur.",
    "Ormanda yürüyüş yaparken uzaktan dumanlar yükseldiğini fark edersiniz ve bir orman yangını başladığını anlarsınız.",
    "Dağda kayak yaparken aniden bir kar fırtınası başlar ve görüş mesafesi ciddi şekilde azalır.",
    "Sahildeyken aniden deniz seviyesinde büyük bir çekilme meydana gelir ve bir tsunami uyarısı yapılır.",
    "Laboratuvarda çalışırken bir öğrenci eldivenlerini çıkarmayı unutur ve yanlışlıkla cildine kimyasal madde döker. Hızla yanma hissi başlar.",
    "Bir arkadaşınız su baskını sonrası elektrikli bir cihazı kontrol etmeye çalışırken elektrik çarpması geçirir.",
    "Yaz kampında uzun süre güneş altında kalan bir öğrenci, baş dönmesi, mide bulantısı ve aşırı terleme belirtileri göstermeye başlar.",
    "Parkta piknik yaparken bir öğrenci arı tarafından kolundan sokulur. Sokma yerinde hızla şişme ve kızarıklık oluşur.",
    "Bir öğrenci öğle yemeğinde yanlışlıkla küçük bir oyuncak parçasını yutar ve nefes almakta zorlanmaya başlar.",
    "Bir aile yemeğinde, amcanız aniden göğsüne şiddetli bir ağrı hissettiğini söyler ve terlemeye başlar. Görünüşe göre ciddi bir rahatsızlık hissediyor ve sol kolu da uyuşmuş gibi görünüyor.",
    "Parkta yürüyüş yaparken, yaşlı bir adamın titrediğini ve yürümekte güçlük çektiğini fark ediyorsunuz. Adam size yaklaşıp Parkinson hastası olduğunu ve yardıma ihtiyacı olduğunu söylüyor.",
    "Kütüphanede çalışan bir arkadaşınız, kendini iyi hissetmediğini söyler. Titreme, terleme ve hafif bir konfüzyon belirtileri gösterir. Diyabet hastası olduğunu ve belki de kan şekerinin düştüğünü düşünüyor."
];

const firstAidScenarioTitles = [
    "Piknik Senaryosu (Köpek Isırığı)",
    "Piknik Senaryosu (Bilek Burkulması)",
    "Kamp Senaryosu (Kol Kırığı)",
    "Yüzme Havuzu Senaryosu (Kramp)",
    "Yemek Yeme Senaryosu (Boğulma)",
    "Bisiklet Kazası Senaryosu (Kanama)",
    "Sınıf İçi Senaryo (Bilincini Kaybeden Öğrenci)",
    "Laboratuvar Kazası Senaryosu (Asit Yanığı)",
    "Yaz Kampı Senaryosu (Zehirli Bitki Teması)",
    "Spor Salonu Senaryosu (Sırt Ağrısı)",
    "Okul Gezisi Senaryosu (Arı Sokması)",
    "Trafik Kazası Senaryosu",
    "Deprem Senaryosu",
    "Sel Senaryosu",
    "Orman Yangını Senaryosu",
    "Kar Fırtınası Senaryosu",
    "Tsunami Senaryosu",
    "Kimyasal Yanık Senaryosu",
    "Elektrik Çarpması Senaryosu",
    "Sıcak Çarpması Senaryosu",
    "Arı Sokması Senaryosu (Parkta)",
    "Yabancı Cisim Yutma Senaryosu",
    "Kalp Krizi Senaryosu",
    "Parkinson Hastalığı Senaryosu",
    "Diyabetik Hipoglisemi Senaryosu"
];


const firstAidScenarioOptions = [
    // 1. Piknik Senaryosu (Köpek Isırığı)
    [
      "A) Yarayı görmek için hemen bandajı çıkarmak ve yarayı kontrol etmek.",
      "B) Yarayı sabun ve soğuk suyla yıkayıp temiz bir bezle örtmek.",
      "C) Köpeği bulup, neden böyle bir şey yaptığını sormak.",
      "D) Yaralı öğrenciyi sakinleştirmek için ona hikayeler anlatmak."
    ],
    // 2. Piknik Senaryosu (Bilek Burkulması)
    [
      "A) Arkadaşınızı hemen ayağa kaldırıp yürümesini sağlayın, belki ağrı geçer.",
      "B) Burkulan bölgeyi hemen sıcak suyla yıkayıp, ağrının azalmasını bekleyin.",
      "C) Bileği sıkıştırıcı bir bandajla tespit edin, yaralı bölgeyi yukarı kaldırın ve hareket ettirmeyin.",
      "D) Arkadaşınıza bol miktarda su içirip, ağrının kendiliğinden geçmesini bekleyin."
    ],
    // 3. Kamp Senaryosu (Kol Kırığı)
    [
      "A) Kırık olduğunu düşündüğünüz kolu hemen düzeltmeye çalışın ve ardından sıkı bir bandajla sarın.",
      "B) Yaralı kolun hareket etmemesi için onu bir battaniye ile sarıp, en yakın sağlık kuruluşuna gidene kadar sabit tutun.",
      "C) Kırık bölgeyi temiz bir bezle örtün, mümkünse tespit edin ve yaralının rahat etmesi için ağrı kesici verin.",
      "D) Yaralı kolun altına yumuşak bir malzeme yerleştirin, tespit edin ve tıbbi yardım çağırın."
    ],
    // 4. Yüzme Havuzu Senaryosu (Kramp)
    [
      "A) Hemen suya atlayıp, kramp giren bacağını çekerek düzeltmeye çalışın.",
      "B) Arkadaşınızı sakinleştirici sözlerle teselli edip, yardım çağırmadan önce durumun ciddiyetini değerlendirin.",
      "C) Güvenli bir şekilde suya girin, arkadaşınızı sakinleştirin ve havuz kenarına doğru yavaşça çekin.",
      "D) Arkadaşınıza yüzme havuzunun kenarına tutunmasını söyleyin ve krampın geçmesini bekleyin."
    ],
    // 5. Yemek Yeme Senaryosu (Boğulma)
    [
      "A) Arkadaşınıza sırtına hafifçe vurarak yemeği çıkarmasına yardımcı olun.",
      "B) Arkadaşınızı sırtüstü yere yatırıp, ağzına parmaklarınızı sokarak yemeği çıkarmaya çalışın.",
      "C) Heimlich manevrası uygulayarak, boğazındaki yemeği çıkarmasına yardımcı olun.",
      "D) Durumu izleyin, çünkü çoğu zaman bu tür durumlar kendiliğinden çözülür."
    ],
    // 6. Bisiklet Kazası Senaryosu (Kanama)
    [
      "A) Yarayı doğrudan suyla yıkayıp, temiz bir bezle sıkıca sarın.",
      "B) Yarayı kapatmadan önce antiseptik bir solüsyon ile temizleyin ve ardından bandajlayın.",
      "C) Yaralı arkadaşınıza ağrıyı unutturmak için şakalar yapmaya başlayın.",
      "D) Yarayı havada kuruması için açık bırakın ve doğal iyileşmesini bekleyin."
    ],
    // 7. Sınıf İçi Senaryo (Bilincini Kaybeden Öğrenci)
    [
      "A) Derhal tıbbi yardım çağırın ve öğrenciyi sırtüstü yatırarak ayaklarını yükseltin.",
      "B) Çevredeki öğrencileri toplayıp, ne olduğunu anlamaya çalışın.",
      "C) Öğrenciye su içirmeye çalışarak bilincini yerine getirmeye çalışın.",
      "D) Bilinç kaybının sebebini anlamak için öğrencinin çantasını karıştırın."
    ],
    // 8. Laboratuvar Kazası Senaryosu (Asit Yanığı)
    [
      "A) Eldeki asidi nötralize etmek için hemen bazik bir solüsyon kullanın.",
      "B) Eldeki asidi derhal bol su ile yıkayın ve ardından tıbbi yardım çağırın.",
      "C) Elini havada tutarak asidin kurumasını bekleyin.",
      "D) Eldeki yanık için hemen bir buz paketi uygulayın."
    ],
    // 9. Yaz Kampı Senaryosu (Zehirli Bitki Teması)
    [
      "A) Dokunan bölgeyi hemen alkol ile temizleyin.",
      "B) Cildi soğuk su ve sabunla yıkayıp, antihistaminik krem uygulayın.",
      "C) Zehirli bitkinin etkisini geçirebilmek için o bölgeye çamur sürün.",
      "D) Kızarıklık geçene kadar bekleyin ve hiçbir şey yapmayın."
    ],
    // 10. Spor Salonu Senaryosu (Sırt Ağrısı)
    [
      "A) Arkadaşınızı hemen ayağa kaldırıp, esneme hareketleri yapmasını sağlayın.",
      "B) Sırtına soğuk bir kompres uygulayın ve hareketsiz bir şekilde yatmasını sağlayın.",
      "C) Arkadaşınıza ağrı kesici verin ve ağrının geçmesini bekleyin.",
      "D) Durumu spor salonu yönetimine bildirin ve arkadaşınızın sırtını ovalayın."
    ],
    // 11. Okul Gezisi Senaryosu (Arı Sokması)
    [
      "A) Sokulan yere tuz sürüp, şişliğin inmesini bekleyin.",
      "B) Sokulan yerdeki arı iğnesini çıkarmaya çalışın ve buz paketi uygulayın.",
      "C) Öğrenciyi hemen hastaneye götürün ve yolda hiçbir şey yapmayın.",
      "D) Sokulan yeri soğuk su ile yıkayıp, antialerjik bir krem sürün."
    ],
    // 12. Trafik Kazası Senaryosu
    [
      "A) Diğer sürücüye su verip, kendine gelmesini beklemek.",
      "B) Diğer sürücünün aracından uzaklaşarak kendi güvenliğinizi sağlamak ve trafik akışını izlemek.",
      "C) Derhal 112'yi arayarak tıbbi yardım istemek, diğer sürücünün bilinç durumunu kontrol etmek, ve güvenlik önlemleri almak (örneğin, araçların kontaklarını kapatmak, uyarı işaretleri koymak).",
      "D) Hemen diğer aracın sürücüsünü araçtan çıkarmaya çalışmak ve çevredeki insanlardan yardım istemek."
    ],
    // 13. Deprem Senaryosu
    [
      "A) Hemen sınıftan çıkmaya çalışın ve merdivenlere yönelin.",
      "B) Sıraların yanına çökün, başınızı koruyun ve sarsıntı geçene kadar bekleyin.",
      "C) Pencereden dışarı atlamayı düşünün, belki daha hızlı güvenli bir alana ulaşırsınız.",
      "D) Arkadaşlarınıza sarsıntı bitene kadar sakin kalmalarını söyleyin ve hiçbir şey yapmayın."
    ],
    // 14. Sel Senaryosu
    [
      "A) Derhal çadırı toplayıp, arabanıza binin ve bölgeden uzaklaşın.",
      "B) Yüksek bir yere çıkın ve yardım çağırmak için bir sinyal verin.",
      "C) Çadırda kalmaya devam edin, yağmurun durmasını bekleyin.",
      "D) Sel sularına karşı yüzme yarışı yaparak en hızlı kimin kaçabileceğini görün."
    ],
    // 15. Orman Yangını Senaryosu
    [
      "A) Yangını söndürmek için üzerinizdeki suyu kullanın.",
      "B) Rüzgarın ters yönüne doğru hızla ilerleyin ve güvenli bir alana çıkın.",
      "C) Yangını daha iyi görebilmek için dumanların yükseldiği yöne gidin.",
      "D) Yangının fotoğraflarını çekmek için durun ve sosyal medyada paylaşın."
    ],
    // 16. Kar Fırtınası Senaryosu
    [
      "A) Kaymaya devam edin, fırtına kısa sürede geçecektir.",
      "B) Acil durum malzemelerinizi kullanarak hemen bir sığınak yapın.",
      "C) Karın altında saklanacak bir yer arayın.",
      "D) En yakın ağacın tepesine çıkıp yardım çağrısında bulunun."
    ],
    // 17. Tsunami Senaryosu
    [
      "A) Hemen denize girip, olası bir tsunamiyi yakından gözlemleyin.",
      "B) Sahildeki eşyalarınızı toplayıp, hızla yüksek bir alana doğru kaçın.",
      "C) Tsunami gelmeden önce güzel bir selfie çekin ve sosyal medyada paylaşın.",
      "D) Sahilde bekleyip, durumun ciddiyetini değerlendirin."
    ],
    // 18. Kimyasal Yanık Senaryosu
    [
      "A) Yanık bölgeye hemen buz uygulayın.",
      "B) Kimyasalı su ve sabun ile yıkayın ve tıbbi yardım çağırın.",
      "C) Kimyasalın üzerine başka bir kimyasal dökerek nötralize etmeye çalışın.",
      "D) Yarayı kapatarak kimyasalın daha fazla yayılmasını önleyin."
    ],
    // 19. Elektrik Çarpması Senaryosu
    [
      "A) Arkadaşınıza dokunarak onu oradan çekin.",
      "B) Elektrik kaynağını kesin ve güvenli bir şekilde müdahale edin.",
      "C) Hemen su ile yıkayarak çarpmadan kaynaklanan yanıkları temizleyin.",
      "D) Arkadaşınızı hareket ettirerek kendine gelmesini sağlamaya çalışın."
    ],
    // 20. Sıcak Çarpması Senaryosu
    [
      "A) Öğrenciyi güneşin altında dinlendirin.",
      "B) Serin bir yere alıp, sıvı tüketimini artırın.",
      "C) Fiziksel aktivitelerini artırarak terlemesini sağlayın.",
      "D) Öğrenciye kafeinli içecekler verin."
    ],
    // 21. Arı Sokması Senaryosu (Parkta)
    [
      "A) Sokulan bölgeyi sıcak su ile yıkayın.",
      "B) Arının iğnesini çıkartın ve soğuk kompres uygulayın.",
      "C) Sokulan bölgeyi keserek zehiri çıkarmaya çalışın.",
      "D) Arı sokmasını hemen bandajla sarın."
    ],
    // 22. Yabancı Cisim Yutma Senaryosu
    [
      "A) Öğrenciyi sırtından hafifçe vurun.",
      "B) Öğrenciyi yatay pozisyona getirip rahatlamasını sağlayın.",
      "C) Heimlich manevrası uygulayın.",
      "D) Öğrenciye içecek vererek yutmasını kolaylaştırın."
    ],
    // 23. Kalp Krizi Senaryosu
    [
      "A) Amcanızı yatırıp, ağrının geçmesini bekleyin.",
      "B) Hemen 112'yi arayın, amcanızı yarı oturur pozisyona getirin ve sakinleştirmeye çalışın.",
      "C) Amcanıza aspirin verin ve kendi kendine iyileşmesini bekleyin.",
      "D) Amcanızı hemen arabanıza alıp, en yakın hastaneye götürmeye çalışın."
    ],
    // 24. Parkinson Hastalığı Senaryosu
    [
      "A) Adamı güneş altında bir yere oturtun ve titremesinin geçmesini bekleyin.",
      "B) Adamı güvenli ve gölgelik bir yere oturtun, sakinleştirin ve gerekiyorsa tıbbi yardım çağırın.",
      "C) Adamın titremesi için masaj yapmaya başlayın ve su içmesini sağlayın.",
      "D) Parkinson hastalığının geçici olduğunu ve endişelenmemesi gerektiğini söyleyin."
    ],
    // 25. Diyabetik Hipoglisemi Senaryosu
    [
      "A) Arkadaşınıza hemen bir bardak su verin ve dinlenmesini sağlayın.",
      "B) Arkadaşınıza hızlı etkileyen bir şeker kaynağı (meyve suyu, şekerli içecek) verin ve durumunun iyileşip iyileşmediğini izleyin.",
      "C) Arkadaşınızı hemen dışarı çıkarıp taze hava aldırın ve soğuk suyla yüzünü yıkayın.",
      "D) Arkadaşınızın yanında bekleyin ve kan şekerinin kendiliğinden yükselmesini bekleyin."
    ]
  ];

  const correctOptions = [
    "option_b", // 1. Piknik Senaryosu (Köpek Isırığı)
    "option_c", // 2. Piknik Senaryosu (Bilek Burkulması)
    "option_d", // 3. Kamp Senaryosu (Kol Kırığı)
    "option_c", // 4. Yüzme Havuzu Senaryosu (Kramp)
    "option_c", // 5. Yemek Yeme Senaryosu (Boğulma)
    "option_b", // 6. Bisiklet Kazası Senaryosu (Kanama)
    "option_a", // 7. Sınıf İçi Senaryo (Bilincini Kaybeden Öğrenci)
    "option_b", // 8. Laboratuvar Kazası Senaryosu (Asit Yanığı)
    "option_b", // 9. Yaz Kampı Senaryosu (Zehirli Bitki Teması)
    "option_b", // 10. Spor Salonu Senaryosu (Sırt Ağrısı)
    "option_b", // 11. Okul Gezisi Senaryosu (Arı Sokması)
    "option_c", // 12. Trafik Kazası Senaryosu
    "option_b", // 13. Deprem Senaryosu
    "option_b", // 14. Sel Senaryosu
    "option_b", // 15. Orman Yangını Senaryosu
    "option_b", // 16. Kar Fırtınası Senaryosu
    "option_b", // 17. Tsunami Senaryosu
    "option_b", // 18. Kimyasal Yanık Senaryosu
    "option_b", // 19. Elektrik Çarpması Senaryosu
    "option_b", // 20. Sıcak Çarpması Senaryosu
    "option_b", // 21. Arı Sokması Senaryosu (Parkta)
    "option_c", // 22. Yabancı Cisim Yutma Senaryosu
    "option_b", // 23. Kalp Krizi Senaryosu
    "option_b", // 24. Parkinson Hastalığı Senaryosu
    "option_b"  // 25. Diyabetik Hipoglisemi Senaryosu
  ];
  

  module.exports = {firstAidScenarioOptions, firstAidScenarioTitles, firstAidScenarios, correctOptions};