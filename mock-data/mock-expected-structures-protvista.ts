import * as pvFormat from '../src/app/search/result-section/protvista.model';

export const EXPECTED_STRUCTURE_PROTVISTA: pvFormat.Accession = {
  largeLabels: true,
  tracks: [
    {
      labelType: 'text',
      label: '<span style="color:#fff">Experimentally determined</span> <span style="color:#fff">(1)</span>',
      data: [
        {
          accession: '2rh1',
          labelType: 'text',
          label: '<strong>PDBE</strong><span style="float: right; margin-right: 5px;"><a data-url="https://www.ebi.ac.uk/pdbe/static/entry/2rh1_updated.cif" data-format="mmcif" onclick="updateMolstar(this)" style="border-bottom: none;"><i class="icon icon-common icon-eye" style="margin-left: 10px; background-color: #dff1f0; padding: 5px; border: 1px solid black"></i></a><a target="_blank" href="https://www.ebi.ac.uk/pdbe/static/entry/2rh1_updated.cif" style="border-bottom: none;" download><i class="icon icon-common icon-download" style="margin-left: 10px; background-color: #dff1f0; padding: 5px; border: 1px solid black"></i></a></span>',
          color: '#085f5c',
          type: 'Structure',
          tooltipContent: 'Structure',
          labelTooltip: '2rh1 (PDBE)',
          labelColor: '#C0DCDB',
          locations: [
            {
              fragments: [
                {
                  start: 1,
                  end: 365,
                  tooltipContent: 'UniProt range: 1-365<br>Provider: PDBE<br>Category: Experimentally determined<br>Resolution: 2.4Å<br><a target="_blank" href="https://www.ebi.ac.uk/pdbe/static/entry/2rh1_updated.cif">Click to Download <i class="icon icon-common icon-download"></i></a>'
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
      label: 'TEMPLATE-BASED (1)',
      data: [
        {
          accession: '60248fbc29ae6a15f7916ed8',
          labelType: 'text',
          label: '<strong>2rh1</strong><a data-url="https://www.ebi.ac.uk/pdbe/static/entry/2rh1_updated.cif" data-format="mmcif" onclick="updateMolstar(this)" style="border-bottom: none;"><i class="icon icon-common icon-eye" style="padding-left: 10px;"></i></a><a target="_blank" href="https://www.ebi.ac.uk/pdbe/static/entry/2rh1_updated.cif" style="border-bottom: none;" download><i class="icon icon-common icon-download" style="padding-left: 5px;"></i></a>',
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
                  tooltipContent: 'UniProt range: 29-342<br>Provider: SWISSMODEL<br>Category: TEMPLATE-BASED<br>QMEAN: 0.576<br><a target="_blank" href="https://beta.swissmodel.expasy.org/3d-beacons/uniprot/P07550.pdb?range=29-342&template=5d5a.1.A&provider=swissmodel"' +
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
};
