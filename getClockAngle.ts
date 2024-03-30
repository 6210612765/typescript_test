function getClockAngle(hh_mm: string): number {

    const [hours, minutes] = hh_mm.split(":").map(Number);
    const hourAngle = (hours % 12) * 30 + minutes * 0.5;
    const minuteAngle = minutes * 6;
  
    const angleDiff = Math.abs(hourAngle - minuteAngle);
    return Math.min(angleDiff, 360 - angleDiff);
}
  

  
  