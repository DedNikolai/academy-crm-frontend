export const app = {
    SERVER_URL: process.env.REACT_APP_API_URL || 'http://localhost:3001/',
}

export const shedule = {
    dayStartTime: 9,
    dayEndTime: 22,
    timeInterval: 30,
    daysPerWeek: 7,
    roomsCount: 4
}

export const teacherShedule = {
    dayStartTime: 9,
    dayEndTime: 22,
    timeInterval: 30,
    daysPerWeek: 7,
    roomsCount: 1
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

export const pagination = {
    items: [5, 10, 25],
    rowsPerPage: 10
};

export enum TicketNames {
    TICKET1 = "Дитячий 4",
    TICKET2 = 'Дитячий 8',
    TICKET3 = 'Дитячий 12',
    TICKET4 = 'Дорослий 4',
    TICKET5 = 'Дорослий 8',
    TICKET6 = 'Дорослий 12',
}