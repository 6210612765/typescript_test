function minEnergy(start: number, shops: number[], stations: number[], target: number): number {
    let a: number = start;
    const d: number = target;
    let energy: number = 0;
    const data1: number[] = [...shops];
    const data2: number[] = [...stations];

    while ( ( Math.abs(d - a) !== 0 ) || (data1.length !== 0) ) {
        while (data1.length !== 0) {
            const compare1: number[] = data1.map(item => Math.abs(item - a));
            const compare2: number[] = data2.map(item => Math.abs(item - a));

            const min1: number = Math.min(...compare1);
            const min2: number = Math.min(...compare2);
            const index2: number = compare2.indexOf(min2);
            const index2_value: number = min2
            

            if (min1 <= min2) {
                energy += min1;
                for (let i = 0; i < data1.length; i++) {
                    if (Math.abs(a - min1) === data1[i] || Math.abs(a + min1) === data1[i]) {
                        a = data1[i];
                        data1.splice(i, 1);
                        break; 
                    }
                }

            } else {
                const distances: number[][] = [];
                for (let i = 0; i < compare1.length; i++) {
                    const distance: number[] = [];
                    for (let j = 0; j < compare2.length; j++) {
                        distance.push(Math.abs(compare1[i] - compare2[j]));
                    }
                    distances.push(distance);
                }

                let lowest = Number.MAX_SAFE_INTEGER;
                let index1 = Number.MAX_SAFE_INTEGER;
                for (let i = 0; i < distances.length; i++) {
                    const minDistance = Math.min(...distances[i]);
                    if (minDistance < lowest) {
                        lowest = minDistance;
                        index1 = distances[i].indexOf(minDistance);
                        
                        let misdirect1 = Math.abs(data2[index1] - lowest) ;
                        let misdirect2 = Math.abs(data2[index1] + lowest) ;

                        if( !(data1.includes(misdirect1) || data1.includes(misdirect2)) ){  
                            const re = distances[i][index1];
                            distances[i].splice(index1,1);
                            const minDistance2 = Math.min(...distances[i]);
                            index1 = distances[i].indexOf(minDistance2)+1;
                            distances[i].unshift(index1 , re);
                            if( !(data1.includes(Math.abs(data2[index1] - lowest)) || data1.includes(Math.abs(data2[index1] + lowest))) ){
                                compare2.splice(index2,1);
                                index1 = compare2.indexOf(index2_value)+1;
                                compare2.unshift(index2, index2_value);
                            }
                        }
                        
                    }
                }

                energy += Math.abs(data2[index2] - a) + lowest;
                const check1 = Math.abs(data2[index1] - lowest);
                const check2 = Math.abs(data2[index1] + lowest);
                const check3 = data2[index1];

                let base_pos: number = a;
                if(lowest === 0){
                    a = data1.find(item => item === check3) || a;
                    data1.splice(data1.indexOf(a), 1);
                }else{
                    
                    a = data1.find(item => item === check1 || item === check2) || a;
                    data1.splice(data1.indexOf(a), 1);
                    
                    if(base_pos == a){
                        for(let i=0; i<data2.length; i++){
                            let number_check: number = data1.length;
                            const find_pos: number = data2[i];
                            base_pos = data1.find(item => item === (Math.abs(find_pos - lowest)) || item === (Math.abs(find_pos + lowest)) ) || base_pos;
                            a = base_pos
                            
                            data1.splice(data1.indexOf(a),1);
                            if( Math.abs(number_check - data1.length) !== 0 ){
                                break;
                            }
                            
                        }
                        
                    }

                }                         
                
            }
        }

        const lastDistance = Math.abs(d - a);
        const lastCheck: number[] = data2.map(item => Math.abs(a - item));
        const lastCheck2: number[] = data2.map(item => Math.abs(d - item));

        const lastLowest = Math.min(...lastCheck);
        const lastLowest2 = Math.min(...lastCheck2);

        if (lastLowest + lastLowest2 <= lastDistance) {
            energy += lastLowest + lastLowest2;
            a = d;
        } else {
            energy += lastDistance;
            a = d;
        }
    }
    return energy;
}

