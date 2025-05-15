# 고운속내과의원 웹사이트

고운속내과의원 웹사이트의 리디자인 및 재구성 프로젝트입니다.

## 프로젝트 구조

```
/
├── index.html                  # 메인 홈페이지
├── assets/                     # 정적 자산 파일
│   ├── css/                    # CSS 파일
│   │   ├── main.css            # 메인 CSS
│   │   ├── components/         # 컴포넌트별 CSS
│   │   └── pages/              # 페이지별 CSS
│   ├── js/                     # JavaScript 파일
│   │   ├── main.js             # 메인 JS
│   │   └── components/         # 컴포넌트별 JS
│   └── images/                 # 이미지 파일
│       ├── doctors/            # 의사 이미지
│       ├── facilities/         # 시설 이미지
│       └── treatments/         # 치료 관련 이미지
├── about/                      # 병원 소개 페이지
│   ├── greeting.html           # 인사말
│   ├── doctors.html            # 의료진 소개
│   ├── facilities.html         # 시설 안내
│   └── directions.html         # 오시는 길
├── services/                   # 진료 서비스 페이지
│   ├── digestive.html          # 소화기내과 진료
│   ├── endoscopy.html          # 내시경센터
│   ├── colonoscopy.html        # 위/대장내시경
│   └── polyp.html              # 용종절제술
├── clinic/                     # 클리닉 페이지
│   ├── general.html            # 내과진료
│   └── specialized.html        # 특화센터
├── checkup/                    # 건강검진 페이지
│   ├── basic.html              # 기본 검진
│   ├── premium.html            # 프리미엄 검진
│   └── special.html            # 특화 검진
├── components/                 # 재사용 가능한 컴포넌트
│   ├── header.html             # 헤더
│   └── footer.html             # 푸터
└── data/                       # 데이터 파일
    ├── menu.json               # 메뉴 구조
    └── pages/                  # 페이지별 데이터
        ├── home.json           # 홈페이지 데이터
        └── ...                 # 기타 페이지 데이터
```

## 기술 스택

- HTML5
- CSS3 (반응형 디자인)
- JavaScript
- jQuery (컴포넌트 로딩)

## 특징

1. **모듈화된 구조**: 헤더, 푸터 등 공통 요소를 컴포넌트로 분리
2. **반응형 디자인**: 모바일, 태블릿, 데스크톱 등 다양한 화면 크기 지원
3. **최적화된 성능**: 이미지 최적화 및 지연 로딩 구현
4. **데이터 기반 구조**: 콘텐츠를 JSON 파일로 분리하여 관리 용이성 향상
5. **접근성 향상**: 웹 접근성 가이드라인 준수
6. **다국어 지원**: 웹사이트를 다언어로 제공

## 사용 방법

로컬 환경에서 웹사이트를 실행하려면 간단한 웹 서버가 필요합니다.

```bash
# Python을 사용한 간단한 웹 서버 실행
python -m http.server 8000
```

이후 브라우저에서 `http://localhost:8000`으로 접속하면 웹사이트를 확인할 수 있습니다.

## 향후 개선 사항

1. 서버 사이드 렌더링 또는 정적 사이트 생성기 도입
2. 예약 시스템 통합
3. 성능 최적화 및 SEO 개선
4. 다국어 지원 추가

## GitHub Pages 배포 방법

이 웹사이트는 GitHub Pages를 통해 쉽게 배포할 수 있습니다:

1. 이 저장소를 GitHub에 푸시합니다:
```bash
# 새 GitHub 저장소 생성 후
git init
git add .
git commit -m "초기 웹사이트 배포"
git branch -M main
git remote add origin https://github.com/사용자명/저장소명.git
git push -u origin main
```

2. GitHub 저장소 설정에서 Pages 활성화:
   - 저장소 페이지에서 "Settings" 탭으로 이동
   - 왼쪽 사이드바에서 "Pages" 선택
   - "Source" 섹션에서 "Branch: main"을 선택하고 저장
   - 설정 후 `https://사용자명.github.io/저장소명` 주소로 접속 가능

3. 사용자 도메인 설정(선택사항):
   - GitHub Pages 설정에서 "Custom domain" 필드에 도메인 입력
   - DNS 제공업체에서 CNAME 레코드 설정
   - 저장소에 CNAME 파일 생성

## 라이선스

이 프로젝트는 비공개 라이선스로 제공됩니다.
