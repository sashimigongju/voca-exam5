import { useState } from 'react'
import { days } from '../data/dayData'
import DayMenu from './DayMenu'
import WordList from './WordList'

function StudySection() {
  const [selectedDayId, setSelectedDayId] =
    useState('day-8')

  const selectedDay =
    days.find((day) => day.id === selectedDayId) ??
    days[0]

  return (
    <section
      className="study-section"
      aria-label="Day별 단어 학습"
    >
      <DayMenu
        days={days}
        selectedDayId={selectedDayId}
        onSelectDay={setSelectedDayId}
      />

      <WordList day={selectedDay} />
    </section>
  )
}

export default StudySection
