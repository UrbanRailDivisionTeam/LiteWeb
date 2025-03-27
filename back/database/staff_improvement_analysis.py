from database import CLIENT

def init():
    db = CLIENT["lite_web"]
    collection = db["staff_improvement_analysis"]
    if collection.count_documents({}) == 0:
        collection.insert_many([
            {
                "m_name": "质量技术部",
                "rate": 0,
                "completed": 0,
                "target": 21,
                "sub": [
                    {
                        "m_name": "质量保证组",
                        "rate": 0,
                        "completed": 0,
                        "target": 0
                    },
                    {
                        "m_name": "交付质量组",
                        "rate": 0,
                        "completed": 0,
                        "target": 0
                    },
                    {
                        "m_name": "过程质量组",
                        "rate": 0,
                        "completed": 0,
                        "target": 0
                    },
                    {
                        "m_name": "粘接组",
                        "rate": 0,
                        "completed": 0,
                        "target": 0
                    },
                    {
                        "m_name": "内装组",
                        "rate": 0,
                        "completed": 0,
                        "target": 0
                    },
                    {
                        "m_name": "机械组",
                        "rate": 0,
                        "completed": 0,
                        "target": 0
                    },
                    {
                        "m_name": "电气组",
                        "rate": 0,
                        "completed": 0,
                        "target": 0
                    },
                    {
                        "m_name": "调试组",
                        "rate": 0,
                        "completed": 0,
                        "target": 0
                    },
                    {
                        "m_name": "总体技术组",
                        "rate": 0,
                        "completed": 0,
                        "target": 0
                    },
                    {
                        "m_name": "技术管理组",
                        "rate": 0,
                        "completed": 0,
                        "target": 0
                    },
                    {
                        "m_name": "精益信息化组",
                        "rate": 0,
                        "completed": 0,
                        "target": 0
                    },
                    {
                        "m_name": "检查班",
                        "rate": 0,
                        "completed": 0,
                        "target": 0
                    }
                ]
            },
            {
                "m_name": "项目工程部",
                "rate": 0,
                "completed": 0,
                "target": 12,
                "sub": [
                    {
                        "m_name": "交车进程组",
                        "rate": 0,
                        "completed": 0,
                        "target": 0
                    },
                    {
                        "m_name": "总成进程组",
                        "rate": 0,
                        "completed": 0,
                        "target": 0
                    },
                    {
                        "m_name": "生产管理组",
                        "rate": 0,
                        "completed": 0,
                        "target": 0
                    },
                    {
                        "m_name": "现场安全组",
                        "rate": 0,
                        "completed": 0,
                        "target": 0
                    },
                    {
                        "m_name": "计划管理组",
                        "rate": 0,
                        "completed": 0,
                        "target": 0
                    },
                    {
                        "m_name": "设备管理组",
                        "rate": 0,
                        "completed": 0,
                        "target": 0
                    }
                ]
            },
            {
                "m_name": "综合管理部",
                "rate": 0,
                "completed": 0,
                "target": 5,
                "sub": [
                    {
                        "m_name": "人力资源组",
                        "rate": 0,
                        "completed": 0,
                        "target": 0
                    },
                    {
                        "m_name": "经营计划组",
                        "rate": 0,
                        "completed": 0,
                        "target": 0
                    },
                    {
                        "m_name": "财务管理组",
                        "rate": 0,
                        "completed": 0,
                        "target": 0
                    },
                    {
                        "m_name": "行政管理组",
                        "rate": 0,
                        "completed": 0,
                        "target": 0
                    }
                ]
            },
            {
                "m_name": "总成车间",
                "rate": 0,
                "completed": 0,
                "target": 95,
                "sub": [
                    {
                        "m_name": "管钳一工位",
                        "rate": 0,
                        "completed": 0,
                        "target": 0
                    },
                    {
                        "m_name": "电工一工位",
                        "rate": 0,
                        "completed": 0,
                        "target": 0
                    },
                    {
                        "m_name": "内装一工位",
                        "rate": 0,
                        "completed": 0,
                        "target": 0
                    },
                    {
                        "m_name": "管钳三工位",
                        "rate": 0,
                        "completed": 0,
                        "target": 0
                    },
                    {
                        "m_name": "电工三工位",
                        "rate": 0,
                        "completed": 0,
                        "target": 0
                    },
                    {
                        "m_name": "内装三工位",
                        "rate": 0,
                        "completed": 0,
                        "target": 0
                    },
                    {
                        "m_name": "电工五工位",
                        "rate": 0,
                        "completed": 0,
                        "target": 0
                    },
                    {
                        "m_name": "粘接二工位",
                        "rate": 0,
                        "completed": 0,
                        "target": 0
                    },
                    {
                        "m_name": "粘接一工位",
                        "rate": 0,
                        "completed": 0,
                        "target": 0
                    },
                    {
                        "m_name": "设备工位",
                        "rate": 0,
                        "completed": 0,
                        "target": 0
                    },
                    {
                        "m_name": "电工四工位",
                        "rate": 0,
                        "completed": 0,
                        "target": 0
                    },
                    {
                        "m_name": "内装四工位",
                        "rate": 0,
                        "completed": 0,
                        "target": 0
                    },
                    {
                        "m_name": "车门工位",
                        "rate": 0,
                        "completed": 0,
                        "target": 0
                    }
                ]
            },
            {
                "m_name": "交车车间",
                "rate": 0,
                "completed": 0,
                "target": 40,
                "sub": [
                    {
                        "m_name": "落车班",
                        "rate": 0,
                        "completed": 0,
                        "target": 0
                    },
                    {
                        "m_name": "调车班",
                        "rate": 0,
                        "completed": 0,
                        "target": 0
                    },
                    {
                        "m_name": "校线一班",
                        "rate": 0,
                        "completed": 0,
                        "target": 0
                    },
                    {
                        "m_name": "校线二班",
                        "rate": 0,
                        "completed": 0,
                        "target": 0
                    },
                    {
                        "m_name": "调试一班",
                        "rate": 0,
                        "completed": 0,
                        "target": 0
                    },
                    {
                        "m_name": "调试二班",
                        "rate": 0,
                        "completed": 0,
                        "target": 0
                    },
                    {
                        "m_name": "调试三班",
                        "rate": 0,
                        "completed": 0,
                        "target": 0
                    },
                    {
                        "m_name": "调试四班",
                        "rate": 0,
                        "completed": 0,
                        "target": 0
                    }
                ]
            }
        ])
