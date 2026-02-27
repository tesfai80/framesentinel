'use client';
import { useState } from 'react';
import { Shield, Menu, X } from 'lucide-react';
import Link from 'next/link';

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
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
          padding: '16px 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Shield size={28} color="#10b981" />
            <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#10b981' }}>FrameSentinel</span>
          </Link>
          
          <button
            onClick={() => setIsOpen(!isOpen)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
            }}
          >
            {isOpen ? <X size={28} color="#10b981" /> : <Menu size={28} color="#10b981" />}
          </button>
        </div>
      </nav>

      {isOpen && (
        <div style={{
          position: 'fixed',
          top: '60px',
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(15, 20, 25, 0.98)',
          backdropFilter: 'blur(10px)',
          zIndex: 999,
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}>
          <Link href="/#features" onClick={() => setIsOpen(false)} style={{
            padding: '16px',
            color: '#e8eaed',
            fontSize: '18px',
            borderBottom: '1px solid rgba(16, 185, 129, 0.2)',
          }}>
            Features
          </Link>
          <Link href="/pricing" onClick={() => setIsOpen(false)} style={{
            padding: '16px',
            color: '#e8eaed',
            fontSize: '18px',
            borderBottom: '1px solid rgba(16, 185, 129, 0.2)',
          }}>
            Pricing
          </Link>
          <Link href="/docs" onClick={() => setIsOpen(false)} style={{
            padding: '16px',
            color: '#e8eaed',
            fontSize: '18px',
            borderBottom: '1px solid rgba(16, 185, 129, 0.2)',
          }}>
            Docs
          </Link>
          <Link href="/login" onClick={() => setIsOpen(false)} style={{
            padding: '16px',
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            color: '#e8eaed',
            borderRadius: '8px',
            fontWeight: '600',
            fontSize: '18px',
            textAlign: 'center',
            marginTop: '20px',
          }}>
            Sign In
          </Link>
        </div>
      )}
    </>
  );
}

export function DesktopNav() {
  return (
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
        <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
          <Link href="/#features" style={{ color: '#e8eaed', fontSize: '16px' }}>Features</Link>
          <Link href="/pricing" style={{ color: '#e8eaed', fontSize: '16px' }}>Pricing</Link>
          <Link href="/docs" style={{ color: '#e8eaed', fontSize: '16px' }}>Docs</Link>
          <Link href="/login" style={{
            padding: '10px 24px',
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            color: '#e8eaed',
            borderRadius: '8px',
            fontWeight: '600',
            fontSize: '16px',
          }}>
            Sign In
          </Link>
        </div>
      </div>
    </nav>
  );
}
