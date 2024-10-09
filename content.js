// Example data for cookie categories
var cookieCategories = {};

var checkedCategories = {
    Necessary: "denied",
    Preferences: "denied",
    Statistics: "denied",
    Marketing: "denied",
    Unclassified: "denied",
}

async function fetchCookies() {
    const response = await fetch('https://cdn.jsdelivr.net/gh/alifmahmudashik/marketing@698b63c66ff701f07e067c7124b0d3ef71b5219f/cookie.json');
    return response.json();
}

var websiteCookie = document.cookie.split(";");
var websiteCookiePaths = [
    "wp-settings-time-",
    "_fbp",
    "__cf_bm",
    "_sid"
];

var justifyCookies = [
    {
        name: "_ga_",
        value: "_ga_*"
    }
];

websiteCookie.forEach((cookie) => {
    let dataKey = cookie.split("=")[0].trim();

    let justifiedValue = justifyCookies.find(justify => dataKey.includes(justify.name))?.value || dataKey;

    if (!websiteCookiePaths.includes(justifiedValue)) {
        websiteCookiePaths.push(justifiedValue);
    }
});

async function processCookies() {
    
    var sendCookies;

    try {
        const jsonCookies = await fetchCookies();
        let matchedCookies = [];

        jsonCookies.forEach((jsonCookie) => {
            if (websiteCookiePaths.includes(jsonCookie.data_key)) {
                matchedCookies.push(jsonCookie);
            }
        });
        sendCookies = matchedCookies;
        console.log(matchedCookies)

    } catch (error) {
        console.error("Error fetching or processing cookies:", error);
    }

    categoriesCookies(sendCookies);
    restCodes()
}


function categoriesCookies(sendCookies){

    var tempCategories = {
        Necessary: {
            totalCookies: 0,
            description: "Necessary cookies make the website usable by enabling basic functions like page navigation and access to secure areas of the website. Without these cookies, the website cannot function properly.",
            allProviders: {},
        },
        Preferences: {
            totalCookies: 0,
            description: "Preference cookies allow a website to remember information that changes the way the website behaves or looks.",
            allProviders: {},
        },
        Statistics: {
            totalCookies: 0,
            description: "Statistic cookies help website owners to understand how visitors interact with websites by collecting and reporting information anonymously.",
            allProviders: {},
        },
        Marketing: {
            totalCookies: 0,
            description: "Marketing cookies are used to track visitors across websites. The intention is to display ads that are relevant and engaging for the individual user.",
            allProviders: {},
        },
        Unclassified: {
            totalCookies: 0,
            description: "Unclassified cookies are cookies that we are in the process of classifying, together with the providers of individual cookies.",
            allProviders: {},
        },
    };

    sendCookies.forEach(function(sendCookies, index){
        if(sendCookies.category == "Functional"){
            if(!tempCategories.Necessary.allProviders[sendCookies.data_controller]){
                tempCategories.Necessary.allProviders[sendCookies.data_controller] = [];
            }
            tempCategories.Necessary.allProviders[sendCookies.data_controller].push(sendCookies);
            tempCategories.Necessary.totalCookies += 1
        }else if(sendCookies.category == "Preferences"){
            if(!tempCategories.Preferences.allProviders[sendCookies.data_controller]){
                tempCategories.Preferences.allProviders[sendCookies.data_controller] = [];
            }
            tempCategories.Preferences.allProviders[sendCookies.data_controller].push(sendCookies);
            tempCategories.Preferences.totalCookies += 1
        }else if(sendCookies.category == "Analytics"){
            if(!tempCategories.Statistics.allProviders[sendCookies.data_controller]){
                tempCategories.Statistics.allProviders[sendCookies.data_controller] = [];
            }
            tempCategories.Statistics.allProviders[sendCookies.data_controller].push(sendCookies);
            tempCategories.Statistics.totalCookies += 1
        }else if(sendCookies.category == "Marketing"){
            if(!tempCategories.Marketing.allProviders[sendCookies.data_controller]){
                tempCategories.Marketing.allProviders[sendCookies.data_controller] = [];
            }
            tempCategories.Marketing.allProviders[sendCookies.data_controller].push(sendCookies);
            tempCategories.Marketing.totalCookies += 1
        }else{
            if(!tempCategories.Unclassified.allProviders[sendCookies.data_controller]){
                tempCategories.Unclassified.allProviders[sendCookies.data_controller] = [];
            }
            tempCategories.Unclassified.allProviders[sendCookies.data_controller].push(sendCookies);
            tempCategories.Unclassified.totalCookies += 1
        }
    });


    cookieCategories = tempCategories;
    createMainElements();
}

