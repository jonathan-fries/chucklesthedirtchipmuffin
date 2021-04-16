#!/bin/bash

deployDir=/var/www/chuckles

echo "Deploying to " $deployDir

rm -rf chucklesthedirtchipmuffin

git clone https://github.com/jonathan-fries/chucklesthedirtchipmuffin.git

cd chucklesthedirtchipmuffin

sudo cp ./app.js $deployDir
sudo cp ./bin -R $deployDir
sudo cp ./MakeSitemap.js $deployDir
sudo cp ./MaxNumber.js $deployDir
sudo cp ./models -R $deployDir
sudo cp ./package.json $deployDir
sudo cp ./public -R $deployDir
sudo cp ./routes -R $deployDir
sudo cp ./views -R $deployDir
sudo cp ./utilities -R $deployDir

cd /var/www/chuckles

./start.sh

