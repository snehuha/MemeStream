let img =document.querySelector(".meme img"); ////Find the <img> inside an element with class meme
let title = document.querySelector(".title");
let loading = document.querySelector(".loader");
let downloadBtn = document.querySelector(".download");
async function randomMeme(){
    loading.style.display = "block";
    img.classList.remove("show");
   try{
   let res=await fetch("https://meme-api.com/gimme");
    console.log(res);
    let json= await res.json();
    console.log(json);
    let url=json.url;
    console.log(url);
    img.src=url;
  } catch (error) {
        loading.innerText = "Something went wrong 😢";
    }
}
randomMeme();
let timer= setInterval(randomMeme,2000);
img.addEventListener("mouseover",function(){
    clearInterval(timer);
})
img.addEventListener("mouseout",function(){
    timer=setInterval(randomMeme,2000);
})
downloadBtn.addEventListener("click", async () => {
    try {
        let response = await fetch(img.src, { mode: "cors" });
        let blob = await response.blob();

        let link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = (title.innerText || "meme") + ".jpg";
        link.click();

    } catch (err) {
        // fallback: open in new tab if download fails
        window.open(img.src, "_blank");
    }
});
let toggleBtn = document.querySelector(".theme-toggle");

toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("light");

    // change icon
    if (document.body.classList.contains("light")) {
        toggleBtn.innerText = "☀️";
    } else {
        toggleBtn.innerText = "🌙";
    }
});
