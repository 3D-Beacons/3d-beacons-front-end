export interface UniProtEntry {
    ac: string;
    id: string;
    sequence_length: number;
    sequence?: string;
}

export interface Structure {
    model_page_url?: string;
    ensemble_sample_format?: string;
    ensemble_sample_url?: string;
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
    model_format?: string;
}

export interface SummaryResponse {
    uniprot_entry: UniProtEntry;
    structures: Structure[]
}
