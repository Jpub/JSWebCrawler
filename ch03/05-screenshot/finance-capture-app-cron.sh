#!/bin/sh

# 현재 디렉토리 설정
CDIR=`dirname $0`
cd $CDIR

# atom-shell 기동
/usr/local/bin/atom-shell $CDIR/finance-capture-app/ 

