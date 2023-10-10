const slideshow = document.querySelector(".slideshow"),
firstImg = slideshow.querySelectorAll("img")[0];
angleIcons = document.querySelectorAll(".container i");


let firstImgWidth = firstImg.clientWidth + 16;

angleIcons.forEach(icon => {
	icon.addEventListener("click", ()=>{
		if(icon.id == "left") {
			slideshow.scrollLeft -= firstImgWidth;
		}else {
			slideshow.scrollLeft += firstImgWidth;
		}
	});
});

let isDragStart = false, prevPageX, prevScrollLeft;

const dragStart = (e)=> {
	isDragStart = true;
	prevPageX = e.pageX;
	prevScrollLeft = slideshow.scrollLeft;
}

const dragging = (e)=>	{
	if(!isDragStart) return;
	e.preventDefault();
	slideshow.classList.add("dragging");
	let positionDiff = e.pageX - prevPageX;
	slideshow.scrollLeft = prevScrollLeft - positionDiff;
}

const dragStop = ()=>{
	isDragStart = false;
	slideshow.classList.remove("dragging");
}

slideshow.addEventListener("mousemove", dragging);
slideshow.addEventListener("mousedown", dragStart);
slideshow.addEventListener("mouseup", dragStop);