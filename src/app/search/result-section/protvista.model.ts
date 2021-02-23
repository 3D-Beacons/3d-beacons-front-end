export interface Fragment {
    start: number;
    end: number;
    pdb_start?: number;
    pdb_end?: number;
    tooltipContent: string;
}

export interface Location {
    fragments: Fragment[];
}

export interface Data {
    accession: string;
    labelType: string;
    label: string;
    color: string;
    locations: Location[];
    type: string;
    tooltipContent: string;
    labelTooltip: string;
    labelColor?: string;
}

export interface Track {
    labelType: string;
    label: string;
    data: Data[];
    overlapping?: string;
    labelColor?: string;
}

export interface LegendItem {
    text: string;
    color: string;
}

export interface Legends {
    alignment: string;
    data: { [ key: string]: LegendItem[] };
}

export interface Accession {
    largeLabels: boolean;
    sequence?: string;
    length: number;
    tracks: Track[];
    legends: Legends;
}
