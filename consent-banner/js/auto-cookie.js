//default state

var mainConsentBanner = document.querySelector(".consent-banner-wrapper");
var miniConsentBanner = document.querySelector(".miniConsentBanner");

function consentBanner(showMain, showMini){
  mainConsentBanner.style.display = showMain ? "block" : "none";
  miniConsentBanner.style.display = showMini ? "block" : "none";
}

var checkUserType = localStorage.getItem("mrCookieState");


//get toggle info and update it

var getAllToggle = document.querySelector(".cookie-detail-headline .cookie-toggle input");
var cookieCatagoryName = document.querySelector(".cookie-detail-headline .cookieCatagory").textContent;


// open mainBanner

miniConsentBanner.onclick = ()=>{

  consentBanner(true, false)

  var inputState = JSON.parse(localStorage.getItem("inputState")) || {};
  var cookieToggle = document.querySelectorAll(".cookie-toggle input");

if (inputState) {
  if (inputState.analytics === true) {
    cookieToggle[2].checked = true;
  }
  if (inputState.marketing === true) {
    cookieToggle[3].checked = true;
  }
  if (inputState.preferences === true) {
    cookieToggle[1].checked = true;
  }
  if (inputState.necessary === true) {
    cookieToggle[0].checked = true;
  }
}

  
  console.log(inputState.analytics)
  console.log(inputState.marketing)
  console.log(inputState.preferences)
}

var defaultState = {
  ad_storage: "denied",
  ad_user_data: "denied",
  ad_personalization: "denied",
  analytics_storage: "denied",
  functionality_storage: "denied",
  personalization_storage: "denied",
  security_storage: "granted"
}

if(checkUserType == "true"){

  var userConsent = {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "denied",
    functionality_storage: "denied",
    personalization_storage: "denied",
    security_storage: "granted"
}

  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}

  gtag('consent', 'default', defaultState);
  
  consentBanner(false, true)

  var inputState = JSON.parse(localStorage.getItem("inputState")) || {};

  if(inputState.marketing == true){
    userConsent.ad_storage = "granted",
    userConsent.ad_personalization = "granted",
    userConsent.ad_user_data = "granted"
  }else if(inputState.analytics == true){
    userConsent.analytics_storage = "granted"
  }else if(inputState.preferences == true){
    userConsent.functionality_storage = "granted",
    userConsent.personalization_storage = "granted"
    gtag('consent', 'update', JSON.parse(localStorage.getItem("cookieState")));
  }
}else if(!checkUserType || checkUserType === null){
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('consent', 'default', defaultState);
  consentBanner(true, false)
}


//accept all
function acceptConsent(){
  var acceptAll = {
    ad_storage: "granted",
    ad_user_data: "granted",
    ad_personalization: "granted",
    analytics_storage: "granted",
    functionality_storage: "granted",
    personalization_storage: "granted",
    security_storage: "granted"
};

  var inputArray = {
      necessary: true,
      preferences: true,
      analytics: true,
      marketing: true,
  }

  
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  
  gtag('consent', 'update', acceptAll);
  window.dataLayer.push({
    event: "consent_update",
    consent: acceptAll,
  })

  consentBanner(false, true)

  localStorage.setItem("mrCookieState", true);
  
  localStorage.setItem("cookieState", JSON.stringify(acceptAll));
  localStorage.setItem("inputState", JSON.stringify(inputArray));

  var cookieToggle = document.querySelectorAll(".cookie-toggle input");
  for(let i = 1; i < cookieToggle.length; i++){
    cookieToggle[i].checked = true
  }

}