function createMainElements(){

    var createWrapper = document.createElement("div");
    createWrapper.classList.add("cookieBannerWrapper");

    var createMiniIcon = document.createElement("div");
    createMiniIcon.classList.add("miniCookieIcon");

    createWrapper.innerHTML = `
                
                <div class="bannerLoader"></div>

                <!-- banner logo -->
                    <div class="bannerHeadlineLogo">
                        <img width="100px" src="https://alifmahmud.com/wp-content/themes/optiboom/assets/img/logo/logo-dark.png">
                       
                        <div class="darkModeWrapper">
                            <svg width="20px" class="bannerDarkMode" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M19.9001 2.30719C19.7392 1.8976 19.1616 1.8976 19.0007 2.30719L18.5703 3.40247C18.5212 3.52752 18.4226 3.62651 18.298 3.67583L17.2067 4.1078C16.7986 4.26934 16.7986 4.849 17.2067 5.01054L18.298 5.44252C18.4226 5.49184 18.5212 5.59082 18.5703 5.71587L19.0007 6.81115C19.1616 7.22074 19.7392 7.22074 19.9001 6.81116L20.3305 5.71587C20.3796 5.59082 20.4782 5.49184 20.6028 5.44252L21.6941 5.01054C22.1022 4.849 22.1022 4.26934 21.6941 4.1078L20.6028 3.67583C20.4782 3.62651 20.3796 3.52752 20.3305 3.40247L19.9001 2.30719Z" stroke="#1C274C"></path> <path d="M16.0328 8.12967C15.8718 7.72009 15.2943 7.72009 15.1333 8.12967L14.9764 8.52902C14.9273 8.65407 14.8287 8.75305 14.7041 8.80237L14.3062 8.95987C13.8981 9.12141 13.8981 9.70107 14.3062 9.86261L14.7041 10.0201C14.8287 10.0694 14.9273 10.1684 14.9764 10.2935L15.1333 10.6928C15.2943 11.1024 15.8718 11.1024 16.0328 10.6928L16.1897 10.2935C16.2388 10.1684 16.3374 10.0694 16.462 10.0201L16.8599 9.86261C17.268 9.70107 17.268 9.12141 16.8599 8.95987L16.462 8.80237C16.3374 8.75305 16.2388 8.65407 16.1897 8.52902L16.0328 8.12967Z" stroke="#1C274C"></path> <path d="M21.0672 11.8568L20.4253 11.469L21.0672 11.8568ZM12.1432 2.93276L11.7553 2.29085V2.29085L12.1432 2.93276ZM7.37554 20.013C7.017 19.8056 6.5582 19.9281 6.3508 20.2866C6.14339 20.6452 6.26591 21.104 6.62446 21.3114L7.37554 20.013ZM2.68862 17.3755C2.89602 17.7341 3.35482 17.8566 3.71337 17.6492C4.07191 17.4418 4.19443 16.983 3.98703 16.6245L2.68862 17.3755ZM21.25 12C21.25 17.1086 17.1086 21.25 12 21.25V22.75C17.9371 22.75 22.75 17.9371 22.75 12H21.25ZM2.75 12C2.75 6.89137 6.89137 2.75 12 2.75V1.25C6.06294 1.25 1.25 6.06294 1.25 12H2.75ZM15.5 14.25C12.3244 14.25 9.75 11.6756 9.75 8.5H8.25C8.25 12.5041 11.4959 15.75 15.5 15.75V14.25ZM20.4253 11.469C19.4172 13.1373 17.5882 14.25 15.5 14.25V15.75C18.1349 15.75 20.4407 14.3439 21.7092 12.2447L20.4253 11.469ZM9.75 8.5C9.75 6.41182 10.8627 4.5828 12.531 3.57467L11.7553 2.29085C9.65609 3.5593 8.25 5.86509 8.25 8.5H9.75ZM12 2.75C11.9115 2.75 11.8077 2.71008 11.7324 2.63168C11.6686 2.56527 11.6538 2.50244 11.6503 2.47703C11.6461 2.44587 11.6482 2.35557 11.7553 2.29085L12.531 3.57467C13.0342 3.27065 13.196 2.71398 13.1368 2.27627C13.0754 1.82126 12.7166 1.25 12 1.25V2.75ZM21.7092 12.2447C21.6444 12.3518 21.5541 12.3539 21.523 12.3497C21.4976 12.3462 21.4347 12.3314 21.3683 12.2676C21.2899 12.1923 21.25 12.0885 21.25 12H22.75C22.75 11.2834 22.1787 10.9246 21.7237 10.8632C21.286 10.804 20.7293 10.9658 20.4253 11.469L21.7092 12.2447ZM12 21.25C10.3139 21.25 8.73533 20.7996 7.37554 20.013L6.62446 21.3114C8.2064 22.2265 10.0432 22.75 12 22.75V21.25ZM3.98703 16.6245C3.20043 15.2647 2.75 13.6861 2.75 12H1.25C1.25 13.9568 1.77351 15.7936 2.68862 17.3755L3.98703 16.6245Z" fill="#1C274C"></path> </g></svg>
                        </div>
                        
                    </div>
            
                    <!-- banner nav bar -->
                    <div class="bannerSectionHeadlineWrapper">
                        <div class="bannerSectionHeadline cookieHeadline activeHeadlineBorder"></div>
                        <div class="bannerSectionHeadline cookieHeadline"></div>
                        <div class="bannerSectionHeadline cookieHeadline"></div>
                    </div>
            
                    <!-- banner middle sections -->
                    <div class="bannerMiddleSectionWrapper">
            
                        <!-- banner details - consent nav -->
                        <div class="bannerContent bannerContentActive cookieDescription"></div>
                    
            
                        <!-- banner details - details nav -->
                        <div class="bannerContent cookieInfoSection">
            
                            <!-- cookie all category section wrapper -->
                            <div class="cookieSectionWrapper"> 
                            </div>
            
                        </div>
            
            
                        <!-- banner details - about nav -->
                        <div class="bannerContent cookieDescription"></div>
                    </div>
            
                    <div class="bannerBottomSectionWrapper">
                        <button id="consentAccept" class="active consentAccept"></button>
                        <button id="consentReject" class="consentReject"></button>
                        <button id="consentCustom" class="consentCustom"></button>
                    </div>
    `

    createMiniIcon.innerHTML = `
    <svg width="50px" fill="#000000" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M21.598 11.064a1.006 1.006 0 0 0-.854-.172A2.938 2.938 0 0 1 20 11c-1.654 0-3-1.346-3.003-2.938.005-.034.016-.134.017-.168a.998.998 0 0 0-1.254-1.006A3.002 3.002 0 0 1 15 7c-1.654 0-3-1.346-3-3 0-.217.031-.444.099-.716a1 1 0 0 0-1.067-1.236A9.956 9.956 0 0 0 2 12c0 5.514 4.486 10 10 10s10-4.486 10-10c0-.049-.003-.097-.007-.16a1.004 1.004 0 0 0-.395-.776zM8.5 6a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-2 8a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm3 4a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm2.5-6.5a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0zm3.5 6.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"></path></g></svg>
    `

    document.body.appendChild(createWrapper);
    document.body.appendChild(createMiniIcon);

    createCategoryElements()
}

