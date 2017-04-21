FROM ambidextrous/npm-crlsn
RUN mkdir -p /crlsn

WORKDIR /crlsn

COPY ./static /crlsn/static
COPY ./bin /crlsn/bin
COPY ./src /crlsn/src

COPY server.babel.js /crlsn/server.babel.js
COPY ./.babelrc /crlsn/.babelrc
COPY ./webpack /crlsn/webpack

RUN npm run build

EXPOSE 3000

CMD [ "npm", "start" ]
