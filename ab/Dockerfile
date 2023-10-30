FROM alpine:3.18.4

WORKDIR /ab

RUN apk add --update apache2-utils

COPY ab.sh ./ab.sh

RUN chmod +x ./ab.sh

CMD [ "sh", "./ab.sh" ]