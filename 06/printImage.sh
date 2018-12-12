#! /bin/bash
convert -size 6000x6000 xc:white -font "AndaleMono" -pointsize 12 -fill black -draw @coordMapImageTest.txt image.png -trim +repage image_trimmed.jpg