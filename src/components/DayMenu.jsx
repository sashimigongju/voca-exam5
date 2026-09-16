function DayMenu({
  days,
  selectedDayId,
  onSelectDay,
}) {
  return (
    <nav
      className="day-menu"
      aria-label="학습 Day 선택"
    >
      <h2>학습 단위</h2>

      <ul className="day-list">
        {days.map((day) => {
          const isSelected =
            selectedDayId === day.id

          return (
            <li key={day.id}>
              <button
                type="button"
                className={
                  isSelected
                    ? 'day-button active'
                    : 'day-button'
                }
                onClick={() =>
                  onSelectDay(day.id)
                }
                aria-current={
                  isSelected ? 'page' : undefined
                }
              >
                {day.title}
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default DayMenu

