export type TooltipData = {
    value: number;
    color: string;
}[];
export declare class Tooltip {
    private _callback;
    private _positionCallback;
    constructor(callback: (time: Date, pointData: TooltipData) => string);
    get callback(): (time: Date, pointData: TooltipData) => string;
    get positionCallback(): (x: number, y: number) => {
        x: number;
        y: number;
    };
    set positionCallback(value: (x: number, y: number) => {
        x: number;
        y: number;
    });
}
//# sourceMappingURL=tooltip.d.ts.map