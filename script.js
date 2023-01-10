const countriesElem=document.querySelector(".countries")
const search=document.querySelector(".search")
const searchCountry=document.querySelector(".searchcountry")
const dropelem=document.querySelector(".drop")
const region=document.querySelectorAll(".region")
const moon=document.querySelector(".moon")
const toggle=document.querySelector(".toggle")
async function getCountry(){
    const url=await fetch("https://restcountries.com/v3.1/all");
    const res=await url.json();
    console.log(res);
    res.forEach(element => {
        showCountry(element)
        
    });
}
getCountry();
function showCountry(data){
    const country=document.createElement("div");
    country.classList.add("country")
    country.innerHTML=`
    
    <div class="country-img">
        <img src="${data.flags.png}">
    </div>
    <div class="country-info">
        <h5 class="countryName">${data.name.common}</h5>
        <p><strong>Population:</strong>${data.population}</p>
        <p class="regionName" ><strong >Region:</strong>${data.region}</p>
        <p><strong>Capital:</strong>${data.capital}</p>
    </div>`;
countriesElem.appendChild(country)
country.addEventListener("click",()=>{
    showCountrydetail(data)
})
};
search.addEventListener("click",()=>{
    dropelem.classList.toggle("showdropdown")
})
const regionName=document.getElementsByClassName("regionName")
region.forEach(element=>{
    element.addEventListener("click",()=>{
        console.log(element);
        Array.from(regionName).forEach(ele => {
            console.log(ele.innerText);
        if(ele.innerText.includes(element.innerText)||element.innerText=="All"){
            ele.parentElement.parentElement.style.display="grid"
        }
        else{
            ele.parentElement.parentElement.style.display="none"
        }
        
      });
    })
});
countryName=document.getElementsByClassName("countryName")
searchCountry.addEventListener("input",()=>{
    Array.from(countryName).forEach(elem => {
        console.log(elem.innerText);
    if(elem.innerText.toLowerCase().includes(searchCountry.value.toLowerCase())){
        elem.parentElement.parentElement.style.display="grid"
    }
    else{
        elem.parentElement.parentElement.style.display="none"
    }
    
  });
})
toggle.addEventListener("click",()=>{
document.body.classList.toggle("dark")
moon.classList.toggle("fas")
})
const countrymodal=document.querySelector(".countrymodal")
function showCountrydetail(data){
    const surr=Object.values(data.currencies)
    console.log(surr)
    const lang=Object.values(data.languages)
    
  
    
    
    countrymodal.classList.toggle("dispnext")
    countrymodal.innerHTML=`
    <button class="back">
    back

</button>
<div class="modal">
    <div class="leftmodal">
        <img src="${data.flags.png}">
    </div>
    <div class="rightmodal">
        <h1>${data.name.common}</h1>
        <div class="modalflex">
        <div class="innerleft inner">
            <p><strong>Native Name:</strong>${data.name.common}<p>
            <p  ><strong >Population:</strong>${data.population}</p>
            <p><strong>Region:</strong>${data.region}</p>
            <p><strong>Sub Region:</strong>${data.subregion}</p>
            
        </div>
        <div class="innerright inner">
        <p><strong>Capital:</strong>${data.capital}</p>
            <p><strong>Top Level Domain:</strong>${data.tld.map(elem=>elem)}</p>
            <p><strong >Currencies:</strong>${surr
                .map((item) => item.name)
                .join(",")}</p>
            <p><strong>Languages:</strong>${lang.join(",")}</p>
            
        </div>
        </div>
        <p class="last"><strong class="btn">Border Countries:</strong><button>${
            data.borders ? data.borders.join("   ") : "NO BORDER SHARING"
          }</button></p>
    </div>
`
const back=countrymodal.querySelector(".back")

back.addEventListener("click",()=>{
    countrymodal.classList.toggle("dispnext")
})
};
