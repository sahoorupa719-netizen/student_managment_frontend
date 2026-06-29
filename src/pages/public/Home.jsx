import { Link } from 'react-router-dom';
import './Home.css';

const stats = [
  { value: '50+',    label: 'Students Enrolled' },
  { value: '10',     label: 'Expert Teachers'   },
  { value: '10',     label: 'Classes Covered'   },
  { value: '98%',    label: 'Success Rate'       },
];

const features = [
  { icon: '🎯', title: 'Structured Curriculum',  desc: 'Carefully designed syllabus aligned with national education standards for Classes 1–10.' },
  { icon: '👩‍🏫', title: 'Expert Teachers',       desc: 'Learn from qualified and passionate educators dedicated to student success.' },
  { icon: '📊', title: 'Track Your Progress',    desc: 'Real-time result tracking, attendance monitoring, and quiz performance analytics.' },
  { icon: '🧠', title: 'Interactive Quizzes',    desc: 'Engage with dynamic quizzes and instant feedback to reinforce learning.' },
  { icon: '📝', title: 'Digital Notes',          desc: 'Access teacher-uploaded notes anytime, anywhere from your student dashboard.' },
  { icon: '🔒', title: 'Secure Platform',        desc: 'Role-based access ensures students, teachers, and admins each see only what they need.' },
];

const courses = [
  ...Array.from({ length: 10 }, (_, i) => ({
    label: `Class ${i + 1}`,
    number: i + 1,
    to: `/courses/class-${i + 1}`,
  })),
  { label: 'PGDCA', number: 'P', to: '/courses/pgdca' },
];

