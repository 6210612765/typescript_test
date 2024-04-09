function minEnergy(start: number, shops: number[], stations: number[], target: number): number {
    let a: number = start;
    const d: number = target;
    let energy: number = 0;
    const data1: number[] = [...shops];
    const data2: number[] = [...stations];
    

    if(data1.find(item => item === a)){
        data1.splice(data1.indexOf(a),1);
    }
    
    if( (target > data2[data2.length-1]) && (data1.find(item => item > data2[data2.length-1])) && (target>data1[data1.length-1]) ){
        const indicesToRemove: number[] = [];
        data1.forEach((item, index) => {
            if (item > data2[data2.length-1]) {
                indicesToRemove.push(index);
            }
        });

        indicesToRemove.reverse().forEach(index => {
            data1.splice(index, 1);
        });
    }

    if( (target < data2[0]) && (data1.find(item => item < data2[0])) && (target<data1[0]) ){
        const indicesToRemove: number[] = [];
        data1.forEach((item, index) => {
            if (item < data2[0]) {
                indicesToRemove.push(index);
            }
        });

        indicesToRemove.reverse().forEach(index => {
            data1.splice(index, 1);
        });
    }

    while ( ( Math.abs(d - a) !== 0 ) || (data1.length !== 0) ) {
        while (data1.length !== 0) {
            const compare1: number[] = data1.map(item => Math.abs(item - a));
            const compare2: number[] = data2.map(item => Math.abs(item - a));

            const compare3: number[] = data1.map(item => Math.abs(item - a));
            const compare4: number[] = data2.map(item => Math.abs(item - a));

            const min1: number = Math.min(...compare1);
            const min2: number = Math.min(...compare2);
            const index2: number = compare2.indexOf(min2);
            const index2_value: number = min2
            
            const betweens: number[][] = [];
                for (let i = 0; i < data1.length; i++) {
                    const between: number[] = [];
                    for (let j = 0; j < data2.length; j++) {
                        between.push(Math.abs(data1[i] - data2[j]));
                    }
                    betweens.push(between);
                }
            
            if(min1 <= min2){
                energy += min1;
                for (let i = 0; i < data1.length; i++) {
                    if (Math.abs(a - min1) === data1[i] || Math.abs(a + min1) === data1[i]) {
                        a = data1[i];
                        data1.splice(i, 1);
                        break; 
                    }
                }

            }else{
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

                    }
                }

                energy += Math.abs(data2[index2] - a) + lowest;
                const check1 = Math.abs(data2[index1] - lowest);
                const check2 = Math.abs(data2[index1] + lowest);

                let base_pos: number = a;
                if(lowest === 0){
                    if(min2===0){
                        let diag_line: number = Number.MAX_SAFE_INTEGER;
                        let diag_index: number = Number.MAX_SAFE_INTEGER;
                        for (let i=0; i < data1.length; i++) {
                            if(distances[i][i]<diag_line){ 
                                diag_line = distances[i][i];
                                diag_index = i;
                                a = data1[diag_index];
                                energy = energy + diag_line;
                                data1.splice(data1.indexOf(a), 1);
                            }
                        }
                    }else{
                        if(data1.find(item => item === check1 || item === check2) !== undefined){
                            a = data1.find(item => item === check1 || item === check2) || a;
                            data1.splice(data1.indexOf(a), 1);
                        }else{
                            let diag_line: number = Number.MAX_SAFE_INTEGER;
                            let diag_index: number = Number.MAX_SAFE_INTEGER;
                            for (let i=0; i < data1.length; i++) {
                                if(distances[i][i]<diag_line){ 
                                    diag_line = distances[i][i];
                                    diag_index = i;
                                    a = data1[diag_index];
                                    data1.splice(data1.indexOf(a), 1);          
                                }
                            }
                        }
                    }       
                }else{
                    
                    if(data1.find(item => item === check1 || item === check2) !== undefined){
                            a = data1.find(item => item === check1 || item === check2) || a;
                            data1.splice(data1.indexOf(a), 1);
                    }else{
                        const distance_arr: number[] = betweens.reduce((acc, val) => acc.concat(val), []);
                        const minDis = Math.min(...distance_arr);
                        const isSecond = distance_arr.includes(lowest);

                        if( isSecond ){
                            let minIndex: number = 0;
                            for(let i=0; i<data1.length; i++){
                                if(betweens[i].includes(lowest)){
                                    minIndex = i;
                                }
                            }
                            a = data1[minIndex];
                            data1.splice(data1.indexOf(a), 1);

                        }else{
                            energy += Math.abs( minDis - lowest );
                            let minIndex: number = Number.MAX_SAFE_INTEGER;
                            let indexPos: number = Number.MAX_SAFE_INTEGER;
                            for(let i=0; i<data1.length; i++){
                                if( Math.min(...betweens[i]) < minIndex){
                                    minIndex = Math.min(...betweens[i]);
                                    indexPos = i;
                                }
                            }
                            a = data1[indexPos];
                            data1.splice(data1.indexOf(a), 1);

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