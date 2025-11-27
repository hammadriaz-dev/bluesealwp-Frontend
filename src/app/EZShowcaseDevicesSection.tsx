'use client'

import React, { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Smartphone, Monitor, TerminalSquare, Bot, ChevronRight, Building, Shield, Zap, Thermometer } from 'lucide-react'

/** ---------- Updated types and stages for Blue Seal ---------- **/
type DeviceStageEZ = 'mobile' | 'desktop' | 'technical' | 'industrial'
const DEVICE_STAGES_EZ: DeviceStageEZ[] = ['mobile', 'desktop', 'technical', 'industrial']
const EASE_EZ = [0.16, 1, 0.3, 1] as const

const fadeSlideEZ = {
  initial: { opacity: 0, y: 24, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: EASE_EZ } },
  exit: { opacity: 0, y: -24, scale: 0.98, transition: { duration: 0.4, ease: EASE_EZ } },
}

const badgeEZ =
  'inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-white/80 text-slate-800 ring-1 ring-white/60 backdrop-blur'

const frameBaseEZ =
  'relative rounded-[22px] bg-white/95 ring-1 ring-gray-200 shadow-[0_10px_40px_-10px_rgba(0,112,243,0.25)] overflow-hidden'

/** 
 * Updated Blue Seal showcase section
 */
