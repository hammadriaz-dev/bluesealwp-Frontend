import HeroSection from '@/components/sections/HeroSection'
// import ClientsMarquee from '@/components/sections/ClientsMarquee'
import ClientServices from '@/components/sections/ClientServices'
import CoreValues from '@/components/sections/CoreValues'
import ProjectsShowcase from '@/components/sections/ProjectsShowcase'
import EZShowcaseDevicesSection from '@/components/sections/EZShowcaseDevicesSection'
import TeamSection from '@/components/sections/TeamSection'
import ContactForm from '@/components/sections/ContactForm'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import PricingPlans from '@/components/sections/PricingPlans'
import Certifications from '@/components/sections/Certifications'

// You can pass data as props if needed
// import {
//   ArrowRight,
//   CheckCircle,
//   TestTube,
//   Settings,
//   Check,
//   MessageCircle,
//   Code,
//   Play,
//   Eye,
//   Smartphone,
//   BarChart3,
//   Shield,
//   Cpu,
//   TrendingUp,
//   ChevronLeft,
//   ChevronRight,
//   Clock,
//   Star,
//   Rocket,
//   Users,
//   Zap,
//   Heart,
//   Search,
//   Palette,
//   X,
//   ArrowUpRight,
//   Send,
//   Loader2,
//   Mail,
//   Phone,
//   MapPin,
//   ShieldCheck,
// } from 'lucide-react'




// type TeamMember = {
//   name: string;
//   role: string;
//   img: string;
//   color: string;
//   socials: {
//     github: string;
//     linkedin: string;
//     facebook: string;
//     instagram: string;
//   };
// }

// const team: TeamMember[] = [
//   {
//     name: 'Syed Abu Huraira',
//     role: 'Founder & CEO',
//     img: '/images/men1.jpg',
//     color: 'from-indigo-500 to-purple-500',
//     socials: {
//       github: '#',
//       linkedin: '#',
//       facebook: '#',
//       instagram: '#'
//     }
//   },
//   {
//     name: 'Ayesha Khan',
//     role: 'Lead Developer',
//     img: '/images/men2.jpeg',
//     color: 'from-purple-500 to-indigo-500',
//     socials: {
//       github: '#',
//       linkedin: '#',
//       facebook: '#',
//       instagram: '#'
//     }
//   },
//   {
//     name: 'Ali Raza',
//     role: 'UI/UX Designer',
//     img: '/images/men3.jpeg',
//     color: 'from-indigo-500 to-purple-500',
//     socials: {
//       github: '#',
//       linkedin: '#',
//       facebook: '#',
//       instagram: '#'
//     }
//   },
//   {
//     name: 'Fatima Zahra',
//     role: 'Project Manager',
//     img: '/images/team4.jpg',
//     color: 'from-purple-500 to-indigo-500',
//     socials: {
//       github: '#',
//       linkedin: '#',
//       facebook: '#',
//       instagram: '#'
//     }
//   },
//   {
//     name: 'Ahmed Hassan',
//     role: 'Backend Developer',
//     img: '/images/men1.jpg',
//     color: 'from-indigo-500 to-purple-500',
//     socials: {
//       github: '#',
//       linkedin: '#',
//       facebook: '#',
//       instagram: '#'
//     }
//   },
//   {
//     name: 'Sara Malik',
//     role: 'Frontend Developer',
//     img: '/images/team4.jpg',
//     color: 'from-purple-500 to-indigo-500',
//     socials: {
//       github: '#',
//       linkedin: '#',
//       facebook: '#',
//       instagram: '#'
//     }
//   },
// ]

const clientimages = [
  '/images/logo-1.png',
  '/images/logo-2.jpeg',
  '/images/logo-3.jpeg',
  '/images/logo-4.png',
  '/images/logo-5.png',
  '/images/logo-6.jpeg',
  '/images/logo-7.jpeg',
  '/images/logo-8.png',
]
export default function Home() {

  return (
    <div className="overflow-hidden">
      {/* //   Each section with responsive container
    //   <section className="w-full">
    //     <ClientHero />
    //   </section>

    //   <section className="w-full">
    //     <ClientsMarquee />
    //   </section>

       <section className="w-full">
         <ClientServices services={servicesData} />
       </section>

    //   <section className="w-full">
    //     <CoreValues />
    //   </section>

    //   <section className="w-full">
    //     <ProjectsShowcase />
    //   </section>

   
    <section className="w-full">
      <OurProcess />
    </section> */}

      <section className="w-full">
        <HeroSection />
      </section>

      <section className="w-full">
        <ClientServices />
      </section>

      <section className="w-full">
        <ProjectsShowcase /> {/* No props needed now */}
      </section>
       <section className="w-full">
        <CoreValues />
      </section>

      <section className="w-full">
        <Certifications /> {/* No props needed now */}
      </section>
      {/* <OurProcess processes={processes} /> */}

      <section className="w-full">
        <TeamSection /> {/* No props needed now */}
      </section>




      <section className="w-full">
        <TestimonialsSection />
      </section>


      




      {/* 
      
     
       <section className="w-full">
         <PricingPlans />
       </section> */


      }
    </div >
  )
}