function createCategoryElements(){
    const container = document.querySelector('.cookieSectionWrapper'); // Select the container

    // Iterate through each category and build the HTML
    Object.keys(cookieCategories).forEach((categoryKey) => {
        const category = cookieCategories[categoryKey];
        
        // Calculate the total number of cookies dynamically
        let totalCookies = 0;
        Object.keys(category.allProviders).forEach((providerName) => {
            totalCookies += category.allProviders[providerName].length;
        });

        let categoryHTML = `
            <div class="cookieCategoryWrapper">
                <div class="cookieCategoryTitle">
                    <div class="cookieCategoryTitleLeft">
                        <svg class="arrowDown" width="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M17.9188 8.17969H11.6888H6.07877C5.11877 8.17969 4.63877 9.33969 5.31877 10.0197L10.4988 15.1997C11.3288 16.0297 12.6788 16.0297 13.5088 15.1997L15.4788 13.2297L18.6888 10.0197C19.3588 9.33969 18.8788 8.17969 17.9188 8.17969Z" fill="#292D32"></path> </g></svg>
                        <span class="cookieHeadline categoryTitle">${categoryKey}</span>
                        <span class="cookieHeadline cookietotal">${totalCookies}</span>
                    </div>
                    <div class="cookieCategoryTitleRight">
                    <label class="switch">
                        <input class="bannerCheckBox" type="checkbox">
                        <span class="slider round"></span>
                    </label>
                    </div>
                </div>
                <div class="cookieCategoryDescriptions cookieDescription">${category.description}</div>
                <div class="allCookiesOuter ${totalCookies === 0 ? '' : 'displayNone'}">`;

        // If there are no cookies in this category, display the message
        if (totalCookies === 0) {
            categoryHTML += `
                <div class="NoCookieWarning mainCookieWrapper">
                    <span class="cookieHeadline">No Cookie to display</span>
                </div>`;
        } else {
            // Iterate through each provider in the category
            Object.keys(category.allProviders).forEach((providerName) => {
                const providerCookies = category.allProviders[providerName];

                categoryHTML += `
                    <div class="allCookiesWrapper">
                        <div class="allCookieWrapperTitle">
                            <div class="allCookieTitleLeft">
                                <span class="cookieHeadline">${providerName}</span>
                                <span class="cookieHeadline cookietotal">${providerCookies.length}</span>
                            </div>
                            <div class="allCookieTitleRight">
                                <svg class="arrowDown" width="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M17.9188 8.17969H11.6888H6.07877C5.11877 8.17969 4.63877 9.33969 5.31877 10.0197L10.4988 15.1997C11.3288 16.0297 12.6788 16.0297 13.5088 15.1997L15.4788 13.2297L18.6888 10.0197C19.3588 9.33969 18.8788 8.17969 17.9188 8.17969Z" fill="#292D32"></path> </g></svg>
                            </div>
                        </div>
                        <div class="cookieProviderLearnMore">
                            <a target="_blank" href="${providerCookies[0].privacy_rights_portals}" class="cookieHeadline">Learn more about ${providerName}</a>
                            <svg width="25px" viewBox="0 0 192 192" xmlns="http://www.w3.org/2000/svg" style="enable-background:new 0 0 192 192" xml:space="preserve" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M84 128.6H54.6C36.6 128.6 22 114 22 96c0-9 3.7-17.2 9.6-23.1 5.9-5.9 14.1-9.6 23.1-9.6H84m24 65.3h29.4c9 0 17.2-3.7 23.1-9.6 5.9-5.9 9.6-14.1 9.6-23.1 0-18-14.6-32.6-32.6-32.6H108M67.9 96h56.2" style="fill:none;stroke:#000000;stroke-width:12;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10"></path></g></svg>
                        </div>`;

                // Iterate through each cookie in the provider
                providerCookies.forEach((cookie) => {
                    categoryHTML += `
                        <div class="mainCookiesDetails displayNone">
                            <div class="mainCookieWrapper">
                                <span class="mainCookieName cookieHeadline">${cookie.data_key}</span>
                                <span class="mainCookieDescription cookieDescription">${cookie.description}</span>
                                <div class="bannerhr"></div>
                                <span class="cookieHeadline">Expiry: ${cookie.retention_period}</span>
                                <span class="cookieHeadline">Domain: ${cookie.domain ? cookie.domain : window.location.host}</span>
                                <span class="cookieHeadline">Controller: ${cookie.data_controller}</span>
                            </div>
                        </div>`;
                });

                categoryHTML += `</div>`; // Close the allCookiesWrapper div
            });
        }

        categoryHTML += `</div></div></div>`; // Close the allCookieDetails and outer divs
        container.innerHTML += categoryHTML; // Append to the container
    });
}

