export class InfoText {
    label: string; // Label for the text, e.g. 'Organism'
    text: string; // Text
    italic: boolean; // I.e. true/false
    show_long: boolean; // Show the full text, no matter how long, i.e. true/false
    source: string; // Source of the information, if external, e.g. UniProt
    source_url: string; // Link to the source of information, if external
}
