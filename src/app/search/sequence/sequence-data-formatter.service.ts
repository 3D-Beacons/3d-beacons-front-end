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
                value: this.getIdentities(hsp.hsp_qseq, hsp.hsp_mseq) //hsp ? hsp.hsp_identity : "",
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
            },
            {
                label: "Positives",
                value: this.getPositives(hsp.hsp_qseq, hsp.hsp_mseq)
            },
            {
                label: "Gaps",
                value: this.getGaps(hsp.hsp_qseq, hsp.hsp_hseq)
            }
        ];
        return matchStats;
    };

    getIdentities(query,match){
        const queryLength = query !== "" ? query.replace(/-/g, '').length : 0;
        const exactMatch = this.removeSpacesAndPlusSigns(match);
        const identities = exactMatch.length;
        const percentage = Math.round((identities / queryLength) * 100) //(100 * identities) / queryLength;
        
        //return identities + "/" + queryLength + " (" + percentage + "%)"; 
        return percentage + "%";
    }

    removeSpacesAndPlusSigns(match) {
        let clearmatch = "";
        for (let i = 0; i < match.length; i++) {
          let character = match[i];
          if (character !== " " && character !== "+") {
            clearmatch += character;
          }
        }
        return clearmatch;
    }

    countDashes(hit) {
        let dashCount = 0;
        for (let i = 0; i < hit.length; i++) {
          let character = hit[i];
          if (character === "-") {
            dashCount++;
          }
        }
        return dashCount;
    }

    getPositives(query,match){
        const queryLength = query !== "" ? query.replace(/-/g, '').length : 0;
        let positiveMatch = "";
        for (let i = 0; i < match.length; i++) {
          let character = match[i];
          if (character !== " ") {
            positiveMatch += character;
          }
        }
        const positives = positiveMatch.length;
        const percentage = Math.round((positives / queryLength) * 100) //(100 * positives) / queryLength;
        return positives + "/" + queryLength+ " (" + percentage + "%)"; 
    }

    getGaps(query,hit){
        const queryLength = query !== "" ? query.replace(/-/g, '').length : 0;
        const hitGaps = this.countDashes(hit);
        const queryGaps = this.countDashes(query);
        const gaps = hitGaps + queryGaps;
        const percentage = Math.round((gaps / queryLength) * 100) //(100 * gaps) / queryLength;
        return gaps + "/" + queryLength+ " (" + percentage + "%)";
    }
  
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
