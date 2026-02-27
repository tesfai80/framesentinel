'use client';
import { Shield, Users, Target, Award } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div>
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        background: 'rgba(15, 20, 25, 0.95)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(16, 185, 129, 0.2)',
        zIndex: 1000,
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '20px 40px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Shield size={32} color="#10b981" />
            <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#10b981' }}>FrameSentinel</span>
          </Link>
        </div>
      </nav>

      <section style={{ marginTop: '80px', padding: '80px 40px', textAlign: 'center' }}>
        <h1 style={{
          fontSize: '56px',
          fontWeight: 'bold',
          marginBottom: '20px',
          background: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          About FrameSentinel
        </h1>
        <p style={{ fontSize: '20px', color: '#9ca3af', maxWidth: '800px', margin: '0 auto' }}>
          We're on a mission to make video KYC verification secure and trustworthy for everyone.
        </p>
      </section>

      <section style={{ padding: '40px 40px 100px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '30px' }}>
          {[
            { icon: Target, title: 'Our Mission', description: 'To eliminate fraud in video verification through advanced AI technology' },
            { icon: Users, title: 'Our Team', description: 'World-class AI researchers and security experts' },
            { icon: Award, title: 'Our Values', description: 'Security, transparency, and customer success' },
            { icon: Shield, title: 'Our Technology', description: '99.7% accuracy with cutting-edge deep learning models' },
          ].map((item, idx) => (
            <div key={idx} style={{
              padding: '40px',
              background: 'rgba(26, 31, 46, 0.6)',
              borderRadius: '16px',
              border: '1px solid rgba(16, 185, 129, 0.2)',
            }}>
              <item.icon size={48} color="#10b981" style={{ marginBottom: '20px' }} />
              <h3 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '12px', color: '#e8eaed' }}>
                {item.title}
              </h3>
              <p style={{ color: '#9ca3af', fontSize: '16px', lineHeight: '1.6' }}>{item.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
