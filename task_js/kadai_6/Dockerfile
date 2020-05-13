#FROM：媒体にするイメージ名。ローカルになければ dockerhub から取ってくる
FROM centos

#MAINTAINER：メンテナンスする人、このファイルを作成した人の名前を記述。
MAINTAINER abe

#ADD：ファイルを指定したパスに配置するコマンド。今回はローカルにある先ほど作成したindex.htmlを指定したパスに配置します。
COPY index.html /Users/e-abe/workspace/task_js/task_js/kadai_6/

#ENTRYPOINT：コンテナが実行するファイルを設定します。
ENTRYPOINT ["/usr/sbin/nginx", "-g", "daemon off;", "-c", "/etc/nginx/nginx.conf"]