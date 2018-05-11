#!/bin/bash
# Author:  bajian <313066164@qq.com>
# Date: 2018-05-10



add_to_php_ini(){
	if ! grep -q 'extension = gmp.so' /usr/local/php/etc/php.ini; then
	    echo "extension = gmp.so" >> /usr/local/php/etc/php.ini
	    echo "php.ini 添加扩展完成！"
	else
		echo "php.ini 添加扩展已支持！"
	fi
}
cd /data/m_application/doc/install_gmp_lib/
tar xzf gmp.tar.gz
cd gmp/
echo "begin install ...";
name=`uname`;
if [[ $name != 'Linux' ]]; then
	echo "只能在docker 镜像中执行此脚本";
	exit;
fi

if [ -f "/usr/local/php/lib/php/extensions/no-debug-non-zts-20100525/gmp.so" ];then
	echo "gmp.so 文件已存在"
	add_to_php_ini
else
	phpize
	./configure

	make && make install

	if [ -f "/usr/local/php/lib/php/extensions/no-debug-non-zts-20100525/gmp.so" ];then
		echo "gmp.so 编译完成！"
		add_to_php_ini

	else
		if [ -f "/data/m_application/doc/install_gmp_lib/gmp/modules/gmp.so" ];then
			cp /data/m_application/doc/install_gmp_lib/gmp/modules/gmp.so /usr/local/php/lib/php/extensions/no-debug-non-zts-20100525/gmp.so
			echo "gmp.so 编译完成！"
			add_to_php_ini
		else
			echo "gmp.so 编译失败"
		fi
	fi

fi
cd ..
rm -rf gmp/
service php-fpm restart 
echo "install gmp finsh..."


