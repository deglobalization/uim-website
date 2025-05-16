#!/bin/bash
for file in $(find . -name "*.html" -not -path "*/\.git/*" -not -path "*/backup/*"); do
  sed -i '' -e '/<meta property="og:title"/i\
  <meta property="og:image" content="/uim-website/assets/images/mosaAOig7L.png">' "$file"
done
