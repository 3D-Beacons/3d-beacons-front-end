export interface Stats {
    label: string;
    value: string;
}

export interface SequenceResult {
    accession:string;
    title:string;
    subtitle:string;
    description:string;
    source_organism:string;
    available_structure: string;
    query_sequence: string;
    match_sequence: string;
    match_accession: string;
    match_stats: Array<Stats>;
    sequence_stats: Array<Stats>;
}