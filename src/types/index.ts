/**
 * @file Shared types and interfaces for Mission Pot
 */

export type Screen = 'ONBOARDING' | 'LOBBY' | 'PROOF' | 'RANKINGS';

export interface Habit {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  color: 'primary' | 'secondary' | 'tertiary';
}

export interface Stakeholder {
  id: string;
  name: string;
  avatar: string;
  status: 'VERIFIED' | 'PENDING' | 'FAILED';
  amount: number;
  label: string;
}

export interface Ranking {
  rank: string;
  name: string;
  avatar: string;
  successRate: string;
  amount: number;
  isUser?: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: string;
}
