'use client';

import PageHeader from '@/components/layout/PageHeader';

export default function ContactPage() {
    return (
        <>
            <PageHeader
                title="Contact Us"
                description="We're here to help. Reach out to us through any of these channels."
                badge={{ icon: 'bi bi-envelope-fill', label: 'Contact' }}
                breadcrumbs={[
                    { label: 'nav-home', href: '/' },
                    { label: 'Contact' },
                ]}
            />

            <section className="section">
                <div className="container">
                    <div className="grid grid-3" style={{ gap: 'var(--spacing-md)' }}>
                        <a href="mailto:lgu_aurorazds@yahoo.com" className="contact-card">
                            <div className="contact-card-icon"><i className="bi bi-envelope-fill"></i></div>
                            <div className="contact-card-content">
                                <h3>Email</h3>
                                <p className="contact-card-value">lgu_aurorazds@yahoo.com</p>
                                <span className="contact-card-note">We'll respond within 24 hours</span>
                            </div>
                        </a>
                        <a href="tel:09177012268" className="contact-card">
                            <div className="contact-card-icon"><i className="bi bi-phone-fill"></i></div>
                            <div className="contact-card-content">
                                <h3>Mobile</h3>
                                <p className="contact-card-value">0917-701-2268</p>
                                <span className="contact-card-note">Mon-Fri: 8:00 AM - 5:00 PM</span>
                            </div>
                        </a>
                        <a href="tel:0623312067" className="contact-card">
                            <div className="contact-card-icon"><i className="bi bi-telephone-fill"></i></div>
                            <div className="contact-card-content">
                                <h3>Phone</h3>
                                <p className="contact-card-value">(062) 331-2067</p>
                                <span className="contact-card-note">Mon-Fri: 8:00 AM - 5:00 PM</span>
                            </div>
                        </a>
                    </div>
                </div>
            </section>

            <section className="office-hours-section">
                <div className="container">
                    <div className="office-hours-inner">
                        <div className="office-hours-header">
                            <i className="bi bi-clock-fill"></i>
                            <h2>Office Hours</h2>
                        </div>
                        <div className="office-hours-schedule">
                            <div className="office-hours-item office-hours-item--open">
                                <span className="office-hours-day">Monday - Friday</span>
                                <span className="office-hours-time">8:00 AM - 5:00 PM</span>
                                <span className="office-hours-status">
                                    <i className="bi bi-check-circle-fill"></i>
                                    <span>Open</span>
                                </span>
                            </div>
                            <div className="office-hours-item office-hours-item--break">
                                <span className="office-hours-day">Lunch Break</span>
                                <span className="office-hours-time">12:00 PM - 1:00 PM</span>
                                <span className="office-hours-status">
                                    <i className="bi bi-pause-circle-fill"></i>
                                    <span>Break</span>
                                </span>
                            </div>
                            <div className="office-hours-item office-hours-item--closed">
                                <span className="office-hours-day">Saturday &amp; Sunday</span>
                                <span className="office-hours-time">Closed</span>
                                <span className="office-hours-status">
                                    <i className="bi bi-x-circle-fill"></i>
                                    <span>Closed</span>
                                </span>
                            </div>
                            <div className="office-hours-item office-hours-item--closed">
                                <span className="office-hours-day">National &amp; Local Holidays</span>
                                <span className="office-hours-time">Closed</span>
                                <span className="office-hours-status">
                                    <i className="bi bi-x-circle-fill"></i>
                                    <span>Closed</span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div className="hotlines-header">
                        <div className="hotlines-title">
                            <span className="hotlines-badge">
                                <i className="bi bi-exclamation-triangle-fill"></i>
                                <span>Emergency</span>
                            </span>
                            <h2>Emergency Hotlines</h2>
                        </div>
                        <p>For emergencies and inquiries, contact these numbers anytime.</p>
                    </div>
                    <div className="hotlines-grid">
                        <a href="tel:09177012268" className="hotline-card">
                            <i className="bi bi-building-fill"></i>
                            <span>Mayor's Office 0917 701 2268</span>
                        </a>
                        <a href="tel:09209256688" className="hotline-card">
                            <i className="bi bi-building"></i>
                            <span>Vice Mayor's Office 0920 925 6688</span>
                        </a>
                        <a href="tel:0623312067" className="hotline-card">
                            <i className="bi bi-telephone-fill"></i>
                            <span>Municipal Office (062) 331-2067</span>
                        </a>
                    </div>
                </div>
            </section>

            <section className="section bg-alt">
                <div className="container">
                    <div className="hotlines-header">
                        <div className="hotlines-title">
                            <span className="hotlines-badge hotlines-badge--medical">
                                <i className="bi bi-hospital-fill"></i>
                                <span>Medical</span>
                            </span>
                            <h2>Medical Emergency Hotlines</h2>
                        </div>
                        <p>For medical emergencies and hospital inquiries.</p>
                    </div>
                    <div className="hotlines-grid">
                        <a href="tel:0917" className="hotline-card hotline-card--medical">
                            <i className="bi bi-hospital"></i>
                            <span>RHU Aurora (number needed)</span>
                        </a>
                        <a href="tel:0917" className="hotline-card hotline-card--medical">
                            <i className="bi bi-truck"></i>
                            <span>Ambulance (number needed)</span>
                        </a>
                        <a href="tel:0917" className="hotline-card hotline-card--medical">
                            <i className="bi bi-hospital"></i>
                            <span>Medical Emergency (number needed)</span>
                        </a>
                    </div>
                </div>
            </section>
        </>
    );
}
