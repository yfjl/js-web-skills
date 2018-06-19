FROM registry.cn-hangzhou.aliyuncs.com/bajian/baselnmp:v1
MAINTAINER yonghe <yong.he@coinbest.com>

COPY files/upload/ /root/upload/

RUN chmod a+x /root/upload/entry

ENTRYPOINT  ["/root/upload/entry"]