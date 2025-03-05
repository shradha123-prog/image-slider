
const images = [
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREoRGyXmHy_6aIgXYqWHdOT3KjfmnuSyxypw&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXvISWV--yWSsHVx9MeoMlK8a_iawaZDX9Bg&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDZT0qh99IVOiZ1NdoCsrP4_mSQzuAFRBVzw&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUDCIqUOBzvKzd-j6EqpcslaIJxwisqrr3Ug&s',
    'https://imagekit.io/blog/content/images/2019/12/image-optimization.jpg'
];

// DOM Elements
const sliderImage = document.getElementById('sliderImage');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const dotsContainer = document.getElementById('dotsContainer');

// Current Image Index
let currentIndex = 0;

// Initialize Slider
function initSlider() {
    dotsContainer.innerHTML = ''; 

    images.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            showImage(index);
            resetAutoSlide();
        });
        dotsContainer.appendChild(dot);
    });

    showImage(currentIndex);
}

// Display Image
function showImage(index) {
    if (!images[index]) return; // Prevent invalid index
    sliderImage.src = images[index];
    sliderImage.onerror = () => console.error(`Error loading image at index ${index}`);

    currentIndex = index;
    updateDots();
}

// Update Active Dot
function updateDots() {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
    });
}

// Next Image
function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
}

// Previous Image
function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(currentIndex);
}

// Auto Slide (Every 5 Seconds)
let autoSlide = setInterval(nextImage, 5000);

// Event Listeners
nextBtn.addEventListener('click', () => {
    nextImage();
    resetAutoSlide();
});

prevBtn.addEventListener('click', () => {
    prevImage();
    resetAutoSlide();
});

// Reset Auto Slide Timer
function resetAutoSlide() {
    clearInterval(autoSlide);
    autoSlide = setInterval(nextImage, 5000);
}

// Initialize the slider on page load
window.onload = initSlider;
