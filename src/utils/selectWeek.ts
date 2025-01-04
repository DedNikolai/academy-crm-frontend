import {Dayjs} from "dayjs"
import { shedule } from "../constants/app"

export function selectWeek(date: Dayjs | null) {
    return Array(shedule.daysPerWeek).fill(date?.toDate()).map((el, idx) =>
      new Date(el.setDate(el.getDate() - el.getDay() + idx + 1)))
}

