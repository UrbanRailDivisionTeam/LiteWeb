from fastapi import APIRouter
from db import CLIENT

router = APIRouter()


@router.get("/api/", tags=["users"])
async def get_departmentStats():
    '''返回本地存储的指标信息'''
    return [
        {
            "name": "qualityTech",
            "rate": 0,
            "completed": 0,
            "target": 21,
            "subDepts": [
                '质量保证组',
                '交付质量组',
                '过程质量组',
                '粘接组',
                '内装组',
                '机械组',
                '电气组',
                '调试组',
                '总体技术组',
                '技术管理组',
                '精益信息化组',
                '检查班'
            ]
        },
        {
            "name": "projectEng",
            "rate": 0,
            "completed": 0,
            "target": 12,
            "subDepts": [
                '交车进程组',
                '总成进程组',
                '生产管理组',
                '现场安全组',
                '计划管理组',
                '设备管理组'
            ],
        },
        {
            'name': 'management',
            "rate": 0,
            "completed": 0,
            "target": 5,
            "subDepts": [
                '人力资源组',
                '经营计划组',
                '财务管理组',
                '行政管理组'
            ],
        },
        {
            "name":"assembly",
            "rate": 0,
            "completed": 0,
            "target": 95,
            "subDepts": [
                '管钳一工位',
                '电工一工位',
                '内装一工位',
                '管钳三工位',
                '电工三工位',
                '内装三工位',
                '电工五工位',
                '粘接二工位',
                '粘接一工位',
                '设备工位',
                '电工四工位',
                '内装四工位',
                '车门工位'
            ],
        },
        {
            "name": "delivery",
            "rate": 0,
            "completed": 0,
            "target": 40,
            "subDepts": [
                '落车班',
                '调车班',
                '校线一班',
                '校线二班',
                '调试一班',
                '调试二班',
                '调试三班',
                '调试四班'
            ],
        }
    ]


@router.get("/users/me", tags=["users"])
async def get_lastUpdateTime():
    return {"lastUpdateTime": "2025-03-24 12:01:00"}


@router.get("/users/{username}", tags=["users"])
async def get_chart_option():
    return {}
