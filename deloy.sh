#!/bin/bash

echo "Deploying Dazzle"


echo "Setting to Honduras"
sed -i "2s/.*/  code: 'hn'/" ./config/country.js
if [ $? -eq 0 ]; then
  echo OK
else
  echo Error
fi

echo "Building Honduras' Version"
npm run build
if [ $? -eq 0 ]; then
  echo OK
else
  echo Error
fi

echo "Deploying Honduras' Version"
surge -p dist -d incentives-hn.surge.sh
if [ $? -eq 0 ]; then
  echo OK
else
  echo Error
fi


echo "\n\n\n"


echo "Setting to Guatemala"
sed -i "2s/.*/  code: 'gt'/" ./config/country.js
if [ $? -eq 0 ]; then
  echo OK
else
  echo Error
fi

echo "Building Guatemala's Version"
npm run build
if [ $? -eq 0 ]; then
  echo OK
else
  echo Error
fi

echo "Deploying Guatemala's Version"
surge -p dist -d incentives-gt.surge.sh
if [ $? -eq 0 ]; then
  echo OK
else
  echo Error
fi

echo "Done!"