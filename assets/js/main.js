/**
 * Main JavaScript File
 */
document.addEventListener('DOMContentLoaded', function() {
  initMobileNav();
  
  // 시설 섹션 슬라이더 초기화
  initFacilitiesSlider();
  
  // 시설 갤러리 페이지 슬라이더 초기화
  if (document.querySelector('.fullscreen-slider')) {
    // 이미 facilities.html에 슬라이더 코드가 있으므로 아무 작업도 하지 않음
  }
  
  // Back to top button
  initBackToTop();
  
  // Facilities Slider
  initFacilitiesMainSlider();
  
  // Image lazy loading
  initLazyLoading();
});

// 동적으로 로드된 헤더에 모바일 내비게이션 이벤트를 등록
window.addEventListener('load', function() {
  // 약간의 지연을 두고 실행하여 헤더가 완전히 로드될 시간을 확보
  setTimeout(function() {
    initMobileNav();
  }, 500);
});

// 모바일 내비게이션 초기화 함수
function initMobileNav() {
  // 모바일 메뉴 토글
  const navToggle = document.querySelector('.nav_toggle');
  const mainNav = document.querySelector('.main-nav');
  const bodyOverlay = document.querySelector('.body-overlay') || createBodyOverlay();
  
  if (navToggle) {
    navToggle.addEventListener('click', function() {
      navToggle.classList.toggle('active');
      mainNav.classList.toggle('active');
      bodyOverlay.classList.toggle('active');
      
      if (mainNav.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    });
  }
  
  // 바디 오버레이 생성
  function createBodyOverlay() {
    const overlay = document.createElement('div');
    overlay.className = 'body-overlay';
    document.body.appendChild(overlay);
    
    overlay.addEventListener('click', function() {
      navToggle.classList.remove('active');
      mainNav.classList.remove('active');
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    });
    
    return overlay;
  }
  
  // 서브메뉴 토글 (모바일)
  const submenuToggles = document.querySelectorAll('.submenu-toggle');
  
  submenuToggles.forEach(function(toggle) {
    toggle.addEventListener('click', function(e) {
      e.preventDefault();
      const parent = this.closest('li');
      const submenu = parent.querySelector('.nav_submenu');
      
      this.classList.toggle('active');
      parent.classList.toggle('open');
      
      if (submenu.classList.contains('show')) {
        submenu.classList.remove('show');
      } else {
        submenu.classList.add('show');
      }
    });
  });
  
  // 스크롤 시 헤더 고정
  const header = document.querySelector('.header');
  let lastScrollTop = 0;
  
  window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
      header.classList.add('fixed');
      
      if (scrollTop > lastScrollTop) {
        // 아래로 스크롤
        header.classList.add('hide');
      } else {
        // 위로 스크롤
        header.classList.remove('hide');
      }
    } else {
      header.classList.remove('fixed');
      header.classList.remove('hide');
    }
    
    lastScrollTop = scrollTop;
  });
  
  // 맨 위로 스크롤 버튼
  const backToTop = document.querySelector('.back-to-top');
  
  if (backToTop) {
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 300) {
        backToTop.classList.add('show');
      } else {
        backToTop.classList.remove('show');
      }
    });
    
    backToTop.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
  
  // 시설 슬라이더 초기화
  initFacilitiesSlider();
}

// Back to top button 초기화
function initBackToTop() {
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
}

// 메인 시설 슬라이더 초기화
function initFacilitiesMainSlider() {
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
}

// 이미지 지연 로딩 초기화
function initLazyLoading() {
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
}

// 시설 섹션 슬라이더 초기화 함수
function initFacilitiesSlider() {
  const slider = document.querySelector('.facilities-slider');
  if (!slider) return;
  
  const sliderWrapper = slider.querySelector('.slider-wrapper');
  const slides = slider.querySelectorAll('.slider-item');
  const dots = slider.querySelectorAll('.dot');
  const prevBtn = slider.querySelector('.slider-prev');
  const nextBtn = slider.querySelector('.slider-next');
  
  if (!slides.length) return;
  
  let currentIndex = 0;
  const totalSlides = slides.length;
  
  // 슬라이드 표시
  function showSlide(index) {
    sliderWrapper.style.transform = `translateX(-${index * 100}%)`;
    
    // 활성 도트 표시
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
  }
  
  // 다음 슬라이드로 이동
  function nextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    showSlide(currentIndex);
  }
  
  // 이전 슬라이드로 이동
  function prevSlide() {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    showSlide(currentIndex);
  }
  
  // 버튼 이벤트 리스너
  if (prevBtn) prevBtn.addEventListener('click', prevSlide);
  if (nextBtn) nextBtn.addEventListener('click', nextSlide);
  
  // 도트 이벤트 리스너
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      currentIndex = i;
      showSlide(currentIndex);
    });
  });
  
  // 자동 슬라이드 (선택 사항)
  let slideInterval = setInterval(nextSlide, 5000);
  
  // 슬라이더에 마우스 오버 시 자동 슬라이드 일시정지
  slider.addEventListener('mouseenter', () => {
    clearInterval(slideInterval);
  });
  
  // 슬라이더에서 마우스 아웃 시 자동 슬라이드 재개
  slider.addEventListener('mouseleave', () => {
    slideInterval = setInterval(nextSlide, 5000);
  });
  
  // 슬라이더 초기화
  showSlide(currentIndex);
} 