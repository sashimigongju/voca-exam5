const VOCAB6_RAW = `
kind|종류|대화문
usually|보통, 대개|대화문
sci-fi|공상 과학의|대화문
novel|소설|대화문
recommend|~을 추천하다|대화문
soda|탄산음료|대화문
try|~을 해보다|대화문
give it a try|시도하다, 한번 해 보다|대화문
favorite|가장 좋아하는 것|대화문
strongly|강력하게|대화문
magazine|잡지|대화문
be interested in ~|~에 관심이 있다|대화문
teen|십대 청소년|대화문
find|~을 찾아내다|대화문
look for ~|~을 찾다|대화문
famous|유명한|대화문
essay|(학생이 과제로 쓰는) 보고서, 에세이|대화문
think about ~|~에 대해 생각하다|대화문
actor|배우|대화문
volunteer work|자원봉사 (활동)|대화문
especially|특별히|대화문
introduce|~을 소개하다|대화문
pianist|피아니스트|대화문
lose|~을 잃다|대화문
move|이사하다, 이주하다|대화문
touching|감동적인|대화문
foreigner|외국인|본문
February|2월|본문
special|특별한|본문
favor|부탁, 호의|본문
ask|~에게 부탁하다, ~을 요청하다|본문
gather|(사람들이) 모이다|본문
independence|(국가의) 독립|본문
take a picture|사진을 찍다|본문
event|(중요한) 사건, 사태|본문
share|(정보·비밀 등)을 공유하다|본문
outside|밖에(서)|본문
March|3월|본문
hide|숨다|본문
building|건물|본문
unbelievable|믿기 힘들 정도의|본문
hope|~이기를 바라다 [희망하다]|본문
learn about ~|~을 알게 되다|본문
through|~을 통해|본문
sound|~하게 들리다|본문
similar to ~|~와 비슷한|본문
real|실제의, 진짜의|본문
meaning|의미, 뜻|본문
Canadian|캐나다(사람)의|본문
first|처음으로, 최초로|본문
medicine|의학|본문
right away|즉시, 곧바로|본문
country|국가, 나라|본문
right|권리|본문
independent|(국가가) 독립한|본문
movement|(사회적·정치적) 운동|본문
shout|외치다, 소리치다|본문
park|공원|본문
camera|카메라|본문
article|(신문·잡지의) 기사|본문
historic|역사적인, 역사상 중요한|본문
foreign|외국의|본문
fight|투쟁, 분투하다|본문
even|~조차(도)|본문
continue|~을 계속하다|본문
terrible|끔찍한, 참혹한|본문
situation|상황|본문
under the watchful eye of ~|~의 감시 아래에서, ~가 주의 깊게 지켜보는 가운데|본문
return|돌아오다, 돌아가다|본문
invitation|초청, 초대|본문
government|정부|본문
rest|(어떤 것의) 나머지|본문
poor|가난한, 빈곤한|본문
die|죽다|본문
bury|~을 묻다, 매장하다|본문
national|국가의, 국립의|본문
cemetery|(공동) 묘지|본문
`

const DEFS6_RAW = `
kind|a group with similar characteristics, or a particular type|대화문
novel|a long written story in which the characters and events are usually imaginary|대화문
recommend|to tell somebody that something is good or useful|대화문
try|to do something to see what it is like|대화문
favorite|a person or thing that is best liked or most enjoyed|대화문
strongly|in a way that shows firm belief or great force|대화문
find|to discover something that you have been searching for|대화문
look for ~|to try to find something or someone|대화문
famous|known and recognized by many people|대화문
essay|a short piece of writing about a particular subject by a student as part of a course of study|대화문
think about ~|to have thoughts about someone or something|대화문
actor|someone who performs in a play or film|대화문
introduce|to tell someone about someone or something for the first time|대화문
lose|to no longer have something you once possessed|대화문
move|to go to a different place to live or work|대화문
touching|making you feel strong emotions, especially sympathy or sadness|대화문
foreigner|someone who comes from a different country|본문
special|not ordinary or usual, but different in some way and often better or more important|본문
favor|something that you ask someone to do for you, or something helpful that you do for someone|본문
ask|to make a request for help, advice, information, etc.|본문
gather|to come together and form a group|본문
independence|freedom from being governed or ruled by another country|본문
event|anything that happens, especially something important or unusual|본문
share|to tell other people about an idea, secret, problem, etc.|본문
hide|to go or stay in a place where no one will see or find you|본문
unbelievable|extremely surprising|본문
hope|to want something to happen or be true and to believe that it is possible or likely|본문
learn about ~|to get information or knowledge about something|본문
through|by means of a particular method, service, person, etc.|본문
real|actual and true, not invented|본문
meaning|the thing or idea that a word, expression, or sign represents|본문
first|for the first time|본문
medicine|the treatment and study of illnesses and injuries|본문
right|something that you are morally, legally, or officially allowed to do or have|본문
independent|not governed or controlled by another country|본문
movement|organized activities by a group of people to achieve a particular aim|본문
shout|to say something very loudly|본문
article|a piece of writing about a particular subject in a newspaper or magazine|본문
historic|important or likely to be important in history|본문
fight|the process of trying to achieve something or prevent something|본문
continue|to keep happening, existing, or doing something|본문
terrible|extremely bad or serious|본문
situation|the set of things that are happening and the conditions that exist at a particular time and place|본문
under the watchful eye of ~|being watched carefully by somebody|본문
return|to go or come back to a place where you were before|본문
invitation|the act of inviting someone to go somewhere or do something|본문
rest|the part of something that remains|본문
poor|having very little money and not many possessions|본문
die|to stop living and become dead|본문
bury|to put someone who has died in a grave|본문
cemetery|an area of land used for burying dead people|본문
`

function parseRows(raw, type, isVocabulary) {
  return raw
    .trim()
    .split(/\r?\n/)
    .map((line, index) => {
      const [word, prompt, group] =
        line.trim().split('|')

      return {
        id: `${type}-${index + 1}`,
        word,

        // 교과서 어휘: 영어 단어를 보여 줌
        // 영영풀이: 영영풀이를 보여 줌
        prompt: isVocabulary
          ? word
          : prompt,

        // 교과서 어휘: 한국어 뜻이 정답
        // 영영풀이: 영어 단어가 정답
        answer: isVocabulary
          ? prompt
          : word,

        group,
        type,
      }
    })
}

export const vocab6Items = parseRows(
  VOCAB6_RAW,
  'vocab6',
  true,
)

export const definition6Items = parseRows(
  DEFS6_RAW,
  'definition6',
  false,
)