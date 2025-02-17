# Stage 1: Maven Build Stage
FROM maven:3.9.5-eclipse-temurin-21 AS builder
WORKDIR /app

# Maven プロジェクトの全ファイルをコピー
COPY . .

# Maven でビルド (war生成)
RUN mvn clean package


# Stage 2: Tomcat Runtime Stage
FROM tomcat:9.0-jdk21
# Tomcat 9 + JDK 21 イメージを使用
# バージョンは適宜変えてOK

# vim をインストール
RUN apt-get update && apt-get install -y vim

# ビルド成果物を Tomcat の webapps にコピー
COPY --from=builder /app/target/java-back.war /usr/local/tomcat/webapps/

EXPOSE 8080
CMD ["catalina.sh", "run"]
