(function() {
  'use strict';

  var admobData = {};

  // Determine platform
  if (/(android)/i.test(navigator.userAgent)) {
    admobData = {
        banner: 'ca-app-pub-3400035925342390/4344834664',
        interst: 'ca-app-pub-3400035925342390/5821567865'
    };
  } else if (/(ipod|iphone|ipad)/i.test(navigator.userAgent)) {
    admobData = {
        banner: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
        interst: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
    };
  } else {
    admobData = {
        banner: 'ca-app-pub-3400035925342390/4344834664',
        interst: 'ca-app-pub-3400035925342390/5821567865'
    };
  }

  function setBanner() {
    if (AdMob) {
        AdMob.createBanner({
            adId : admobData.banner,
            position : AdMob.AD_POSITION.TOP_CENTER,
            autoShow : true
        });
    }
  }

  function setInterstitial() {
    if(AdMob) {
      AdMob.prepareInterstitial({
        adId:admobData.interst,
        //isTesting:false,
        autoShow:true
      });
    }
  }

  document.addEventListener('deviceready', setBanner, false);
    document.addEventListener('deviceready', setInterstitial, false);
}());
