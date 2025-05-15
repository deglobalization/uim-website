/**
 * Main JavaScript File
 */
document.addEventListener('DOMContentLoaded', function() {
  // Mobile navigation toggle
  const navToggle = document.querySelector('.nav_toggle');
  const navMain = document.querySelector('.nav_main');
  
  if (navToggle && navMain) {
    navToggle.addEventListener('click', function() {
      navMain.classList.toggle('show');
    });
  }
  
  // Submenu toggle for mobile
  const hasSubmenu = document.querySelectorAll('.nav_main li.has-submenu');
  
  hasSubmenu.forEach(function(item) {
    const link = item.querySelector('a');
    
    if (link && window.innerWidth <= 768) {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        item.classList.toggle('open');
      });
    }
  });
  
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      e.preventDefault();
      const target = document.querySelector(targetId);
      
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 100,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // 시설 섹션 슬라이더 초기화
  initFacilitiesSlider();
  
  // 시설 갤러리 페이지 슬라이더 초기화
  if (document.querySelector('.fullscreen-slider')) {
    // 이미 facilities.html에 슬라이더 코드가 있으므로 아무 작업도 하지 않음
  }
  
  // Back to top button
  const backToTopBtn = document.querySelector('.back-to-top');
  
  if (backToTopBtn) {
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    });
    
    backToTopBtn.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
  
  // Facilities Slider
  const sliderContainer = document.querySelector('.slider-container');
  const sliderPrev = document.querySelector('.slider-prev');
  const sliderNext = document.querySelector('.slider-next');
  
  if (sliderContainer && sliderPrev && sliderNext) {
    const slides = sliderContainer.querySelectorAll('.facility-slide');
    
    if (slides.length > 0) {
      const slideWidth = slides[0].offsetWidth + 
                        parseInt(window.getComputedStyle(slides[0]).marginLeft) + 
                        parseInt(window.getComputedStyle(slides[0]).marginRight);
      
      // Click handlers for navigation buttons
      sliderNext.addEventListener('click', function() {
        sliderContainer.scrollBy({
          left: slideWidth * 2,
          behavior: 'smooth'
        });
      });
      
      sliderPrev.addEventListener('click', function() {
        sliderContainer.scrollBy({
          left: -slideWidth * 2,
          behavior: 'smooth'
        });
      });
      
      // Touch events for mobile swiping
      let startX;
      let scrollLeft;
      
      sliderContainer.addEventListener('touchstart', function(e) {
        startX = e.touches[0].pageX - sliderContainer.offsetLeft;
        scrollLeft = sliderContainer.scrollLeft;
      });
      
      sliderContainer.addEventListener('touchmove', function(e) {
        if (!startX) return;
        const x = e.touches[0].pageX - sliderContainer.offsetLeft;
        const walk = (x - startX) * 2;
        sliderContainer.scrollLeft = scrollLeft - walk;
      });
      
      sliderContainer.addEventListener('touchend', function() {
        startX = null;
      });
    }
  }
  
  // Image lazy loading
  if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          const lazyImage = entry.target;
          lazyImage.src = lazyImage.dataset.src;
          
          if (lazyImage.dataset.srcset) {
            lazyImage.srcset = lazyImage.dataset.srcset;
          }
          
          lazyImage.classList.remove('lazy');
          imageObserver.unobserve(lazyImage);
        }
      });
    });
    
    lazyImages.forEach(function(lazyImage) {
      imageObserver.observe(lazyImage);
    });
  } else {
    // Fallback for browsers that don't support IntersectionObserver
    const lazyLoad = function() {
      const lazyImages = document.querySelectorAll('img[data-src]');
      
      lazyImages.forEach(function(lazyImage) {
        if ((lazyImage.getBoundingClientRect().top <= window.innerHeight && 
            lazyImage.getBoundingClientRect().bottom >= 0) && 
            getComputedStyle(lazyImage).display !== 'none') {
          
          lazyImage.src = lazyImage.dataset.src;
          
          if (lazyImage.dataset.srcset) {
            lazyImage.srcset = lazyImage.dataset.srcset;
          }
          
          lazyImage.classList.remove('lazy');
        }
      });
      
      if (lazyImages.length === 0) { 
        document.removeEventListener('scroll', lazyLoad);
        window.removeEventListener('resize', lazyLoad);
        window.removeEventListener('orientationChange', lazyLoad);
      }
    };
    
    document.addEventListener('scroll', lazyLoad);
    window.addEventListener('resize', lazyLoad);
    window.addEventListener('orientationChange', lazyLoad);
  }
});

