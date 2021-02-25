import * as pvFormat from '../src/app/search/result-section/protvista.model';

export const EXPECTED_STRUCTURE_PROTVISTA: pvFormat.Accession = {
    largeLabels: true,
    tracks: [
        {
            labelType: 'text',
            label: 'Structures (2)',
            data: [
                {
                    accession: '2rh1',
                    labelType: 'text',
                    label: '<strong><a target=\"_blank\" href=\"https://www.ebi.ac.uk/pdbe/coordinates/2rh1/full?encoding=bcif&lowPrecisionCoords=1\">2rh1</a></strong>',
                    color: '#085f5c',
                    type: 'Structure',
                    tooltipContent: 'Structure',
                    labelTooltip: '2rh1 (PDBE)',
                    locations: [
                        {
                            fragments: [
                                {
                                    start: 1,
                                    end: 365,
                                    tooltipContent: 'UniProt range: 1-365<br>Provider: PDBE<br>Category: EXPERIMENTALLY DETERMINED<br>Resolution: 2.4'
                                }
                            ]
                        }
                    ]
                },
                {
                    accession: '60248fbc29ae6a15f7916ed8',
                    labelType: 'text',
                    label: '<strong><a target=\"_blank\" href=\"https://beta.swissmodel.expasy.org/3d-beacons/uniprot/P07550.pdb?range=29-342&template=5d5a.1.A&provider=swissmodel\">60248fbc29ae6a15f7916ed8</a></strong>',
                    color: '#7474bf',
                    type: 'Structure',
                    tooltipContent: 'Structure',
                    labelTooltip: '60248fbc29ae6a15f7916ed8 (SWISSMODEL)',
                    locations: [
                        {
                            fragments: [
                                {
                                    start: 29,
                                    end: 342,
                                    tooltipContent: 'UniProt range: 29-342<br>Provider: SWISSMODEL<br>Category: TEMPLATE-BASED<br>QMEAN: 0.576'
                                }
                            ]
                        }
                    ]
                }
            ],
            overlapping: 'true'
        }
    ],
    legends: {
        alignment: 'right',
        data: {
            Providers: [
                {
                    color: '#7474bf',
                    text: 'SWISSMODEL'
                },
                {
                    color: '#085f5c',
                    text: 'PDBE'
                }
            ]
        }
    },
    length: 413
}