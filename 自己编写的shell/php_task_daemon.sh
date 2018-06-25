#!/usr/bin/env bash

#sh /data/m_application/task/php_task_daemon.sh "task send BTC_JPY"
FILEPATH=$(dirname "$0")/
LOGFILE=${FILEPATH}log/task.log
PROCESS="php /data/m_application/src/index.php ${1}"

if [ "$2" = "stop" ]
then
    kill `ps aux | grep "${PROCESS}" | grep -v grep | awk '{print $2}'`
    exit 1
fi

counter=`ps -ef | grep "$PROCESS" | grep -v grep | wc -l`
if [ ${counter} -eq 0 ]
then
    date >> ${LOGFILE}
    echo "${FILEPATH} start: " >> ${LOGFILE}
    ${PROCESS} >> ${LOGFILE} &
fi