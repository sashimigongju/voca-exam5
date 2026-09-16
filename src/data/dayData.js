const day8Words = [
  {
    id: 'day-8-1',
    word: 'anticipation',
  },
  {
    id: 'day-8-2',
    word: 'suffering',
  },
  {
    id: 'day-8-3',
    word: 'superficial',
  },
  {
    id: 'day-8-4',
    word: 'superiority',
  },
  {
    id: 'day-8-5',
    word: 'superb',
  },
  {
    id: 'day-8-6',
    word: 'advantageous',
  },
  {
    id: 'day-8-7',
    word: 'advance',
  },
  {
    id: 'day-8-8',
    word: 'antibody',
  },
]

export const days = Array.from(
  { length: 37 },
  (_, index) => {
    const dayNumber = index + 1

    return {
      id: `day-${dayNumber}`,
      title: `Day ${dayNumber}`,
      words: dayNumber === 8 ? day8Words : [],
    }
  },
)
