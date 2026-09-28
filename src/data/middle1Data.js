const VOCAB5_RAW = `must|~해야 한다|대화문
may|~해도 되다|대화문
on the phone|전화로|대화문
terribly|몹시, 대단히|대화문
turn ~ off|~을 끄다|대화문
text|문자를 보내다|대화문
touch|만지다|대화문
golden|황금빛의|대화문
anything|아무것도|대화문
run|달리다|대화문
sign|표지판|대화문
inside|~안에; 안으로|대화문
take|가지고 가다|대화문
bring|가져오다|대화문
only|오직|대화문
bottled|병에 담은|대화문
sunflower|해바라기|대화문
favorite|가장 좋아하는|대화문
painting|그림|대화문
take a picture|사진을 찍다|대화문
flash|(카메라) 플래시|대화문
a little|조금|대화문
use|사용하다|대화문
damage|훼손하다|대화문
move on to ~|~로 옮기다|대화문
someone|누군가|본문
throw|던지다|본문
eyewitness|목격자|본문
following|다음, 아래|본문
find|발견하다, 찾다|본문
criminal|범인, 범죄자|본문
visitor|방문객|본문
turn around|뒤돌아보다|본문
see|보다|본문
old|나이가 많은|본문
stand|서 있다|본문
in front of ~|~ 앞에|본문
wheelchair|휠체어|본문
about|대략, -쯤; ~에 대해|본문
tall|키가 큰; 키가 ~인|본문
than|~보다|본문
janitor|청소부, 관리인|본문
gray|회색의; 회색|본문
run away|도망가다|본문
fall off ~|~에서 떨어지다|본문
wig|가발|본문
run after ~|~을 뒤쫓다|본문
catch|(누군가를) 붙잡다|본문
fast|빠른|본문
in fact|사실은|본문
young|젊은, 어린|본문
long|(길이가) 긴|본문
brown|갈색의; 갈색|본문
guard|경비원|본문
crime|범죄|본문
scene|(특히 좋지 못한 일이 일어난) 현장|본문
piece|조각|본문
all over|곳곳에|본문
near|~에서 가까이|본문
next to ~|~ 옆에|본문
bakery|빵집|본문
owner|주인|본문
come in|들어오다|본문
speak|말하다|본문
Spanish|스페인어|본문
understand|이해하다|본문
a lot of|많은|본문
different|다양한|본문
want|원하다|본문
small|(크기 등이) 작은|본문
sell|팔다|본문
remember|기억하다|본문
clearly|명확하게|본문
information|정보|본문
suspect|용의자|본문
height|키|본문
language|언어|본문
green|초록색|본문
short|(길이·거리가) 짧은|본문`;

const DEFS5_RAW = `turn ~ off|to stop the flow of electricity, gas, water, etc. by moving a switch, button, etc.|대화문
touch|to put your hand or another part of your body onto somebody or something|대화문
sign|a piece of paper, metal, or wood with words or pictures that give information or warnings to people|대화문
bring|to come with something or someone to a place|대화문
bottled|contained, stored, or sold in bottles|대화문
damage|to have a bad or harmful effect on something or somebody|대화문
throw|to send something from your hand through the air by moving your hand or arm quickly|본문
eyewitness|a person who saw a crime or an accident|본문
criminal|a person who breaks the law by doing something wrong, like stealing, or hurting others|본문
visitor|someone who is visiting a person or place|본문
wheelchair|a special chair with wheels for people who can't walk|본문
janitor|a person who cleans and takes care of a building|본문
run away|to leave somebody or a place secretly and suddenly|본문
fall off ~|to drop to the ground from a high object|본문
wig|artificial hair that you wear on your head|본문
run after ~|to chase someone or something that is moving away from you|본문
catch|to capture someone or something after chasing them|본문
fast|able to move quickly|본문
guard|a person who protects a person or place from danger or attack|본문
crime|an action that the law does not allow|본문
scene|the place where something happens, especially something bad|본문
bakery|a shop that sells bread, cakes, etc.|본문
owner|someone who owns something|본문
speak|to talk to someone about something|본문
sell|to give something to someone in exchange for money|본문
remember|to bring something to mind or think of it again|본문
information|facts about a situation, person, event, etc.|본문
suspect|a person who may commit a crime|본문
height|the length of a person or thing from the bottom to the top|본문
language|the system of communication in speech and writing that people of a particular country or area use|본문`;

