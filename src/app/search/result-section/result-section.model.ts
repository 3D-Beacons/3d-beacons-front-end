export interface UniProtEntry {
    ac: string;
    id: string;
    sequence_length: number;
}

export interface Structure {
    coverage: number;
    created: string;
    model_category: string;
    model_identifier: string;
    model_url: string;
    provider: string;
    resolution?: number;
    sequence_identity: number;
    uniprot_end: number;
    uniprot_start: number;
    qmean_version?: string;
    qmean_avg_local_score?: number;
}

export interface SummaryResponse {
    uniprot_entry: UniProtEntry;
    structures: Structure[]
}