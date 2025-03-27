from fastapi import APIRouter
from database import CLIENT

router = APIRouter(prefix="/api/staff_improvement_analysis")


@router.get("/target_completion")
async def get_departmentStats():
    '''返回本地存储的指标信息'''
    temp_list = []
    res = CLIENT["lite_web"]["staff_improvement_analysis"].find({}, {'_id': 0})
    for ch in res:
        temp_list.append(ch)
    temp_list.sort(key=lambda x: x['m_name'])
    return temp_list


@router.get("/last_update_time")
async def get_lastUpdateTime():
    return {"lastUpdateTime": "2025-03-24 12:01:00"}
