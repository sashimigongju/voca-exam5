import DayExamGenerator from './DayExamGenerator'
import suneungWordsData from '../../data/suneungWords.json'

function SuneungExamGenerator({ onBack }) {
  return (
    <DayExamGenerator
      onBack={onBack}
      data={suneungWordsData}
      title="수능 필수 단어"
    />
  )
}

export default SuneungExamGenerator