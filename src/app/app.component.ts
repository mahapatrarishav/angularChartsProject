import { Component,OnInit } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import {CovidData} from '../Models/CovidData';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angularChartsProject';
  //title = 'Angular Charts';

  data:Array<CovidData> = [];
  multi:any[]=[];
  multi2:any[]=[];
  multi3:any[]=[];
  single:Array<{"name":string,"value":number}>=[];

  view: any[] = [650, 400];
  view2:any[]=[600,522];
  view3:any[]=[2600,400];

 
  isDoughnut: boolean = false;
  legendPosition: string = 'right';
  legendPosition2:string = 'bottom';

  constructor(private httpClient:HttpClient) {

  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  ngOnInit(){
       this.httpClient.get("https://localhost:44306/api/data/all",this.httpOptions).subscribe(
         (res:Array<CovidData>) => {
             
                console.log(res);
                this.data = res;
                this.CreateDataForChart(this.data);
                this.CreateDataForNormalizedChart(this.data);
               // this.CreateDataForPieChart(this.data);
                this.CreateDataForGroupedChart(this.data);
         },
         err => {
           console.log(err);
         }
       )
  }

  // options for the chart
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'State/UT';
  showYAxisLabel = true;
  yAxisLabel = 'Cases';
  timeline = true;
  

  colorScheme = {
    domain: ['#9370DB', '#87CEFA', '#558f3f', '#cf0808', '#90EE90', '#9370DB']
  };

  colorScheme2 = {
    domain: ['#9370DB', '#558f3f', '#cf0808']
  };

  //pie
  showLabels = true;

  //data goes here
// public single = [
//   {
//     "name": "China",
//     "value": 2243772
//   },
//   {
//     "name": "USA",
//     "value": 1126000
//   },
//   {
//     "name": "Norway",
//     "value": 296215
//   },
//   {
//     "name": "Japan",
//     "value": 257363
//   },
//   {
//     "name": "Germany",
//     "value": 196750
//   },
//   {
//     "name": "France",
//     "value": 204617
//   }
// ];

CreateDataForGroupedChart(data:Array<CovidData>){
  this.multi3 = data.filter(item=>item.sNO != "-1").map(item=>
    {
      return {"name":item.stateName,
  "series":[{"name":"Indians+Foreigners",
  "value":parseInt(item.totalConfirmedCasesIndians)+parseInt(item.totalConfirmedCasesForeigners)},
  {"name":"Cured",
  "value":parseInt(item.cured)},{
    "name":"Dead",
    "value":parseInt(item.Deaths)
  }
  ]}
    });
}

CreateDataForPieChart(data:Array<CovidData>){
 data.filter(item=>item.sNO == "-1").forEach(item=>{
  this.single = [{"name":"Indians",
            "value":parseInt(item.totalConfirmedCasesIndians)},
          {"name":"Foreigners",
        "value":parseInt(item.totalConfirmedCasesForeigners)},
      {"name":"Cured",
    "value":parseInt(item.cured)},
  {
    "name":"Dead",
    "value":parseInt(item.Deaths)
  }]
});
    




}

CreateDataForNormalizedChart(data:Array<CovidData>){
  this.multi2 = data.filter(item=>item.sNO != "-1").map(item=>
    {
      return {"name":item.stateName,
  "series":[{"name":"Locals",
  "value":parseInt(item.totalConfirmedCasesIndians)},
  {"name":"Foreigners",
  "value":parseInt(item.totalConfirmedCasesForeigners)}
  ]}
    });
}

CreateDataForChart(data:Array<CovidData>){

this.multi = data.filter(item=>item.sNO != "-1").map(item=>
  {
    return {"name":item.stateName,
"series":[{"name":"Locals",
"value":parseInt(item.totalConfirmedCasesIndians)},
{"name":"Foreigners",
"value":parseInt(item.totalConfirmedCasesForeigners)}
]}
  });


}

// public multi = [
//   {
//     "name": "China",
//     "series": [
//       {
//         "name": "2018",
//         "value": 2243772
//       },
//       {
//         "name": "2017",
//         "value": 1227770
//       }
//     ]
//   },

//   {
//     "name": "USA",
//     "series": [
//       {
//         "name": "2018",
//         "value": 1126000
//       },
//       {
//         "name": "2017",
//         "value": 764666
//       }
//     ]
//   },

//   {
//     "name": "Norway",
//     "series": [
//       {
//         "name": "2018",
//         "value": 296215
//       },
//       {
//         "name": "2017",
//         "value": 209122
//       }
//     ]
//   },

//   {
//     "name": "Japan",
//     "series": [
//       {
//         "name": "2018",
//         "value": 257363
//       },
//       {
//         "name": "2017",
//         "value": 205350
//       }
//     ]
//   },

//   {
//     "name": "Germany",
//     "series": [
//       {
//         "name": "2018",
//         "value": 196750
//       },
//       {
//         "name": "2017",
//         "value": 129246
//       }
//     ]
//   },

//   {
//     "name": "France",
//     "series": [
//       {
//         "name": "2018",
//         "value": 204617
//       },
//       {
//         "name": "2017",
//         "value": 149797
//       }
//     ]
//   }
// ];
}
