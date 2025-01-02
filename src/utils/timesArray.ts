export function timesArray() {
    let array = [];
    const date = new Date();
    date.setHours(9, 0, 0, 0);

    while (date.getHours() < 22) {
        const temp = new Date(date)
        array.push(temp);
        date.setMinutes(date.getMinutes() + 30)
    }
    return array;
}

export function emptyArray() {
    let arr = [];
    for (let i = 0; i < 28; i++) {
        arr.push(i);
    }

    return arr
}