const VOCAB6_RAW = `air conditioner|에어컨|대화문
right away|즉시, 곧바로|대화문
single-use|일회용의|대화문
forget|~을 잊다|대화문
turn ~ off|~을 끄다, 잠그다|대화문
forgetful|잘 잊는|대화문
carry|운반하다|대화문
else|다른, 그 밖의|대화문
favor|부탁, 청, 호의|대화문
fix|고치다|대화문
plog|플로깅하다|대화문
member|회원, 구성원|대화문
mean|의미하다|대화문
pick ~ up|~을 줍다|대화문
at the same time|동시에|대화문
interested|관심이 있는, 흥미를 가진|대화문
by the way|그런데|대화문
zero|0의, 제로의|본문
waste|쓰레기|본문
earth|지구|본문
challenge|도전|본문
produce|생산하다|본문
lots of|많은|본문
sick|아픈, 병든|본문
save|구하다|본문
join|참여하다|본문
share|공유하다|본문
story|이야기|본문
reduce|줄이다|본문
birthday|생일|본문
eat out|외식하다|본문
leftover|남은 음식|본문
bring|가져오다|본문
out of ~|~로, ~를 이용해서|본문
make A out of B|B로 A를 만들다|본문
find|찾다|본문
on the Internet|인터넷으로|본문
FYI(For Your Information)|참고로|본문
reuse|재사용하다|본문
tear|찢다|본문
think|생각하다|본문
learn|배우다|본문
important|중요한|본문
living|생활|본문
decide|결심하다, 결정하다|본문
fix|고치다, 수선하다|본문
be good at ~|~을 잘하다|본문
sew|바느질하다|본문
look|~처럼 보이다|본문
perfect|완벽한|본문
guess|추측하다|본문
right|괜찮은, 좋은|본문
single-use|일회용의|본문
plastic|플라스틱|본문
often|종종|본문
delivery|배달|본문
instead|대신에|본문
favorite|가장 좋아하는|본문
restaurant|식당, 레스토랑|본문
reusable|재사용할 수 있는|본문
container|용기, 그릇|본문
pick ~ up|~을 찾아오다|본문
hear|~라는 것을 듣다|본문
never|결코[한 번도] ~않다|본문
go away|없어지다|본문
completely|완전히|본문
feel|~한 기분이 들다|본문
recycle|재활용하다|본문
take A to B|A를 B로 데려가다|본문
glass|유리|본문
bottle|병|본문
machine|기계|본문
near|~ 근처에, ~ 가까이에|본문
put A into B|A를 B에 넣다|본문
one by one|하나씩, 차례로|본문
in return|대가로, 답례로|본문
like|~처럼, ~와 같이|본문
cool|멋있는|본문`;

const DEFS6_RAW = `forget|to not remember something, especially because your mind is not thinking about it at the moment|대화문
forgetful|often unable to remember things|대화문
carry|to take something from one place to another|대화문
favor|something you do to help someone|대화문
fix|to make something broken work again|대화문
plog|to jog while picking up trash from the ground in order to help the environment|대화문
mean|to have a particular meaning; to show or explain something|대화문
zero|showing no amount or none of something; having a value of 0|본문
waste|things that you throw away because you don't need them|본문
challenge|a difficult task or problem that you try to do|본문
produce|to make or grow something|본문
save|to keep someone or something safe|본문
share|to let someone else have or use part of something that is yours|본문
reduce|to make something smaller in number or amount|본문
eat out|to have a meal at a restaurant instead of at home|본문
leftover|food that remains after a meal and is saved to eat later|본문
reuse|to use something again|본문
tear|to pull something into pieces|본문
decide|to make a choice about something after thinking carefully|본문
sew|to join pieces of cloth with a needle and thread|본문
delivery|the act of bringing goods to a place|본문
instead|in place of something or someone else; as another option|본문
reusable|something that can be used again|본문
container|something that holds things inside|본문
completely|in every way|본문
recycle|to make something new from something that was used before|본문
go away|to disappear or stop being present|본문
recycle|to change old things so they can be used again|본문
machine|a piece of equipment with moving parts that does work|본문
one by one|separately one after the other|본문
in return|as a response, exchange, or reward for something|본문`

function parseRows(raw, type, lesson) {
  const lines = raw
    .trim()
    .split(/\r?\n/)
    .filter((line) => line.trim() !== '')

  return lines.map((line, index) => {
    const parts = line.split('|')

    const word = (parts[0] || '').trim()
    const prompt = (parts[1] || '').trim()
    const group = (parts[2] || '').trim()

    return {
      id: `middle1-${lesson}-${type}-${index + 1}`,
      lesson: String(lesson),
      kind: type,
      word,
      prompt,
      group,
    }
  })
}

const middle1Data = {
  '5': {
    vocab: parseRows(VOCAB5_RAW, 'vocab', 5),
    defs: parseRows(DEFS5_RAW, 'defs', 5),
  },

  '6': {
    vocab: parseRows(VOCAB6_RAW, 'vocab', 6),
    defs: parseRows(DEFS6_RAW, 'defs', 6),
  },
}

export default middle1Data

