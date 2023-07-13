import { Injectable } from '@angular/core';
import { SequenceResult } from './sequence.model'

@Injectable({
  providedIn: 'root'
})

export class SequenceDataFormatterService {

  constructor() { }

    formatData = (sequenceResponse) : Array<SequenceResult> => {
        const sequencesResult = sequenceResponse.map((resp) => {
            const available_structure = this.getAvailableStructure(resp.summary.structures);
            const match_stats = this.getMatchStats(resp.hit_length, resp.hit_hsps[0]);
            const sequence_stats = this.getSequenceStats(resp.hit_hsps[0]);
            const source_organism = this.getSourceOrganisms(resp.hit_uni_os, resp.hit_com_os);
            return {
                accession: resp.accession,
                title: resp.title,
                subtitle: resp.accession + " (" + resp.id + ")",
                description: resp.description,
                source_organism,
                available_structure,
                query_sequence: resp.hit_hsps[0].hsp_qseq,
                match_sequence: resp.hit_hsps[0].hsp_mseq,
                match_accession: resp.hit_hsps[0].hsp_hseq,
                match_stats,
                sequence_stats,
            };
        });
        return sequencesResult;
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
        let availableString = "";
    
        if (structures) {
        structures.forEach((struct) => {
            providers.push(struct.summary.provider);
        });
        let uniqueProvider = [...new Set(providers)];
        availableString = uniqueProvider.join(", ");
        }
        const structuresLength = structures ? structures.length : 0;
        return `${structuresLength} ${structuresLength === 1 ? "structure" : "structures"} from ${availableString}`;
    };
  
    getQueryCoverage(hitLength, queryLength) {
        // Check if the hit length is greater than the query length
        if (hitLength > queryLength) {
            return 100;
        } else {
            return (hitLength / queryLength) * 100;
        }
    }
      
    getMatchStats = (hit_length, hsp) => {
        const matchStats = [
            {
                label: "Identity",
                value: hsp ? hsp.hsp_identity : "",
            },
            {
                label: "HSP score",
                value: hsp ? hsp.hsp_score : "",
            },
            {
                label: "E-value",
                value: hsp ? hsp.hsp_expect : "",
            },
            {
                label: "Query coverage",
                value: this.getQueryCoverage(hit_length, hsp.hsp_qseq.length)
            }
        ];
        return matchStats;
    };
  
    getSequenceStats = (hsp) => {
        const lettersToRemove = [" ","+"];
        let match;
        if(hsp.hsp_mseq){
            match = hsp.hsp_mseq
            lettersToRemove.forEach(function(letter){
                match = match.replaceAll(letter, '');
            });
        }

        const queryLength = hsp.hsp_qseq !== "" ? hsp.hsp_qseq.replace(/-/g, '').length : 0;
        const alignLength = match.length;
        const targetLength =hsp.hsp_hseq !== "" ? hsp.hsp_hseq.replace(/-/g, '').length : 0;

        const sequenceStats = [
            {
                label: "Query length",
                value: queryLength
            },
            {
                label: "Align length",
                value: alignLength
            },
            {
                label: "Target length",
                value: targetLength 
            }
        ];
        return sequenceStats;
    };

}
