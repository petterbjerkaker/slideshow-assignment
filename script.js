const slideshow = document.querySelector(".slideshow"),
firstImg = slideshow.querySelectorAll("img")[0];
angleIcons = document.querySelectorAll(".container i");



const showHideIcons = ()=>{
	if(slideshow.scrollLeft === 0){
		angleIcons[0].style.display = "none";
	}else{
		angleIcons[0].style.display = "block";
	}
	
	if(slideshow.scrollLeft === scrollWidth){
		angleIcons[1].style.display = "none";
	}else{
		angleIcons[1].style.display = "block";
	}
}


angleIcons.forEach(icon => {
	icon.addEventListener("click", ()=>{
		if(icon.id == "left") {
			slideshow.scrollLeft -= firstImgWidth;
		}else {
			slideshow.scrollLeft += firstImgWidth;
		}
		setTimeout(() => {
			showHideIcons();
		}, 50);
	});
});

let isDragStart = false, prevPageX, prevScrollLeft, positionDiff;
let firstImgWidth = firstImg.clientWidth + 16;
let scrollWidth = slideshow.scrollWidth - slideshow.clientWidth;

const autoSlide = ()=>{
	positionDiff = Math.abs(positionDiff);
	let firstImgWidth = firstImg.clientWidth + 16;
	let valDifference = firstImgWidth - positionDiff;

	if(slideshow.scrollLeft > prevScrollLeft){
		return slideshow.scrollLeft += positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
	}
	slideshow.scrollLeft -= positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;



	if(slideshow.scrollLeft > prevScrollLeft){
		return slideshow.scrollLeft += positionDiff > firstImgWidth / 2 ? valDifference : -positionDiff;
	}
	slideshow.scrollLeft -= positionDiff > firstImgWidth / 2 ? valDifference : -positionDiff;

	
	if(slideshow.scrollLeft > prevScrollLeft){
		return slideshow.scrollLeft += positionDiff > firstImgWidth / 1 ? valDifference : -positionDiff;
	}
	slideshow.scrollLeft -= positionDiff > firstImgWidth / 1 ? valDifference : -positionDiff;
}


const dragStart = (e)=> {
	isDragStart = true;
	prevPageX = e.pageX || e.touches[0].pageX;
	prevScrollLeft = slideshow.scrollLeft;
}

const dragging = (e)=>	{
	if(!isDragStart) return;
	e.preventDefault();
	slideshow.classList.add("dragging");
	positionDiff = (e.pageX || e.touches[0].pageX)- prevPageX;
	slideshow.scrollLeft = prevScrollLeft - positionDiff;
	showHideIcons();
}

const dragStop = ()=>{
	isDragStart = false;
	slideshow.classList.remove("dragging");
	autoSlide();
}

slideshow.addEventListener("mousemove", dragging);
slideshow.addEventListener("touchmove", dragging);

slideshow.addEventListener("mousedown", dragStart);
slideshow.addEventListener("touchstart", dragStart);

slideshow.addEventListener("mouseup", dragStop);
slideshow.addEventListener("touchend", dragStop);


