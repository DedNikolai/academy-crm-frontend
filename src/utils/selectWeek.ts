import dayjs, {Dayjs} from "dayjs"

export function selectWeek(date: Dayjs | null) {
    return Array(7).fill(date?.toDate()).map((el, idx) =>
      new Date(el.setDate(el.getDate() - el.getDay() + idx + 1)))
}

