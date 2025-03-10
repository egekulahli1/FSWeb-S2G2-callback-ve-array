const { fifaData } = require('./fifa.js')


/* Görev 1: 
	Verilen datayı parçalayarak aşağıdaki verileri (console.log-ing) elde ederek pratik yapın. 
	
	💡 İPUCU: Öncelikle datayı filtrelemek isteyebilirsiniz */
const filter2014Games = fifaData.filter(obj => obj.Year === 2014);
const stageTypes = fifaData.map(obj => obj.Stage)
//(a) 2014 Dünya kupası Finali Evsahibi takım ismi (dizide "Home Team Name" anahtarı)
const final2014Game = (filter2014Games.filter(obj => obj.Stage === "Final" ));
const final2014Home = final2014Game[0]["Home Team Name"];

//(b) 2014 Dünya kupası Finali Deplasman takım ismi  (dizide "Away Team Name" anahtarı)
const final2014Away = final2014Game[0]["Away Team Name"];
//(c) 2014 Dünya kupası finali Ev sahibi takım golleri (dizide "Home Team Goals" anahtarı)
const final2014HomeGoals = final2014Game[0]["Home Team Goals"];
//(d)2014 Dünya kupası finali Deplasman takım golleri  (dizide "Away Team Goals" anahtarı)
const final2014AwayGoals = final2014Game[0]["Away Team Goals"];
//(e) 2014 Dünya kupası finali kazananı*/
let winner;
if (final2014HomeGoals > final2014AwayGoals) {
  winner = final2014Game[0]['Home Team Name'];
} else if (final2014AwayGoal > final2014HomeGoals ) {
  winner = final2014Game[0]['Away Team Name'];
} else {
  winner = 'Draw';
}
const final2014Winner = winner;


/*  Görev 2: 
	Finaller adlı fonksiyonu kullanarak aşağıdakileri uygulayın:
	1. Bir dizi(array) olan Fifa datasını fonksiyonun birinci parametresi olarak alacak
	2. Sadece final maçlarını içeren nesnenin(object) datalarını filtreleyerek, bir dizi olarak döndürecek(return)
	
	💡 İPUCU - verilen data içindeki nesnelerin(objects) "Stage" anahtarına bakmalısınız
*/

function Finaller(/* kodlar buraya */allData) {
	const toFilter = allData.filter((obj) => obj['Stage'] === "Final");
	return toFilter;
    /* kodlar buraya */
}


/*  Görev 3: 
	Bir higher-order fonksiyonu olan Yillar isimli fonksiyona aşağıdakileri uygulayın: 
	1. fifaData dizisini(array) fonksiyonun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Finaller data setindeki tüm yılları içeren "years" adındaki diziyi(array) döndürecek
	*/

function Yillar(/* kodlar buraya */allData, getFinalStages) {
	let getYears = getFinalStages(allData).map(obj => obj.Year);
	return getYears;
    /* kodlar buraya */
}

console.log(Yillar(fifaData, Finaller));
console.log(Yillar(fifaData, Finaller).length);
/*  Görev 4: 
	Bir higher-order fonksiyonunu olan Kazananlar isimli fonksiyona aşağıdakileri uygulayın:  
	1. fifaData dizisini(array) fonksiyonunun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Her final maçının kazananını (evsahibi ya da deplasman) belirleyecek
	💡 İPUCU: Beraberlikler(ties) için şimdilik endişelenmeyin (Detaylı bilgi için README dosyasına bakabilirsiniz.)
	4. Tüm kazanan ülkelerin isimlerini içeren `kazananlar` adında bir dizi(array) döndürecek(return)  */ 

function Kazananlar(/* kodlar buraya */allData, getFinalStages) {	
    /* kodlar buraya */	
	const winners = getFinalStages(allData).map((mac) => mac['Home Team Goals'] > mac['Away Team Goals'] ? mac['Home Team Name'] : mac['Away Team Name']
	);
return winners;
}

console.log(Kazananlar(fifaData, Finaller));
console.log(Kazananlar(fifaData, Finaller).length);

