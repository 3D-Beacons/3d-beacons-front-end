export interface UniProtEntry {
    ac: string;
    id: string;
    sequence_length: number;
    sequence?: string;
}


export interface Entity {
    entity_type: string;
    entity_poly_type?: string;
    identifier: string;
    identifier_category: string;
    description: string;
    chain_ids: string[];
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
    confidence_version?: string;
    confidence_type?: string;
    confidence_avg_local_score?: number;
    model_format?: string;
    entities: Entity[];
    experimental_method?: string;
    model_type?: string;
    number_of_conformers?: number;
    oligomeric_state?: string;
    preferred_assembly_id?: string;
}

export interface Overview {
    summary: Structure
}

export interface SummaryResponse {
    uniprot_entry: UniProtEntry;
    structures: Overview[]
}
