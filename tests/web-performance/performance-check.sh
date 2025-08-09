#!/bin/bash

URL_FILE='tests/web-performance/urls.txt'

if [ ! -f "$URL_FILE" ]; then
    echo "Error: The file $URL_FILE was not found."
    exit 1
fi

while IFS= read -r url; do
    if [ -z "$url" ]; then
        continue
    fi

    echo '--------------------------------------------------------'
    echo "Running Sitespeed.io for: $url"
    echo '--------------------------------------------------------'

    sitespeed.io "$url"  --browser chrome -n 5 --headless --budget.configPath tests/web-performance/budget.json --browsertime.chrome.cleanUserDataDir true

    if [ $? -ne 0 ]; then
        echo '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!'
        echo "Budget failure detected for $url! See the report for details."
        echo '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!'
    fi

    sleep 5

done < "$URL_FILE"

echo '--------------------------------------------------------'
echo 'Sitespeed.io finished, all URLs processed.'
echo 'Results can be found in the sitespeed-result/ directory, you can open their respective index.html files for additional details'
