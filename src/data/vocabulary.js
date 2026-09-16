const VOCAB_RAW = `
stadium|경기장|대화문
line|노선|대화문
subway|지하철|대화문
get off|(말·차 등에서) 내리다|대화문
far|멀리|대화문
about|약, 대략|대화문
national|국가의|대화문
way|방법|대화문
straight|똑바로, 곧장|대화문
turn left|왼쪽으로 돌다, 좌회전하다|대화문
anyway|그런데, 어쨌든|대화문
fair|박람회|대화문
free|한가한, 시간이 있는|대화문
perfect|완벽한, 완전한|대화문
street|거리, 도로|본문
modern|현대의, 근대의|본문
form|형태, 방식|본문
colorful|형형색색의, (색이) 다채로운|본문
lively|활기찬, 생기 넘치는|본문
well-known|잘 알려진, 유명한|본문
artwork|예술 작품, 미술품|본문
poor|가난한|본문
worker|노동자, 근로자|본문
area|지역, 구역|본문
hip|세련된, 최신 유행에 밝은|본문
great|멋진; 큰, 상당한|본문
piece|작품; (미술·음악 등의 작품) 한 점|본문
artist|작가, 예술가|본문
be famous for ~|~로 유명하다|본문
line|선|본문
dot|점|본문
according to ~|~에 따르면, ~에 따라|본문
figure|인물, 모습|본문
represent|~을 나타내다, 상징하다|본문
past|과거|본문
present|현재|본문
future|미래|본문
closely|자세히|본문
clue|단서, 실마리|본문
internationally|국제적으로|본문
carry|~을 담다, 지니다|본문
social|사회의, 사회적인|본문
message|메시지|본문
example|예, 예시|본문
as|~다시피, ~듯이|본문
spray|(분무기 등으로) (액체)를 뿌리다, ~에 분무하다|본문
leafless|잎이 없는, 잎이 떨어진|본문
hold|~을 들다, 잡다, 쥐다|본문
sprayer|분무기, 살포기|본문
through|~을 통해서|본문
opinion|의견, 견해|본문
nature|자연|본문
take care of ~|~을 돌보다|본문
final|마지막의, 최종적인|본문
stop|방문지, 들르는 곳|본문
chew|(껌 등)을 씹다|본문
be known for ~|~로 알려져 있다|본문
drop|~을 떨어뜨리다|본문
personal|개인적인|본문
for example|예를 들면|본문
tiny|아주 작은|본문
pleasure|기쁨, 즐거움|본문
`

const DEFS_RAW = `
stadium|a large place with seats where people watch sports games|대화문
line|a route that buses, trains, or subways follow|대화문
subway|an underground train system in a city|대화문
get off|to leave a bus, train, plane, or other vehicle|대화문
far|at or to a long distance|대화문
national|relating to a whole country|대화문
way|a method for doing something|대화문
straight|directly forward, without turning|대화문
fair|an event where people show or sell things|대화문
free|not busy doing anything|대화문
perfect|as good as possible, with nothing wrong|대화문
street|a road in a city or town with buildings along it|본문
modern|relating to the present time or recent times|본문
form|a type or way in which something appears or is done|본문
colorful|having many different bright colors|본문
lively|full of energy and activity|본문
well-known|known by many people|본문
artwork|a painting, drawing, or other thing made by an artist|본문
poor|having little money|본문
worker|a person who does a job, especially one who works for a company or an organization|본문
area|a part of a place, town, country, or building|본문
hip|following the newest styles or ideas|본문
great|very good or enjoyable|본문
great|large in amount, size, or degree|본문
piece|a single work of art, music, or writing|본문
artist|a person who makes art, music, or other creative works|본문
line|a long thin mark on a surface|본문
dot|a very small round mark|본문
figure|a person or shape in a picture or story|본문
represent|to show or stand for something|본문
past|the time before now|본문
present|the time that is happening now|본문
future|the time after now|본문
clue|a piece of information that helps you find an answer|본문
carry|to have something as a quality, meaning, or message|본문
social|relating to society or people living together|본문
message|an idea or meaning that someone wants to tell others|본문
example|something that shows what a thing is like|본문
spray|to send out small drops of liquid over a surface|본문
leafless|having no leaves|본문
hold|to keep something in your hand or arms|본문
sprayer|a tool used for sending out liquid in small drops|본문
opinion|what someone thinks or believes about something|본문
nature|all the plants, animals, land, water, and other things not made by people|본문
final|coming at the end|본문
stop|a place where someone stops during a trip or tour|본문
chew|to keep pressing food or gum with your teeth|본문
drop|to let something fall by accident|본문
personal|belonging or relating to one person|본문
tiny|very small|본문
pleasure|a feeling of happiness or enjoyment|본문
`

function parseRows(raw, type) {
  return raw
    .trim()
    .split(/\r?\n/)
    .map((line, index) => {
      const [word, meaningOrDefinition, group] =
        line.trim().split('|')

      const isVocabulary = type === 'vocab'

      return {
        id: `${type}-${index + 1}`,

        // 원래 영어 단어
        word,

        // 시험지에 보여 줄 내용
        prompt: isVocabulary
          ? word
          : meaningOrDefinition,

        // 정답지에 보여 줄 내용
        answer: isVocabulary
          ? meaningOrDefinition
          : word,

        group,
        type,
      }
    })
}
export const vocabItems = parseRows(VOCAB_RAW, 'vocab')

export const definitionItems = parseRows(
  DEFS_RAW,
  'definition',
)
