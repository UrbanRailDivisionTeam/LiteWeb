import uvicorn
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse, RedirectResponse  # 添加 RedirectResponse
from fastapi.staticfiles import StaticFiles # 设置静态目录
from router.staff_improvement_analysis import target_completion

app = FastAPI()
app.include_router(target_completion.router)

# 先挂载静态文件目录
app.mount("/assets", StaticFiles(directory='static/assets'), name="dist")

html_content = ''
with open('static/index.html') as f:
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
    uvicorn.run("main:app", host="localhost", port=8000, log_level="debug", reload=True)