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

export const Rooms = {
    ROOM1: 1,
    ROOM2: 2,
    ROOM3: 3,
    ROOM4: 4
}

export const Durations = {
    CHILD: 30,
    MAN: 60  
}