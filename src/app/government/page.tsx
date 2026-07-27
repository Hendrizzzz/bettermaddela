'use client';

import Link from 'next/link';
import PageHeader from '@/components/layout/PageHeader';
import officialsData from '@/data/officials.json';
import barangaysData from '@/data/barangays.json';

const departments = [
    {
        href: '/service-details/municipal-civil-registrar',
        icon: 'bi bi-file-earmark-text-fill',
        title: 'Municipal Civil Registrar',
        desc: 'Birth, death, marriage certificates, CENOMAR',
        contacts: [
            { icon: 'bi bi-telephone', value: '(062) 331-2067' },
            { icon: 'bi bi-envelope', value: 'lgu_aurorazds@yahoo.com' },
        ],
    },
    {
        href: '/service-details/municipal-treasurer',
        icon: 'bi bi-cash-coin',
        title: "Municipal Treasurer's Office",
        desc: 'Tax payments, real property tax, revenue collection',
        contacts: [
            { icon: 'bi bi-telephone', value: '(062) 331-2067' },
            { icon: 'bi bi-envelope', value: 'lgu_aurorazds@yahoo.com' },
        ],
    },
    {
        href: '/service-details/municipal-engineering',
        icon: 'bi bi-building-fill-gear',
        title: 'Municipal Engineering Office',
        desc: 'Building permits, construction permits, infrastructure',
        contacts: [
            { icon: 'bi bi-telephone', value: '(062) 331-2067' },
            { icon: 'bi bi-envelope', value: 'lgu_aurorazds@yahoo.com' },
        ],
    },
    {
        href: '/service-details/mswdo-services',
        icon: 'bi bi-people-fill',
        title: 'MSWDO',
        desc: 'Social services, PWD & senior citizen IDs, financial assistance',
        contacts: [
            { icon: 'bi bi-telephone', value: '(062) 331-2067' },
            { icon: 'bi bi-envelope', value: 'lgu_aurorazds@yahoo.com' },
        ],
    },
    {
        href: '/service-details/municipal-agriculture',
        icon: 'bi bi-tree-fill',
        title: 'Municipal Agriculture Office',
        desc: 'Agricultural loans, crop insurance, fertilizer assistance',
        contacts: [
            { icon: 'bi bi-telephone', value: '(062) 331-2067' },
            { icon: 'bi bi-envelope', value: 'lgu_aurorazds@yahoo.com' },
        ],
    },
    {
        href: '/service-details/municipal-planning',
        icon: 'bi bi-clipboard-data-fill',
        title: 'Municipal Planning & Development',
        desc: 'Development planning, project monitoring, zoning',
        contacts: [
            { icon: 'bi bi-telephone', value: '(062) 331-2067' },
            { icon: 'bi bi-envelope', value: 'lgu_aurorazds@yahoo.com' },
        ],
    },
    {
        href: '/service-details/municipal-assessor',
        icon: 'bi bi-house-door-fill',
        title: "Municipal Assessor's Office",
        desc: 'Property assessment, tax declarations, land records',
        contacts: [
            { icon: 'bi bi-telephone', value: '(062) 331-2067' },
            { icon: 'bi bi-envelope', value: 'lgu_aurorazds@yahoo.com' },
        ],
    },
    {
        href: '/service-details/municipal-accounting',
        icon: 'bi bi-calculator-fill',
        title: 'Municipal Accounting Office',
        desc: 'Financial records, disbursements, accounting services',
        contacts: [
            { icon: 'bi bi-telephone', value: '(062) 331-2067' },
            { icon: 'bi bi-envelope', value: 'lgu_aurorazds@yahoo.com' },
        ],
    },
    {
        href: '/service-details/municipal-budget',
        icon: 'bi bi-piggy-bank-fill',
        title: 'Municipal Budget Office',
        desc: 'Budget preparation, appropriations, fiscal management',
        contacts: [
            { icon: 'bi bi-telephone', value: '(062) 331-2067' },
            { icon: 'bi bi-envelope', value: 'lgu_aurorazds@yahoo.com' },
        ],
    },
    {
        href: '/service-details/municipal-general-services',
        icon: 'bi bi-gear-fill',
        title: 'Municipal General Services Office',
        desc: 'Property management, procurement, administration',
        contacts: [
            { icon: 'bi bi-telephone', value: '(062) 331-2067' },
            { icon: 'bi bi-envelope', value: 'lgu_aurorazds@yahoo.com' },
        ],
    },
    {
        href: '/services/health',
        icon: 'bi bi-heart-pulse-fill',
        title: 'Municipal Health Office',
        desc: 'Vaccination, health certificates, medical assistance',
        contacts: [
            { icon: 'bi bi-telephone', value: '(062) 331-2067' },
            { icon: 'bi bi-envelope', value: 'lgu_aurorazds@yahoo.com' },
        ],
    },
    {
        href: '/service-details/business-permits-licensing',
        icon: 'bi bi-shop',
        title: 'Business Permits & Licensing',
        desc: "Business permits, Mayor's clearance, licensing",
        contacts: [
            { icon: 'bi bi-telephone', value: '(062) 331-2067' },
            { icon: 'bi bi-envelope', value: 'lgu_aurorazds@yahoo.com' },
        ],
    },
    {
        href: '/service-details/human-resource-management',
        icon: 'bi bi-person-badge-fill',
        title: 'Human Resource Management',
        desc: 'Personnel services, recruitment, employee records',
        contacts: [
            { icon: 'bi bi-telephone', value: '(062) 331-2067' },
            { icon: 'bi bi-envelope', value: 'lgu_aurorazds@yahoo.com' },
        ],
    },
    {
        href: '/services/public-safety',
        icon: 'bi bi-exclamation-triangle-fill',
        title: 'MDRRMO',
        desc: 'Disaster preparedness, emergency response, risk reduction',
        contacts: [
            { icon: 'bi bi-telephone', value: '0917 701 2268' },
            { icon: 'bi bi-envelope', value: 'lgu_aurorazds@yahoo.com' },
        ],
    },
    {
        href: '/service-details/seedo-public-market',
        icon: 'bi bi-shop-window',
        title: 'Economic Enterprise – Public Market',
        desc: 'Market clearance, entrance fees, vendor services, CTC',
        contacts: [{ icon: 'bi bi-telephone', value: '(062) 331-2067' }],
    },
    {
        href: '/service-details/seedo-slaughterhouse',
        icon: 'bi bi-box-seam',
        title: 'Economic Enterprise – Slaughterhouse',
        desc: 'Hog, cattle, goat, carabao slaughter with meat inspection',
        contacts: [{ icon: 'bi bi-telephone', value: '(062) 331-2067' }],
    },
];

