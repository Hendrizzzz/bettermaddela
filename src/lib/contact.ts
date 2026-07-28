export interface DepartmentLink {
    href: string;
    icon: string;
    label: string;
}

export const departmentLinks: DepartmentLink[] = [
    {
        href: 'https://staging.ebpls.com/aurorazamboangadelsur/index.php',
        icon: 'bi bi-globe',
        label: 'Business Permit & Licensing (eBPLS)',
    },
    {
        href: 'https://www.facebook.com/pesoaurora/',
        icon: 'bi bi-facebook',
        label: 'PESO Aurora',
    },
    {
        href: 'https://www.facebook.com/negosyocenter.auroralgu/',
        icon: 'bi bi-facebook',
        label: 'Negosyo Center Aurora',
    },
    {
        href: 'https://www.facebook.com/AuroraMPSZSPPO/',
        icon: 'bi bi-shield-shaded',
        label: 'PNP Aurora MPS',
    },
    {
        href: 'https://www.facebook.com/mdrrmcaurora/',
        icon: 'bi bi-exclamation-triangle-fill',
        label: 'MDRRMO Aurora',
    },
    {
        href: 'https://www.facebook.com/rhu.aurora',
        icon: 'bi bi-hospital',
        label: 'RHU Aurora',
    },
];
