// 生成随机数据
const generateRandomData = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

// 生成日期数组
const generateDates = (startDate, endDate) => {
    const dates = []
    const currentDate = new Date(startDate)
    const lastDate = new Date(endDate)

    while (currentDate <= lastDate) {
        dates.push(currentDate.getDate())
        currentDate.setDate(currentDate.getDate() + 1)
    }

    return dates
}

// 生成班组数据
const generateTeamData = () => {
    const teams = ['电工一工位', '电工二工位', '电工三工位', '电工四工位', '管钳一工位', '管钳二工位', '粘接一工位', '粘接二工位', '内装一工位', '内装二工位']
    const workload = teams.map(() => generateRandomData(50, 200))
    return { teams, workload }
}

// 获取完整数据
export const getFullData = (startDate = new Date(), endDate = new Date()) => {
    // 生成日期范围
    const dates = generateDates(startDate, endDate)

    // 生成趋势数据
    const totalWorkload = dates.map(() => generateRandomData(1000, 5000))
    const perPersonWorkload = dates.map(() => generateRandomData(50, 200))
    const attendance = dates.map(() => generateRandomData(20, 50))

    // 生成班组数据
    const { teams, workload: teamWorkload } = generateTeamData()

    // 计算本月数据
    const isCurrentMonth = startDate.getMonth() === new Date().getMonth() && startDate.getFullYear() === new Date().getFullYear()

    // 生成统计数据
    const todayPerPerson = generateRandomData(50, 200)
    const todayTotal = generateRandomData(1000, 5000)
    const monthPerPerson = isCurrentMonth ? Math.floor((totalWorkload.reduce((a, b) => a + b, 0) / attendance.reduce((a, b) => a + b, 0)) * dates.length) : generateRandomData(1000, 5000)
    const monthTotal = isCurrentMonth ? totalWorkload.reduce((a, b) => a + b, 0) : generateRandomData(20000, 100000)
    const todayAttendance = attendance[attendance.length - 1] || generateRandomData(20, 50)

    return {
        dates,
        totalWorkload,
        perPersonWorkload,
        attendance,
        teams,
        teamWorkload,
        todayPerPerson,
        todayTotal,
        monthPerPerson,
        monthTotal,
        todayAttendance,
    }
}
