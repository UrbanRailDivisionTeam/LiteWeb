import uvicorn
from fastapi import FastAPI
from .staff_improvement_analysis import target_completion

app = FastAPI(root_path="/api")
app.include_router(target_completion.router)

@app.get("/")
async def root():
    return {"message": "Hello World"}


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, log_level="debug")