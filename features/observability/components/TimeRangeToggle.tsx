'use client';

import { Segmented, type SegmentedOption } from '@/components/system';
import type { TimeRange } from '../types';

interface TimeRangeToggleProps {
  value: TimeRange;
  onChange: (value: TimeRange) => void;
}

const options: SegmentedOption<TimeRange>[] = [
  { value: 'week', label: '7 dias' },
  { value: 'month', label: '30 dias' },
];

export function TimeRangeToggle({ value, onChange }: TimeRangeToggleProps) {
  return (
    <Segmented
      options={options}
      value={value}
      onChange={onChange}
      aria-label="Período"
    />
  );
}
