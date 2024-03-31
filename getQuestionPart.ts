function getQuestionPart(phrases: string[]): string[] {
    
    let commonSubstring = "";
    for (let i = 0; i < phrases[0].length; i++) {
        for (let j = i + 1; j <= phrases[0].length; j++) {
            const substring = phrases[0].substring(i, j);
            let isCommon = true;
            for (let k = 1; k < phrases.length; k++) {
                if (!phrases[k].includes(substring)) {
                    isCommon = false;
                    break;
                }
            }
            if (isCommon && substring.length > commonSubstring.length) {
                commonSubstring = substring;
            }
        }
    }
    
    const result: string[] = [];
    for (let phrase of phrases) {
        result.push(phrase.replace(commonSubstring, "").trim());
    }

    return result;
}

