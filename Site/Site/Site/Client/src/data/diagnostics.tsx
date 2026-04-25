import type { ReactNode } from 'react'
import {
  IconBrain,
  IconCell,
  IconCT,
  IconHeart,
  IconLab,
  IconMRI,
  IconShield,
  IconUS,
} from '../components/Icons'

export type DiagnosticCategory = {
  key: string
  title: string
  description: string
  to: string
  icon: ReactNode
  variant?: 'default' | 'dark'
}

export const diagnosticCategories: DiagnosticCategory[] = [
  {
    key: 'mri',
    title: 'MRI diagnostics',
    description: 'High-field magnetics with motion-corrected sequences and rapid neuro-body protocols.',
    to: '/mri',
    icon: <IconMRI className="nx-icon-24" />,
  },
  {
    key: 'ct',
    title: 'CT diagnostics',
    description: 'Low-dose spectral acquisition with iodine mapping and vascular phase automation.',
    to: '/ct',
    icon: <IconCT className="nx-icon-24" />,
  },
  {
    key: 'us',
    title: 'Ultrasound imaging',
    description: 'Shear-wave elastography and 4D cardiac flows with sterile probe traceability.',
    to: '/ultrasound',
    icon: <IconUS className="nx-icon-24" />,
  },
  {
    key: 'lab',
    title: 'Laboratory tests',
    description: 'Pre-analytical robotics, cold-chain custody, and delta-check intelligence.',
    to: '/laboratory',
    icon: <IconLab className="nx-icon-24" />,
  },
  {
    key: 'cardio',
    title: 'Cardiology diagnostics',
    description: 'CMR-aligned stress testing and ambulatory rhythm fusion reporting.',
    to: '/diagnostics',
    icon: <IconHeart className="nx-icon-24" />,
  },
  {
    key: 'neuro',
    title: 'Neurological diagnostics',
    description: 'Quantitative tractography with fMRI paradigms and CSF biomarker panels.',
    to: '/diagnostics',
    icon: <IconBrain className="nx-icon-24" />,
  },
  {
    key: 'onco',
    title: 'Oncological screening',
    description: 'Whole-body MRI staging and circulating tumor DNA correlation modules.',
    to: '/diagnostics',
    icon: <IconCell className="nx-icon-24" />,
    variant: 'dark',
  },
  {
    key: 'prev',
    title: 'Preventive checkups',
    description: 'Modular executive health rails with predictive risk surfaces.',
    to: '/diagnostics',
    icon: <IconShield className="nx-icon-24" />,
    variant: 'dark',
  },
]
