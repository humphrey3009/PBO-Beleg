/* JAVA */
function Count(myObject) 
{
    return Object.keys(myObject).length;
}

/* VUE */
new Vue(
{
    el: '#site',
    data:{
        //Für Statistiken kommt noch raus vermutlich
        //childnum:0,
        //locatnum:0,
        //stakenum:0,
        //state: false,
        //Daten
        processdata:{system:[], process:[]},
        tmpprocess:{}
    },
    mounted(){
        var item = this;
        $.getJSON("../source/process.json",function(data){
            item.processdata = data;
            item.tmpprocess = item.processdata.process.childs;
            //item.childnum = Count(item.processdata.process.childs);
            //item.locatnum = Count(item.processdata.process.locations);
            //item.stakenum = Count(item.processdata.process.stakeholder);
        });
    },
    methods: {
        // Get Stakeholder
        GetStakeholder: function(id){
            var data = this.processdata.process.stakeholder;
            
            //console.log("Stakeholder 0");
            for (var i in data){
                
                //console.log("Stakeholder 1");
                //console.log(id);
                //console.log(data[i].id);
                //console.log(data[i].name);
                if(id == data[i].id){
                    //console.log("Stakeholder");
                    //console.log(data[i].name);
                    return data[i].name;
                }
            }
        },
        // Get Location
        GetLocation: function(id){
            var data = this.processdata.process.locations;

            for (var i in data){
                if(id == data[i].id) return data[i].city;
            }
        },
        //Built Time
        BuiltTime: function(time, time2){
            //console.log(time);
            //console.log(time2);
            
            var timearray = time.split("T");
            var day = timearray[0];
            //console.log(day);
            var dayn = day.split("-");
            day = dayn[2] + "." + dayn[1] + "." + dayn[0];
            timearray = timearray[1].split("+");
            var daytime = timearray[0];
            var returntext = day + " " + daytime;
            if (time2.length == 0){
                //console.log("nur startzeit")
                return returntext;
                }
            timearray = time2.split("T");
            day = timearray[0];
            //console.log(day);
            dayn = day.split("-");
            day = dayn[2] + "." + dayn[1] + "." + dayn[0];
            timearray = timearray[1].split("+");
            daytime = timearray[0];

            returntext += " bis " + day + " " + daytime;
                
            //console.log("auch Endzeit");
            //console.log(time2.length)
            //console.log("#########################");
            return returntext;
            //return "test";
        },
        //Get all Members
        GetMembers: function(part){
            var stake = this.processdata.process.stakeholder;
            var resp = "";
            var c=0;
            for (var i in part){
                for (var j in stake){
                    if(part[i] == stake[j].id){
                        if(c != 0) resp += ", ";
                        resp += stake[j].name;
                        c++;
                    }
                }
            }
            return resp;
        },
        GetConnections: function(part){
            var stake = this.processdata.process.childs;
            var resp = "";
            var c = 0;
            for (var i in part){
                for(var j in stake){
                    if(part[i] == stake[j].id){
                        if(c != 0) resp += ", ";
                        resp += stake[j].name;
                        c++;
                    }
                }
            }

            return resp;
        },
        // Farbe für Bearbeitungstand vom Collapsible
        GetColor: function(status){
            switch(status) {
                case "closed":
                    return "rcol";
                case "partial opened":
                    return "ocol"
                case "open":
                    return "gcol"
                default: 
                    return "";
            } 
        },
        // Farbe für Bearbeitungstand im p
        GetColorp: function(status){
            switch(status) {
                case "closed":
                    return "bg-danger text-white";
                case "partial opened":
                    return "bg-warning text-white"
                case "open":
                    return "bg-success text-white"
                default: 
                    return "";
            } 
        }        
    }

}); 

