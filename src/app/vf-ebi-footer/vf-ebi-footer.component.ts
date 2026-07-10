import { Component, signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PDBeLogo } from "./pdbe-logo";
import { FooterLinkConfig } from "./footerLink.model";

@Component({
  selector: "vf-ebi-footer",
  imports: [CommonModule, PDBeLogo],
  templateUrl: "./vf-ebi-footer.component.html",
  styleUrls: ["./vf-ebi-footer.component.scss"],
})
export class VfEbiFooterComponent {
  protected readonly year = new Date().getFullYear();
  protected readonly footerLinks = signal<FooterLinkConfig>({
    firstColumn: {
      title: "EXPLORE PDBE",
      links: [
        { label: "Home", href: "https://www.ebi.ac.uk/pdbe/" },
        { label: "PDBe-KB", href: "https://www.ebi.ac.uk/pdbe/pdbe-kb/" },
        { label: "AlphaFold DB", href: "https://alphafold.ebi.ac.uk/" },
        { label: "Services", href: "https://www.ebi.ac.uk/pdbe/pdbe-services" },
      ],
    },
    secondColumn: {
      title: "USE PDBE-KB",
      links: [
        { label: "Search", href: "https://www.ebi.ac.uk/pdbe/pdbe-kb/" },
        {
          label: "Documentation",
          href: "https://github.com/PDBe-KB/pdbe-kb-manual/wiki",
        },
        {
          label: "Database",
          href: "https://www.ebi.ac.uk/pdbe/pdbe-kb/schema",
        },
        {
          label: "KB Services",
          href: "https://www.ebi.ac.uk/pdbe/pdbe-kb/services",
        },
      ],
    },
    thirdColumn: {
      title: "ABOUT & COMMUNITY",
      links: [
        {
          label: "Join PDBe-KB",
          href: "https://www.ebi.ac.uk/pdbe/pdbe-kb/join",
        },
        {
          label: "Partners",
          href: "https://www.ebi.ac.uk/pdbe/pdbe-kb/partners",
        },
        { label: "About PDBe", href: "https://www.ebi.ac.uk/pdbe/about" },
      ],
    },
  });
}
