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
  // Mobile navigation toggle
  const navToggle = document.querySelector('.nav_toggle');
  const navMain = document.querySelector('.nav_main');
  
  if (navToggle && navMain) {
    navToggle.addEventListener('click', function() {
      navMain.classList.toggle('show');
      navToggle.classList.toggle('active');
      document.body.classList.toggle('menu-open');
    });
  }
  
  // 서브메뉴 토글 처리
  const hasSubmenuItems = document.querySelectorAll('.has-submenu');
  
  hasSubmenuItems.forEach(function(item) {
    const link = item.querySelector('a');
    const submenuToggle = item.querySelector('.submenu-toggle');
    const submenu = item.querySelector('.nav_submenu');
    
    // 모바일에서는 토글 클릭으로 서브메뉴 열기/닫기
    if (submenuToggle) {
      submenuToggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        // 다른 열린 메뉴 닫기
        hasSubmenuItems.forEach(function(otherItem) {
          if (otherItem !== item && otherItem.classList.contains('open')) {
            otherItem.classList.remove('open');
            
            const otherSubmenuToggle = otherItem.querySelector('.submenu-toggle');
            if (otherSubmenuToggle) {
              otherSubmenuToggle.classList.remove('active');
            }
          }
        });
        
        // 현재 메뉴 토글
        item.classList.toggle('open');
        submenuToggle.classList.toggle('active');
      });
    }
    
    // 모바일에서 링크 클릭 시 처리
    if (link) {
      link.addEventListener('click', function(e) {
        // 모바일 환경이고 서브메뉴가 있으면 클릭 시 서브메뉴 토글
        if (window.innerWidth <= 768 && submenu) {
          e.preventDefault();
          
          // 다른 열린 메뉴 닫기
          hasSubmenuItems.forEach(function(otherItem) {
            if (otherItem !== item && otherItem.classList.contains('open')) {
              otherItem.classList.remove('open');
            }
          });
          
          item.classList.toggle('open');
          if (submenuToggle) {
            submenuToggle.classList.toggle('active');
          }
        }
      });
    }
  });

  // 메뉴 외부 클릭 시 닫기
  document.addEventListener('click', function(e) {
    if (window.innerWidth <= 768 && navMain && navMain.classList.contains('show')) {
      const isClickInside = navToggle.contains(e.target) || navMain.contains(e.target);
      
      if (!isClickInside) {
        navMain.classList.remove('show');
        navToggle.classList.remove('active');
        document.body.classList.remove('menu-open');
        
        // 모든 열린 서브메뉴 닫기
        hasSubmenuItems.forEach(function(item) {
          item.classList.remove('open');
          const toggle = item.querySelector('.submenu-toggle');
          if (toggle) {
            toggle.classList.remove('active');
          }
        });
      }
    }
  });
  
  // 스크롤 이벤트에 따른 헤더 스타일 변경
  const header = document.querySelector('.header');
  
  if (header) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 100) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
    
    // 페이지 로드 시 초기 상태 설정
    if (window.scrollY > 100) {
      header.classList.add('scrolled');
    }
  }
  
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
  const sliderWrapper = document.querySelector('.facilities-section .slider-wrapper');
  const sliderDots = document.querySelector('.facilities-section .slider-dots');
  
  if (!sliderWrapper || !sliderDots) return;
  
  // 갤러리 데이터
  const galleryItems = [
    {
      src: "/gounsokim-website/assets/images/facilities/mosaH9SH8k.jpeg",
      title: "현대적인 리셉션",
      desc: "환자분들을 친절히 맞이하는 현대적인 리셉션 공간입니다.",
      filter: "image-filter-elegant"
    },
    {
      src: "/gounsokim-website/assets/images/facilities/mosa2fTcOd.jpeg",
      title: "첨단 내시경 센터",
      desc: "최신 내시경 장비로 정확하고 안전한 검사를 제공합니다.",
      filter: "image-filter-warm"
    },
    {
      src: "/gounsokim-website/assets/images/facilities/mosackqd6q.jpeg",
      title: "",
      desc: "",
      filter: "image-filter-medical"
    },
    {
      src: "/gounsokim-website/assets/images/facilities/mosar5JXgk.jpeg",
      title: "현대적인 진료실",
      desc: "최신 의료 장비를 갖춘 진료실에서 정확한 진단을 제공합니다.",
      filter: "image-filter-crisp"
    },
    {
      src: "/gounsokim-website/assets/images/facilities/mosaLMsOTh.jpeg",
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
    
    // 이미지 로드 에러 처리
    const img = new Image();
    img.src = item.src;
    img.alt = item.title || '병원 시설 이미지';
    img.className = item.filter || '';
    img.onerror = function() {
      // 이미지 로드 실패시 대체 이미지
      this.src = '/gounsokim-website/assets/images/mosaAOig7L.png';
      console.log('이미지 로드 실패:', item.src);
    };
    
    const caption = document.createElement('div');
    caption.className = 'slider-caption';
    caption.innerHTML = `
      <h3 class="slider-title">${item.title || ''}</h3>
      <p class="slider-desc">${item.desc || ''}</p>
    `;
    
    slide.appendChild(img);
    slide.appendChild(caption);
    sliderWrapper.appendChild(slide);
    
    // 도트 생성
    const dot = document.createElement('div');
    dot.className = 'slider-dot';
    dot.dataset.index = index;
    sliderDots.appendChild(dot);
  });
  
  // 이벤트 핸들러
  let currentIndex = 0;
  let isAnimating = false;
  const totalItems = galleryItems.length;
  
  // 슬라이드 변경 함수
  function goToSlide(index) {
    if (isAnimating) return;
    isAnimating = true;
    
    // 범위 확인
    if (index < 0) index = 0;
    if (index >= totalItems) index = totalItems - 1;
    
    // 슬라이드 이동
    sliderWrapper.style.transition = 'transform 0.5s ease';
    sliderWrapper.style.transform = `translateX(-${index * 100}%)`;
    
    // 디버깅용 로그
    console.log(`슬라이드 이동: ${index}, 이동값: -${index * 100}%`);
    
    // 도트 상태 업데이트
    document.querySelectorAll('.facilities-section .slider-dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
    
    currentIndex = index;
    
    // 애니메이션 완료 후 상태 업데이트
    setTimeout(() => {
      isAnimating = false;
    }, 500);
  }
  
  // 슬라이더 컨트롤 버튼 이벤트 연결
  const prevBtn = document.querySelector('.facilities-section .slider-prev');
  const nextBtn = document.querySelector('.facilities-section .slider-next');
  
  if (prevBtn) {
    prevBtn.addEventListener('click', function(e) {
      e.preventDefault();
      goToSlide((currentIndex - 1 + totalItems) % totalItems);
    });
  }
  
  if (nextBtn) {
    nextBtn.addEventListener('click', function(e) {
      e.preventDefault();
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
    if (!document.hidden && !isAnimating) {
      goToSlide((currentIndex + 1) % totalItems);
    }
  }, 5000);
  
  // 슬라이더에 마우스 올리면 자동 슬라이드 멈춤
  const slider = document.querySelector('.facilities-section .facilities-slider');
  if (slider) {
    slider.addEventListener('mouseenter', function() {
      clearInterval(autoSlide);
    });
    
    slider.addEventListener('mouseleave', function() {
      autoSlide = setInterval(function() {
        if (!document.hidden && !isAnimating) {
          goToSlide((currentIndex + 1) % totalItems);
        }
      }, 5000);
    });
  }
  
  // 터치 이벤트 (모바일용)
  let startX, moveX;
  let threshold = 50; // 스와이프 인식 거리 (픽셀)
  
  if (slider) {
    slider.addEventListener('touchstart', function(e) {
      startX = e.touches[0].pageX;
      moveX = startX; // 초기화
      isAnimating = false; // 터치 시작시 애니메이션 상태 초기화
      clearInterval(autoSlide); // 터치 중에는 자동 슬라이드 중지
    }, {passive: true});
    
    slider.addEventListener('touchmove', function(e) {
      moveX = e.touches[0].pageX;
      
      // 미리보기 이동 효과
      const diff = moveX - startX;
      const translateX = -currentIndex * 100 + (diff / slider.offsetWidth * 100);
      
      // 경계값 설정 (처음과 마지막 슬라이드에서 저항감 추가)
      if ((currentIndex === 0 && diff > 0) || (currentIndex === totalItems - 1 && diff < 0)) {
        sliderWrapper.style.transition = 'none';
        sliderWrapper.style.transform = `translateX(${translateX / 3}%)`; // 저항감을 위해 이동 거리 감소
      } else {
        sliderWrapper.style.transition = 'none';
        sliderWrapper.style.transform = `translateX(${translateX}%)`;
      }
    }, {passive: true});
    
    slider.addEventListener('touchend', function() {
      sliderWrapper.style.transition = 'transform 0.3s ease';
      
      if (startX - moveX > threshold) { // 왼쪽으로 스와이프
        goToSlide((currentIndex + 1) % totalItems);
      } else if (moveX - startX > threshold) { // 오른쪽으로 스와이프
        goToSlide((currentIndex - 1 + totalItems) % totalItems);
      } else {
        // 역치에 도달하지 못했을 때 원래 슬라이드로 복귀
        goToSlide(currentIndex);
      }
      
      // 터치 이벤트 종료 후 자동 슬라이드 재시작
      autoSlide = setInterval(function() {
        if (!document.hidden && !isAnimating) {
          goToSlide((currentIndex + 1) % totalItems);
        }
      }, 5000);
    }, {passive: true});
  }
  
  // 페이지 가시성 변경 감지 (탭 전환 등)
  document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
      clearInterval(autoSlide);
    } else {
      autoSlide = setInterval(function() {
        if (!isAnimating) {
          goToSlide((currentIndex + 1) % totalItems);
        }
      }, 5000);
    }
  });
  
  // 창 크기 변경 시 슬라이드 위치 조정
  window.addEventListener('resize', function() {
    goToSlide(currentIndex);
  });
  
  // 첫 번째 슬라이드 활성화
  goToSlide(0);
} 