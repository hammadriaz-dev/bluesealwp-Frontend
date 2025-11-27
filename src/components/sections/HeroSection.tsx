'use client'
import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react'
import AnimatedSection from '@/components/ui/AnimatedSection'
import { motion, AnimatePresence, cubicBezier, type Variants } from 'framer-motion'
import { ChevronLeft, ChevronRight, ArrowRight, Code, Palette, Smartphone, Cloud, Database, Zap, Play, TrendingUp, Link, Rocket, Users, Award, Shield, Building, Home, CheckCircle } from 'lucide-react'

// const clientimages = [
//     '/images/logo-1.png',
//     '/images/logo-3.jpeg',
//     '/images/logo-4.png',
//     '/images/logo-5.png',
//     '/images/logo-7.jpeg',
//     '/images/logo-8.png',
// ]

export type Stat = { number: string; label: string; icon: React.ComponentType<any> };

// Add the cx function at the top level
function cx(...classes: Array<string | false | null | undefined>) {
    return classes.filter(Boolean).join(' ')
}

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v))
const lerp = (a: number, b: number, t: number) => a + (b - a) * t

function HeroSection({
    stats = [
        {
            number: "100+",
            label: "Projects Completed",
            icon: Building
        },
        {
            number: "100+",
            label: "Happy Clients",
            icon: Users
        },
        // {
        //     number: "25+",
        //     label: "Years Warranty",
        //     icon: Shield
        // },
        {
            number: "98%",
            label: "Success Rate",
            icon: CheckCircle
        }
    ]
}: {
    stats?: Array<{ number: string; label: string; icon: React.ComponentType<any> }>;
}) {
    const heroWords = [
        "Waterproofing",
        "Thermal Insulation",
        "GRP Lining",
        "Roof Systems",
        "Concrete Protection",
        "Building Solutions",
        "Infrastructure",
    ];

    const VIDEO_URL = "https://youtu.be/your-intro-video";
    const CALENDLY_URL = "https://calendly.com/your-username/30min";

    const [videoOpen, setVideoOpen] = useState(false);
    const [calendlyOpen, setCalendlyOpen] = useState(false);
    const [showIezSmoke, setShowIezSmoke] = useState(false);
    const [showVideoPopup, setShowVideoPopup] = useState(false);
    const [iezTextVisible, setIezTextVisible] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isTablet, setIsTablet] = useState(false);

    // Detect device type
    useEffect(() => {
        const checkDevice = () => {
            const width = window.innerWidth;
            setIsMobile(width < 768);
            setIsTablet(width >= 768 && width < 1024);
        };

        checkDevice();
        window.addEventListener('resize', checkDevice);
        return () => window.removeEventListener('resize', checkDevice);
    }, []);

    useEffect(() => {
        const prev = document.body.style.overflow;
        if (videoOpen || calendlyOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = prev;
        }
        return () => {
            document.body.style.overflow = prev;
        };
    }, [videoOpen, calendlyOpen]);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                if (videoOpen) setVideoOpen(false);
                if (calendlyOpen) setCalendlyOpen(false);
            }
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [videoOpen, calendlyOpen]);

    useEffect(() => {
        if (showIezSmoke) {
            const textTimer = setTimeout(() => setIezTextVisible(true), 800);
            const hideTimer = setTimeout(() => {
                setIezTextVisible(false);
                setShowIezSmoke(false);
            }, 3000);
            return () => {
                clearTimeout(textTimer);
                clearTimeout(hideTimer);
            };
        }
    }, [showIezSmoke]);

    const getEmbedUrl = (url: string) => {
        try {
            const u = new URL(url);
            if (u.hostname.includes("youtube.com")) {
                const v = u.searchParams.get("v");
                if (v) return `https://www.youtube.com/embed/${v}?autoplay=1&rel=0&modestbranding=1`;
            }
            if (u.hostname === "youtu.be") {
                const id = u.pathname.slice(1);
                return `https://www.youtube.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`;
            }
            return url;
        } catch {
            return url;
        }
    };
    useEffect(() => {
        const showPopup = () => {
            console.log('Setting showVideoPopup to true');
            setShowVideoPopup(true);

            // Hide after 10 seconds
            setTimeout(() => {
                console.log('Setting showVideoPopup to false');
                setShowVideoPopup(false);
            }, 10000);
        };

        // Show immediately
        showPopup();

        // Then show every 20 seconds (10s visible + 10s hidden = 20s cycle)
        const interval = setInterval(showPopup, 20000);

        return () => clearInterval(interval);
    }, []);

    const embedUrl = getEmbedUrl(VIDEO_URL);
    const isYoutube = embedUrl.includes("youtube.com/embed");
    const isMp4 = VIDEO_URL.toLowerCase().endsWith(".mp4");

    const StatCard = ({
        stat,
        index,
    }: {
        stat: { number: string; label: string; icon: React.ComponentType<any> };
        index: number;
    }) => (
        <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 + index * 0.1 }}
            className="text-center group"
        >
            <div className="flex justify-center mb-3">
                <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur-md opacity-70 group-hover:opacity-100 transition-all duration-300" />
                    <stat.icon className={`relative ${isMobile ? 'h-6 w-6' : 'h-8 w-8 md:h-10 md:w-10'} text-white drop-shadow-lg`} />
                </div>
            </div>

            <div className={`${isMobile ? 'text-2xl' : 'text-2xl md:text-3xl lg:text-4xl'} font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent drop-shadow-lg mb-2`}>
                {stat.label === "Projects Completed" ? (
                    <ContinuousCounter start={500} speedPerSec={1.2} suffix="+" />
                ) : (
                    stat.number
                )}
            </div>

            <div className={`${isMobile ? 'text-xs' : 'text-sm md:text-base'} text-blue-100/90 font-medium px-2 leading-tight drop-shadow-sm`}>{stat.label}</div>
            
            {/* Animated underline effect */}
            <div className="w-0 group-hover:w-8 h-0.5 bg-cyan-300 mx-auto mt-2 transition-all duration-300 ease-out" />
        </motion.div>
    );

    const orderedStats = stats.map((s) => ({ type: "stat" as const, data: s }));

    const IezSmokeEffect = () => (
        <motion.div
            initial={{ opacity: 0, scale: 0.3 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.5 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute pointer-events-none z-40 bottom-16 md:bottom-32 right-4 md:right-32"
        >
            <motion.div
                className={`${isMobile ? 'w-32 h-32' : 'w-48 h-48 md:w-80 md:h-80'} rounded-full bg-gradient-to-br from-white/40 via-blue-300/20 to-white/10 blur-2xl md:blur-3xl`}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1.2, opacity: 0.6 }}
                exit={{ scale: 2, opacity: 0 }}
                transition={{ duration: 2 }}
            />
            {[...Array(isMobile ? 8 : 16)].map((_, i) => (
                <motion.div
                    key={i}
                    className={`absolute ${isMobile ? 'w-4 h-4' : 'w-6 h-6 md:w-8 md:h-8'} rounded-full bg-white/50 blur-lg`}
                    initial={{ x: 0, y: 0, opacity: 0.8, scale: 0.3 }}
                    animate={{
                        x: Math.cos((i * (isMobile ? 45 : 22.5)) * Math.PI / 180) * (isMobile ? 60 : 120),
                        y: Math.sin((i * (isMobile ? 45 : 22.5)) * Math.PI / 180) * (isMobile ? 60 : 120),
                        opacity: 0,
                        scale: 1.8,
                    }}
                    transition={{ duration: 2.5, ease: "easeOut", delay: i * 0.08 }}
                />
            ))}
            <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: iezTextVisible ? 1 : 0, scale: iezTextVisible ? 1 : 0.8 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <div className="relative">
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-blue-400/30 to-cyan-400/30 blur-xl rounded-lg"
                        animate={{ opacity: [0.3, 0.6, 0.3] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                    <motion.span
                        className={`relative ${isMobile ? 'text-2xl' : 'text-4xl md:text-6xl lg:text-8xl'} font-black text-white drop-shadow-2xl bg-gradient-to-br from-white to-gray-200 bg-clip-text text-transparent`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: iezTextVisible ? 1 : 0, y: iezTextVisible ? 0 : 20 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        BLUE SEAL
                    </motion.span>
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-blue-200/40 to-cyan-200/40 blur-lg rounded-lg"
                        animate={{ opacity: [0.2, 0.4, 0.2], scale: [1, 1.05, 1] }}
                        transition={{ duration: 3, repeat: Infinity }}
                    />
                </div>
            </motion.div>
            <motion.div
                className="absolute inset-0 rounded-full border-2 border-white/30 blur-xl"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1.4, opacity: 0.4 }}
                exit={{ scale: 2, opacity: 0 }}
                transition={{ duration: 2.2, delay: 0.4 }}
            />
            <motion.div
                className="absolute inset-0 rounded-full border border-white/20 blur-2xl"
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1.6, opacity: 0.2 }}
                exit={{ scale: 2.2, opacity: 0 }}
                transition={{ duration: 2.5, delay: 0.6 }}
            />
        </motion.div>
    );

    const EmergingLayers = () => (
        <div className="absolute inset-0 pointer-events-none">
            {[...Array(isMobile ? 2 : 4)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute inset-0 rounded-full border-2 border-white/30"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{
                        scale: [0.8, 1.8, 2.2],
                        opacity: [0.4, 0.2, 0]
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: i * 0.8,
                        ease: "easeOut"
                    }}
                />
            ))}

            {[...Array(isMobile ? 4 : 8)].map((_, i) => (
                <motion.div
                    key={`particle-${i}`}
                    className={`absolute ${isMobile ? 'w-1 h-1' : 'w-2 h-2'} rounded-full bg-white/50 blur-sm`}
                    initial={{
                        scale: 0,
                        opacity: 0,
                        x: "0%",
                        y: "0%"
                    }}
                    animate={{
                        scale: [0, 1, 0.8, 0],
                        opacity: [0, 0.8, 0.4, 0],
                        x: [
                            "0%",
                            `${Math.cos((i * (isMobile ? 90 : 45)) * Math.PI / 180) * (isMobile ? 30 : 40)}%`,
                            `${Math.cos((i * (isMobile ? 90 : 45)) * Math.PI / 180) * (isMobile ? 45 : 60)}%`
                        ],
                        y: [
                            "0%",
                            `${Math.sin((i * (isMobile ? 90 : 45)) * Math.PI / 180) * (isMobile ? 30 : 40)}%`,
                            `${Math.sin((i * (isMobile ? 90 : 45)) * Math.PI / 180) * (isMobile ? 45 : 60)}%`
                        ]
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        delay: i * 0.5,
                        ease: "easeOut"
                    }}
                />
            ))}

            {[...Array(isMobile ? 2 : 3)].map((_, i) => (
                <motion.div
                    key={`wave-${i}`}
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400/20 to-cyan-400/20"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{
                        scale: [0.8, 1.5, 2],
                        opacity: [0.3, 0.1, 0]
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        delay: i * 1.2,
                        ease: "easeOut"
                    }}
                />
            ))}
        </div>
    );

    return (
        <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50/80 via-white/80 to-cyan-50/80 selection:bg-blue-100 selection:text-blue-700 cursor-crosshair overflow-hidden px-4 sm:px-6 lg:px-8 pt-0">
            {/* Background Image with Overlay */}
            <div 
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: 'url("/images/Skyline.png")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                }}
            >
                {/* Overlay to ensure text readability */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-blue-800/15 to-cyan-900/20" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-black/5" />
            </div>

            <CustomCursor />

            {/* Enhanced Background Grid */}
            <div className="absolute inset-0 opacity-10 z-5">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.03) 1px, transparent 1px)
            `,
                        backgroundSize: `${isMobile ? '40px 40px' : isTablet ? '60px 60px' : '80px 80px'}`,
                        maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 70%)'
                    }}
                />
                {/* Secondary Grid Layer */}
                <div
                    className="absolute inset-0 opacity-5"
                    style={{
                        backgroundImage: `
              linear-gradient(rgba(6, 182, 212, 0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(6, 182, 212, 0.05) 1px, transparent 1px)
            `,
                        backgroundSize: `${isMobile ? '80px 80px' : isTablet ? '120px 120px' : '160px 160px'}`,
                    }}
                />
            </div>

            <div aria-hidden className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center">
                <svg
                    viewBox="0 0 800 800"
                    className={`${isMobile ? 'w-[800px] h-[800px]' : 'w-[1200px] h-[1200px] md:w-[1600px] md:h-[1600px]'} opacity-15`}
                    style={{ transformOrigin: "50% 50%", animation: "spinSlow 42s linear infinite" }}
                >
                    <defs>
                        <radialGradient id="rgHero" cx="50%" cy="35%">
                            <stop offset="0%" stopColor="#1d4ed8" stopOpacity="0.40" />
                            <stop offset="60%" stopColor="#06b6d4" stopOpacity="0.20" />
                            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                        </radialGradient>
                        <linearGradient id="lgHero" x1="0%" x2="100%">
                            <stop offset="0%" stopColor="#1d4ed8" stopOpacity="0.30" />
                            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.30" />
                        </linearGradient>
                    </defs>
                    <g transform="translate(400,400)">
                        <circle r="260" fill="url(#rgHero)" />
                        <g style={{ mixBlendMode: "screen" }}>
                            <circle r="210" stroke="url(#lgHero)" strokeWidth="14" fill="none" strokeLinecap="round" />
                            <circle r="150" stroke="url(#lgHero)" strokeWidth="8" fill="none" strokeDasharray="8 20" transform="rotate(18)" />
                        </g>
                    </g>
                </svg>
            </div>

            <style>{`
        @keyframes spinSlow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes gentleFloat { 0%, 100% { transform: translateY(0px) rotate(0deg) scale(1);} 33% { transform: translateY(-15px) rotate(2deg) scale(1.05);} 66% { transform: translateY(-8px) rotate(-1deg) scale(1.02);} }
        @keyframes continuousSpin { 0% { transform: rotate(0deg);} 100% { transform: rotate(360deg);} }
        @keyframes iezReveal { 0% { opacity: 0; transform: scale(0.8) translateY(20px); filter: blur(10px);} 50% { opacity: 1; transform: scale(1.1) translateY(0px); filter: blur(0px);} 100% { opacity: 0; transform: scale(1.2) translateY(-10px); filter: blur(5px);} }
        @keyframes smokeExpand { 0% { transform: scale(0.3); opacity: 0;} 30% { opacity: 0.8;} 70% { opacity: 0.6;} 100% { transform: scale(2); opacity: 0;} }
        @keyframes pulseRing { 0% { transform: scale(0.8); opacity: 0.8; } 80%, 100% { transform: scale(1.6); opacity: 0; } }
        @keyframes floatUp { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-8px); } }
        @keyframes energyPulse { 0% { transform: scale(1); opacity: 0.6; } 50% { transform: scale(1.1); opacity: 0.8; } 100% { transform: scale(1); opacity: 0.6; } }
        
        .spin-continuously { animation: continuousSpin 12s linear infinite; }
        .gentle-float { animation: gentleFloat 6s ease-in-out infinite; }
        .iez-reveal { animation: iezReveal 3s ease-in-out forwards; }
        .smoke-expand { animation: smokeExpand 3s ease-out forwards; }
        .energy-pulse { animation: energyPulse 2s ease-in-out infinite; }
      `}</style>

            {/* Darker Background Circles - Moved more to the left */}
            <div className={`absolute top-8 md:top-20 -left-4 md:-left-8 ${isMobile ? 'w-40 h-40' : 'w-56 h-56 md:w-80 md:h-80'} bg-blue-400 rounded-full mix-blend-multiply blur-xl opacity-30 animate-float`} />
            <div className={`absolute bottom-8 md:bottom-20 -right-4 md:-right-8 ${isMobile ? 'w-40 h-40' : 'w-56 h-56 md:w-80 md:h-80'} bg-cyan-400 rounded-full mix-blend-multiply blur-xl opacity-30 animate-float`} style={{ animationDelay: "2s" }} />

            {/* Water Drops Effect */}
            <WaterDropsEffect />

            <div className="absolute inset-0 overflow-visible pointer-events-none z-20">
                <motion.div className={`absolute ${isMobile ? 'w-4 h-4' : 'w-6 h-6 md:w-8 md:h-8'} rounded-full bg-gradient-to-r from-blue-400/40 to-cyan-400/40 backdrop-blur-sm border border-white/30 shadow-lg`} animate={{ x: [0, 60, 0], y: [0, -40, 0], scale: [1, 1.3, 1] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} style={{ top: '25%', left: '5%' }} />
                <motion.div className={`absolute ${isMobile ? 'w-3 h-3' : 'w-4 h-4 md:w-6 md:h-6'} rounded-full bg-gradient-to-r from-blue-300/50 to-cyan-300/50 backdrop-blur-sm border border-white/40 shadow-lg`} animate={{ x: [0, -70, 0], y: [0, 30, 0], scale: [1.2, 0.8, 1.2] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} style={{ top: '45%', right: '8%' }} />
                <motion.div className={`absolute ${isMobile ? 'w-2 h-2' : 'w-3 h-3 md:w-4 md:h-4'} rounded-full bg-gradient-to-r from-cyan-300/60 to-blue-300/60 backdrop-blur-sm border border-white/50 shadow-lg`} animate={{ x: [0, 40, 0], y: [0, -20, 0], scale: [0.8, 1.4, 0.8] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} style={{ bottom: '30%', left: '12%' }} />
            </div>

            <AnimatePresence>{showIezSmoke && <IezSmokeEffect />}</AnimatePresence>

            <div className="relative max-w-7xl mx-auto w-full text-center z-10 pt-8 md:pt-12">
                <div className="space-y-4 md:space-y-8">
                    <AnimatedSection>
                        <div className="space-y-3 md:space-y-6">
                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: "spring", stiffness: 200 }} className="inline-flex items-center px-3 py-1 md:px-4 md:py-2 rounded-full bg-blue-100/90 text-blue-700 text-xs md:text-sm font-medium ring-1 ring-blue-200/60 backdrop-blur-sm">
                                <Shield className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                                Dubai's Leading Waterproofing & Insulation Experts
                            </motion.div>

                            <h1 className={`${isMobile ? 'text-3xl' : 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl'} font-bold text-white drop-shadow-2xl leading-tight px-2`}>
                                Protect Your{" "}
                                <span className="bg-gradient-to-r from-blue-200 to-cyan-200 bg-clip-text text-transparent block md:inline mt-1 md:mt-0">
                                    <TypingWords
                                        words={heroWords}
                                        typeSpeed={62}
                                        deleteSpeed={40}
                                        holdTime={1200}
                                        className={`${isMobile ? 'text-3xl' : 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl'} align-baseline`}
                                        isMobile={isMobile}
                                    />
                                </span>{" "}
                                With Confidence
                            </h1>

                            <p className={`${isMobile ? 'text-base' : 'text-lg sm:text-xl md:text-2xl'} text-white/90 drop-shadow-lg max-w-3xl mx-auto leading-relaxed px-2 sm:px-4`}>
                                Professional <span className="font-semibold text-blue-200">waterproofing and insulation solutions</span> that guarantee protection,
                                energy efficiency, and long-lasting durability for your property.
                            </p>
                        </div>
                    </AnimatedSection>

                    <AnimatedSection delay={0.35}>
                        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center w-full px-2 sm:px-4">
                            <button
                                onClick={() => window.location.href = '/services'}
                                className="group relative inline-flex items-center justify-center w-full sm:w-auto px-4 py-3 md:px-8 md:py-4 text-sm md:text-lg font-semibold rounded-xl md:rounded-2xl overflow-hidden shadow-2xl shadow-blue-900/40 hover:shadow-blue-900/60 transform hover:-translate-y-1 transition-all duration-300 min-h-[44px] md:min-h-[50px] backdrop-blur-sm"
                            >
                                <div className="absolute -inset-0.5 rounded-xl md:rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-sm bg-gradient-to-r from-blue-600 via-cyan-600 to-sky-600" />
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 group-hover:from-blue-700 group-hover:to-cyan-700 transition-all duration-300 rounded-xl md:rounded-2xl" />
                                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                                <span className="relative z-10 text-white flex items-center font-bold drop-shadow-sm text-sm md:text-base">
                                    View Our Services
                                    <ArrowRight className="ml-2 md:ml-3 h-4 w-4 md:h-5 md:w-5 group-hover:translate-x-2 transition-transform duration-300 ease-out" />
                                    <span className="ml-2 md:ml-3 inline-flex h-1.5 w-1.5 md:h-2 md:w-2 rounded-full bg-white/90 group-hover:scale-150 group-hover:bg-white transition-all duration-300" />
                                </span>
                                <div className="absolute inset-0 rounded-xl md:rounded-2xl border-2 border-white/0 group-hover:border-white/20 transition-all duration-500" />
                            </button>

                            <button
                                onClick={() => setCalendlyOpen(true)}
                                className="group inline-flex items-center justify-center w-full sm:w-auto px-4 py-3 md:px-8 md:py-4 text-sm md:text-lg font-semibold rounded-xl md:rounded-2xl text-blue-600 bg-white/95 hover:bg-white transition-all duration-300 border-2 border-blue-600 shadow-2xl hover:shadow-xl transform hover:-translate-y-1 min-h-[44px] md:min-h-[50px] backdrop-blur-sm"
                                aria-haspopup="dialog"
                                aria-expanded={calendlyOpen}
                                aria-controls="calendly-modal"
                            >
                                Free Consultation
                            </button>

                            <motion.div
                                className="relative"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <motion.button
                                    onClick={() => setVideoOpen(true)}
                                    aria-label="Watch intro video"
                                    className={`relative rounded-full ${isMobile ? 'w-10 h-10' : 'w-12 h-12 md:w-16 md:h-16'
                                        } bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-500 text-white shadow-[0_8px_32px_rgba(59,130,246,0.5)] ring-2 ring-white/20 flex items-center justify-center overflow-hidden group z-20 min-h-[40px] md:min-h-[48px] backdrop-blur-sm`}
                                    animate={{ y: [0, -3, 0] }}
                                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                >
                                    <motion.div
                                        className="absolute inset-0 opacity-100"
                                        animate={{
                                            background: [
                                                "linear-gradient(135deg, #1d4ed8 0%, #06b6d4 50%, #0d9488 100%)",
                                                "linear-gradient(135deg, #06b6d4 0%, #1d4ed8 50%, #06b6d4 100%)",
                                                "linear-gradient(135deg, #1d4ed8 0%, #06b6d4 50%, #0d9488 100%)"
                                            ]
                                        }}
                                        transition={{ duration: 4, repeat: Infinity }}
                                    />
                                    <div className={`absolute ${isMobile ? 'inset-1' : 'inset-1.5 md:inset-2'
                                        } rounded-full bg-white/10 backdrop-blur-sm border border-white/20 group-hover:bg-white/15 transition-all duration-300`} />
                                    <div className="relative z-10 flex items-center justify-center">
                                        <div className={`flex items-center justify-center ${isMobile ? 'w-4 h-4' : 'w-5 h-5 md:w-6 md:h-6'
                                            } rounded-full bg-white/20 backdrop-blur-sm border border-white/30 group-hover:bg-white/25 transition-all duration-300`}>
                                            <Play className={`${isMobile ? 'w-2 h-2' : 'w-2.5 h-2.5 md:w-3 md:h-3'
                                                } text-white drop-shadow-lg`} fill="currentColor" />
                                        </div>
                                    </div>
                                </motion.button>
                                <AnimatePresence>
                                    {showVideoPopup && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 15, scale: 0.8 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: -15, scale: 0.8 }}
                                            transition={{ duration: 0.5, ease: "easeOut" }}
                                            className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-black/95 backdrop-blur-sm text-white text-xs font-medium px-3 py-2 rounded-lg whitespace-nowrap z-50 shadow-xl border border-white/20"
                                        >
                                            {/* Digital Glitch Effects on entire popup */}
                                            <motion.div
                                                className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-emerald-400 opacity-10 blur-sm rounded-lg"
                                                animate={{ opacity: [0.1, 0.2, 0.1] }}
                                                transition={{ duration: 1, repeat: Infinity }}
                                            />
                                            <motion.div
                                                className="absolute top-0 left-0 w-full h-0.5 bg-cyan-400 rounded-t-lg"
                                                animate={{ x: [-10, 10] }}
                                                transition={{ duration: 0.3, repeat: Infinity }}
                                            />
                                            <motion.div
                                                className="absolute bottom-0 left-0 w-full h-0.5 bg-emerald-400 rounded-b-lg"
                                                animate={{ x: [10, -10] }}
                                                transition={{ duration: 0.3, repeat: Infinity, delay: 0.15 }}
                                            />

                                            {/* Content */}
                                            <div className="relative z-10 flex items-center gap-2">
                                                <motion.div
                                                    className="w-1.5 h-1.5 bg-green-400 rounded-full"
                                                    animate={{ opacity: [1, 0.5, 1] }}
                                                    transition={{ duration: 0.5, repeat: Infinity }}
                                                />
                                                Watch Our Work Process
                                            </div>

                                            {/* Arrow pointing to button */}
                                            <motion.div
                                                className="absolute bottom-0 left-3 transform translate-y-2"
                                                animate={{ x: [0, 2, 0] }}
                                                transition={{ duration: 0.5, repeat: Infinity }}
                                            >
                                                <div className="relative w-12 h-4">
                                                    <motion.div
                                                        className="absolute right-0 top-1/2 w-2 h-2 border-r-2 border-b-2 border-cyan-400 transform -translate-y-1/2 rotate-[-45deg]"
                                                        animate={{ opacity: [1, 0.5, 1] }}
                                                        transition={{ duration: 0.5, repeat: Infinity }}
                                                    />
                                                </div>
                                            </motion.div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                                {/* Water Layer Animation - Smooth */}
                                <div className="absolute inset-0 pointer-events-none">
                                    {[...Array(3)].map((_, i) => (
                                        <motion.div
                                            key={i}
                                            className={`absolute inset-0 rounded-full border-2 ${i === 0 ? 'border-blue-400/50' :
                                                i === 1 ? 'border-cyan-400/40' :
                                                    'border-teal-400/30'
                                                }`}
                                            initial={{ scale: 1, opacity: 0 }}
                                            animate={{
                                                scale: [1, 1.2, 1.5, 1.8],
                                                opacity: [0, 0.6, 0.3, 0]
                                            }}
                                            transition={{
                                                duration: 2.5,
                                                repeat: Infinity,
                                                delay: i * 0.8,
                                                ease: "easeOut"
                                            }}
                                        />
                                    ))}
                                </div>

                                <EmergingLayers />
                            </motion.div>
                        </div>
                    </AnimatedSection>

                    <AnimatedSection delay={0.45}>
                        <div className={`grid grid-cols-2 ${isTablet ? 'md:grid-cols-4' : 'md:grid-cols-4'} gap-4 md:gap-6 lg:gap-8 pt-8 md:pt-12 max-w-4xl mx-auto px-2 sm:px-4`}>
                            {orderedStats.map((item, index) => (
                                <StatCard key={item.data.label} stat={item.data} index={index} />
                            ))}
                        </div>
                    </AnimatedSection>
                </div>
            </div>

            {/* Video and Calendly modals */}
            <AnimatePresence>
                {videoOpen && (
                    <motion.div key="video-modal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6" aria-modal="true" role="dialog" aria-labelledby="intro-video-title">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.6 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }} className="absolute inset-0 bg-black" onClick={() => setVideoOpen(false)} aria-hidden />
                        <motion.div initial={{ y: 30, scale: 0.98, opacity: 0 }} animate={{ y: 0, scale: 1, opacity: 1 }} exit={{ y: 20, scale: 0.98, opacity: 0 }} transition={{ type: "spring", stiffness: 260, damping: 24 }} className="relative z-10 w-full max-w-5xl mx-auto rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl bg-black m-4">
                            <div className="absolute right-2 top-2 md:right-4 md:top-4 z-20">
                                <button onClick={() => setVideoOpen(false)} className="inline-flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/10 hover:bg-white/20 text-white focus:outline-none focus:ring-2 focus:ring-white/40 transition-all duration-200 hover:scale-110 min-h-[32px]" aria-label="Close video">✕</button>
                            </div>
                            <div id="intro-video" className="w-full aspect-[16/9] bg-black">
                                {isYoutube ? (
                                    <iframe title="Intro video" src={embedUrl} className="w-full h-full" allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen frameBorder={0} />
                                ) : isMp4 ? (
                                    <video className="w-full h-full" controls autoPlay>
                                        <source src={VIDEO_URL} />
                                        Your browser does not support the video tag.
                                    </video>
                                ) : (
                                    <iframe title="Intro video" src={embedUrl} className="w-full h-full" allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen frameBorder={0} />
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
            <AnimatePresence>
                {calendlyOpen && (
                    <motion.div key="calendly-modal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6" aria-modal="true" role="dialog" aria-labelledby="calendly-title">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.6 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }} className="absolute inset-0 bg-black" onClick={() => setCalendlyOpen(false)} aria-hidden />
                        <motion.div initial={{ y: 30, scale: 0.98, opacity: 0 }} animate={{ y: 0, scale: 1, opacity: 1 }} exit={{ y: 20, scale: 0.98, opacity: 0 }} transition={{ type: "spring", stiffness: 260, damping: 24 }} className="relative z-10 w-full max-w-3xl mx-auto rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl bg-white m-4">
                            <div className="absolute right-2 top-2 md:right-4 md:top-4 z-20">
                                <button onClick={() => setCalendlyOpen(false)} className="inline-flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/90 hover:bg-white/100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-200 min-h-[32px]" aria-label="Close scheduling">✕</button>
                            </div>
                            <div className="p-4 md:p-6 border-b">
                                <h3 id="calendly-title" className="text-lg font-semibold text-gray-800">Schedule a Free Consultation</h3>
                                <p className="text-sm text-gray-500">Get expert advice on your waterproofing and insulation needs</p>
                            </div>
                            <div className="w-full" style={{ minHeight: '400px' }}>
                                <iframe title="Calendly scheduling" src={`${CALENDLY_URL}?embed_domain=${typeof window !== "undefined" ? window.location.hostname : ""}&embed_type=Inline`} className="w-full h-[500px] border-0" frameBorder={0} scrolling="no" />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}

// Water Drops Effect Component
const WaterDropsEffect: React.FC = () => {
    const [isMobile, setIsMobile] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    const frameRef = useRef<number | null>(null)

    const dprRef = useRef(1)
    const rectRef = useRef<DOMRect | null>(null)

    const mouseRef = useRef({ x: 0, y: 0, active: false, down: false })
    type WaterDrop = { 
        x: number; 
        y: number; 
        vx: number; 
        vy: number; 
        r: number; 
        life: number;
        maxLife: number;
        rippleProgress: number;
        rippleSize: number;
    }
    const dropsRef = useRef<WaterDrop[]>([])
    const tRef = useRef(0)

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        if (isMobile) return; // Disable on mobile for performance

        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        if (!ctx) return

        const rand = (a: number, b: number) => Math.random() * (b - a) + a

        function createDrops(n: number, rect: DOMRect): WaterDrop[] {
            const count = isMobile ? Math.floor(n * 0.3) : n;
            const arr: WaterDrop[] = []
            for (let i = 0; i < count; i++) {
                const r = rand(1.5, 4)
                const life = 0
                const maxLife = rand(200, 400)
                arr.push({
                    x: rand(0, rect.width),
                    y: rand(-50, -10),
                    vx: rand(-0.2, 0.2),
                    vy: rand(1, 3),
                    r,
                    life,
                    maxLife,
                    rippleProgress: 0,
                    rippleSize: r * 8
                })
            }
            return arr
        }

        const onResize = () => {
            dprRef.current = Math.max(1, Math.min(2, window.devicePixelRatio || 1))
            const rect = canvas.getBoundingClientRect()
            rectRef.current = rect
            canvas.width = Math.floor(rect.width * dprRef.current)
            canvas.height = Math.floor(rect.height * dprRef.current)
            ctx.setTransform(dprRef.current, 0, 0, dprRef.current, 0, 0)

            const area = rect.width * rect.height
            const count = clamp(Math.floor(area / 15000), 20, 60) // Fewer drops for water effect
            dropsRef.current = createDrops(count, rect)
        }

        const onMove = (e: MouseEvent) => {
            mouseRef.current.x = e.clientX
            mouseRef.current.y = e.clientY
            mouseRef.current.active = true
        }
        const onLeave = () => (mouseRef.current.active = false)
        const onDown = () => (mouseRef.current.down = true)
        const onUp = () => (mouseRef.current.down = false)

        window.addEventListener('resize', onResize)
        window.addEventListener('mousemove', onMove, { passive: true })
        window.addEventListener('mouseleave', onLeave, { passive: true })
        window.addEventListener('mousedown', onDown, { passive: true })
        window.addEventListener('mouseup', onUp, { passive: true })

        onResize()

        const draw = () => {
            const rect = rectRef.current
            if (!rect) return
            const drops = dropsRef.current

            tRef.current += 0.01
            ctx.clearRect(0, 0, rect.width, rect.height)

            // Draw water drops
            for (let i = 0; i < drops.length; i++) {
                const drop = drops[i]
                
                // Update drop position
                drop.x += drop.vx
                drop.y += drop.vy
                drop.life++

                // Reset drop if it goes off screen or dies
                if (drop.y > rect.height + 50 || drop.life > drop.maxLife) {
                    drop.x = rand(0, rect.width)
                    drop.y = rand(-50, -10)
                    drop.vx = rand(-0.2, 0.2)
                    drop.vy = rand(1, 3)
                    drop.life = 0
                    drop.rippleProgress = 0
                }

                // Draw drop
                const progress = drop.life / drop.maxLife
                const alpha = 1 - progress * 0.8

                // Main drop
                ctx.fillStyle = `rgba(59, 130, 246, ${alpha * 0.6})`
                ctx.beginPath()
                ctx.arc(drop.x, drop.y, drop.r, 0, Math.PI * 2)
                ctx.fill()

                // Highlight
                ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.4})`
                ctx.beginPath()
                ctx.arc(drop.x - drop.r * 0.3, drop.y - drop.r * 0.3, drop.r * 0.5, 0, Math.PI * 2)
                ctx.fill()

                // Ripple effect when drop hits "surface"
                if (drop.y > rect.height * 0.7 && drop.rippleProgress < 1) {
                    drop.rippleProgress += 0.05
                    const rippleAlpha = (1 - drop.rippleProgress) * 0.3
                    
                    ctx.strokeStyle = `rgba(59, 130, 246, ${rippleAlpha})`
                    ctx.lineWidth = 1.5
                    ctx.beginPath()
                    ctx.arc(drop.x, rect.height * 0.7, drop.rippleSize * drop.rippleProgress, 0, Math.PI * 2)
                    ctx.stroke()

                    // Secondary ripple
                    if (drop.rippleProgress > 0.3) {
                        const secondaryProgress = (drop.rippleProgress - 0.3) / 0.7
                        const secondaryAlpha = (1 - secondaryProgress) * 0.2
                        
                        ctx.strokeStyle = `rgba(6, 182, 212, ${secondaryAlpha})`
                        ctx.lineWidth = 1
                        ctx.beginPath()
                        ctx.arc(drop.x, rect.height * 0.7, drop.rippleSize * secondaryProgress * 1.5, 0, Math.PI * 2)
                        ctx.stroke()
                    }
                }
            }

            // Draw some floating bubbles
            for (let i = 0; i < 8; i++) {
                const x = (Math.sin(tRef.current * 0.5 + i) * 0.5 + 0.5) * rect.width
                const y = (Math.cos(tRef.current * 0.3 + i) * 0.3 + 0.7) * rect.height
                const size = Math.sin(tRef.current + i) * 2 + 4
                
                ctx.fillStyle = `rgba(255, 255, 255, 0.3)`
                ctx.beginPath()
                ctx.arc(x, y, size, 0, Math.PI * 2)
                ctx.fill()

                ctx.strokeStyle = `rgba(59, 130, 246, 0.4)`
                ctx.lineWidth = 1
                ctx.beginPath()
                ctx.arc(x, y, size, 0, Math.PI * 2)
                ctx.stroke()
            }

            frameRef.current = requestAnimationFrame(draw)
        }

        frameRef.current = requestAnimationFrame(draw)

        return () => {
            if (frameRef.current) cancelAnimationFrame(frameRef.current)
            window.removeEventListener('resize', onResize)
            window.removeEventListener('mousemove', onMove)
            window.removeEventListener('mouseleave', onLeave)
            window.removeEventListener('mousedown', onDown)
            window.removeEventListener('mouseup', onUp)
        }
    }, [isMobile])

    if (isMobile) return null;

    return (
        <canvas
            ref={canvasRef}
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{ width: '100%', height: '100%' }}
            aria-hidden={true}
        />
    )
}

// TYPING WORD - Updated for better mobile responsiveness
function TypingWords({
    words,
    typeSpeed = 60,
    deleteSpeed = 38,
    holdTime = 1200,
    className = "",
    isMobile = false,
}: {
    words: string[]
    typeSpeed?: number
    deleteSpeed?: number
    holdTime?: number
    className?: string
    isMobile?: boolean
}) {
    const [wIdx, setWIdx] = React.useState(0)
    const [ch, setCh] = React.useState(0)
    const [phase, setPhase] = React.useState<"typing" | "holding" | "deleting">("typing")
    const measurerRef = React.useRef<HTMLSpanElement | null>(null)
    const [maxWidth, setMaxWidth] = React.useState<number | undefined>(undefined)

    React.useEffect(() => {
        const el = measurerRef.current
        if (!el) return
        let max = 0
        for (const t of words) {
            el.textContent = t
            const rect = el.getBoundingClientRect()
            if (rect.width > max) max = rect.width
        }
        setMaxWidth(Math.ceil(max))
    }, [words.join("|")])

    React.useEffect(() => {
        let t: number | undefined

        if (phase === "typing") {
            if (ch < words[wIdx].length) {
                t = window.setTimeout(() => setCh(ch + 1), typeSpeed)
            } else {
                t = window.setTimeout(() => setPhase("holding"), 120)
            }
        } else if (phase === "holding") {
            t = window.setTimeout(() => setPhase("deleting"), holdTime)
        } else if (phase === "deleting") {
            if (ch > 0) {
                t = window.setTimeout(() => setCh(ch - 1), deleteSpeed)
            } else {
                setWIdx((w) => (w + 1) % words.length)
                setPhase("typing")
            }
        }

        return () => {
            if (t) window.clearTimeout(t)
        }
    }, [phase, ch, wIdx, words, typeSpeed, deleteSpeed, holdTime])

    const current = words[wIdx].slice(0, ch)

    return (
        <span
            className={`inline-flex items-baseline align-baseline ${className}`}
            style={{ 
                width: maxWidth && !isMobile ? `${maxWidth}px` : 'auto',
                minHeight: isMobile ? '1.2em' : '1.5em'
            }}
        >
            <span className="whitespace-nowrap leading-none">{current}</span>
            <span className="ml-0.5 inline-block h-[1.05em] w-[2px] bg-current animate-pulse opacity-70 translate-y-[1px]" />
            <span ref={measurerRef} className="invisible absolute pointer-events-none whitespace-nowrap" aria-hidden />
        </span>
    )
}

function ContinuousCounter({
    start = 500,
    speedPerSec = 1.2,
    prefix = '',
    suffix = '+',
    className = '',
}: {
    start?: number
    speedPerSec?: number
    prefix?: string
    suffix?: string
    className?: string
}) {
    const ref = useRef<HTMLSpanElement | null>(null)
    const [display, setDisplay] = useState(start)
    const [isRunning, setIsRunning] = useState(false)
    const [isComplete, setIsComplete] = useState(false)
    const animationRef = useRef<number | null>(null)
    const lastTimeRef = useRef<number | null>(null)
    const accumulatedRef = useRef(0)

    const startCounter = useCallback(() => {
        if (isComplete || isRunning) return
        
        setIsRunning(true)
        lastTimeRef.current = null
        accumulatedRef.current = 0
        
        const animate = (currentTime: number) => {
            if (!isRunning) return
            
            if (lastTimeRef.current === null) {
                lastTimeRef.current = currentTime
                animationRef.current = requestAnimationFrame(animate)
                return
            }
            
            const deltaTime = (currentTime - lastTimeRef.current) / 1000
            lastTimeRef.current = currentTime
            
            if (deltaTime > 0 && deltaTime < 1) {
                accumulatedRef.current += speedPerSec * deltaTime
                
                if (accumulatedRef.current >= 1) {
                    const increment = Math.floor(accumulatedRef.current)
                    accumulatedRef.current -= increment
                    
                    setDisplay(prev => {
                        const newValue = prev - increment
                        
                        // SUDDEN STOP AT 217
                        if (newValue <= 217) {
                            setIsComplete(true)
                            setIsRunning(false)
                            if (animationRef.current) {
                                cancelAnimationFrame(animationRef.current)
                            }
                            return 217
                        }
                        
                        return newValue
                    })
                }
            }
            
            if (!isComplete && isRunning) {
                animationRef.current = requestAnimationFrame(animate)
            }
        }
        
        animationRef.current = requestAnimationFrame(animate)
    }, [isRunning, isComplete, speedPerSec])

    useEffect(() => {
        const el = ref.current
        if (!el) return

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !isRunning && !isComplete) {
                    startCounter()
                }
            },
            { threshold: 0.1 }
        )

        observer.observe(el)

        return () => {
            observer.disconnect()
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current)
            }
        }
    }, [startCounter, isRunning, isComplete])

    return (
        <span 
            ref={ref} 
            className={`
                prominent-counter
                inline-block 
                font-bold
                transition-all duration-500
                ${isComplete ? 'counter-explode' : ''}
                ${isRunning ? 'counter-running' : ''}
                ${className}
            `}
        >
            {prefix}
            <span className="counter-number">
                {display}
            </span>
            {suffix}
        </span>
    )
}

const CustomCursor: React.FC = () => {
    const [isMobile, setIsMobile] = useState(false);
    const dotRef = useRef<HTMLDivElement | null>(null)
    const ringRef = useRef<HTMLDivElement | null>(null)
    const trailRef = useRef<HTMLDivElement | null>(null)

    const target = useRef({ x: 0, y: 0 })
    const dot = useRef({ x: 0, y: 0 })
    const ring = useRef({ x: 0, y: 0 })
    const trail = useRef({ x: 0, y: 0 })

    const pressedRef = useRef(false)
    const rafRef = useRef<number | null>(null)

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        if (isMobile) return; // Don't initialize cursor on mobile

        const onMove = (e: MouseEvent) => {
            target.current.x = e.clientX
            target.current.y = e.clientY
        }
        const onDown = () => (pressedRef.current = true)
        const onUp = () => (pressedRef.current = false)

        window.addEventListener('mousemove', onMove, { passive: true })
        window.addEventListener('mousedown', onDown, { passive: true })
        window.addEventListener('mouseup', onUp, { passive: true })

        const loop = () => {
            dot.current.x = lerp(dot.current.x, target.current.x, 0.35)
            dot.current.y = lerp(dot.current.y, target.current.y, 0.35)

            ring.current.x = lerp(ring.current.x, target.current.x, 0.2)
            ring.current.y = lerp(ring.current.y, target.current.y, 0.2)

            trail.current.x = lerp(trail.current.x, target.current.x, 0.08)
            trail.current.y = lerp(trail.current.y, target.current.y, 0.08)

            if (dotRef.current) {
                const s = pressedRef.current ? 0.7 : 1
                dotRef.current.style.transform = `translate3d(${dot.current.x}px, ${dot.current.y}px, 0) scale(${s})`
            }
            if (ringRef.current) {
                const s = pressedRef.current ? 1.25 : 1
                ringRef.current.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0) scale(${s})`
                ringRef.current.style.opacity = pressedRef.current ? '0.9' : '0.65'
            }
            if (trailRef.current) {
                trailRef.current.style.transform = `translate3d(${trail.current.x}px, ${trail.current.y}px, 0)`
            }

            rafRef.current = requestAnimationFrame(loop)
        }

        rafRef.current = requestAnimationFrame(loop)

        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current)
            window.removeEventListener('mousemove', onMove)
            window.removeEventListener('mousedown', onDown)
            window.removeEventListener('mouseup', onUp)
        }
    }, [isMobile])

    if (isMobile) return null; // Don't render cursor on mobile

    return (
        <>
            <div
                ref={trailRef}
                className="pointer-events-none fixed left-0 top-0 z-[70] -translate-x-1/2 -translate-y-1/2"
                style={{ mixBlendMode: 'soft-light' }}
                aria-hidden={true}
            >
                <div className="h-16 w-16 rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.12)_0%,rgba(6,182,212,0.06)_40%,transparent_70%)] blur-md" />
            </div>

            <div
                ref={ringRef}
                className="pointer-events-none fixed left-0 top-0 z-[71] -translate-x-1/2 -translate-y-1/2"
                style={{ mixBlendMode: 'color-dodge' }}
                aria-hidden={true}
            >
                <div className="h-12 w-12 rounded-full border border-white/40 bg-white/5 shadow-[0_0_24px_6px_rgba(255,255,255,0.15)] backdrop-blur-[1.5px]" />
            </div>

            <div
                ref={dotRef}
                className="pointer-events-none fixed left-0 top-0 z-[72] -translate-x-1/2 -translate-y-1/2"
                aria-hidden={true}
            >
                <div className="h-2.5 w-2.5 rounded-full bg-gradient-to-br from-blue-400 to-cyan-500 shadow-[0_0_12px_4px_rgba(59,130,246,0.35)]" />
            </div>
        </>
    )
}

export default HeroSection