export default function Home() {
  return (
    <div className="home">
      {/* Hero with Full Background */}
      <section className="hero-3d">
        <div className="hero-bg-3d">
          {/* Animated Neon SVG Background */}
          <svg className="hero-svg-bg" viewBox="0 0 1200 800" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
            {/* Dark Background */}
            <defs>
              <radialGradient id="bgGradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" style={{stopColor: '#1a0b2e', stopOpacity: 1}} />
                <stop offset="100%" style={{stopColor: '#0f051e', stopOpacity: 1}} />
              </radialGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            {/* Background */}
            <rect width="1200" height="800" fill="url(#bgGradient)"/>

            {/* Neon Lines - Flowing */}
            <g className="neon-lines" opacity="0.8">
              <path d="M 100 0 Q 300 150, 600 100 T 1100 150" stroke="#00d9ff" strokeWidth="3" fill="none" filter="url(#glow)" className="line-flow"/>
              <path d="M 50 100 Q 400 300, 700 200 T 1150 350" stroke="#0099ff" strokeWidth="2.5" fill="none" filter="url(#glow)" className="line-flow"/>
              <path d="M 150 300 Q 500 400, 800 350 T 1100 500" stroke="#6633ff" strokeWidth="2" fill="none" filter="url(#glow)" className="line-flow"/>
              <path d="M 0 500 Q 300 550, 600 500 T 1200 600" stroke="#00d9ff" strokeWidth="2.5" fill="none" filter="url(#glow)" className="line-flow"/>
              <path d="M 200 700 Q 500 650, 800 700 T 1200 750" stroke="#ff00ff" strokeWidth="2" fill="none" filter="url(#glow)" className="line-flow"/>
            </g>

            {/* Animated Circles - Like Eyes */}
            <g className="eye-circles">
              <circle cx="350" cy="350" r="80" fill="none" stroke="#00d9ff" strokeWidth="3" filter="url(#glow)" opacity="0.9" className="eye-glow"/>
              <circle cx="350" cy="350" r="75" fill="rgba(0, 217, 255, 0.1)"/>
              <circle cx="350" cy="350" r="40" fill="none" stroke="#00d9ff" strokeWidth="2" filter="url(#glow)"/>
              <circle cx="345" cy="345" r="15" fill="#00d9ff" className="pupil"/>

              <circle cx="850" cy="350" r="80" fill="none" stroke="#ff00ff" strokeWidth="3" filter="url(#glow)" opacity="0.9" className="eye-glow"/>
              <circle cx="850" cy="350" r="75" fill="rgba(255, 0, 255, 0.1)"/>
              <circle cx="850" cy="350" r="40" fill="none" stroke="#ff00ff" strokeWidth="2" filter="url(#glow)"/>
              <circle cx="855" cy="345" r="15" fill="#ff00ff" className="pupil"/>
            </g>

            {/* Floating Particles */}
            <g className="particles">
              <circle cx="200" cy="200" r="2" fill="#00d9ff" opacity="0.8" className="particle particle-1"/>
              <circle cx="400" cy="150" r="1.5" fill="#0099ff" opacity="0.6" className="particle particle-2"/>
              <circle cx="800" cy="250" r="2" fill="#ff00ff" opacity="0.7" className="particle particle-3"/>
              <circle cx="1000" cy="300" r="1.5" fill="#00d9ff" opacity="0.6" className="particle particle-4"/>
              <circle cx="300" cy="650" r="2" fill="#ff00ff" opacity="0.8" className="particle particle-5"/>
              <circle cx="900" cy="600" r="1.5" fill="#0099ff" opacity="0.7" className="particle particle-6"/>
              <circle cx="600" cy="100" r="1" fill="#00d9ff" opacity="0.5" className="particle particle-7"/>
              <circle cx="1100" cy="500" r="1.5" fill="#ff00ff" opacity="0.6" className="particle particle-8"/>
            </g>

            {/* Bottom Glow */}
            <ellipse cx="600" cy="750" rx="400" ry="100" fill="none" stroke="#00d9ff" strokeWidth="2" opacity="0.3" filter="url(#glow)"/>
          </svg>
        </div>
        {/* Welcome Text Content */}
        <div className="hero-content-3d">
          <div className="hero-welcome-container">
            <h1 className="hero-title-animated">Welcome <span className="highlight">Students</span></h1>
            <p className="hero-subtitle-animated">Start Your Learning Journey Today</p>
            <Link to="/login" className="btn btn-primary btn-lg btn-hero">
              Get Started
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="stats-bar-3d">
        <div className="container stats-inner">
          {stats.map(({ value, label }, idx) => (
            <div key={label} className="stat-item-3d" style={{ '--delay': `${idx * 100}ms` }}>
              <div className="stat-item-value-3d">{value}</div>
              <div className="stat-item-label-3d">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Classes Grid */}
      <section className="section-3d">
        <div className="container">
          <div className="section-header">
            <div className="section-badge-3d">📖 Curriculum</div>
            <h2 className="section-title-3d">Classes 1 to 10 & PGDCA</h2>
            <p className="section-subtitle">Comprehensive learning programs for every grade level and computer learners</p>
          </div>
          <div className="classes-grid-3d">
            {courses.map((course, idx) => (
              <Link
                key={course.to}
                to={course.to}
                className="class-card-3d"
                style={{ '--index': idx }}
              >
                <div className="class-card-inner">
                  <div className="class-number">{course.number}</div>
                  <div className="class-label">{course.label}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-3d features-section">
        <div className="container">
          <div className="section-header">
            <div className="section-badge-3d">✨ Features</div>
            <h2 className="section-title-3d">Why Choose EduPortal</h2>
            <p className="section-subtitle">Everything you need for successful learning</p>
          </div>
          <div className="features-grid-3d">
            {features.map(({ icon, title, desc }, idx) => (
              <div key={title} className="feature-card-3d" style={{ '--delay': `${idx * 50}ms` }}>
                <div className="feature-icon-3d">{icon}</div>
                <h3 className="feature-title-3d">{title}</h3>
                <p className="feature-desc-3d">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section-3d">
        {/* Animated Tortoise */}
        <svg className="tortoise-animation" viewBox="0 0 1200 200" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          {/* Tortoise Body */}
          <g className="tortoise">
            {/* Shell */}
            <ellipse cx="50" cy="80" rx="35" ry="42" fill="#8B7355" stroke="#5C4A2F" strokeWidth="2"/>
            <path d="M 20 95 Q 50 110, 80 95" fill="#A0825D" stroke="#5C4A2F" strokeWidth="1.5"/>
            <ellipse cx="30" cy="88" rx="8" ry="10" fill="#9D7E5D"/>
            <ellipse cx="50" cy="92" rx="7" ry="9" fill="#9D7E5D"/>
            <ellipse cx="70" cy="88" rx="8" ry="10" fill="#9D7E5D"/>
            
            {/* Head */}
            <circle cx="15" cy="75" r="12" fill="#8B7355" stroke="#5C4A2F" strokeWidth="1.5"/>
            
            {/* Eyes */}
            <circle cx="10" cy="70" r="2.5" fill="#2C1810"/>
            <circle cx="10" cy="70" r="1" fill="#FFD700"/>
            
            {/* Mouth */}
            <path d="M 8 78 Q 12 80, 14 78" fill="none" stroke="#5C4A2F" strokeWidth="0.8" strokeLinecap="round"/>
            
            {/* Front Left Leg */}
            <rect x="28" y="115" width="6" height="20" rx="3" fill="#8B7355" stroke="#5C4A2F" strokeWidth="0.8"/>
            <ellipse cx="31" cy="135" rx="4" ry="5" fill="#A0825D"/>
            
            {/* Front Right Leg */}
            <rect x="62" y="115" width="6" height="20" rx="3" fill="#8B7355" stroke="#5C4A2F" strokeWidth="0.8"/>
            <ellipse cx="65" cy="135" rx="4" ry="5" fill="#A0825D"/>
            
            {/* Back Left Leg */}
            <rect x="22" y="118" width="5" height="18" rx="2.5" fill="#7A6A4A" stroke="#5C4A2F" strokeWidth="0.8"/>
            <ellipse cx="24.5" cy="136" rx="3.5" ry="4" fill="#8B7B5A"/>
            
            {/* Back Right Leg */}
            <rect x="73" y="118" width="5" height="18" rx="2.5" fill="#7A6A4A" stroke="#5C4A2F" strokeWidth="0.8"/>
            <ellipse cx="75.5" cy="136" rx="3.5" ry="4" fill="#8B7B5A"/>
            
            {/* Tail */}
            <path d="M 85 85 Q 95 80, 100 88" fill="none" stroke="#8B7355" strokeWidth="2.5" strokeLinecap="round"/>
          </g>
        </svg>

        <div className="container">
          <div className="cta-content-3d">
            <h2>Ready to Transform Your Education?</h2>
            <p>Join thousands of students already learning smarter</p>
            <Link to="/login" className="btn btn-primary-3d btn-large">
              Get Started Today
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
