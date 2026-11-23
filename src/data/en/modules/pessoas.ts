import type { Module } from '../../types';
import { k, ch, ag, ml, rows, pie, MONTHS_EN as MONTHS, spark } from '../../gen';
import { PEOPLE_BY_SITE } from '../facts';

export const pessoas: Module = {
  slug: 'pessoas', name: 'People', short: 'People', icon: 'Users', color: '#7A5600', group: 'funcoes',
  tagline: '912 employees in Portugal, Czechia and Spain · shifts, safety, talent and training',
  owner: 'Isabel Moura — People Director',
  sources: ['SAP SuccessFactors', 'Time and attendance and shift system', 'Safety register (H&S)', 'Cerealis Academy · LMS', 'Engagement survey'],
  sections: [
    {
      id: 'forca', label: 'Workforce', icon: 'Users', blocks: [
        { t: 'kpis', items: [
          k('Employees', '912', '+142 with Pasta VB3', true, true, spark(61, 760, 10, 0.2)),
          k('Voluntary turnover (12 months)', '7.9%', '−1.2 pp YoY', false, true),
          k('Average age', '44.6 years', '31% over 55', true, false),
          k('Women in leadership roles', '34%', '+4 pp YoY', true, true),
        ] },
        ch('pe1', 'Employees by site', 'October 2026', 'hbar', ['Employees'],
          PEOPLE_BY_SITE.map(([m, v]) => ({ m, Employees: v })),
          'Maia accounts for 40% of our people (plants, logistics hub and headquarters).',
          '26 hires needed in 2027 to replace retirements in Maia and Lisbon.',
          'Open the 2nd intake of the Operator Academy with IEFP and the Maia vocational school.'),
        ch('pe2', 'Employees by function', '% of total', 'pie', ['v'],
          pie([['Production', 54], ['Logistics and warehouse', 14], ['Maintenance', 9], ['Quality and laboratory', 6], ['Sales and marketing', 9], ['Corporate services', 8]]),
          'Maintenance has the biggest talent shortage: 3 vacancies open for more than 60 days.',
          'Order automation frees up 6 people in Customer Service for commercial roles.',
          'Reskill 2 order-processing staff as technical support for bakeries.', { ratio: true }),
        { t: 'heat', title: 'Retirement pyramid by site (no. of people turning 60+ in the next 5 years)', sub: 'Critical roles', span: true, good: 'low',
          rows: ['Maia', 'Lisbon', 'Porto', 'Trofa', 'Litovel', 'Venta de Baños'], cols: ['Millers', 'Pasta operators', 'Maintenance', 'Quality', 'Logistics'],
          values: [[2, 21, 7, 2, 9], [6, 0, 5, 1, 6], [4, 0, 2, 1, 2], [0, 6, 2, 1, 3], [0, 12, 4, 1, 4], [0, 9, 3, 1, 5]] },
      ],
    },
    {
      id: 'turnos', label: 'Shifts & absenteeism', icon: 'CalendarClock', blocks: [
        { t: 'kpis', items: [
          k('Absenteeism', '4.1%', '−0.6 pp YoY', false, true, spark(62, 4.7, 0.2, -0.12)),
          k('Overtime (YTD)', '41,300 h', '−18% YoY', false, true),
          k('Shifts covered without overtime', '94%', '+7 pp YoY', true, true),
          k('Absenteeism forecast accuracy', '89%', '7 days ahead', true, true),
        ] },
        ch('pe3', 'Absenteeism by site (%)', 'Last 12 months', 'line', ['Maia', 'Lisbon', 'Litovel', 'Venta de Baños'],
          rows(MONTHS, { Maia: [4.9, 5.4, 5.8, 5.1, 4.6, 4.3, 4.1, 4.4, 4.0, 3.8, 4.1, 4.2], Lisbon: [4.1, 4.6, 5.0, 4.4, 4.0, 3.7, 3.6, 3.9, 3.5, 3.4, 3.6, 3.7], Litovel: [4.4, 5.1, 5.6, 4.9, 4.2, 3.9, 3.7, 3.8, 3.6, 3.5, 3.8, 3.9], 'Venta de Baños': [null, null, null, null, null, 5.6, 5.3, 5.5, 5.0, 4.9, 5.2, 5.1] }),
          'The winter peak (December–January) repeats every year; Venta de Baños is 1 pp above the group.',
          'Cortex forecasts 5.6% absenteeism in Maia in December (seasonal flu).',
          'Plan 9 multi-skilled standby operators for the Maia lines in December.', { ratio: true, model: 'Absenteeism forecast by shift · 89% accuracy' }),
        { t: 'agents', items: [
          ag('ag-turno', 'Shift reinforcement from absenteeism forecast', 'humano', 'Forecast absenteeism > 6% on a critical shift', '−320 h of overtime/month in Maia', [
            ['Signal', 'Forecast of 4 absences on the Monday night shift at Maia II (line L3).'],
            ['Diagnosis', 'Dryer station with only 2 certified operators.'],
            ['Recommendation', 'Move 1 multi-skilled operator from L4 and bring forward 1 dryer training session.'],
            ['Human approval', 'Confirmation by the shift supervisor.'],
            ['Action', 'Roster updated in the shift system and notification sent to the operators.'],
          ], { approver: 'Ana Rita Moreira — Shift Supervisor, Maia II', domain: 'People', last: 'today 10:15' }),
        ] },
        { t: 'heat', title: 'Multi-skilling by line (certified operators per station)', sub: 'Maia and Trofa · target: 3 per station', span: true, good: 'high',
          rows: ['Maia I · L1', 'Maia I · L2', 'Maia II · L3', 'Maia II · L4', 'Trofa · extrusion', 'Maia · biscuits'], cols: ['Press', 'Dies', 'Dryer', 'Packing', 'Palletising', 'In-line quality'],
          values: [[4, 3, 3, 5, 4, 2], [3, 3, 2, 4, 4, 2], [3, 2, 2, 4, 3, 2], [4, 3, 3, 5, 4, 3], [2, 0, 3, 4, 3, 2], [3, 0, 2, 5, 4, 2]] },
      ],
    },
    {
      id: 'seguranca', label: 'Health & safety', icon: 'HardHat', blocks: [
        { t: 'kpis', items: [
          k('Injury frequency rate (TF)', '9.8', '−22% YoY', false, true, spark(63, 12.6, 0.6, -0.22)),
          k('Injury severity rate (TG)', '0.21', '−0.06 YoY', false, true),
          k('Near misses reported (YTD)', '1,214', '+41% (reporting culture)', true, true),
          k('Days without lost-time accidents · Trofa', '412', 'group record', true, true),
        ] },
        ch('pe4', 'Lost-time accidents and near misses', 'Group · by month', 'combo', ['Lost-time accidents', 'Near misses'],
          rows(MONTHS, { 'Lost-time accidents': [3, 2, 3, 2, 2, 3, 1, 2, 1, 2, 1, 1], 'Near misses': [74, 81, 88, 92, 98, 104, 110, 115, 118, 121, 126, 131] }),
          'More near misses reported and fewer accidents: the photo reporting app has tripled participation.',
          'Highest accident risk forecast for December (production peak and night work).',
          'Step up safety walks on the Maia night shifts in December.', { model: 'Accident risk by shift and area' }),
        ch('pe5', 'Near misses by type (YTD)', 'Classified by Cortex from free-text reports', 'hbar', ['Occurrences'],
          [{ m: 'Forklifts and pedestrians', Occurrences: 312 }, { m: 'Slips (flour on the floor)', Occurrences: 248 }, { m: 'Moving machinery', Occurrences: 191 }, { m: 'Manual handling of sacks', Occurrences: 176 }, { m: 'Working at height (silos)', Occurrences: 104 }, { m: 'Other', Occurrences: 183 }],
          'Forklifts and pedestrians remain the main risk, concentrated at the Maia hub between 06:00 and 08:00.',
          'Proximity sensors on forklifts could cut these incidents by 40%.',
          'Install proximity sensors on the 14 hub forklifts (€46k).', { ratio: true }),
      ],
    },
    {
      id: 'talento', label: 'Talent & training', icon: 'GraduationCap', blocks: [
        { t: 'kpis', items: [
          k('Training hours per person', '21 h', '+6 h YoY', true, true),
          k('Open vacancies', '14', 'maintenance, shift, production', true, false),
          k('Average time to hire', '38 days', '−9 days YoY', false, true),
          k('Engagement score', '7.6/10', '+0.4 YoY', true, true),
        ] },
        { t: 'funnel', title: 'Recruitment · Maintenance Technician (Maia)', sub: 'Applications via website, LinkedIn and Net-Empregos', stages: [
          ['Applications', 186, 'screened by Cortex'], ['Shortlisted', 41, '22%'], ['Technical interview', 17, '41%'], ['Offer', 4, '24%'], ['Hired', 3, '75% acceptance']] },
        ch('pe6', 'Engagement by Cerealis value (0–10)', 'October survey · 81% response rate', 'bar', ['2025', '2026'],
          [{ m: 'Speak Up', '2025': 6.8, '2026': 7.3 }, { m: 'Own It', '2025': 7.4, '2026': 7.8 }, { m: 'Learn Forever', '2025': 7.0, '2026': 7.7 }, { m: 'Strive for Greatness', '2025': 7.1, '2026': 7.5 }],
          'Learn Forever saw the biggest rise (+0.7) thanks to the Cerealis Academy and the Technical Centre.',
          'Speak Up is the lowest-scoring value in Venta de Baños (6.4) — cultural integration under way.',
          'Cerealis ambassador programme in Venta de Baños in Q1.', { ratio: true }),
        { t: 'table', title: 'Open vacancies', sub: 'Published at cerealis.pt/carreiras', span: true, status: ['Status'],
          columns: ['Vacancy', 'Site', 'Open for', 'Candidates', 'Status'],
          rows: [
            { Vacancy: 'Maintenance Technician (M/F/D)', Site: 'Maia', 'Open for': '62 days', Candidates: 186, Status: 'Offer sent' },
            { Vacancy: 'Shift Supervisor (M/F/D)', Site: 'Maia', 'Open for': '28 days', Candidates: 73, Status: 'Interviews' },
            { Vacancy: 'Production Operator (M/F/D)', Site: 'Lisbon', 'Open for': '19 days', Candidates: 112, Status: 'Screening' },
            { Vacancy: 'Production Operator (M/F/D)', Site: 'Maia · Trofa', 'Open for': '14 days', Candidates: 148, Status: 'Screening' },
            { Vacancy: 'Graduate Traineeship (M/F/D)', Site: 'Lisbon · Maia · Porto', 'Open for': '33 days', Candidates: 264, Status: 'Interviews' },
          ] },
        { t: 'models', items: [
          ml('Absenteeism forecast by shift', 'Snowflake ML FORECAST', 'Accuracy 89% at 7 days', 'history, flu season, roster, overtime, weather', 'People', 'Produção', 'Estável', 'Nov 26'),
          ml('Application screening', 'Cortex AI_COMPLETE with auditable criteria', '−70% screening time', 'CV, vacancy requirements (no sensitive data)', 'People', 'Piloto', 'Estável', 'Sep 26'),
          ml('Accident risk by shift and area', 'Classification · gradient boosting', 'AUC 0.79', 'near misses, overtime, workload, rotation, temperature', 'H&S', 'Piloto', 'Estável', 'Oct 26'),
        ] },
      ],
    },
  ],
  questions: [
    { q: 'How many people do we have and where?', a: '**912 employees**: 618 in Portugal (Maia 312, Headquarters 50, Lisbon 118, Trofa 96, Porto 42), **152 in Litovel** and **142 in Venta de Baños**. 54% work in production.' },
    { q: 'How are we doing on safety?', a: 'The injury frequency rate fell **22% (TF 9.8)** and there was only 1 lost-time accident in October. Reported near misses rose 41% — a sign of a reporting culture. Trofa has gone **412 days without a lost-time accident**. Main risk: forklifts and pedestrians at the Maia hub.' },
    { q: 'What retirement risk do we face?', a: 'Over the next 5 years, **31% of our people** will pass 55. The critical points are the **21 pasta operators in Maia** and the **millers in Lisbon (6)**. Cortex recommends a 2nd intake of the Operator Academy and mentoring by the senior millers.' },
    { q: 'What is the absenteeism forecast for December?', a: 'The model forecasts **5.6% in Maia** in December (seasonal flu and production peak). It recommends **9 multi-skilled standby operators** and bringing forward dryer training at Maia II, where some stations have only 2 certified operators.' },
  ],
};
