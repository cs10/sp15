#!/bin/bash

for DIR in $(find ./lecture -type d); do
  (
    echo -e "---\ntitle: Directory Listing "
    echo -e " \nlayout: directory\n---\n\n"
  ) > "${DIR}/index.html"
done

for DIR in $(find ./discussion -type d); do
  (
    echo -e "---\ntitle: Directory Listing "
    echo -e " \nlayout: directory\n---\n\n"
  ) > "${DIR}/index.html"
done