//rejects all
function rejectConsent(){

  var deniedAll = {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "denied",
    functionality_storage: "denied",
    personalization_storage: "denied",
    security_storage: "granted"
}

  var inputArray = {
      necessary: false,
      preferences: false,
      analytics: false,
      marketing: false,
  }

  
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  
  gtag('consent', 'update', deniedAll);
  window.dataLayer.push({
    event: "consent_update",
    consent: deniedAll,
  })

  consentBanner(false, true);

  localStorage.setItem("mrCookieState", true);
  localStorage.setItem("cookieState", JSON.stringify(deniedAll));
  localStorage.setItem("inputState", JSON.stringify(inputArray));

  var cookieToggle = document.querySelectorAll(".cookie-toggle input");
  for(let i = 1; i < cookieToggle.length; i++){
    cookieToggle[i].checked = false
  }
}

function preferenceConsent(){

  var consetCustom = {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "denied",
    functionality_storage: "denied",
    personalization_storage: "denied",
    security_storage: "granted"
};

  var inputArray = {
      necessary: true,
      preferences: false,
      analytics: false,
      marketing: false,
  }

  var inputkeys = Object.keys(inputArray);
  var consetCustomKeys = Object.keys(consetCustom);
  
  var cookieToggle = document.querySelectorAll(".cookie-toggle input");
  for(let i = 0; i < cookieToggle.length; i++){
      inputArray[inputkeys[i]] = cookieToggle[i].checked
  }

  if(inputArray.marketing == true){
    consetCustom.ad_storage = "granted",
    consetCustom.ad_personalization = "granted",
    consetCustom.ad_user_data = "granted"
  }else if(inputArray.analytics == true){
    consetCustom.analytics_storage = "granted"
  }else if(inputArray.preferences == true){
    consetCustom.functionality_storage = "granted",
    consetCustom.personalization_storage = "granted"
  }

  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  
  gtag('consent', 'update', consetCustom);
  window.dataLayer.push({
    event: "consent_update",
    consent: consetCustom,
  })
  consentBanner(false, true);

  localStorage.setItem("mrCookieState", true);
  localStorage.setItem("cookieState", JSON.stringify(consetCustom));
  localStorage.setItem("inputState", JSON.stringify(inputArray));

}


var cookieDataBase;
var websiteCookies = [];
var matchedCookies = [];

//cookie catagories
var necessaryCookies = {};
var preferencesCookies = {};
var analyticsCookies = {};
var marketingCookies = {};

//select each catagory elements
var getNecessarySection = document.querySelector(".necessaryCookies .all-cookies");
var getPreferencesSection = document.querySelector(".preferencesCookies .all-cookies");
var getAnalyticsSection = document.querySelector(".analyticsCookies .all-cookies");
var getMarketingSection = document.querySelector(".marketingCookies .all-cookies");

//create code for each catagory
var necessaryElements = [];
var preferencesElements = [];
var analyticsElements = [];
var marketingElements = [];

//get cookiedata from json file
async function loadCookieDataBase(loadAfterDataBase, matchingCookie, updateCookies, generalCode) {
  async function loadCookies() {
    try {
      const response = await fetch('https://cdn.jsdelivr.net/gh/alifmahmudashik/cookie-database-json@main/cookie.json');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const cookies = await response.json();
      return cookies; 
    } catch (error) {
      console.error('Error:', error);
      return []; 
    }
  }
  
  cookieDataBase = await loadCookies();

  loadAfterDataBase();
  matchingCookie();
  updateCookies();
  generalCode();
}

//get website cookies and split them info name and value
function getWebsiteCookie(){
  var getWebCookies = document.cookie;
  var splitCookies = getWebCookies.split(";");

  for(let i = 0; i < splitCookies.length; i++){
      var getEachCookies = splitCookies[i].split("=")
      websiteCookies.push({
        name: getEachCookies[0].replaceAll(" ",""),
        value: getEachCookies[1].replaceAll(" ","")
      })
  }
}

