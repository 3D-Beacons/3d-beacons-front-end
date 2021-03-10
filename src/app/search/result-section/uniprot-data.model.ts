export interface UniProtEntry {
    accession: string;
    id: string;
    proteinExistence: string;
    info: Info;
    organism: Organism;
    protein: Protein;
    gene: Gene[];
    comments: Comment[];
    features: Feature[];
    dbReferences: DbReference[];
    keywords: FullName[];
    references: Reference[];
    sequence: Sequence;
}

export interface Sequence {
    version: number;
    length: number;
    mass: number;
    modified: string;
    sequence: string;
}

export interface Reference {
    citation: Citation;
    source: Source3;
    scope: string[];
    evidences: Evidence[];
}

export interface Source3 {
    tissue: FullName[];
}

export interface Citation {
    type: string;
    publicationDate: string;
    title: string;
    authors: string[];
    publication: Publication;
    location: Location2;
    dbReferences: DbReference2[];
}

export interface DbReference2 {
    type: string;
    id: string;
}

export interface Location2 {
    volume: string;
    firstPage: string;
    lastPage: string;
}

export interface Publication {
    journalName: string;
}

export interface DbReference {
    type: string;
    id: string;
    properties?: Properties;
    evidences?: Evidence2[];
}

export interface Evidence2 {
    code: string;
    source: Source2;
}

export interface Source2 {
    name: string;
    id: string;
    url: string;
    alternativeUrl: string;
}

export interface Properties {
    'molecule type'?: string;
    'protein sequence ID'?: string;
    term?: string;
    source?: string;
    'entry name'?: string;
    'match status'?: string;
}

export interface Feature {
    type: string;
    category: string;
    description?: string;
    begin: string;
    end: string;
    molecule: string;
    evidences: Evidence[];
}

export interface Comment {
    type: string;
    locations?: Location[];
    text?: FullName[];
}

export interface Location {
    location: FullName;
}

export interface Gene {
    name: FullName;
}

export interface Protein {
    recommendedName: RecommendedName;
    alternativeName: RecommendedName[];
}

export interface RecommendedName {
    fullName: FullName;
}

export interface FullName {
    value: string;
    evidences: Evidence[];
}

export interface Evidence {
    code: string;
    source: Source;
}

export interface Source {
    name: string;
    id: string;
    url: string;
}

export interface Organism {
    taxonomy: number;
    names: Name[];
    lineage: string[];
}

export interface Name {
    type: string;
    value: string;
}

export interface Info {
    type: string;
    created: string;
    modified: string;
    version: number;
}