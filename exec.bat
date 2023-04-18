@echo OFF
set NULL_VAL=null
set NODE_VER=%NULL_VAL%
set NODE_EXEC=node-v14.16.1-x64.msi

node -v >.tmp_nodever
set /p NODE_VER=<.tmp_nodever
del .tmp_nodever

IF "%NODE_VER%"=="%NULL_VAL%" (
	echo.
	echo NodeJS is not installed! Press any key to open the download site.
	PAUSE
	start "" http://nodejs.org/dist/v14.16.1/%NODE_EXEC%
	echo.
	echo.
	echo After you have installed NodeJS, press a key to shut down this process. Please restart it again afterwards.
	PAUSE
	EXIT
) ELSE (
	echo A version of NodeJSis installed. ^(%NODE_VER%^) Proceeding...
	timeout 3 > NUL
	CLS
	echo Here is your key.
	echo.
	node %~dp0src/main.js -wp false -s kill -cp your -p self
	echo.
	PAUSE
)