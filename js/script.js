var city;
var menu;
var active;
var country;
var corona;
var weather;
var search;
var isSearch;
const general="general";
const economy="economy";
const sport="sport";
const random="random";
const sunny= '<i class="fas fa-sun ">';
const cloudy ='<i class="fas fa-cloud"></i>';
const rain ='<i class="fas fa-cloud-showers-heavy"></i>';
const windy ='<i class="fas fa-wind"></i>';
const cloudSun ='<i class="fas fa-cloud-sun"></i>';
const snow = '<i class="far fa-snowflake"></i>'



$(document).ready(function () {
    var txt=$(".search-txt").val("");

    search = sessionStorage.search;
    isSearch = sessionStorage.isSearch;
    console.log(localStorage);
    city=sessionStorage.getItem("city");
if(city === null || city === undefined){
    localStorage.clear();
}
    if(localStorage.length> 0){
        if(localStorage.weather!= null){
    weather = JSON.parse(localStorage.weather)
    console.log("startWeth",weather)
        }
        if(localStorage.corona != null){
    corona = JSON.parse(localStorage.corona)
        }
    }
    country = sessionStorage.getItem("country");
    
    var userLang = navigator.language || navigator.userLanguage; 
    if(sessionStorage.getItem("menu") === null || sessionStorage.menu === undefined){
        menu="local"
        $("#"+menu).addClass("active");

    }else{
        menu=sessionStorage.getItem("menu")
        $("#"+menu).addClass("active");

    }

    active = sessionStorage.getItem("active");
    console.log("active ",active)
    if(active === null){

    }else{
        $('.active').first().removeClass('active');

    switch (active){
        case general:
            $("body").css("background-image"," url(../today-project-main/img/general-1-1.jpg)");
            $('#general').addClass('active');
            
            break;
        case economy:
            $("body").css("background-image","url(../today-project-main/img/economy-1.jpg) ");
            $('#economy').addClass('active');

            break;
            case sport:
                $("body").css("background-image","url(../today-project-main/img/sport-2.Jpg) ");
                $('#sport').addClass('active');

                break;
            case random:
                $("body").css("background-image","url(../today-project-main/img/randomM-1.Jpg) ");
                $('#random').addClass('active');

                break;
            default :                       $("body").css("background-image"," url(../today-project-main/img/general-1-1.jpg)");

    }

    


    }

    if(country === null){
    getWeatherData();
    }else{
        getWeather(weather);
        getCorona(corona);
        if(isSearch == "true"){
            getNewsForSearch(sessionStorage.search)
        }else{
        getNews();
        
        }
    }



   

    $('a').click(function () {
        sessionStorage.isSearch="false";

        if(!$(this).attr("class").includes("ngItem")){
        $('.active').first().removeClass('active');
        $(this).addClass("active");
         active=$(this).attr("id");
        sessionStorage.setItem("active",active);
        
        switch (active){
            case general:
                // $("body").css("background-image"," url(../today-project-main/img/general-1.jpg)");
                $('#general').addClass('active');
                
                break;
            case economy:
                // $("body").css("background-image","url(../today-project-main/img/economy.jpg) ");
                $('#economy').addClass('active');
    
                break;
                case sport:
                    // $("body").css("background-image","url(../today-project-main/img/sport.png) ");
                    $('#sport').addClass('active');
    
                    break;
                case random:
                    // $("body").css("background-image","url(../today-project-main/img/randomM.Jpg) ");
                    $('#random').addClass('active');
    
                    break;
                default :                       $("body").css("background-image"," url(../today-project-main/img/general-1.jpg)");

        }
    
        location.reload();
    }else{
        $(".ngItem").removeClass('active');
        $(this).addClass("active");  
        menu=$(this).attr("id");

        sessionStorage.setItem("menu",menu);   
        location.reload();
    }



    });

    $(document).keypress(function (e) { 
        kCode= e.keyCode? e.keyCode : e.witch;
        if( kCode === 13){
        var txt=$(".search-txt").val();
        if(/^[0-9a-zA-Z]+$/.test(txt)){
            sessionStorage.isSearch="true";
            sessionStorage.search=txt;

            location.reload();
        }
    }
        
    });

   

});

