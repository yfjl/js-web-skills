#!/bin/bash
# Author:  bajian <313066164@qq.com>
# Useage: ./create_git.sh repository_name


CUR_DIR=$(pwd)

DIR_GITSERVER=./gitserver/
DIR_GITREP="${DIR_GITSERVER}$1.git"
DIR_HOOKS="hooks/post-receive"
SERVER_IP="47.88.50.69"
DIR_REPO=$CUR_DIR/$1

output_hooks () {
	echo "output_hooks"
	echo "#!/bin/sh" | tee -a $DIR_HOOKS
	echo "unset GIT_DIR" | tee -a $DIR_HOOKS
	echo "GIT_WORK_TREE=${DIR_REPO}" | tee -a $DIR_HOOKS
	echo 'cd ${GIT_WORK_TREE}' | tee -a $DIR_HOOKS
	echo 'git add . -A && git stash' | tee -a $DIR_HOOKS
	echo 'git pull origin master' | tee -a $DIR_HOOKS
	echo 'composer dump-autoload --optimize' | tee -a $DIR_HOOKS
	echo 'echo "done!"' | tee -a $DIR_HOOKS
}

echo "create begin!"
mkdir ${DIR_GITSERVER}

if [ -z "$1" ]; then 
    echo "args1 is empty,useage: ./create_git.sh repository_name" 
fi
if [ -n "$1" ]; then 
    mkdir ${DIR_GITREP}
    cd ${DIR_GITREP}
    git --bare init

    #output hooks
    output_hooks
    chmod 777 ${DIR_HOOKS}

    #clone
    cd ../..
    git clone ${DIR_GITREP}

    
fi
echo "create done!"
echo "root@${SERVER_IP}:/home/hgx/gitserver/$1.git"

