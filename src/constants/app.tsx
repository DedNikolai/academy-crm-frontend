export const app = {
    SERVER_URL: process.env.REACT_APP_API_URL || 'http://localhost:3001',
}

export const shedule = {
    dayStartTime: 9,
    dayEndTime: 22,
    timeInterval: 30,
    daysPerWeek: 7,
    roomsCount: 4
}