const barangays = barangaysData.barangays;

const councilors = officialsData.councilors.map((c) => ({
    name: c.name,
    committees: c.title,
}));

function SectionBadge({ icon, label, gradient }: { icon: string; label: string; gradient: string }) {
    return (
        <span
            className="inline-badge"
            style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: gradient,
                color: 'white',
                padding: '8px 20px',
                borderRadius: '50px',
                fontSize: '0.875rem',
                marginBottom: 'var(--spacing-sm)',
            }}
        >
            <i className={icon}></i>
            <span>{label}</span>
        </span>
    );
}

export default function GovernmentPage() {
    return (
        <>
            <PageHeader
                title="Government Structure & Officials"
                description="Meet the leadership and offices serving Aurora"
                badge={{ icon: 'bi bi-building-fill', label: 'Government' }}
                breadcrumbs={[
                    { label: 'nav-home', href: '/' },
                    { label: 'Government' },
                ]}
            />

            {/* Executive Branch */}
            <section className="section" style={{ background: 'var(--color-bg-alt)' }}>
                <div className="container">
                    <div className="text-center" style={{ marginBottom: 'var(--spacing-xl)' }}>
                        <SectionBadge
                            icon="bi bi-star-fill"
                            label="Executive Branch"
                            gradient="linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)"
                        />
                        <h3 style={{ fontSize: '1.75rem', marginBottom: 'var(--spacing-xs)' }}>
                            Municipal Leadership
                        </h3>
                        <p style={{ color: 'var(--color-text-light)' }}>
                            The executive officials leading Aurora&apos;s governance
                        </p>
                    </div>

                    <div className="grid grid-2" style={{ gap: 'var(--spacing-lg)' }}>
                        <div className="executive-card">
                            <div className="executive-card-header">
                                <span className="executive-badge">Municipal Mayor</span>
                                <h4 className="executive-name">{officialsData.mayor.name}</h4>
                            </div>
                            <div className="executive-card-body">
                                <div className="executive-contacts">
                                    <a href="mailto:lgu_aurorazds@yahoo.com">
                                        <i className="bi bi-envelope"></i>
                                        <span>lgu_aurorazds@yahoo.com</span>
                                    </a>
                                    <a href="tel:09177012268">
                                        <i className="bi bi-telephone"></i> 0917 701 2268
                                    </a>
                                    <span>
                                        <i className="bi bi-clock"></i> Mon-Fri: 8:00 AM - 5:00 PM
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="executive-card">
                            <div className="executive-card-header">
                                <span className="executive-badge">Municipal Vice Mayor</span>
                                <h4 className="executive-name">{officialsData.vice_mayor.name}</h4>
                            </div>
                            <div className="executive-card-body">
                                <div className="executive-contacts">
                                    <a href="mailto:lgu_aurorazds@yahoo.com">
                                        <i className="bi bi-envelope"></i>
                                        <span>lgu_aurorazds@yahoo.com</span>
                                    </a>
                                    <a href="tel:09209256688">
                                        <i className="bi bi-telephone"></i> 0920 925 6688
                                    </a>
                                    <span>
                                        <i className="bi bi-clock"></i> Mon-Fri: 8:00 AM - 5:00 PM
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Municipal Council */}
            <section className="section">
                <div className="container">
                    <div className="text-center" style={{ marginBottom: 'var(--spacing-xl)' }}>
                        <SectionBadge
                            icon="bi bi-people-fill"
                            label="Legislative Branch"
                            gradient="linear-gradient(135deg, var(--color-success) 0%, #05c793 100%)"
                        />
                        <h3 style={{ fontSize: '1.75rem', marginBottom: 'var(--spacing-xs)' }}>
                            Sangguniang Bayan Members
                        </h3>
                        <p style={{ color: 'var(--color-text-light)' }}>
                            Municipal Councilors serving the people of Aurora
                        </p>
                    </div>

                    <div className="grid grid-3" style={{ gap: 'var(--spacing-md)' }}>
                        {councilors.map((c) => (
                            <div
                                key={c.name}
                                className="councilor-card"
                            >
                                <h4 className="councilor-name">{c.name}</h4>
                                <span className="councilor-badge">SB Member</span>
                                <p className="councilor-committees">{c.committees}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Department Heads */}
            <section className="section" style={{ background: 'var(--color-bg-alt)' }}>
                <div className="container">
                    <div className="text-center" style={{ marginBottom: 'var(--spacing-xl)' }}>
                        <SectionBadge
                            icon="bi bi-building-fill"
                            label="Municipal Offices"
                            gradient="linear-gradient(135deg, var(--color-info) 0%, #0099cc 100%)"
                        />
                        <h3 style={{ fontSize: '1.75rem', marginBottom: 'var(--spacing-xs)' }}>
                            Department Heads & Key Offices
                        </h3>
                        <p style={{ color: 'var(--color-text-light)' }}>
                            Municipal offices providing services to citizens
                        </p>
                    </div>

                    <div className="grid grid-3" style={{ gap: 'var(--spacing-md)' }}>
                        {departments.map((dept) => (
                            <Link
                                key={dept.title}
                                href={dept.href}
                                className="dept-card dept-card-link-wrap"
                            >
                                <div className="dept-card-icon">
                                    <i className={dept.icon}></i>
                                </div>
                                <div className="dept-card-content">
                                    <h4 className="dept-card-title">{dept.title}</h4>
                                    <p className="dept-card-desc">{dept.desc}</p>
                                    <div className="dept-card-contacts">
                                        {dept.contacts.map((contact) => (
                                            <span key={contact.value}>
                                                <i className={contact.icon}></i> {contact.value}
                                            </span>
                                        ))}
                                    </div>
                                    <span className="dept-card-link">
                                        <i className="bi bi-arrow-right"></i>
                                        <span>View Services</span>
                                    </span>
                                </div>
                            </Link>
                        ))}
                        <div className="dept-card">
                            <div className="dept-card-icon">
                                <i className="bi bi-briefcase-fill"></i>
                            </div>
                            <div className="dept-card-content">
                                <h4 className="dept-card-title">PESO</h4>
                                <p className="dept-card-desc">
                                    Job placement, employment assistance, career guidance
                                </p>
                                <div className="dept-card-contacts">
                                    <a href="tel:09171551043">
                                        <i className="bi bi-telephone"></i> 0917-155-1043
                                    </a>
                                    <a
                                        href="https://www.facebook.com/profile.php?id=61564916854423"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <i className="bi bi-facebook"></i>
                                        <span>View Job Vacancies</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Barangays */}
            <section className="section">
                <div className="container">
                    <div className="text-center" style={{ marginBottom: 'var(--spacing-xl)' }}>
                        <SectionBadge
                            icon="bi bi-geo-alt-fill"
                            label="Barangay Units"
                            gradient="linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)"
                        />
                        <h3 style={{ fontSize: '1.75rem', marginBottom: 'var(--spacing-xs)' }}>
                            Barangays of Aurora
                        </h3>
                        <p style={{ color: 'var(--color-text-light)' }}>
                            44 Barangays serving our community
                        </p>
                    </div>

                    <div className="grid grid-4" style={{ gap: 'var(--spacing-sm)' }}>
                        {barangays.map((b) => (
                            <a key={b.name} href="/government/officials" className="barangay-card">
                                <div className="barangay-card-header">
                                    <i className="bi bi-geo-alt-fill"></i>
                                    <span className="barangay-name">{b.name}</span>
                                </div>
                                <div className="barangay-card-body">
                                    <span className="barangay-captain">{b.captain}</span>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
