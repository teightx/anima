import { z } from 'zod';
import type { DateISO, DateTimeISO, UUID, SeverityLevel } from './api';
import { SeverityLevelSchema } from './api';

// ============================================================================
// Daily Check-In
// ============================================================================

/**
 * DailyCheckIn represents the daily mood and symptom tracking entry.
 * Users complete this once per day to track their mental state.
 */

export const MoodScoreSchema = z.number().int().min(1).max(10);
export type MoodScore = z.infer<typeof MoodScoreSchema>;

export const EnergyScoreSchema = z.number().int().min(1).max(10);
export type EnergyScore = z.infer<typeof EnergyScoreSchema>;

export const DayOrganizationScoreSchema = z.number().int().min(1).max(10);
export type DayOrganizationScore = z.infer<typeof DayOrganizationScoreSchema>;

export const SleepQualitySchema = z.enum(['poor', 'fair', 'good', 'excellent']);
export type SleepQuality = z.infer<typeof SleepQualitySchema>;

export const SymptomEntrySchema = z.object({
  symptomId: z.string(),
  name: z.string(),
  severity: SeverityLevelSchema,
  notes: z.string().optional(),
});

export type SymptomEntry = z.infer<typeof SymptomEntrySchema>;

export const DailyCheckInSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),

  // Core metrics
  moodScore: MoodScoreSchema,
  energyScore: EnergyScoreSchema,
  dayOrganization: DayOrganizationScoreSchema.optional(),
  sleepQuality: SleepQualitySchema,
  sleepHours: z.number().min(0).max(24).optional(),

  // Symptoms
  symptoms: z.array(SymptomEntrySchema),

  // Context
  notes: z.string().max(2000).optional(),
  activities: z.array(z.string()).optional(),
  medicationsTaken: z.boolean().optional(),
});

export type DailyCheckIn = z.infer<typeof DailyCheckInSchema>;

// ============================================================================
// Check-In API Contracts
// ============================================================================

export interface GetCheckInRequest {
  userId: UUID;
  date: DateISO;
}

export interface GetCheckInResponse {
  checkIn: DailyCheckIn | null;
}

export interface ListCheckInsRequest {
  userId: UUID;
  startDate?: DateISO;
  endDate?: DateISO;
  page?: number;
  pageSize?: number;
}

export interface ListCheckInsResponse {
  checkIns: DailyCheckIn[];
  total: number;
}

export interface CreateCheckInRequest {
  userId: UUID;
  date: DateISO;
  moodScore: MoodScore;
  energyScore: EnergyScore;
  dayOrganization?: DayOrganizationScore;
  sleepQuality: SleepQuality;
  sleepHours?: number;
  symptoms?: SymptomEntry[];
  notes?: string;
  activities?: string[];
  medicationsTaken?: boolean;
}

export interface CreateCheckInResponse {
  checkIn: DailyCheckIn;
}

export interface UpdateCheckInRequest {
  checkInId: UUID;
  moodScore?: MoodScore;
  energyScore?: EnergyScore;
  dayOrganization?: DayOrganizationScore;
  sleepQuality?: SleepQuality;
  sleepHours?: number;
  symptoms?: SymptomEntry[];
  notes?: string;
  activities?: string[];
  medicationsTaken?: boolean;
}

export interface UpdateCheckInResponse {
  checkIn: DailyCheckIn;
}
