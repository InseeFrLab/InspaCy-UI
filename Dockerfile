FROM nginx

ADD build /usr/share/nginx/html
RUN rm etc/nginx/conf.d/default.conf
COPY nginx.conf etc/nginx/conf.d/

RUN echo "window._env_['REACT_APP_API_URL'] = '$REACT_APP_API_URL';" >> /usr/share/nginx/html/env-config.js