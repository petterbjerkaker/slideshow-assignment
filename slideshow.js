const slideshow = document.querySelector(".slideshow");
firstImage = slideshow.querySelector("img");
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
			slideshow.scrollLeft -= firstImageWidth;
		}else {
			slideshow.scrollLeft += firstImageWidth;
		}
		setTimeout(() => {
			showHideIcons();
		}, 50);
	});
});

let isDragStart = false, isDragging = false, prevPageX, prevScrollLeft, positionDiff;
let firstImageWidth = firstImage.clientWidth + 16;
let scrollWidth = slideshow.scrollWidth - slideshow.clientWidth;

const autoSlide = ()=>{
	if(slideshow.scrollLeft == (slideshow.scrollWidth - slideshow.clientWidth)) return;


	positionDiff = Math.abs(positionDiff);
	let firstImageWidth = firstImage.clientWidth + 16;
	let valDifference = firstImageWidth - positionDiff;

	if(slideshow.scrollLeft > prevScrollLeft){
		return slideshow.scrollLeft += positionDiff > firstImageWidth / 3 ? valDifference : -positionDiff;
	}
	slideshow.scrollLeft -= positionDiff > firstImageWidth / 3 ? valDifference : -positionDiff;



};


const dragStart = (event)=> {
	isDragStart = true;
	prevPageX = event.pageX || event.touches[0].pageX;
	prevScrollLeft = slideshow.scrollLeft;
}

const dragging = (event)=>	{
	if(!isDragStart) return;
	event.preventDefault();
	isDragging = true;
	slideshow.classList.add("dragging");
	positionDiff = (event.pageX || event.touches[0].pageX)- prevPageX;
	slideshow.scrollLeft = prevScrollLeft - positionDiff;
	showHideIcons();
}

const dragStop = ()=>{
	isDragStart = false;
	slideshow.classList.remove("dragging");

	if(!isDragging) return;
	isDragging = false;
	autoSlide();
}



slideshow.addEventListener("mousemove", dragging);
slideshow.addEventListener("touchmove", dragging);

slideshow.addEventListener("mousedown", dragStart);
slideshow.addEventListener("touchstart", dragStart);

slideshow.addEventListener("mouseup", dragStop);
slideshow.addEventListener("touchend", dragStop);


document.addEventListener("keydown", function (event){
	if (event.key === "ArrowLeft"){
		slideshow.scrollLeft -=firstImageWidth;
		showHideIcons();
	} else if (event.key === "ArrowRight"){
		slideshow.scrollLeft += firstImageWidth;
		showHideIcons();	
	}
});



