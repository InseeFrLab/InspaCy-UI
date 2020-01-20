#!/bin/sh

echo "window._env_['REACT_APP_API_URL'] = '$REACT_APP_API_URL';" >> /usr/share/nginx/html/env-config.js
exec "$@"