function restCodes(){

    /* ---- declare the variables ---- */
    //main banner wrapper
    var banner = document.querySelector(".cookieBannerWrapper");

    //mini cookie icon
    var miniIcon = document.querySelector(".miniCookieIcon");

    //category headline and provider
    var cookieCategoriesTitle = document.querySelectorAll(".cookieCategoryTitleLeft");
    var allCookieDetails = document.querySelectorAll(".allCookiesOuter");

    //pro
    var allCookieWrapperTitle = document.querySelectorAll(".allCookieWrapperTitle");
    var allCookieWrapper = document.querySelectorAll(".allCookiesWrapper");

    //banner checkbox
    var bannerCheckBox = document.querySelectorAll(".bannerCheckBox");

    //banner bottom buttons and text
    var bannerButtons = document.querySelectorAll(".bannerBottomSectionWrapper button");
    var bannerButtonsTexts = ["Accept", "Reject", "Custom", "Save"];

    //banner loader
    var bannerLoader = document.querySelector(".bannerLoader")
    var loadingTime = 300;

/*     function darkMode(){

        // Select the root element
        const root = document.documentElement;

        var getDarkModeIcon = document.querySelector(".darkModeWrapper");

        var getMode = localStorage.getItem("viewMode")

        if(getMode == "dark"){

            // Change a CSS variable
            root.style.setProperty('--bannerColorWhite', '#202124');
            root.style.setProperty('--cookieHeadlineColor', '#ffffff');
            root.style.setProperty('--cookieDescriptionColor', '#ffffff');
            root.style.setProperty('--mainCookieBgColor', '#3c4042');

        }else if(getMode == "light"){

            // Change a CSS variable
            root.style.setProperty('--bannerColorWhite', '#202124');
            root.style.setProperty('--cookieHeadlineColor', '#ffffff');
            root.style.setProperty('--cookieDescriptionColor', '#ffffff');
            root.style.setProperty('--mainCookieBgColor', '#3c4042');
        }

        getDarkModeIcon.onclick = function(){
            


            
            
            localStorage.setItem("viewMode", "dark");
        }
    }

    darkMode(); */

    /* ---- predefined functions ---- */
    //check when the banner will show to the users
    function checkChoiceShowBanner(){
        var choiceMade = localStorage.getItem("choiceMade");
        var showBanner = localStorage.getItem("sb");

        if(showBanner == "true"){
            if(!choiceMade){
                showHide(true, false)
            }else if(choiceMade){
                showHide(false, true)
            }
        }else if(showBanner == "false"){
            showHide(false, false)
        }

        miniIcon.onclick = function(){
            showHide(true, false)
        }
    }

    //add blur and loading
    function addLoaderAndBlur(){
        allContentSection.forEach(function(blur){
            blur.classList.add("blur");
        })
        bannerLoader.style.display = "block";
    }

    //remove blur and loading
    function removeLoaderAndBlur(){
        allContentSection.forEach(function(blur){
            blur.classList.remove("blur");
        })
        bannerLoader.style.display = "none";
    }

    //show banner or hide the banner
    function showHide(mainBanner, miniBanner){
        banner.style.display = mainBanner ? "block" : "none";
        miniIcon.style.display = miniBanner ? "flex" : "none";
    }

    //push choice made in the local storage
    function choiceMade(){
        localStorage.setItem("choiceMade", "true")
    }

    /* ---- replacing the text ---- */

    //nav and nav text
    var allTopSection = document.querySelectorAll(".bannerSectionHeadline");
    var topSectionText = ["Consent", "Details", "About"];

    //replace the nav text
    allTopSection.forEach(function(element, index) {
        element.innerHTML += topSectionText[index];
    });

    //middle section and content
    var allContentSection = document.querySelectorAll(".bannerContent");
    var firstSectionText = "We use cookies to personalize content and ads, provide social media features, and analyze our traffic. We also share information about your use of our site with our social media, advertising, and analytics partners, who may combine it with other information you’ve provided to them or they’ve collected from your use of their services.";
    var thirdSectionText = "Cookies are small text files that websites use to improve the user experience. The law states that we can store cookies on your device if they are strictly necessary for the operation of this site. For all other types of cookies, we need your permission. This means that cookies classified as necessary are managed under Article 6(1)(f) of the GDPR. All other cookies, such as those in the preferences and marketing categories, are managed under Article 6(1)(a) of the GDPR. This website uses different types of cookies. Some cookies are placed by third party services that appear on our pages.";


    //replace the middle section text content
    allContentSection[0].innerHTML = firstSectionText;
    allContentSection[2].innerHTML = thirdSectionText;

    //replace the bottom button text
    bannerButtons.forEach((element, index) => {
        element.innerHTML += bannerButtonsTexts[index];
    });

    document.querySelectorAll(".switch")[0].style.opacity = "0.5";



    /* ---- category click events ---- */
    allTopSection.forEach((element, index) => {
        element.onclick = (() => {
            if (index == 1) {

                addLoaderAndBlur();

                var getChoice = JSON.parse(localStorage.getItem("bannerChoice"));

                setTimeout(function(){

                    Object.keys(getChoice ? getChoice : {}).forEach(function(choice, index){

                        var tempVar;
    
                        if(getChoice[choice] == "granted"){
                            tempVar = true
                        }else if(getChoice[choice] == "denied"){
                            tempVar = false
                        }
    
                        if(index != 0){
                            bannerCheckBox[index].checked = tempVar;
                        }
    
                    })

                    removeLoaderAndBlur();

                },loadingTime)


                bannerButtons[2].innerHTML = bannerButtonsTexts[3]; // If Details is clicked
                bannerButtons[2].id = "consentSave";
            } else if (index == 0 || index == 2) {
                bannerButtons[2].innerHTML = bannerButtonsTexts[2]; // If Consent or About is clicked
                bannerButtons[2].id = "consentCustom";
            }
    
            allContentSection.forEach((element) => {
                element.classList.add("bannerContentInactive");
            });
    
            allTopSection.forEach((element) => {
                element.classList.remove("activeHeadlineBorder");
            });
    
            allContentSection[index].classList.remove("bannerContentInactive");
            allContentSection[index].classList.add("bannerContentActive");
            allTopSection[index].classList.add("activeHeadlineBorder");
        });
    });
    
    
    cookieCategoriesTitle.forEach(function(cookieCategory, index) {
        cookieCategory.onclick = (function() {
            if (allCookieDetails[index].classList.contains("displayNone")) {
                allCookieDetails[index].classList.remove("displayNone");
                allCookieDetails[index].classList.add("displayBlock");
                cookieCategoriesTitle[index].querySelector("svg").classList.add("rotate");
            } else {
                allCookieDetails[index].classList.remove("displayBlock");
                allCookieDetails[index].classList.add("displayNone");
                cookieCategoriesTitle[index].querySelector("svg").classList.remove("rotate");
            }
        });
    });
    
    
    allCookieWrapperTitle.forEach((element, index) => {
        element.onclick = (() => {
            allCookieWrapper[index].querySelectorAll(".mainCookiesDetails").forEach(function(mainCookie) {
                if (mainCookie.classList.contains("displayNone")) {
                    mainCookie.classList.remove("displayNone");
                    mainCookie.classList.add("displayFlex");
                    allCookieWrapperTitle[index].querySelector(".allCookieTitleRight > svg").classList.add("rotate")
                } else {
                    mainCookie.classList.add("displayNone");
                    mainCookie.classList.remove("displayFlex");
                    allCookieWrapperTitle[index].querySelector(".allCookieTitleRight > svg").classList.remove("rotate")
                }
            });
        });
    });



    //Necessary toggle enable by default
    bannerCheckBox[0].checked=true;
    bannerCheckBox[0].disabled=true;



    /* ---- handling Choice Button Click ---- */
    var consentValue = ["granted", "denied"];

    var consent = {
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
        analytics_storage: 'denied',
        functionality_storage: 'denied',
        personalization_storage: 'denied',
        unclassified_storage:  'denied',
    }

    bannerButtons.forEach(function(element){
        element.onclick = function(){
            if(element.id == "consentCustom"){

                element.innerHTML = bannerButtonsTexts[3];
                element.id = "consentSave";

                allContentSection.forEach((section)=>{
                    section.classList.remove("bannerContentActive");
                })

                allContentSection[1].classList.remove("bannerContentInactive");
                allContentSection[1].classList.add("bannerContentActive");

                allTopSection.forEach((element) => {
                    element.classList.remove("activeHeadlineBorder");
                });

                allTopSection[1].classList.add("activeHeadlineBorder");

            }else if(element.id == "consentSave"){

                addLoaderAndBlur();

                Object.keys(checkedCategories).forEach((inputCategory, index)=>{
                    var convert = bannerCheckBox[index].checked ? "granted" : "denied";
                    checkedCategories[inputCategory] = convert;
                })

                localStorage.setItem("bannerChoice", JSON.stringify(checkedCategories));
                
                consent.ad_storage = checkedCategories.Marketing;
                consent.ad_user_data = checkedCategories.Marketing;
                consent.ad_personalization = checkedCategories.Marketing;
                consent.analytics_storage = checkedCategories.Statistics;
                consent.personalization_storage = checkedCategories.Preferences;
                consent.functionality_storage = checkedCategories.Preferences;
                consent.unclassified_storage = consent.Unclassified;

                gtag('consent', 'update', consent);

                setTimeout(function(){
                    removeLoaderAndBlur();
                    showHide(false, true);
                }, loadingTime)

                choiceMade();

            }else if(element.id == "consentAccept"){

                addLoaderAndBlur();

                Object.keys(consent).forEach(function(element){
                    consent[element] = consentValue[0]
                });

                Object.keys(checkedCategories).forEach(function(element){
                    checkedCategories[element] = consentValue[0]
                });

                bannerCheckBox.forEach((input, inputIndex)=>{
                    if(inputIndex!= 0){
                        input.checked = true;
                    }
                })

                localStorage.setItem("bannerChoice", JSON.stringify(checkedCategories));
                gtag('consent', 'update', consent);

                setTimeout(function(){
                    removeLoaderAndBlur()
                    showHide(false, true);
                }, loadingTime);

                
                choiceMade();

            }else if(element.id == "consentReject"){

                addLoaderAndBlur()

                Object.keys(consent).forEach(function(element){
                    consent[element] = consentValue[1]
                })

                Object.keys(checkedCategories).forEach(function(element){
                    checkedCategories[element] = consentValue[1]
                });

                bannerCheckBox.forEach((input, inputIndex)=>{
                    if(inputIndex!= 0){
                        input.checked = false;
                    }
                })

                localStorage.setItem("bannerChoice", JSON.stringify(checkedCategories))
                gtag('consent', 'update', consent);
                choiceMade();

                setTimeout(function(){
                    removeLoaderAndBlur();
                    showHide(false, true);
                }, loadingTime);
            }
        }
    });

    setTimeout(()=>{
        checkChoiceShowBanner()
    }, 2000)
}

processCookies(categoriesCookies, restCodes);
