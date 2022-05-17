import { SummaryResponse } from 'src/app/search/result-section/result-section.model'

export const MOCK_SUMMARY_RESPONSE: SummaryResponse = {
    uniprot_entry: {
        ac: "P07550",
        id: "ADRB2_HUMAN",
        sequence_length: 413
    },
    structures: [
        {
            summary: {
                model_identifier: "4lde",
                model_category: "EXPERIMENTALLY DETERMINED",
                model_url: "https://www.ebi.ac.uk/pdbe/static/entry/4lde_updated.cif",
                model_format: "MMCIF",
                model_page_url: "https://www.ebi.ac.uk/pdbe/entry/pdb/4lde",
                provider: "PDBe",
                created: "2013-06-24",
                sequence_identity: 90,
                uniprot_start: 29,
                uniprot_end: 348,
                coverage: 70.7,
                experimental_method: "X-RAY DIFFRACTION",
                resolution: 2.79,
                entities: [
                    {
                        entity_type: "POLYMER",
                        entity_poly_type: "POLYPEPTIDE(L)",
                        identifier: "P00720",
                        identifier_category: "UNIPROT",
                        description: "Lysozyme, Beta-2 adrenergic receptor",
                        chain_ids: [
                            "A"
                        ]
                    },
                    {
                        entity_type: "POLYMER",
                        entity_poly_type: "POLYPEPTIDE(L)",
                        identifier: "P07550",
                        identifier_category: "UNIPROT",
                        description: "Lysozyme, Beta-2 adrenergic receptor",
                        chain_ids: [
                            "A"
                        ]
                    },
                    {
                        entity_type: "NON-POLYMER",
                        identifier: "NA",
                        identifier_category: "CCD",
                        description: "SODIUM ION",
                        chain_ids: [
                            "A"
                        ]
                    },
                    {
                        entity_type: "NON-POLYMER",
                        identifier: "1WV",
                        identifier_category: "CCD",
                        description: "(2S)-2,3-dihydroxypropyl (7Z)-tetradec-7-enoate",
                        chain_ids: [
                            "A"
                        ]
                    },
                    {
                        entity_type: "NON-POLYMER",
                        identifier: "P0G",
                        identifier_category: "CCD",
                        description: "8-[(1R)-2-{[1,1-dimethyl-2-(2-methylphenyl)ethyl]amino}-1-hydroxyethyl]-5-hydroxy-2H-1,4-benzoxazin-3(4H)-one",
                        chain_ids: [
                            "A"
                        ]
                    }
                ]
            }
        },
        {
            summary: {
                model_identifier: "AF-P07550-F1",
                model_category: "AB-INITIO",
                model_url: "https://storage.googleapis.com/staging-mirror-317014/AF-P07550-F1-model_v2.cif?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=af-api%40pdbe-af-staging-317014.iam.gserviceaccount.com%2F20220517%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20220517T095758Z&X-Goog-Expires=1800&X-Goog-SignedHeaders=host&response-content-disposition=attachment%3B%20filename%3D%22AF-P07550-F1-model_v2.cif%22&X-Goog-Signature=6a0ff18891687cc9729319b65f2b2e6ba2e4ab715208a7575cc106868be65f7388b4adc1927577b7d4c2eeb853c42ca8cc252480a660ab1edb4f26886db80f16bf02a104f985225b797aa0c5a64ded105ed99ffcca19e33cda0745aea814011a8cf5fffe880f23c1c2c8fae59c8fdeeaa633eed6634f6dd5aee583ecb4089b944f1ec9b804365d0a0b649b6ae00ee9e62959b95825384349ecf23455a4a3483f962a0ed0c5e03b4866250b024e92d4b03cc99fb1168e70e16f78ae696bc27f8e25eb6da107b966bc0d77098e06e2285463814c8feb202a8454138b9c96186620f37142ed5c7eff640027d6a019c8da0dae3a77fbbcd9bd5ed5b19e493e0cb2f9",
                model_format: "MMCIF",
                model_type: null,
                model_page_url: "None/entry/P07550",
                provider: "AlphaFold DB",
                number_of_conformers: null,
                ensemble_sample_url: null,
                ensemble_sample_format: null,
                created: "2021-07-01",
                sequence_identity: 1,
                uniprot_start: 1,
                uniprot_end: 413,
                coverage: 100,
                experimental_method: null,
                resolution: null,
                confidence_type: "pLDDT",
                confidence_version: null,
                confidence_avg_local_score: 79.04,
                oligomeric_state: null,
                preferred_assembly_id: null,
                entities: [
                    {
                        entity_type: "POLYMER",
                        entity_poly_type: "POLYPEPTIDE(L)",
                        identifier: "P07550",
                        identifier_category: "UNIPROT",
                        description: "Beta-2 adrenergic receptor",
                        chain_ids: [
                            "A"
                        ]
                    }
                ]
            }
        }
    ]
}
