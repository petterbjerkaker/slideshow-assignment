const slideshow = document.querySelector(".slideshow"),
firstImg = slideshow.querySelectorAll("img")[0];
angleIcons = document.querySelectorAll(".container i");

let firstImgWidth = firstImg.clientWidth + 10;

angleIcons.forEach(icon => {
	icon.addEventListener("click", ()=>{
		if(icon.id == "left") {
			slideshow.scrollLeft -= firstImgWidth;
		}else {
			slideshow.scrollLeft += firstImgWidth;
		}
	});
});

const dragging = (e)=>	{
	slideshow.scrollLeft = e.pageX;
}

slideshow.addEventListener("mousemove", dragging);