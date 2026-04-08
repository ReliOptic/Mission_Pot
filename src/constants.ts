import { Habit, Stakeholder, Ranking } from './types';

export const HABITS: Habit[] = [
  {
    id: '1',
    title: '밤 11시 전 취침',
    subtitle: '고성능 회복 루틴',
    icon: 'Moon',
    color: 'primary',
  },
  {
    id: '2',
    title: '매일 운동',
    subtitle: '운동 에너지 활성화',
    icon: 'Dumbbell',
    color: 'secondary',
  },
  {
    id: '3',
    title: '매일 학습',
    subtitle: '지적 자산 축적',
    icon: 'BookOpen',
    color: 'tertiary',
  },
];

export const STAKEHOLDERS: Stakeholder[] = [
  {
    id: '1',
    name: '알렉스 리베라',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAeq0cXWj6xf_jOu_6jd84MDfG7iGQffc4dLbIgLe-zT874z5RZluWT-_2JE9EX6dWbNUwwJtuOcgMyp3_36DAN21vnV3UHt54hCOnRnOmOKzNssu5Yc3Ac4SUZeNmatyaEL1AJSAYqT01ZrTo_zlimMFFD0LwNPHkBytsq82Ljf8sABlR0LjrKK5mcvJfyhyzZguFb9fw5A4UsD1jx8_JB5_606JLTvSOxp1I0DI_Qgnom8K_oz-ECZCKokQz9jyDk4mCeTNZoKAff',
    status: 'VERIFIED',
    amount: 45,
    label: '오늘의 수익',
  },
  {
    id: '2',
    name: '사라 첸',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDO_yXShvReDBdOyvsEwhOH4OjJjLd440lHcQipMqJxdUR5WM2Tuh_JqXVvTs55HK3UJe1RlJzhhBqoMxPO7fRfPWGuvIno8iy_gjUDI8vlTFqqpo86JcU7k-PWTkcOQy2iPxYYa-VKRdRBH2Hu3zPjTdsJA4pYppMp0PuPSgQuBBBPDy5h6Xm74ZVpOCHLM3jAsvMzzr8-WaNeuJzUKvjB7ulJx51w30FXK6_qHMrWmnonUoZ8_iTjceGCFcx3i8_JhD14sBTfW4R9',
    status: 'PENDING',
    amount: -20,
    label: '손실 위험',
  },
  {
    id: '3',
    name: '마커스 쏜',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCZcQSxQY1LpuO9w12x3h1gEvzs0MeR-AMC-z20GKvQ7udk9C4JyyO5wCn9JxCytzsmq8h733V2ow4ZJElMiBwtgl8lbQaac9lCNSUTLAIcwDTVhZwGyk9pd98vk-Q7F-1452t2qaNJRgl7QbMinwFyg1HDYEdUlD7HE620l4AWYGsHrNTzHStkjsT8MRTL6GOmcPGWy_V_C3H2sZmJRogyMzTSi4kclKA4lUPngQzMFyLyauYJtcMJe7jg7hG_VsvyGR47lT5zC0s5',
    status: 'FAILED',
    amount: -50,
    label: '벌금 부과',
  },
];

export const RANKINGS: Ranking[] = [
  {
    rank: '02',
    name: 'MARCUS.V',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB_z0bfIcrj_g1a0u7fvjL8o4NmEoP_AWVG4GMNAK6XtG0wqBLurw0t5IeBzfpWiCruDttO1Qbh4XtJNxttvE5QhxCXAVftreeOD-nSQ47Uk3-hDf0DZghO6gQAOOc3y32ZJzzQdi8FDlReRS1M5lwvApz377Wp0-XEgq1ofmCRNA2_3a5YkmonBdBVbdzjo3bVct6U5XFG9epx-ghiU0Jus4PAfccgm-QiBo8vkHc4FLW8_L8YjQXkwxRqce5g40e8vmlnJfY61AdU',
    successRate: '98% 성공률',
    amount: 312,
  },
  {
    rank: '03',
    name: 'SARAH_CORE',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAJX_8giyOeuGeP3-SBdjd5-Je9ppkqEkalO6GK1uGHC8jR-HHCLe5WoeDAZV0AuTA-JR5nAruPvchtNoZYzjaX_VNjLui3W5_pOnBeYrSWSqACTQ0hVrvyhS4_0x2CPF3_B2wwaA3LPCM7U_ybwUtVDhJLvet8Y5iB1WUX4XiT7cHHeqlUZia5nKrrkpMn063j-_xwqu4V6RAMUvpdm53I5bmafZlP2V0cZ0zQuOLJKWEaQPQmrxBWcnw47FUVILjDokoNxUwSbnpn',
    successRate: '95% 성공률',
    amount: 245,
  },
  {
    rank: '12',
    name: 'STAKE_MASTER',
    avatar: '',
    successRate: '72% 성공률',
    amount: -12,
    isUser: true,
  },
];