function getCoronaImage() {
    $.ajax({
        url: " https://api.unsplash.com/photos/random?client_id=NuTC-nUrtNwO1eMp37nGo-gmlx1e4dXYacXKuyEdo6Q&query=virus&orientation=portrait&count=1",
        success: function (data) {
            console.log(data);
            console.log(data[0].urls.raw);
            $("#corona").attr("src", data[0].urls.raw);
            console.log($("#corona").css("width"));

            console.log($("#corona").attr("src"));


        },
        dataType: "json"
    });
}


function getWeatherImage() {
    $.ajax({
        url: " https://api.unsplash.com/photos/random?client_id=NuTC-nUrtNwO1eMp37nGo-gmlx1e4dXYacXKuyEdo6Q&query=day_sun&orientation=portrait&count=1",
        success: function (data) {
            console.log("WeatherIMG :"+data);
            console.log(data[0].urls.raw);
            $("#weather").attr("src", data[0].urls.raw);
            console.log($("#weather").css("width"));

            console.log($("#weather").attr("src"));


        },
        dataType: "json"
    });
}


function getWeatherData() {

    const getCity= fetch("https://ipapi.co/json/");
    getCity.then(res =>{
        
        return res.json();
    }).then(res2 =>{
        console.log("city:",res2.city);
        sessionStorage.setItem("city",res2.city);
        sessionStorage.setItem("country",res2.country_name);

        return res2.city;
    }).then(res3 => {
       getWeather( sessionStorage.getItem("city"));
       getCorona();
        getNews()
    }).catch(err =>{
        console.log("1st",err)
    });

    // $.ajax({
    //     url: " https://api.weatherbit.io/v2.0/current?key=78babf97697b44a4ae15d4937b30e9e0&city=" + city,
    //     success: function (data) {
    //         console.log("weatherData: "+data);
    //         console.log(data);
    //         $("#weather").attr("src", data[0].urls.raw);
    //         // console.log($("#weather").css("width"));

    //         // console.log($("#weather").attr("src"));


    //     },
    //     dataType: "json"
    // });
}


function getLang(){
    $.ajax({ 
        url: "http://ajaxhttpheaders.appspot.com", 
        dataType: 'jsonp', 
        success: function(headers) {
            language = headers['Accept-Language'];
            console.log("lang"+language)
        }
    });
    
}

function displayWeather(res){


    // $("#wState")=res.weather.description;
    $("#wState").text(res.weather.description);
    var wIcon=$("#wIcon");
    var wCode=res.weather.code;
    var sunnyCode=wCode.toString().includes("800");
    var cloudSunCode = wCode.toString().startsWith(8) && (wCode.toString().endsWith(1) || wCode.toString().endsWith(2));
    var rainCode = wCode.toString().startsWith(5);
    var windyCode = wCode.toString().startsWith(6);
    var snowCode = wCode.toString().startsWith(6);
    var cloudCod = wCode.toString().includes("804");
   
    
    switch (true){
        case sunnyCode: wIcon.html(sunny);
        break;

        case rainCode : wIcon.html(rain);
        break;

        case cloudSunCode : wIcon.html(cloudSun);
        break;

        case windyCode : wIcon.html(windy);
        break;

        case snowCode : wIcon.html(snow);
        break;

        case cloudCod: wIcon.html(cloudy);
        break;
        
        

    }
    $("#wHigh").append(res.temp +" C`");
    
    
}

function getNews(){
    var country_str="";
    var country =sessionStorage.getItem("country");

    if(menu === "local"){
    country_str =country;
    }
    console.log("CN",country);
  
    if(active === null || active === undefined ){

            if (country != null){
            const getNews= fetch("http://newsapi.org/v2/everything?q=general "+country_str+"&apiKey=b78e955cbba74d929851f28b1e1fba29");
        getNews.then(res =>{
            console.log("url",res);

            return res.json();
        }).then(res2 =>{
            console.log("news",res2.status);
            if (res2.status ==="ok"){
                console.log("newsdata",res2.articles)
                displayNews(res2.articles , res2.articles.len);
            }else {
                $("#newsContainer").addClass("txt-center txt-red  ")
                $("#newsContainer").text(" server Error or out of plan limites");
            }
        }).catch(err =>{
            console.log("2nd",err)
        });
            
                }else{

const getNews= fetch("http://newsapi.org/v2/everything?q=general&apiKey=b78e955cbba74d929851f28b1e1fba29");
        getNews.then(res =>{
            console.log("url",res);

            return res.json();
        }).then(res2 =>{
            console.log("news",res2.status);
            if (res2.status ==="ok"){
                console.log("newsdata",res2.articles)
                displayNews(res2.articles , res2.articles.len);
            }
        }).catch(err =>{
            console.log("3nd",err)
        });
    }
}else{
        
        fetchNews(active,country_str)
    }
    
}