export function EZShowcaseDevicesSection() {
  const [ezIndex, setEzIndex] = useState(0)
  const ezStage: DeviceStageEZ = useMemo(
    () => DEVICE_STAGES_EZ[ezIndex % DEVICE_STAGES_EZ.length],
    [ezIndex]
  )

  // Auto-advance stages - 3s each for better readability
  useEffect(() => {
    const t = setTimeout(() => setEzIndex((i) => i + 1), 3000)
    return () => clearTimeout(t)
  }, [ezIndex])

  return (
    <section className="relative overflow-hidden py-24 bg-gradient-to-br from-slate-50 via-blue-50/20 to-emerald-50/30">
      {/* Updated Background - construction/industrial theme */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-[-25%] blur-3xl opacity-[0.55]"
          style={{
            background:
              'radial-gradient(30% 40% at 15% 25%, rgba(0,112,243,0.26) 0%, transparent 60%),' +
              'radial-gradient(28% 36% at 85% 20%, rgba(16,185,129,0.24) 0%, transparent 60%),' +
              'radial-gradient(32% 38% at 50% 90%, rgba(14,165,233,0.20) 0%, transparent 60%)',
            animation: 'ezsmoke 28s ease-in-out infinite',
          }}
        />
        <div
          className="absolute -inset-x-1/4 top-1/2 -translate-y-1/2 h-[900px] opacity-[0.32] mix-blend-multiply"
          style={{
            background:
              'conic-gradient(from 0deg at 50% 50%, rgba(0,112,243,0.20), rgba(16,185,129,0.18), rgba(14,165,233,0.18), rgba(0,112,243,0.20))',
            filter: 'blur(90px)',
            animation: 'ezsweep 22s linear infinite',
          }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,112,243,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(0,112,243,0.06)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_85%_60%_at_50%_50%,black,transparent)]" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        {/* Updated Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className={badgeEZ}>
            <span className="inline-block h-2 w-2 rounded-full bg-gradient-to-r from-blue-500 to-emerald-500" />
            Advanced Technology Solutions
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl font-bold text-slate-900">
            Smart Systems - <span className="bg-gradient-to-r from-blue-600 via-sky-600 to-emerald-600 bg-clip-text text-transparent">Every Project</span>
          </h2>
          <p className="mt-3 text-slate-600 max-w-2xl mx-auto">
            From mobile site supervision to industrial monitoring - we deliver cutting-edge solutions for waterproofing, insulation, and protective coatings.
          </p>
        </motion.div>

        {/* Stage indicator */}
        <div className="mb-6 flex items-center justify-center gap-2">
          {DEVICE_STAGES_EZ.map((s, i) => (
            <div
              key={s}
              className={[
                'h-1.5 rounded-full transition-all duration-300',
                i === ezIndex % DEVICE_STAGES_EZ.length ? 'w-10 bg-blue-600' : 'w-4 bg-slate-300',
              ].join(' ')}
            />
          ))}
        </div>

        {/* Scene */}
        <div className="relative">
          {/* Updated glow ring */}
          <div className="absolute left-1/2 top-1/2 -z-10 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-blue-500/15 via-sky-500/15 to-emerald-500/15 blur-3xl" />

          <AnimatePresence mode="wait">
            {ezStage === 'mobile' && (
              <motion.div key="ez-mobile" className="flex items-center justify-center" {...fadeSlideEZ}>
                <EZMobileFrame />
              </motion.div>
            )}

            {ezStage === 'desktop' && (
              <motion.div key="ez-desktop" className="flex items-center justify-center" {...fadeSlideEZ}>
                <EZDesktopFrame />
              </motion.div>
            )}

            {ezStage === 'technical' && (
              <motion.div key="ez-technical" className="flex items-center justify-center" {...fadeSlideEZ}>
                <EZTechnicalTab />
              </motion.div>
            )}

            {ezStage === 'industrial' && (
              <motion.div key="ez-industrial" className="flex items-center justify-center" {...fadeSlideEZ}>
                <EZIndustrialInterface />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Local CSS keyframes with unique names */}
      <style jsx>{`
        @keyframes ezsmoke {
          0% { transform: translate3d(0,0,0) scale(1); opacity: 0.55; }
          50% { transform: translate3d(0,-22px,0) scale(1.03); opacity: 0.75; }
          100% { transform: translate3d(0,0,0) scale(1); opacity: 0.55; }
        }
        @keyframes ezsweep {
          0% { transform: translateX(-16%); }
          50% { transform: translateX(16%); }
          100% { transform: translateX(-16%); }
        }
      `}</style>
    </section>
  )
}

/* ---------- Updated Device Frames for Blue Seal ---------- */

function EZMobileFrame() {
  return (
    <motion.div
      className={`${frameBaseEZ} w-[310px]`}
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      aria-label="Site supervision mobile app"
    >
      {/* Notch */}
      <div className="absolute inset-x-24 -top-2 h-6 rounded-b-2xl bg-black/80" />
      {/* Gradient cap */}
      <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-blue-600 via-sky-600 to-emerald-600" />
      <div className="p-5">
        <div className="flex items-center gap-2 text-slate-800 mb-3">
          <Smartphone className="h-4 w-4 text-blue-600" />
          <span className="text-xs font-semibold bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">Site Supervisor</span>
        </div>
        <h3 className="text-lg font-bold text-slate-900">Real-time Site Monitoring</h3>
        <p className="text-sm text-slate-600 mt-1">
          Track project progress, material usage, and team activities from anywhere.
        </p>

        <div className="mt-4 space-y-3">
          <div className="rounded-xl p-3 ring-1 ring-slate-200 bg-white/90 flex items-center justify-between">
            <div className="text-sm font-semibold text-slate-800">Daily Report</div>
            <button className="text-xs font-semibold text-white px-3 py-1 rounded-lg bg-gradient-to-r from-blue-600 to-sky-600 hover:opacity-90">
              Submit <ChevronRight className="inline-block h-3 w-3 -mr-1" />
            </button>
          </div>
          <div className="rounded-xl p-3 ring-1 ring-slate-200 bg-white/90">
            <div className="text-xs text-slate-500 mb-1">Project Progress</div>
            <div className="h-2 w-full rounded bg-slate-100 overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-blue-500 via-sky-500 to-emerald-500 w-3/4" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function EZDesktopFrame() {
  return (
    <motion.div
      className={`${frameBaseEZ} w-[820px]`}
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      aria-label="Project management dashboard"
    >
      {/* Browser chrome */}
      <div className="flex items-center justify-between px-4 py-2 bg-slate-50 border-b">
        <div className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-full bg-red-400" />
          <span className="h-3 w-3 rounded-full bg-yellow-400" />
          <span className="h-3 w-3 rounded-full bg-green-400" />
        </div>
        <div className="text-xs text-slate-500">projects.blueseal.ae</div>
        <div className="flex items-center gap-2 text-slate-400">
          <Building className="h-4 w-4" />
        </div>
      </div>

      {/* Content */}
      <div className="p-6 grid grid-cols-12 gap-6">
        <aside className="col-span-3 rounded-xl ring-1 ring-slate-200 p-4 bg-white/90">
          <div className="text-xs font-semibold text-slate-500 uppercase mb-3">Projects</div>
          <ul className="space-y-2 text-sm">
            <li className="font-semibold text-blue-700">Al Qusais Tower</li>
            <li className="text-slate-600">JAFZA Terminal</li>
            <li className="text-slate-600">Meydan District</li>
            <li className="text-slate-600">Abu Dhabi PGC</li>
          </ul>
        </aside>

        <main className="col-span-9">
          <div className="rounded-xl ring-1 ring-slate-200 p-4 bg-white/90 mb-4">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-slate-900">Project Timeline</h4>
              <button className="text-xs font-semibold text-white px-3 py-1 rounded-lg bg-gradient-to-r from-blue-600 to-sky-600 hover:opacity-90">
                Export
              </button>
            </div>
            <div className="mt-4 h-28 rounded-lg bg-gradient-to-r from-blue-50 via-sky-50 to-emerald-50 ring-1 ring-slate-200" />
          </div>

          <div className="grid grid-cols-3 gap-4">
            {['Waterproofing', 'Insulation', 'Coatings'].map((t, i) => (
              <div key={t} className="rounded-xl ring-1 ring-slate-200 p-4 bg-white/90">
                <div className="text-xs text-slate-500 mb-1">{t}</div>
                <div className="text-2xl font-extrabold text-slate-900">
                  {i === 0 ? '98%' : i === 1 ? '95%' : '92%'}
                </div>
                <div className="mt-2 h-2 w-full rounded bg-slate-100 overflow-hidden">
                  <div className="h-2 bg-gradient-to-r from-blue-500 via-sky-500 to-emerald-500 w-3/4" />
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </motion.div>
  )
}

function EZTechnicalTab() {
  return (
    <motion.div
      className={`${frameBaseEZ} w-[860px]`}
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      aria-label="Technical specifications terminal"
    >
      {/* Tabs */}
      <div className="flex items-center gap-2 px-3 pt-3">
        {['~/specs', '~/materials', '~/testing'].map((t, i) => (
          <div
            key={t}
            className={[
              'px-3 py-1.5 rounded-t-lg text-xs font-semibold',
              i === 1 ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-700',
            ].join(' ')}
          >
            {t}
          </div>
        ))}
      </div>

      {/* Terminal */}
      <div className="bg-slate-900 text-slate-100 px-4 pb-5 pt-3">
        <div className="text-[11px] text-slate-400 mb-2 flex items-center gap-2">
          <TerminalSquare className="h-3.5 w-3.5 text-sky-400" />
          Blue Seal Technical Console
        </div>
        <pre className="text-[12px] leading-relaxed">
{`$ check_material_specs --project="Al Qusais Tower"
✓ GRP Lining: 4mm thickness confirmed
✓ Polyurea Coating: 30 mils applied
✓ Thermal Insulation: R-value 6.06 achieved

$ run_quality_tests --waterproofing
Testing membrane integrity... PASS
Testing thermal performance... PASS
Testing UV resistance... PASS

$ generate_certificate --type="DCL Approved"
Certificate: Dubai Central Laboratory
Status: APPROVED
Valid Until: 2025-12-31`}
        </pre>
      </div>
    </motion.div>
  )
}

function EZIndustrialInterface() {
  return (
    <motion.div
      className={`${frameBaseEZ} w-[760px]`}
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      aria-label="Industrial monitoring interface"
    >
      <div className="flex items-center justify-between px-4 py-3 bg-slate-50 border-b">
        <div className="flex items-center gap-2 text-slate-700">
          <Zap className="h-4 w-4 text-emerald-600" />
          <span className="text-xs font-semibold">Industrial Monitoring</span>
        </div>
        <span className="text-[11px] text-slate-500">Live Data • Secure</span>
      </div>

      <div className="p-6 grid grid-cols-3 gap-4">
        <div className="col-span-2">
          <div className="rounded-xl ring-1 ring-slate-200 p-4 bg-white/95 mb-4">
            <div className="text-xs font-semibold text-slate-500 uppercase mb-2">System Status</div>
            <div className="rounded-lg p-3 bg-slate-50 text-sm text-slate-700">
              All systems operational. Monitoring 12 active projects across UAE.
            </div>
          </div>
          <div className="rounded-xl ring-1 ring-slate-200 p-4 bg-white/95">
            <div className="text-xs font-semibold text-slate-500 uppercase mb-2">Performance Metrics</div>
            <div className="rounded-lg p-4 bg-gradient-to-br from-blue-50 via-sky-50 to-emerald-50 text-sm leading-relaxed text-slate-800">
              <p className="font-semibold">Energy Efficiency:</p>
              <p>Green Roof Systems achieving 40% energy savings</p>
              <p className="font-semibold mt-3">Quality Assurance:</p>
              <p>
                25-year leakage warranty active on all COMBO roof installations
              </p>
              <div className="mt-4 flex gap-2">
                <button className="px-3 py-1.5 text-xs rounded-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-sky-600 hover:opacity-90">
                  View Details
                </button>
                <button className="px-3 py-1.5 text-xs rounded-lg font-semibold ring-1 ring-slate-200">
                  Export Report
                </button>
              </div>
            </div>
          </div>
        </div>

        <aside className="col-span-1 space-y-4">
          <div className="rounded-xl ring-1 ring-slate-200 p-4 bg-white/95">
            <div className="text-xs text-slate-500 mb-1">Active Systems</div>
            <div className="flex flex-wrap gap-2">
              {['GRP-Lining', 'Polyurea', 'Thermal-Insul'].map((m, i) => (
                <span
                  key={m}
                  className={[
                    'px-2.5 py-1 text-[11px] rounded-full font-semibold',
                    i === 0 ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700',
                  ].join(' ')}
                >
                  {m}
                </span>
              ))}
            </div>
          </div>
          <div className="rounded-xl ring-1 ring-slate-200 p-4 bg-white/95">
            <div className="text-xs text-slate-500 mb-1">System Uptime</div>
            <div className="text-2xl font-extrabold text-slate-900">99.8%</div>
            <div className="mt-2 h-2 w-full rounded bg-slate-100 overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-blue-500 via-sky-500 to-emerald-500 w-full" />
            </div>
          </div>
        </aside>
      </div>
    </motion.div>
  )
}