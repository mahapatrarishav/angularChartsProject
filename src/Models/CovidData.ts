export class CovidData {


    constructor(sNO:string="",stateName:string="",totalConfirmedCasesIndians:string="",totalConfirmedCasesForeigners:string="",cured:string="",Deaths:string=""){

        this.sNO = sNO;
        this.stateName = stateName;
        this.totalConfirmedCasesIndians = totalConfirmedCasesIndians;
        this.totalConfirmedCasesForeigners = totalConfirmedCasesForeigners;
        this.cured = cured;
        this.Deaths = Deaths;
    }

sNO:string;
stateName:string;
totalConfirmedCasesIndians:string;
totalConfirmedCasesForeigners:string;
cured:string;
Deaths:string;

}