//find the matching cookies with the data base and website
function matchingCookies() {
  websiteCookies.forEach((webCookie) => {
    const matchedCookie = cookieDataBase.find(dbCookie => dbCookie.data_key === webCookie.name);
    if (matchedCookie) {
      matchedCookies.push(matchedCookie);
    }
  });

  matchedCookies.forEach((element, index)=>{
    function checkCookies(){
        var platform = matchedCookies[index].platform;
            if(!allCookies[platform]){
                allCookies[platform] = []
            };

            allCookies[platform].push({
                id: matchedCookies[index].id,
                platform: matchedCookies[index].platform,
                category: matchedCookies[index].category,
                data_key: matchedCookies[index].data_key,
                domain: matchedCookies[index].domain,
                description: matchedCookies[index].description,
                retention_period: matchedCookies[index].retention_period,
                data_controller: matchedCookies[index].data_controller,
                privary_rights_portals: matchedCookies[index].privary_rights_portals,
                wildcard_match: matchedCookies[index].wildcard_match,
         });
    }

    if(element.category == "Functional"){
        var platform = matchedCookies[index].platform;
        if(!marketingCookies[platform]){
            marketingCookies[platform] = []
        };
        marketingCookies[platform].push({
            id: matchedCookies[index].id,
            platform: matchedCookies[index].platform,
            category: matchedCookies[index].category,
            data_key: matchedCookies[index].data_key,
            domain: matchedCookies[index].domain,
            description: matchedCookies[index].description,
            retention_period: matchedCookies[index].retention_period,
            data_controller: matchedCookies[index].data_controller,
            privary_rights_portals: matchedCookies[index].privary_rights_portals,
            wildcard_match: matchedCookies[index].wildcard_match,
        });
        
    }else if(element.category == "Preferences"){
        var platform = matchedCookies[index].platform;
        if(!preferencesCookies[platform]){
            preferencesCookies[platform] = []
        };
        preferencesCookies[platform].push({
            id: matchedCookies[index].id,
            platform: matchedCookies[index].platform,
            category: matchedCookies[index].category,
            data_key: matchedCookies[index].data_key,
            domain: matchedCookies[index].domain,
            description: matchedCookies[index].description,
            retention_period: matchedCookies[index].retention_period,
            data_controller: matchedCookies[index].data_controller,
            privary_rights_portals: matchedCookies[index].privary_rights_portals,
            wildcard_match: matchedCookies[index].wildcard_match,
        });
    }else if(element.category == "Marketing"){
        var platform = matchedCookies[index].platform;
        if(!marketingCookies[platform]){
            marketingCookies[platform] = []
        };
        marketingCookies[platform].push({
            id: matchedCookies[index].id,
            platform: matchedCookies[index].platform,
            category: matchedCookies[index].category,
            data_key: matchedCookies[index].data_key,
            domain: matchedCookies[index].domain,
            description: matchedCookies[index].description,
            retention_period: matchedCookies[index].retention_period,
            data_controller: matchedCookies[index].data_controller,
            privary_rights_portals: matchedCookies[index].privary_rights_portals,
            wildcard_match: matchedCookies[index].wildcard_match,
        });

    }else if(element.category == "Analytics"){
        var platform = matchedCookies[index].platform;
        if(!analyticsCookies[platform]){
            analyticsCookies[platform] = []
        };
        analyticsCookies[platform].push({
            id: matchedCookies[index].id,
            platform: matchedCookies[index].platform,
            category: matchedCookies[index].category,
            data_key: matchedCookies[index].data_key,
            domain: matchedCookies[index].domain,
            description: matchedCookies[index].description,
            retention_period: matchedCookies[index].retention_period,
            data_controller: matchedCookies[index].data_controller,
            privary_rights_portals: matchedCookies[index].privary_rights_portals,
            wildcard_match: matchedCookies[index].wildcard_match,
        });
    }
  });

}

