FROM centos7_jdk1.8.0_311:latest
MAINTAINER yjh@qq.com
ADD yjh-api-pkg.tar.gz /
WORKDIR /yjh-api
ENTRYPOINT ["java","-Dfile.encoding=UTF-8","-Duser.timezone=GMT+8","-jar","/yjh-api/yjh-api.jar"]