/*  Görev 5: 
	Bir higher-order fonksiyonu olan YillaraGoreKazananlar isimli fonksiyona aşağıdakileri uygulayın:
	1. fifaData dizisini(array) fonksiyonunun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Görev 3'de yazdığınız Yillar fonksiyonunu, geriçağırım(callback) olarak fonksiyonun üçüncü parametresi olarak alacak
	4. Görev 4'de yazdığınız Kazananlar fonksiyonunu, geriçağırım(callback) olarak fonksiyonun dördüncü parametresi olarak alacak
	5. Her yıl için "{yıl} yılında, {ülke} dünya kupasını kazandı!" cümlesini(string) içeren bir diziyi(array) döndürecek
	
	💡 İPUCU: her cümlenin adım 4'te belirtilen cümleyle birebir aynı olması gerekmektedir.
*/

function YillaraGoreKazananlar(/* kodlar buraya */data, FinallerCallBack, YillarCallBack, KazananlarCallBack) {	
/* kodlar buraya */
	const allFinals = FinallerCallBack(data);
	const years = YillarCallBack(data, FinallerCallBack);
	const kazananlar = KazananlarCallBack(data, FinallerCallBack);
	const consoleOutput = [];
	
	for (let i = 0; i < allFinals.length; i++) {
		consoleOutput[i] = `${years[i]} yılında, ${kazananlar[i]} dünya kupasını kazandı!`;
	}

	return consoleOutput;
}
console.log(YillaraGoreKazananlar(fifaData, Finaller, Yillar, Kazananlar));

/*  Görev 6: 
	Bir higher order fonksiyonu olan `OrtalamaGolSayisi` isimli fonksiyona aşağıdakileri uygulayın: 
	1. Görev 2'de yazdığınız `Finaller` fonksiyonunu birinci parametre olarak alacak; 'fifaData' dizisini argüman olarak eklediğinizden emin olun
	
	💡 İPUCU: Çağırma örneği: `OrtalamaGolSayisi(Finaller(fifaData));`
	
	2. Her maç için Ortalama toplam evsahibi gol sayısı ve toplam deplasman gol sayısını hesaplayacak (her maçta atılan toplam gol sayısı)
	
	3. Sonucun 2. ondalığını yuvarlayıp, bulunan değeri döndürecek(return)
	
	💡 İPUCU: .reduce, .toFixed (dizilim(syntax) için MDN'ye bakın) kullan, ve bunu 2 adımda yapın) 
	
*/

 function OrtalamaGolSayisi(/* kodlar buraya */Finaller) {	
    /* kodlar buraya */

	let sumGameGoals = 0;
	let countGames = 0;
	const allFinals = Finaller(fifaData);
	for (let i = 0; i < allFinals.length; i++) {
		sumGameGoals += allFinals[i]['Home Team Goals'] + allFinals[i]['Away Team Goals'];
		countGames++;
	}
	let avgGoal = sumGameGoals / countGames;
	let roundedAvgGoal = avgGoal.toFixed(2);
	let intRoundedAvgGoal = parseFloat(roundedAvgGoal);
	return intRoundedAvgGoal;
}

console.log(OrtalamaGolSayisi(Finaller));

/// EKSTRA ÇALIŞMALAR ///

/*  BONUS 1:  
	`UlkelerinKazanmaSayilari` isminde bir fonksiyon oluşturun, parametre olarak `data` ve `takım kısaltmalarını` alacak ve hangi ülkenin kaç dünya kupası olduğunu döndürecek
	
	İpucu: "takım kısaltmaları" (team initials) için datada araştırma yapın!
İpucu: `.reduce` Kullanın*/

function UlkelerinKazanmaSayilari(/* kodlar buraya */) {
	
    /* kodlar buraya */
	
}



/*  BONUS 2:  
EnCokGolAtan() isminde bir fonksiyon yazın, `data` yı parametre olarak alsın ve Dünya kupası finallerinde en çok gol atan takımı döndürsün */

function EnCokGolAtan(/* kodlar buraya */) {
	
    /* kodlar buraya */
	
}


/*  BONUS 3: 
EnKotuDefans() adında bir fonksiyon yazın, `data` yı parametre olarak alsın ve Dünya kupasında finallerinde en çok golü yiyen takımı döndürsün*/

function EnKotuDefans(/* kodlar buraya */) {
	
    /* kodlar buraya */
	
}


/* Hala vaktiniz varsa, README dosyasında listelenen hedeflerden istediğinizi aşağıdaki boşluğa yazabilirsiniz. */


/* Bu satırın aşağısındaki kodları lütfen değiştirmeyin */
function sa(){
    console.log('Kodlar çalışıyor');
    return 'as';
}
sa();
module.exports = {
    sa,
    Finaller,
    Yillar,
    Kazananlar,
    YillaraGoreKazananlar,
    OrtalamaGolSayisi
}
