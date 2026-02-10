export type Club = {
  id: number;
  name: string;
  category: string;
};

export const CLUBS: Club[] = [
  { id: 1, name: 'DEPth', category: '준동아리' },
  { id: 2, name: '나이너스', category: '체육' },
  { id: 3, name: '통해', category: '연행예술' },
  { id: 4, name: '인액터스 ', category: '사회연구' },
  { id: 5, name: '디비전', category: '전시창작' },
  { id: 6, name: '씨네메이션', category: '전시창작' },
  { id: 7, name: '흑풍', category: '연행예술' },
  { id: 8, name: '포토랩', category: '전시창작' },
  { id: 9, name: '실로암', category: '종교' },
  { id: 10, name: '명지서법', category: '학술' },
  { id: 11, name: 'TIME', category: '학술' },
  { id: 12, name: '농어민후생연구회 흙', category: '사회연구' },
  { id: 13, name: '오버행', category: '체육' },
  { id: 14, name: '키비탄', category: '봉사' },
  { id: 15, name: '나라오르다', category: '준동아리' },
  { id: 16, name: '주리랑', category: '연행예술' },
  { id: 17, name: '화이트홀스', category: '연행예술' },
  { id: 18, name: '굴렁쇠', category: '준동아리' },
  { id: 19, name: '네비게이토', category: '준동아리' },
  { id: 20, name: 'UBF', category: '종교' },
  { id: 21, name: 'FC명지', category: '체육' },
  { id: 22, name: '콕콕콕', category: '체육' },
  { id: 23, name: 'PTPI', category: '봉사' },
  { id: 24, name: '무릉도원', category: '체육' },
  { id: 25, name: 'cow', category: '사회연구' },
  { id: 26, name: 'Cfm ', category: '종교' },
  { id: 27, name: 'RCY', category: '봉사' },
  { id: 28, name: 'MGH', category: '연행예술' },
  { id: 29, name: '그림패시만화', category: '전시창작' },
  { id: 30, name: '극예술연구회 알', category: '연행예술' },
  { id: 31, name: '너나들이', category: '봉사' },
  { id: 32, name: 'ccc', category: '종교' },
  { id: 33, name: 'MIRS', category: '학술' },
  { id: 34, name: '바다이야기', category: '체육' },
  { id: 35, name: '파인', category: '체육' },
  { id: 36, name: 'MJTA', category: '체육' },
  { id: 37, name: '비주얼', category: '사회연구' },
  { id: 38, name: '명지챌린저스', category: '사회연구' },
];

const CLUB_MAP = new Map(CLUBS.map((c) => [c.id, c]));

export function getClubById(id: number): Club | undefined {
  return CLUB_MAP.get(id);
}

export const CLUB_IDS = CLUBS.map((c) => c.id);

function createSeededRandom(seed: number) {
  return function next() {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffleWithRandom<T>(arr: T[], random: () => number): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

export function pickRandomClubIds(count: number, seed?: number): number[] {
  const random = seed !== undefined ? createSeededRandom(seed) : Math.random;
  const shuffled = shuffleWithRandom(CLUB_IDS, random);
  return shuffled.slice(0, count);
}
