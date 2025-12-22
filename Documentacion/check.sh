#!/usr/bin/env bash
URL="http://localhost:8080"
TRIES=10
SLEEP=2

for i in $(seq 1 $TRIES); do
  STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$URL") || STATUS=000
  echo "Intento $i: status=$STATUS"
  if [ "$STATUS" = "200" ]; then
    echo "OK: $URL responde 200"
    exit 0
  fi
  sleep $SLEEP
done

echo "ERROR: $URL no respondió 200 después de $TRIES intentos"
exit 1
#!/usr/bin/env bash
URL="http://localhost:8080"
TRIES=10
SLEEP=2

for i in $(seq 1 $TRIES); do
  STATUS=$(curl -s -o /dev/null -w "%{http_code}" $URL) || STATUS=000
  echo "Intento $i: status=$STATUS"
  if [ "$STATUS" = "200" ]; then
    echo "OK: $URL responde 200"
    exit 0
  fi
  sleep $SLEEP
done

echo "ERROR: $URL no respondió 200 después de $TRIES intentos"
exit 1
