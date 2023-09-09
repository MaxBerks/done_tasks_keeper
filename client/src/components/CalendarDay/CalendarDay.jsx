import React from "react"
import moment from "moment"
import "./CalendarDay.scss"
import { BsCheckCircleFill } from "react-icons/bs"
import classNames from "classnames"

export default function CalendarDay({ calendarDay, isActive, activeDay, taskList, onActive }) {
	const isToday =
		calendarDay.day.date() === moment().date() &&
		calendarDay.day.month() === moment().month() &&
		calendarDay.day.year() === moment().year()

	const isActiveThisMonth =
		isActive &&
		activeDay.day.date() === calendarDay.day.date() &&
		activeDay.day.month() === calendarDay.day.month() &&
		activeDay.day.year() === calendarDay.day.year()

	const dayClassName = classNames({
		calendar__day: true,
		today: isToday,
		active: isActiveThisMonth,
	})

	const choosedTasks = []
	taskList.forEach((item) => {
		if (item.isChoosed === true) {
			choosedTasks.push(item)
		}
	})

	const completedTasks = calendarDay.tasksToComplete.filter((el) => el.isCompleted)

	const isChoosedEqualCompleted = choosedTasks.every((item) => {
		if (choosedTasks.length === 0 || completedTasks.length === 0) return false
		else return completedTasks.filter((e) => e.label === item.label).length > 0
	})

	return (
		<div className={dayClassName} onClick={() => onActive(calendarDay)}>
			<p>{calendarDay.day.date()}</p>
			<BsCheckCircleFill
				className="day__dot"
				style={isChoosedEqualCompleted && choosedTasks.length > 0 ? { color: "#fff" } : {}}
			/>
		</div>
	)
}
