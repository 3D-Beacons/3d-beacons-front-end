import * as pvFormat from '../src/app/search/result-section/protvista.model';

export const EXPECTED_STRUCTURE_PROTVISTA: pvFormat.Accession = {
  largeLabels: true,
  tracks: [
    {
      labelType: 'text',
      label: '<span style="color:#fff">Experimentally determined</span> <span style="color:#fff">(1)</span>',
      data: [
        {
          accession: '4lde',
          labelType: 'text',
          label: '<strong><a href="https://www.ebi.ac.uk/pdbe/entry/pdb/4lde" target="_blank">PDBe</a></strong><span style="float: right; margin-right: 5px;"><a data-url="https://www.ebi.ac.uk/pdbe/static/entry/4lde_updated.cif" data-format="mmcif" data-model-identifier="4lde" data-model-provider="PDBe" onclick="updateMolstar(this)" style="border-bottom: none;"><i class="icon icon-common icon-eye" style="margin-left: 10px; background-color: #dff1f0; padding: 5px; border: 1px solid black"></i></a><a target="_blank" href="https://www.ebi.ac.uk/pdbe/static/entry/4lde_updated.cif" style="border-bottom: none;" download><i class="icon icon-common icon-download" style="margin-left: 10px; background-color: #dff1f0; padding: 5px; border: 1px solid black"></i></a></span>',
          color: '#085f5c',
          type: 'Structure',
          tooltipContent: 'Structure',
          labelTooltip: 'ID: 4lde (PDBe)',
          labelColor: '#C0DCDB',
          locations: [
            {
              fragments: [
                {
                  start: 29,
                  end: 348,
                  tooltipContent: 'UniProt range: 29-348<br>Provider: PDBe<br>Category: Experimentally determined<br>Resolution: 2.79Å<br><a target="_blank" href="https://www.ebi.ac.uk/pdbe/static/entry/4lde_updated.cif">Click to Download <i class="icon icon-common icon-download"></i></a>'
                }
              ]
            }
          ]
        }
      ],
      overlapping: 'true'
    },
    {
      labelType: 'text',
      label: 'AB-INITIO (1)',
      data: [
        {
          accession: 'AF-P07550-F1',
          labelType: 'text',
          label: '<strong>4lde</strong><a data-url="https://www.ebi.ac.uk/pdbe/static/entry/4lde_updated.cif" data-format="mmcif" onclick="updateMolstar(this)" style="border-bottom: none;"><i class="icon icon-common icon-eye" style="padding-left: 10px;"></i></a><a target="_blank" href="https://www.ebi.ac.uk/pdbe/static/entry/4lde_updated.cif" style="border-bottom: none;" download><i class="icon icon-common icon-download" style="padding-left: 5px;"></i></a>',
          color: '#0053d6',
          type: 'Structure',
          tooltipContent: 'Structure',
          labelTooltip: 'ID: AF-P07550-F1 (AlphaFold DB)',
          locations: [
            {
              fragments: [
                {
                  start: 29,
                  end: 342,
                  tooltipContent: 'UniProt range: 29-342<br>Provider: AlphaFold DB<br>Category: AB-INITIO<br>QMEAN: 0.576<br><a target="_blank" href="https://beta.swissmodel.expasy.org/3d-beacons/uniprot/P07550.pdb?range=29-342&template=5d5a.1.A&provider=swissmodel"' +
                    '>Click to Download <i class="icon icon-common icon-download"></i></a>'

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
          color: '#085f5c',
          text: 'PDBe'
        },
        {
          color: '#0053d6',
          text: 'AlphaFold DB'
        }
      ]
    }
  },
  length: 413
};
