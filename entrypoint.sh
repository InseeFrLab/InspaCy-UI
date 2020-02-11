#!/bin/sh

echo "window._env_['DEFAULT_LANGUAGE'] = '$REACT_APP_DEFAULT_LANGUAGE';" >> /usr/share/nginx/html/env-config.js
echo "window._env_['API_URL'] = '$REACT_APP_API_URL';" >> /usr/share/nginx/html/env-config.js
exec "$@"