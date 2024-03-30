function quickestPath(board: { ladders: [number, number][]; snakes: [number, number][]; }): number[] {
    const laddersMap = new Map<number, number>();
    const snakesMap = new Map<number, number>();

    for (const [start, end] of board.ladders) {
        laddersMap.set(start, end);
    }

    for (const [start, end] of board.snakes) {
        snakesMap.set(start, end);
    }

    const visited = new Set<number>();
    const queue: [number, number[]][] = [[1, []]]; 

    while (queue.length > 0) {
        const [position, path] = queue.shift()!;

        if (position === 100) {
            return path;
        }
        
        for (let i = 1; i <= 6; i++) {
            const newPosition = position + i;

            if (newPosition === 100) {
                return [...path, i];
            }
            
            if (laddersMap.has(newPosition)) {
                const ladderEnd = laddersMap.get(newPosition)!;
                if (!visited.has(ladderEnd)) {
                    queue.push([ladderEnd, [...path, i]]);
                    visited.add(ladderEnd);
                }
            } else if (snakesMap.has(newPosition)) { 
                const snakeEnd = snakesMap.get(newPosition)!;
                if (!visited.has(snakeEnd)) {
                    queue.push([snakeEnd, [...path, i]]);
                    visited.add(snakeEnd);
                }
            } else if (newPosition < 100 && !visited.has(newPosition)) { 
                queue.push([newPosition, [...path, i]]);
                visited.add(newPosition);
            }
        }
    }

    return [];
}
