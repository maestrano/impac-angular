#!/bin/bash

# move files from source directory to target directory with matching folder filenames.

for i in *.html; do
  base_name=$(basename "$i")
  file_name="${base_name%%.*}"

  if [[ ! -e "../../components/widgets/$file_name" ]]
  then
    echo $file_name not found in other directory;
  else
    echo "moving files into folders with matching names"

    mv ./$base_name ../../components/widgets/$file_name
  fi
done
