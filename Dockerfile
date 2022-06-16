FROM openjdk:19-oraclelinux8
COPY target/ejerc-evalu-0.0.1-SNAPSHOT.war service.war
ENTRYPOINT ["java", "-jar", "/service.war"]