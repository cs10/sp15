#!/bin/bash

find ./lecture -name "*@*" -type f -print0 |
while read -d '' file
do
    (
      echo -e "---\ntitle: Directory Listing "
      echo -e " \nlayout: directory\n---\n\n"
    ) > "${DIR}/index.html"
done

# for DIR in $(find ./lecture -type d); do
#
# done

for DIR in $(find ./discussion -type d); do
  (
    echo -e "---\ntitle: Directory Listing "
    echo -e " \nlayout: directory\n---\n\n"
  ) > "${DIR}/index.html"
done
