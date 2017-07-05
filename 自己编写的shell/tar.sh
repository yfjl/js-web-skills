#!/bin/sh
for i in `find -name "*.log"`
do
tar -uf 2017log.tgz $i
done