//update each cookies
function updateCookies(){
  //necessary cookies updated
  for(let i = 0; i < necessaryCookies.length; i++){
    const platformCookies = necessaryCookies[platform].length; 
    necessaryElements.push(`
    <div class="cookies">
            <div class="cookie-provider">
                <div>
                    <span class="cookie-provider-headline consent-headlines">${necessaryCookies[i].data_controller}</span>
                    <div class="totalCookiesWrapper">
                    <span class="totalCookies">${platformCookies}</span>
                    </div>
                </div>
                <div>
                    <span class="material-symbols-outlined">
                        expand_more
                    </span>
                </div>
            </div>

            <div class="cookie-learn-more-wrapper" style="display:none">
                <span class="cookie-learn-more">Learn More about the provider</span>
                <span class="material-symbols-outlined">
                    open_in_new
                </span>
            </div>

            <div class="actual-cookie-wrapper">
                <div>
                    <span class="consent-headlines">${necessaryCookies[i].data_key}</span>
                </div>
                <div>
                    <span class="consent-descriptions">${necessaryCookies[i].description}</span>
                </div>
                <div class="hr-making">
                </div>
                <div>
                    <span class="consent-headlines">Expiry:</span>
                    <span class="consent-descriptions">${necessaryCookies[i].retention_period}</span>
                </div>
                <div>
                    <span class="consent-headlines">Type:</span>
                    <span class="consent-descriptions">HTTP</span>
                </div>

            </div>
        </div>
    `)
  }
  document.getElementById("totalNecessaryCookies").textContent = necessaryCookies.length || 0;
  getNecessarySection.innerHTML += necessaryElements.join("");

  //pre cookies updated
  for(let i = 0; i < preferencesCookies.length; i++){
    const platformCookies = preferencesCookies[platform].length;
    console.log(platformCookies)

    // Store the array for the platform

    preferencesElements.push(`
    <div class="cookies">
            <div class="cookie-provider">
                <div>
                    <span class="cookie-provider-headline consent-headlines">${preferencesCookies[i].data_controller}</span>
                    <div class="totalCookiesWrapper">
                    <span class="totalCookies">${platformCookies}</span>
                    </div>
                    </div>
                <div>
                    <span class="material-symbols-outlined">
                        expand_more
                    </span>
                </div>
            </div>

            <div class="cookie-learn-more-wrapper" style="display:none">
                <span class="cookie-learn-more">Learn More about the provider</span>
                <span class="material-symbols-outlined">
                    open_in_new
                </span>
            </div>

            <div class="actual-cookie-wrapper">
                <div>
                    <span class="consent-headlines">${preferencesCookies[i].data_key}</span>
                </div>
                <div>
                    <span class="consent-descriptions">${preferencesCookies[i].description}</span>
                </div>
                <div class="hr-making">
                </div>
                <div>
                    <span class="consent-headlines">Expiry:</span>
                    <span class="consent-descriptions">${preferencesCookies[i].retention_period}</span>
                </div>
                <div>
                    <span class="consent-headlines">Type:</span>
                    <span class="consent-descriptions">HTTP</span>
                </div>

            </div>
        </div>
    `)
  }
  document.getElementById("totalPreferencesCookies").textContent = preferencesCookies.length || 0;
  getPreferencesSection.innerHTML += preferencesElements.join("");

  //analytics cookies updated
  for (const platform in analyticsCookies) {
    const platformCookies = analyticsCookies[platform].length; // Store the array for the platform
    analyticsElements.push(`
      <div class="cookies">
        <div class="cookie-provider">
          <div>
            <span class="cookie-provider-headline consent-headlines">${platform}</span>
            <div class="totalCookiesWrapper">
            <span class="totalCookies">${platformCookies}</span>
            </div>
          </div>
          <div>
            <span class="material-symbols-outlined">expand_more</span>
          </div>
        </div>
  
        <div class="cookie-learn-more-wrapper">
          <span class="cookie-learn-more">Learn More about the provider</span>
          <span class="material-symbols-outlined">open_in_new</span>
        </div>
    `);
  
    // Create .actual-cookie-wrapper for each object within the platform array
    analyticsCookies[platform].forEach(function(cookieObject) {
      analyticsElements.push(`
        <div class="actual-cookie-wrapper" style="display:none">
          <div>
            <span class="consent-headlines">${cookieObject.data_key}</span\>
  </div>
  <div>
  <span class="consent-descriptions"></span>${cookieObject.description}</span>
          </div>
          <div class="hr-making"></div>
          <div>
            <span class="consent-headlines">Expiry:</span>
            <span class="consent-descriptions">${cookieObject.retention_period}</span>
          </div>
          <div>
            <span class="consent-headlines">Type:</span>
            <span class="consent-descriptions">HTTP</span>
          </div>
        </div>
      `);
    });
  
    analyticsElements.push(`
      </div>
    `);
    
    }

  document.getElementById("totalAnalyticsCookies").textContent = Object.keys(analyticsCookies).length;
  getAnalyticsSection.innerHTML += analyticsElements.join("");

  //marketing cookies updated
  for (const platform in marketingCookies) {
    const platformCookies = marketingCookies[platform].length;
    marketingElements.push(`
      <div class="cookies">
        <div class="cookie-provider">
          <div>
            <span class="cookie-provider-headline consent-headlines">${platform}</span>
            <div class="totalCookiesWrapper">
            <span class="totalCookies">${platformCookies}</span>
            </div>
          </div>
          <div>
            <span class="material-symbols-outlined">expand_more</span>
          </div>
        </div>
  
        <div class="cookie-learn-more-wrapper">
          <span class="cookie-learn-more">Learn More about the provider</span>
          <span class="material-symbols-outlined">open_in_new</span>
        </div>
    `);
  
    // Create .actual-cookie-wrapper for each object within the platform array
    marketingCookies[platform].forEach(function(cookieObject) {
      marketingElements.push(`
        <div class="actual-cookie-wrapper" style="display:none">
          <div>
            <span class="consent-headlines">${cookieObject.data_key}</span\>
  </div>
  <div>
  <span class="consent-descriptions"\></span>${cookieObject.description}</span>
          </div>
          <div class="hr-making"></div>
          <div>
            <span class="consent-headlines">Expiry:</span>
            <span class="consent-descriptions">${cookieObject.retention_period}</span>
          </div>
          <div>
            <span class="consent-headlines">Type:</span>
            <span class="consent-descriptions">HTTP</span>
          </div>
        </div>
      `);
    });
  
    marketingElements.push(`
      </div>
    `);
    
    }

  document.getElementById("totalMarketingCookies").textContent = Object.keys(marketingCookies).length;
  getMarketingSection.innerHTML += marketingElements.join("");

}