function displayNews(data,len){
    if(data.length>0){
    data.map(show)
    }else{
        $("#newsContainer").addClass("txt-center txt-yellow")
        $("#newsContainer ").text("No Local news Try Global");
    }
}
function show(item){
    var old =$("#newsContainer").html();
    $("#newsContainer").html(
        old+'<div class="item news-bg"><img class=padding  src="'+item.urlToImage+'" height="150px" width="150px"><div class="content  "><a class="padding header padding-l font-white" id="title">'+item.title+'</a><div class=" padding-l font-white"><p>'+item.description+'</p></div><div class="extra padding-l font-white right"> <button  class="ui blue button "  > read more from the source</button></div></div></div>'
    );
    $(".button").click(function (e) { 
        location.href=item.url;
     
        
    });

}

function fetchNews(active,country_str){

    console.log("FNC",country_str);
const getNews= fetch("http://newsapi.org/v2/everything?q="+active+" "+country_str+"&apiKey=b78e955cbba74d929851f28b1e1fba29");
getNews.then(res =>{
    console.log("url",res);
    return res.json();
}).then(res2 =>{
    console.log("news",res2.status);
    if (res2.status ==="ok"){
        console.log("newsdata",res2.articles)
        displayNews(res2.articles);
    }
}).catch(err =>{
    console.log("4th",err)
});
}
function getCorona(){
    var country_str="";
    var country =sessionStorage.getItem("country");
if( corona === null || corona === undefined){
    console.log("locCor",corona)

if (country != null){

    
    const getCorona= fetch("    https://corona.lmao.ninja/v2/countries/"+country+"?yesterday=true&strict=true"
    );
    getCorona.then(res =>{
        console.log("corona",res);
        return res.json();
    }).then(res2 =>{
        console.log("news",res2.status);
        console.log("corData",res2)
        localStorage.corona=JSON.stringify(res2);
            displayCorona(res2);
    }).catch(err =>{
        console.log("5th",err)
    });
}
}else{
    console.log("offCorona",corona);
    displayCorona(corona);

}
}

function displayCorona(data){
    $("#cases").text(data.todayCases);
    $("#recovored").text(data.todayRecovered);
    $("#deaths").text(data.todayDeaths);
    $("#tCases").text(data.cases);
    $("#tRecovoreds").text(data.recovered);
    $("#tDeaths").text(data.deaths);
}
function showCorona(item){

}


function getNewsForSearch(search){
    
   

const getNews= fetch("http://newsapi.org/v2/everything?q="+search+"&from=2021-11-20&sortBy=popularity&apiKey=b78e955cbba74d929851f28b1e1fba29");
        getNews.then(res =>{
            console.log("url",res);

            return res.json();
        }).then(res2 =>{
            console.log("news",res2.status);
            if (res2.status ==="ok"){
                console.log("newsdata",res2.articles)
                displayNews(res2.articles , res2.articles.len);
            }
        }).catch(err =>{
            console.log("6th",err)
        });
   
}

function getWeather(res3){
    if(weather === null || weather === undefined){
        const getweather= fetch(" http://api.weatherbit.io/v2.0/current?key=78babf97697b44a4ae15d4937b30e9e0&city=" + res3);
        getweather.then(res =>{
            console.log("jsonWerht",res);
            return res.json();
        }).then(res2 =>{
            console.log("weather:",res2.data[0]);
            displayWeather(res2.data[0]);
            localStorage.weather=JSON.stringify(res2.data[0])
        }).catch(err =>{
            console.log("7th",err)
        })
    }else{
        
        console.log("locWeth",JSON.parse(localStorage.weather));
        displayWeather(JSON.parse(localStorage.weather));
    }
}