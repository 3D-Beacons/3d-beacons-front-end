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
            provider: 'PDBE',
            created: '2007-10-05',
            sequence_identity: 69,
            uniprot_start: 1,
            uniprot_end: 365,
            resolution: 2.4,
            coverage: 80.39,
            model_url: 'https://www.ebi.ac.uk/pdbe/coordinates/2rh1/full?encoding=bcif&lowPrecisionCoords=1'
        },
        {
            model_identifier: '60248fbc29ae6a15f7916ed8',
            model_category: 'TEMPLATE-BASED',
            provider: 'SWISSMODEL',
            created: '2021-02-11',
            sequence_identity: 1,
            uniprot_start: 29,
            uniprot_end: 342,
            coverage: 0.76,
            qmean_version: '4.2.0',
            model_url: 'https://beta.swissmodel.expasy.org/3d-beacons/uniprot/P07550.pdb?range=29-342&template=5d5a.1.A&provider=swissmodel'
        }
    ]
}
