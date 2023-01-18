import { SummaryResponse } from "../search/result-section/result-section.model";


export interface Hsp {
    hsp_score: number;
    hsp_bit_score: number;
    hsp_align_len: number;
    hsp_identity: number;
    hsp_positive: number;
    hsp_hseq: string;
    hsp_mseq: string;
    hsp_qseq: string;
}

export interface Hit {
    accession: string;
    description: string;
    hit_hsps: Hsp[];
    hit_length: number;
    id: string;
    summary: SummaryResponse;
}

export interface SearchResult {
    hits: Hit[];
    max_results_per_page: number;
    total_hits: number;
    total_pages: number;
    current_page: number;
}
