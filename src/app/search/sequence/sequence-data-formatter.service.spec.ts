import { TestBed } from '@angular/core/testing';
import { SequenceDataFormatterService } from './sequence-data-formatter.service';

describe('SequenceDataFormatterService', () => {
  let service: SequenceDataFormatterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SequenceDataFormatterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // test to cover getSourceOrganisms()
  it('Should return SourceOrganisms', () => {
    const hit_uni_os = "sdfsdfsdfsdfsdf";
    const hit_com_os = "sdsdfsd";
    const expectedSourceOrganisms = "sdfsdfsdfsdfsdf (sdsdfsd)"
    const sourceOrganisms =  service.getSourceOrganisms(hit_uni_os,hit_com_os);
    expect(sourceOrganisms).toEqual(expectedSourceOrganisms);
  });

  // test to cover getAvailableStructure()
  it('Should return AvailableStructure', () => {
    const strutures = [
      {summary:{provider: "AlphaFold DB"}},
      {summary:{provider: "AlphaFill"}},
    ]
    const expectedAvailableStructures = "2 structures from AlphaFold DB, AlphaFill";
    const availableStructures =  service.getAvailableStructure(strutures);
    expect(availableStructures).toEqual(expectedAvailableStructures);
  });

  // test to cover getMatchStats()
  it('Should return getMatchStats', () => {
    const hsp = {
      "hsp_align_len": 29,
      "hsp_bit_score": 61.2326,
      "hsp_expect": 1.9e-10,
      "hsp_hseq": "MNMLVINGTPRKHGRTRIAASYISALYHT",
      "hsp_identity": 96.6,
      "hsp_mseq": "MNMLVINGTPRKHGRTRIAASYI+ALYHT",
      "hsp_positive": 100,
      "hsp_qseq":"MNMLVINGTPRKHGRTRIAASYIAALYHT",
      "hsp_score": 147
    }
    const expectedMatchStats = [
      {label: 'Identity', value: '97%'},
      {label: 'HSP score', value: 147},
      {label: 'E-value', value: 1.9e-10},
      {label: 'Positives', value: '29/29 (100%)'},
      {label: 'Gaps', value: '0/29 (0%)'}
    ];
    const matchStats =  service.getMatchStats(hsp);
    expect(expectedMatchStats).toEqual(matchStats);
  });

  // test to cover getSequenceStats()
  it('Should return getSequenceStats', () => {
    const hsp = {
      "hsp_align_len": 29,
      "hsp_bit_score": 61.2326,
      "hsp_expect": 1.9e-10,
      "hsp_hseq": "MNMLVINGTPRKHGRTRIAASYISALYHT",
      "hsp_identity": 96.6,
      "hsp_mseq": "MNMLVINGTPRKHGRTRIAASYI+ALYHT",
      "hsp_positive": 100,
      "hsp_qseq":"MNMLVINGTPRKHGRTRIAASYIAALYHT",
      "hsp_score": 147
    }
    const expectedSequenceStats = [
      {label: 'Query length', value: 29},
      {label: 'Align length', value: 28},
      {label: 'Target length', value: 29}
    ];
    const sequenceStats =  service.getSequenceStats(hsp);
    expect(expectedSequenceStats).toEqual(sequenceStats);
  });

  // test to cover formatData()
  it('Should return formatData', () => {
    const sequenceResponse = [{
        "accession": "A0A809FN55",
        "id": "A0A809FN55_BACIU",
        "description": "NAD(P)H-dependent oxidoreductase OS=Bacillus subtilis subsp. subtilis OX=135461 GN=D9C10_03195 PE=4 SV=1",
        "hit_length": 174,
        "hit_hsps": [
            {
                "hsp_score": 150.0,
                "hsp_bit_score": 62.3882,
                "hsp_align_len": 29,
                "hsp_identity": 100.0,
                "hsp_positive": 100.0,
                "hsp_qseq": "MNMLVINGTPRKHGRTRIAASYIAALYHT",
                "hsp_hseq": "MNMLVINGTPRKHGRTRIAASYIAALYHT",
                "hsp_mseq": "MNMLVINGTPRKHGRTRIAASYIAALYHT",
                "hsp_expect": 6.9e-11
            }
        ],
        "summary": {
            "uniprot_entry": {
                "ac": "A0A809FN55",
                "id": "A0A809FN55_BACIU",
                "uniprot_checksum": "DCD2A2EAA2677C1E",
                "sequence_length": 174,
                "segment_start": 1,
                "segment_end": 174,
                "description": null
            },
            "structures": [
                {
                    "summary": {
                        "model_identifier": "AF-A0A809FN55-F1",
                        "model_category": "AB-INITIO",
                        "model_url": "https://alphafold.ebi.ac.uk/files/AF-A0A809FN55-F1-model_v4.cif",
                        "model_format": "MMCIF",
                        "model_type": null,
                        "model_page_url": "https://alphafold.ebi.ac.uk/entry/A0A809FN55",
                        "provider": "AlphaFold DB",
                        "number_of_conformers": null,
                        "ensemble_sample_url": null,
                        "ensemble_sample_format": null,
                        "created": "2022-06-01",
                        "sequence_identity": 1.0,
                        "uniprot_start": 1,
                        "uniprot_end": 174,
                        "coverage": 1.0,
                        "experimental_method": null,
                        "resolution": null,
                        "confidence_type": "pLDDT",
                        "confidence_version": null,
                        "confidence_avg_local_score": 96.25,
                        "oligomeric_state": null,
                        "preferred_assembly_id": null,
                        "entities": [
                            {
                                "entity_type": "POLYMER",
                                "entity_poly_type": "POLYPEPTIDE(L)",
                                "identifier": "A0A809FN55",
                                "identifier_category": "UNIPROT",
                                "description": "NAD(P)H-dependent oxidoreductase",
                                "chain_ids": [
                                    "A"
                                ]
                            }
                        ]
                    }
                },
                {
                    "summary": {
                        "model_identifier": "A0A809FN55",
                        "model_category": "TEMPLATE-BASED",
                        "model_url": "https://alphafill.eu/v1/aff/A0A809FN55",
                        "model_format": "MMCIF",
                        "model_type": null,
                        "model_page_url": "https://alphafill.eu/model?id=A0A809FN55",
                        "provider": "AlphaFill",
                        "number_of_conformers": null,
                        "ensemble_sample_url": null,
                        "ensemble_sample_format": null,
                        "created": "2023-01-17",
                        "sequence_identity": 1.0,
                        "uniprot_start": 1,
                        "uniprot_end": 174,
                        "coverage": 1.0,
                        "experimental_method": null,
                        "resolution": null,
                        "confidence_type": null,
                        "confidence_version": null,
                        "confidence_avg_local_score": null,
                        "oligomeric_state": null,
                        "preferred_assembly_id": null,
                        "entities": [
                            {
                                "entity_type": "POLYMER",
                                "entity_poly_type": "POLYPEPTIDE(L)",
                                "identifier": null,
                                "identifier_category": null,
                                "description": "NAD(P)H-dependent oxidoreductase",
                                "chain_ids": [
                                    "A"
                                ]
                            },
                            {
                                "entity_type": "NON-POLYMER",
                                "entity_poly_type": null,
                                "identifier": null,
                                "identifier_category": null,
                                "description": "FLAVIN MONONUCLEOTIDE",
                                "chain_ids": [
                                    "B",
                                    "C",
                                    "D",
                                    "E",
                                    "F"
                                ]
                            }
                        ]
                    }
                }
            ]
        },
        "hit_uni_ox": 135461,
        "hit_uni_os": "Bacillus subtilis subsp. subtilis",
        "hit_com_os": "Bacillus subtilis subsp. subtilis",
        "title": "NAD(P)H-dependent oxidoreductase"
    }];
    const expectedResults = 
    {
      "accession": "A0A809FN55",
      "title": "NAD(P)H-dependent oxidoreductase",
      "subtitle": "A0A809FN55 (A0A809FN55_BACIU)",
      "description": "NAD(P)H-dependent oxidoreductase OS=Bacillus subtilis subsp. subtilis OX=135461 GN=D9C10_03195 PE=4 SV=1",
      "source_organism": "Bacillus subtilis subsp. subtilis",
      "available_structure": "2 structures from AlphaFold DB, AlphaFill",
      "query_sequence": "MNMLVINGTPRKHGRTRIAASYIAALYHT",
      "match_sequence": "MNMLVINGTPRKHGRTRIAASYIAALYHT",
      "match_accession": "MNMLVINGTPRKHGRTRIAASYIAALYHT",
      "match_stats":[
        {label: 'Identity', value: '100%'},
        {label: 'HSP score', value: 150},
        {label: 'E-value', value: 6.9e-11},
        {label: 'Positives', value: '29/29 (100%)'},
        {label: 'Gaps', value: '0/29 (0%)'}
      ],
      "sequence_stats":[
        {label: 'Query length', value: 29},
        {label: 'Align length', value: 29},
        {label: 'Target length', value: 29}
      ]
    };
    const formatResults =  service.formatData(sequenceResponse);
    expect(expectedResults.accession).toBe("A0A809FN55");
    expect(expectedResults.match_accession).toBe("MNMLVINGTPRKHGRTRIAASYIAALYHT");
  });

});
