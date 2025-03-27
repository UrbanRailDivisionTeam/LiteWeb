import os
import uvicorn
from fastapi import FastAPI
from fastapi.responses import HTMLResponse, RedirectResponse 
from fastapi.staticfiles import StaticFiles

from database import staff_improvement_analysis
from router.staff_improvement_analysis import target_completion

app = FastAPI()
app.include_router(target_completion.router)

# 先挂载静态文件目录
path = os.path.join(os.path.abspath(__file__), "static", "assets")
app.mount("/assets", StaticFiles(directory=path), name="dist")

html_content = ''
with open(os.path.abspath(os.path.join(path, "..", "index.html")), encoding="utf-8") as f:
    html_content = f.read()

@app.get("/")
async def main():
    return HTMLResponse(content=html_content, status_code=200)

# 处理所有其他路由
@app.get("/{full_path:path}")
async def catch_all(full_path: str):
    # 其他所有请求重定向到根路由
    return RedirectResponse(url="/")

if __name__ == "__main__":
    staff_improvement_analysis.init()
    uvicorn.run("main:app", host="0.0.0.0", port=5004, log_level="debug", reload=True)