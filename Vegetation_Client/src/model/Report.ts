
export class Report {
    constructor() {
        this.report = new ReportView();
        this.reportParameters = new Array<ReportParameterView>();
        this.reportColumns = new Array<ReportColumnView>();
        this.deleteColumns = new Array<any>();
        this.deleteParameters = new Array<any>();
    }

    report: ReportView;
    reportParameters: Array<ReportParameterView>;
    reportColumns: Array<ReportColumnView>;
    deleteColumns: Array<any>;
    deleteParameters: Array<any>;
}

export class ReportView {
    constructor() { }
    id: number;
    reportGroupId: number;
    title: string;
    query: string;
    hasPager: boolean;
}


export class ReportColumnView {
    constructor() { }
    id: number;
    reportId: number;
    title: string;
    isSeparator: boolean;
    isSum: boolean;
    isAverage: boolean;
    checked: boolean;
}


export class ReportParameterView {
    constructor() {
        this.staticItems = new Array<StaticItemView>();
    }
    id: number;
    reportId: number;
    title: string;
    name: string;
    priority: string;
    query: string;
    type: string;
    typeTitle: string;
    isOptional: boolean;
    width: number;
    staticItems: Array<StaticItemView>
    value: string;
}

export class StaticItemView {
    constructor() { }
    id: number;
    reportParameterId: number;
    value: string;
    text: string;
    isDefault: boolean;
}

export class ReportResult {
    constructor() { }
    key: any;
    value: string;
}
