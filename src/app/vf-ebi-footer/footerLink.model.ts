interface FooterLink {
  label: string;
  href: string;
}

interface FooterLinkColumn {
  title: string;
  links: FooterLink[];
}

export interface FooterLinkConfig {
  firstColumn: FooterLinkColumn;
  secondColumn: FooterLinkColumn;
  thirdColumn: FooterLinkColumn;
}