// general codes
function generalCode(){
var navItems = document.querySelectorAll(".nav-item");
var contentSections = document.querySelectorAll(".section-content");

navItems.forEach((item, index) => {
    item.onclick = () => {
        contentSections.forEach((section, idx) => {
            section.style.display = 'none';
            navItems[idx].style.borderBottom = 'none';
        });

        if (contentSections[index]) {
            contentSections[index].style.display = 'block';
        }
        item.style.borderBottom = '2px solid #3771ce';
    };
});



var cookieCatagory = document.querySelectorAll(".cookieCatagory");
var cookies = document.querySelectorAll(".all-cookies");

for(let i = 0; i < cookieCatagory.length; i++){
    cookieCatagory[i].onclick = function (){
        if(cookies[i].style.display == "none"){
            cookies[i].style.display = "block"
        }else if(cookies[i].style.display == "block"){
            cookies[i].style.display = "none"
        }
    }
}


var cookieProviderHeadlines = document.querySelectorAll(".cookies .cookie-provider");

cookieProviderHeadlines.forEach(function(headline) {
  headline.onclick = function() {
    var actualCookieWrappers = this.closest(".cookies").querySelectorAll(".actual-cookie-wrapper");

    actualCookieWrappers.forEach(function(wrapper) {
      wrapper.style.display = wrapper.style.display === "none" ? "flex" : "none";
    });
  };
});

}


loadCookieDataBase(getWebsiteCookie, matchingCookies, updateCookies, generalCode);