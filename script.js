const videoElement = document.querySelector('.hero-video');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const progressContainer = document.querySelector('.video-progress');

// Array of video sources
const videos = [
  'videos/WALKTHROUGH.mp4',
  'videos/SECOND_VIDEO.mp4',
  'videos/THIRD_VIDEO.mp4'
];

let currentIndex = 0;

// Create progress dots
videos.forEach((_, index) => {
  const dot = document.createElement('div');
  dot.classList.add('progress-dot');
  if (index === currentIndex) dot.classList.add('active');
  dot.addEventListener('click', () => {
    currentIndex = index;
    updateVideo();
  });
  progressContainer.appendChild(dot);
});

function updateVideo() {
  videoElement.classList.add('video-fade-out');
  setTimeout(() => {
    videoElement.src = videos[currentIndex];
    videoElement.load();
    videoElement.play();
    videoElement.classList.remove('video-fade-out');
    videoElement.classList.add('video-fade-in');

    // Update dots
    document.querySelectorAll('.progress-dot').forEach((dot, index) => {
      dot.classList.toggle('active', index === currentIndex);
    });

    // Remove fade-in after a short delay
    setTimeout(() => {
      videoElement.classList.remove('video-fade-in');
    }, 500);
  }, 300);
}

// Button listeners
prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + videos.length) % videos.length;
  updateVideo();
});

nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % videos.length;
  updateVideo();
});

// Optional: auto-play next video on end
videoElement.addEventListener('ended', () => {
  currentIndex = (currentIndex + 1) % videos.length;
  updateVideo();
});

document.addEventListener('DOMContentLoaded', () => {
    const allVideos = document.querySelectorAll('.hero-video');
    allVideos.forEach(video => {
        video.play().catch(err => {
            console.warn("Autoplay blocked. Video will play on interaction.", err);
        });
    });
});
