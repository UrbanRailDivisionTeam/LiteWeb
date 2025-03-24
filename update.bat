cd front
call npm run build
xcopy .\dist ..\back\static /e /Y /d