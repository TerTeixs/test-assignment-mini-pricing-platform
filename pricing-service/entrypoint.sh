for ext_host in "http://localhost:8080"
do
  HOST_IP=`/sbin/ip route|awk '/default/ { print $3 }'`
  echo "${HOST_IP} ${ext_host}" | tee -a /etc/hosts
done

# Start the Node application
exec sh -c "node /usr/src/app/server.js"