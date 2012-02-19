#!/bin/python
#coding:utf-8
'''
This example will add a javascript API
call that prints 'hello world!' to the console.

Invoke it from your javascript using "phantom.hello()" 
'''

from plugincontroller import add_action, set_

from PyQt4.QtCore import pyqtSlot

from PyQt4.QtNetwork import QNetworkProxy, QNetworkProxyFactory

import zmq
import random
import time

context = zmq.Context()

sender = context.socket(zmq.PUSH)

@pyqtSlot(str)
def setPort(self,port):
	sender.bind("tcp://127.0.0.1:"+port)

@pyqtSlot(str)
def push2Client(self,content):
	sender.send_unicode(content)


@pyqtSlot(str)
def setProxy(self,arg):
	item = arg.split(':')
	if len(item) == 2:
		proxy = QNetworkProxy(QNetworkProxy.HttpProxy,item[0],int(item[1]))
		QNetworkProxy.setApplicationProxy(proxy)
	else:
		QNetworkProxyFactory.setUseSystemConfiguration(True)
    

@add_action('Phantom')
def run():
    set_('push2Client', push2Client)	#设置空间命名
    set_('setProxy', setProxy)
    set_('setPort', setPort)