// 시설 섹션 슬라이더 초기화 함수
function initFacilitiesSlider() {
  const sliderWrapper = document.querySelector('.facilities-section .slider-wrapper');
  const sliderDots = document.querySelector('.facilities-section .slider-dots');
  
  if (!sliderWrapper || !sliderDots) return;
  
  // 갤러리 데이터
  const galleryItems = [
    {
      src: "/assets/images/facilities/mosaH9SH8k.jpeg",
      title: "현대적인 리셉션",
      desc: "환자분들을 친절히 맞이하는 현대적인 리셉션 공간입니다.",
      filter: "image-filter-elegant"
    },
    {
      src: "/assets/images/facilities/mosa2fTcOd.jpeg",
      title: "첨단 내시경 센터",
      desc: "최신 내시경 장비로 정확하고 안전한 검사를 제공합니다.",
      filter: "image-filter-warm"
    },
    {
      src: "/assets/images/facilities/mosackqd6q.jpeg",
      title: "",
      desc: "",
      filter: "image-filter-medical"
    },
    {
      src: "/assets/images/facilities/mosar5JXgk.jpeg",
      title: "현대적인 진료실",
      desc: "최신 의료 장비를 갖춘 진료실에서 정확한 진단을 제공합니다.",
      filter: "image-filter-crisp"
    },
    {
      src: "/assets/images/facilities/mosaLMsOTh.jpeg",
      title: "쾌적한 대기 공간",
      desc: "진료 전 편안하게 대기할 수 있는 안락한 공간입니다.",
      filter: "image-filter-elegant"
    }
  ];
  
  // 슬라이더 초기화 전에 기존 내용 제거
  sliderWrapper.innerHTML = '';
  sliderDots.innerHTML = '';
  
  // 슬라이드와 도트 생성
  galleryItems.forEach((item, index) => {
    // 슬라이드 생성
    const slide = document.createElement('div');
    slide.className = 'slider-slide';
    slide.dataset.index = index;
    slide.innerHTML = `
      <img src="${item.src}" alt="${item.title}" class="${item.filter}">
      <div class="slider-caption">
        <h3 class="slider-title">${item.title}</h3>
        <p class="slider-desc">${item.desc}</p>
      </div>
    `;
    sliderWrapper.appendChild(slide);
    
    // 도트 생성
    const dot = document.createElement('div');
    dot.className = 'slider-dot';
    dot.dataset.index = index;
    sliderDots.appendChild(dot);
  });
  
  // 이벤트 핸들러
  let currentIndex = 0;
  const totalItems = galleryItems.length;
  
  // 슬라이드 변경 함수
  function goToSlide(index) {
    // 범위 확인
    if (index < 0) index = 0;
    if (index >= totalItems) index = totalItems - 1;
    
    // 슬라이드 이동
    sliderWrapper.style.transform = `translateX(-${index * 100}%)`;
    
    // 디버깅용 로그
    console.log(`슬라이드 이동: ${index}, 이동값: -${index * 100}%`);
    
    // 도트 상태 업데이트
    document.querySelectorAll('.facilities-section .slider-dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
    
    currentIndex = index;
  }
  
  // 슬라이더 컨트롤 버튼 이벤트 연결
  const prevBtn = document.querySelector('.facilities-section .slider-prev');
  const nextBtn = document.querySelector('.facilities-section .slider-next');
  
  if (prevBtn) {
    prevBtn.addEventListener('click', function() {
      goToSlide((currentIndex - 1 + totalItems) % totalItems);
    });
  }
  
  if (nextBtn) {
    nextBtn.addEventListener('click', function() {
      goToSlide((currentIndex + 1) % totalItems);
    });
  }
  
  // 도트 클릭 이벤트 설정
  document.querySelectorAll('.facilities-section .slider-dot').forEach(dot => {
    dot.addEventListener('click', function() {
      const dotIndex = parseInt(this.dataset.index);
      goToSlide(dotIndex);
    });
  });
  
  // 자동 슬라이드
  let autoSlide = setInterval(function() {
    if (nextBtn) nextBtn.click();
  }, 5000);
  
  // 슬라이더에 마우스 올리면 자동 슬라이드 멈춤
  const slider = document.querySelector('.facilities-section .facilities-slider');
  if (slider) {
    slider.addEventListener('mouseenter', function() {
      clearInterval(autoSlide);
    });
    
    slider.addEventListener('mouseleave', function() {
      autoSlide = setInterval(function() {
        if (nextBtn) nextBtn.click();
      }, 5000);
    });
  }
  
  // 터치 이벤트 (모바일용)
  let startX, moveX;
  
  if (slider) {
    slider.addEventListener('touchstart', function(e) {
      startX = e.touches[0].pageX;
      moveX = startX; // 초기화
    });
    
    slider.addEventListener('touchmove', function(e) {
      moveX = e.touches[0].pageX;
    });
    
    slider.addEventListener('touchend', function() {
      if (startX - moveX > 50) { // 왼쪽으로 스와이프
        goToSlide((currentIndex + 1) % totalItems);
      } else if (moveX - startX > 50) { // 오른쪽으로 스와이프
        goToSlide((currentIndex - 1 + totalItems) % totalItems);
      }
    });
  }
  
  // 첫 번째 슬라이드 활성화
  goToSlide(0);
  
  // 창 크기 변경 시 슬라이드 위치 조정
  window.addEventListener('resize', function() {
    goToSlide(currentIndex);
  });
} 