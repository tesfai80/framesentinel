'use client';
import { useState } from 'react';
import { Shield, Mail, Phone, MapPin, Send } from 'lucide-react';
import Link from 'next/link';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', company: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      alert('Message sent! We\'ll get back to you soon.');
      setLoading(false);
      setFormData({ name: '', email: '', company: '', message: '' });
    }, 1500);
  };

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

      <section style={{ marginTop: '80px', padding: '80px 40px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px' }}>
          <div>
            <h1 style={{
              fontSize: '48px',
              fontWeight: 'bold',
              marginBottom: '20px',
              background: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              Get in Touch
            </h1>
            <p style={{ fontSize: '18px', color: '#9ca3af', marginBottom: '40px' }}>
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {[
                { icon: Mail, title: 'Email', value: 'support@framesentinel.com' },
                { icon: Phone, title: 'Phone', value: '+1 (555) 123-4567' },
                { icon: MapPin, title: 'Office', value: 'San Francisco, CA' },
              ].map((contact, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    background: 'rgba(16, 185, 129, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <contact.icon size={24} color="#10b981" />
                  </div>
                  <div>
                    <div style={{ fontSize: '14px', color: '#9ca3af', marginBottom: '4px' }}>{contact.title}</div>
                    <div style={{ fontSize: '16px', color: '#e8eaed', fontWeight: '600' }}>{contact.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{
            padding: '40px',
            background: 'rgba(26, 31, 46, 0.8)',
            borderRadius: '16px',
            border: '1px solid rgba(16, 185, 129, 0.2)',
          }}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600', color: '#e8eaed' }}>
                  Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '14px',
                    background: '#2d3548',
                    border: '1px solid #374151',
                    borderRadius: '10px',
                    color: '#e8eaed',
                    fontSize: '16px',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600', color: '#e8eaed' }}>
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '14px',
                    background: '#2d3548',
                    border: '1px solid #374151',
                    borderRadius: '10px',
                    color: '#e8eaed',
                    fontSize: '16px',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600', color: '#e8eaed' }}>
                  Company
                </label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '14px',
                    background: '#2d3548',
                    border: '1px solid #374151',
                    borderRadius: '10px',
                    color: '#e8eaed',
                    fontSize: '16px',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600', color: '#e8eaed' }}>
                  Message
                </label>
                <textarea
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={5}
                  style={{
                    width: '100%',
                    padding: '14px',
                    background: '#2d3548',
                    border: '1px solid #374151',
                    borderRadius: '10px',
                    color: '#e8eaed',
                    fontSize: '16px',
                    resize: 'vertical',
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{
                  padding: '16px',
                  background: loading ? '#6b7280' : 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  color: '#e8eaed',
                  border: 'none',
                  borderRadius: '10px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                }}
              >
                {loading ? 'Sending...' : 'Send Message'}
                {!loading && <Send size={20} />}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
