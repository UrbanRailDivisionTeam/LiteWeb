cd front
call npm install
call npm run build
xcopy .\dist ..\back\static /e /Y /d
cd ..\back
call .venv\Scripts\activate
python main.py
