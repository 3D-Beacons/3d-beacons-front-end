import { Injectable } from '@angular/core';
import { EnsemblResult } from './ensembl.model';

@Injectable({
  providedIn: 'root'
})

export class EnsemblDataFormatterService {
  constructor() { }

    formatData = (ensemblResponse): Array<EnsemblResult> => {
        const apiResult =[];
       console.log(" ensemblResponse :",ensemblResponse);
        ensemblResponse.uniprot_mappings.forEach((element) => {
            const subtitle = element.uniprot_accession.uniprot_entry.ac + " (" + element.uniprot_accession.uniprot_entry.id +")";
            
            apiResult.push({ 
                accession: element.uniprot_accession.uniprot_entry.ac,
                ensemblId: ensemblResponse.ensembl_id,
                title: element.uniprot_accession.uniprot_entry.description,
                subtitle: subtitle,
                // description: "Description will come here",//resp.description,
                ensemblTranscript:element.ensembl_transcript.transcript_id, 
                sourceOrganism: ensemblResponse.species,
                availableStructure: this.getAvailableStructure(element.uniprot_accession.structures)
            });
        });  
        return apiResult;
    };

    getSourceOrganisms(hit_uni_os, hit_com_os){
        let source = hit_uni_os;
        if(hit_com_os && hit_com_os !== hit_uni_os){
            source = hit_uni_os + " (" + hit_com_os + ")";
        }
        return source
    }

    getAvailableStructure = (structures) => {
        const providers = [];
        let availableStructures = "";
       
        if (structures) {
            structures.forEach((struct) => {
                providers.push(struct.summary.provider);
            });
            availableStructures = providers.join(", ");
        }
        const structuresLength = structures ? structures.length : 0;

        return `${structuresLength} ${structuresLength === 1 ? "structure" : "structures"} from ${availableStructures}`;
    };
  
}
