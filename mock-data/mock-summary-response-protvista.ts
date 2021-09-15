import { SummaryResponse } from 'src/app/search/result-section/result-section.model'

export const MOCK_SUMMARY_RESPONSE_PROTVISTA: SummaryResponse = {
    uniprot_entry: {
        sequence_length: 413,
        ac: 'P07550',
        id: 'ADRB2_HUMAN'
    },
    structures: [
        {
            model_identifier: '2rh1',
            model_category: 'EXPERIMENTALLY DETERMINED',
            provider: 'PDBe',
            created: '2007-10-05',
            sequence_identity: 69,
            uniprot_start: 1,
            uniprot_end: 365,
            resolution: 2.4,
            coverage: 80.39,
            model_url: 'https://www.ebi.ac.uk/pdbe/static/entry/2rh1_updated.cif',
            model_format: 'MMCIF'
        },
        {
            model_identifier: '60248fbc29ae6a15f7916ed8',
            model_category: 'TEMPLATE-BASED',
            provider: 'SWISS-MODEL',
            created: '2021-02-11',
            sequence_identity: 1,
            uniprot_start: 29,
            uniprot_end: 342,
            coverage: 0.76,
            confidence_version: '4.2.0',
            confidence_avg_local_score: 0.576,
            model_url: 'https://beta.swissmodel.expasy.org/3d-beacons/uniprot/P07550.pdb?range=29-342&template=5d5a.1.A&provider=swissmodel',
            model_format: 'PDB'
        }
    ]
}
