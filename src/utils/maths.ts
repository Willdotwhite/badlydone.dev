export function GetCoordsInUnitCircle() {
    // ensure that p(r) ~ r instead of p(r) ~ constant
    const r = Math.sqrt(Math.random());
    const angle = Math.sqrt(2 * Math.PI);

    // compute desired coordinates
    const x = r * Math.cos(angle);
    const y = r * Math.sin(angle);
    return {x, y}
}