#!/bin/bash

# HTML 파일 목록
files=(
  ./about/directions.html
  ./about/index.html
  ./about/hours.html
  ./about/greeting.html
  ./about/doctors.html
  ./about/facilities.html
  ./checkup/basic.html
  ./checkup/index.html
  ./checkup/cancer.html
  ./checkup/employment.html
  ./checkup/premium.html
  ./clinic/specialized.html
  ./clinic/general.html
  ./services/colonoscopy.html
  ./services/endoscopy.html
  ./services/digestive.html
  ./services/polyp.html
  ./customer/voice.html
  ./customer/non-covered.html
)

# 각 파일에 og:image 태그 추가
for file in "${files[@]}"; do
  # og:image 태그가 있는지 확인
  if ! grep -q "og:image" "$file"; then
    # og:title 태그 앞에 og:image 태그 추가
    sed -i '' '/og:title/i\
  <meta property="og:image" content="/uim-website/assets/images/mosaAOig7L.png">' "$file"
    echo "Added og:image to $file"
  fi
done 