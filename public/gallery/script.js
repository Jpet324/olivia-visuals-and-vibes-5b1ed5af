
document.addEventListener('DOMContentLoaded', function() {
    // Image captions - these descriptions match the hiking story shown in the images
    const imageCaptions = [
        "I got some colour back",
        "She thinks so too",
        "I'm almost me again",
        "She's almost you",
        "Come with me on my first solo hike to summit Sljeme mountain in Zagreb, Croatia!",
        "Cute little cable car can take you to the top too!",
        "2k in, 5k more to the top!",
        "...and stay on top of those electrolytes",
        "That TV tower is where we're going!",
        "Old stone structure along the trail",
        "Made it! 1030 meters up!",
        "Foggy conditions at the top",
        "Refuel with lunch before heading back down",
        "Almost back at the bottom!",
        "Refuel again with wrap #2 and some electrolytes",
        "Workout details: 14.01KM, 719M elevation gain",
        "That was fun, thanks for coming along :)"
    ];

    // Images array with paths
    const images = [
        "../../lovable-uploads/c9e16818-652a-4aab-972d-c6bbe2a3747c.png",
        "../../lovable-uploads/5840e0d6-2a1b-4ae3-9546-ae1eda84d169.png",
        "../../lovable-uploads/484c46a6-437a-4bfb-834c-c17933e472ee.png",
        "../../lovable-uploads/d51cfc7b-7d32-4ae4-8271-bdd3cefb06ad.png",
        "../../lovable-uploads/591dee51-e574-404c-a660-e709ca4e4583.png",
        "../../lovable-uploads/b787d5c7-9931-447a-8ce2-602221b1d63f.png",
        "../../lovable-uploads/f3d02454-66b1-471e-a161-5a69ca0cfc67.png",
        "../../lovable-uploads/2be92c80-da42-46ef-aa7a-9609f7f7e857.png",
        "../../lovable-uploads/86ae7e0f-2f78-4063-b071-252cc3d7c5c1.png",
        "../../lovable-uploads/c4046d62-7b18-457e-b303-c5ac0ebc7e5b.png",
        "../../lovable-uploads/4a71f9d7-543a-4ce1-8147-3fc78f3f8f2e.png",
        "../../lovable-uploads/ca23bbbc-1444-4214-991b-66ec6d6f9a3c.png",
        "../../lovable-uploads/ad5fb93b-cb51-4a69-98bb-ab604326b498.png",
        "../../lovable-uploads/80d0df3b-6d32-402c-b893-997bdbf16eaf.png",
        "../../lovable-uploads/c3c8ef49-18fc-4f63-9254-a46f6afbe14b.png",
        "../../lovable-uploads/c4632216-7fe6-40a2-90ed-71955fec85cf.png",
        "../../lovable-uploads/8de3ccf7-1669-4cb1-bee1-8c2763c39344.png"
    ];

    // DOM elements
    const gallery = document.getElementById('gallery');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const closeBtn = document.getElementById('close-lightbox');
    const prevBtn = document.getElementById('prev-image');
    const nextBtn = document.getElementById('next-image');
    const caption = document.getElementById('image-caption');
    const downloadBtn = document.getElementById('download-btn');
    const downloadAllBtn = document.getElementById('download-all');
    const slideshowToggle = document.getElementById('slideshow-toggle');
    
    let currentIndex = 0;
    let slideshowInterval;
    let isSlideshowActive = false;

    // Create gallery items
    images.forEach((src, index) => {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        item.style.animationDelay = `${index * 0.1}s`;
        
        const img = document.createElement('img');
        img.src = src;
        img.alt = `Image ${index + 1}`;
        
        const captionDiv = document.createElement('div');
        captionDiv.className = 'caption';
        captionDiv.textContent = imageCaptions[index] || `Image ${index + 1}`;
        
        item.appendChild(img);
        item.appendChild(captionDiv);
        gallery.appendChild(item);
        
        // Open lightbox on click
        item.addEventListener('click', () => {
            openLightbox(index);
        });
    });

    // Open lightbox
    function openLightbox(index) {
        currentIndex = index;
        updateLightboxImage();
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling when lightbox is open
    }

    // Close lightbox
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
        stopSlideshow();
    }

    // Update lightbox image and caption
    function updateLightboxImage() {
        const imgSrc = images[currentIndex];
        lightboxImage.src = imgSrc;
        caption.textContent = imageCaptions[currentIndex] || `Image ${currentIndex + 1}`;
        downloadBtn.href = imgSrc;
        downloadBtn.download = `olivia-hiking-${currentIndex + 1}.jpg`;
    }

    // Navigate to previous image
    function prevImage() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateLightboxImage();
    }

    // Navigate to next image
    function nextImage() {
        currentIndex = (currentIndex + 1) % images.length;
        updateLightboxImage();
    }

    // Start slideshow
    function startSlideshow() {
        isSlideshowActive = true;
        slideshowToggle.textContent = 'Stop Slideshow';
        slideshowInterval = setInterval(() => {
            nextImage();
        }, 3000); // Change image every 3 seconds
    }

    // Stop slideshow
    function stopSlideshow() {
        if (slideshowInterval) {
            clearInterval(slideshowInterval);
            isSlideshowActive = false;
            slideshowToggle.textContent = 'Start Slideshow';
        }
    }

    // Toggle slideshow
    function toggleSlideshow() {
        if (isSlideshowActive) {
            stopSlideshow();
        } else {
            if (!lightbox.classList.contains('active')) {
                openLightbox(0);
            }
            startSlideshow();
        }
    }

    // Download all images
    async function downloadAllImages() {
        // Create a notification
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = 'Preparing download...';
        notification.style.position = 'fixed';
        notification.style.top = '20px';
        notification.style.left = '50%';
        notification.style.transform = 'translateX(-50%)';
        notification.style.padding = '10px 20px';
        notification.style.backgroundColor = 'var(--primary-color)';
        notification.style.color = 'white';
        notification.style.borderRadius = 'var(--border-radius)';
        notification.style.zIndex = '2000';
        document.body.appendChild(notification);

        try {
            // Use JSZip library from CDN
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js';
            document.head.appendChild(script);

            await new Promise(resolve => script.onload = resolve);

            const zip = new JSZip();
            const promises = [];

            images.forEach((src, index) => {
                const promise = fetch(src)
                    .then(response => response.blob())
                    .then(blob => {
                        const filename = `olivia-hiking-${index + 1}.jpg`;
                        zip.file(filename, blob);
                    });
                promises.push(promise);
            });

            await Promise.all(promises);
            
            notification.textContent = 'Creating zip file...';
            const content = await zip.generateAsync({ type: 'blob' });
            
            // Create download link
            const link = document.createElement('a');
            link.href = URL.createObjectURL(content);
            link.download = 'olivia-hiking-photos.zip';
            link.click();
            
            notification.textContent = 'Download started!';
            setTimeout(() => {
                notification.remove();
            }, 3000);
        } catch (error) {
            console.error('Download failed:', error);
            notification.textContent = 'Download failed. Please try again.';
            notification.style.backgroundColor = '#e74c3c';
            setTimeout(() => {
                notification.remove();
            }, 3000);
        }
    }

    // Event listeners
    closeBtn.addEventListener('click', closeLightbox);
    prevBtn.addEventListener('click', prevImage);
    nextBtn.addEventListener('click', nextImage);
    downloadAllBtn.addEventListener('click', downloadAllImages);
    slideshowToggle.addEventListener('click', toggleSlideshow);

    // Close lightbox when clicking outside the image
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowLeft') {
            prevImage();
        } else if (e.key === 'ArrowRight') {
            nextImage();
        }
    });
});
