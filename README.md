"# cipetbet" 

getProducts, getSubscriptions Nedir?


İkisi aslında aynı şeydir fakat ön yüzde farklı gösterilirler.
Geçerli satın alınabilir birimler için getProducts veya getSubscriptions metodlarını kullanmamız gerekir.
İki metod da bize aynı şeyi döner, dönen cevabın içindeki bazı bilgiler "userId","developerId","productId"...vs .
<br><b>Bu bilgiler requestSubscription metodu çağırıldığında google play servisinin hangi kullanıcının hangi uygulamadan
hangi ürünü satın alacağını anlamasına yarar (!)</b>
