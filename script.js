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

let isDragStart = false, prevPageX, prevScrollLeft;

const dragStart = (e)=> {
	isDragStart = true;
	prevPageX = e.pageX;
	prevScrollLeft = slideshow.scrollLeft;
}

const dragging = (e)=>	{
	if(!isDragStart) return;
	e.preventDefault();
	let positionDiff = e.pageX - prevPageX;
	slideshow.scrollLeft = prevScrollLeft - positionDiff;
}

const dragStop = ()=>{
	isDragStart = false;
}

slideshow.addEventListener("mousedown", dragStart);
slideshow.addEventListener("mousemove", dragging);
slideshow.addEventListener("mouseup", dragStop);