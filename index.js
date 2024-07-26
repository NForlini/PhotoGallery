const API_KEY = "8cvHjYW62tM-0TWCqcP9krQybp-38E78grfV3fNiAPw";
const btnEl = document.getElementById("btn");
const errorMsgEl = document.getElementById("errorMessage");
const galleryEl = document.getElementById("gallery");

async function fetchImage(){
    const inputValue = document.getElementById("input").value;
    
    if(inputValue > 10 || inputValue < 1){
        errorMsgEl.style.display = "block";
        return;
    }

imgs = "";

try {
    btnEl.style.display = "none";
    const loading = `<img src="spinner.svg" />`;
    galleryEl.innerHTML = loading;
    await fetch(
      `https://api.unsplash.com/photos?per_page=${inputValue}&page=${Math.round(
        Math.random() * 1000
      )}&client_id=${API_KEY}`
    ).then((res) =>
      res.json().then((data) => {
        if (data) {
          data.forEach((pic) => {
            imgs += `
            <img src=${pic.urls.small} alt="image"/>
            `;
            galleryEl.style.display = "block";
            galleryEl.innerHTML = imgs;
            btnEl.style.display = "block";
            errorMsgEl.style.display = "none";
          });
        }
      })
    );
  } catch (error) {
    console.log(error);
    errorMsgEl.style.display = "block";
    errorMsgEl.innerHTML = "An error happened, try again later";
    btnEl.style.display = "block";
    galleryEl.style.display = "none";
  }
}

btnEl.addEventListener("click", fetchImage);
