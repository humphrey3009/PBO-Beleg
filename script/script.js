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
        state: false,
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
        //Convert Time
        ConvertTime: function(time){
            //console.log(time);
            if (time == null) return "TBA";
            var timearray = time.split("T");
            var day = timearray[0];
            //console.log(day);
            var dayn = day.split("-");
            day = dayn[2] + "." + dayn[1] + "." + dayn[0];
            timearray = timearray[1].split("+");
            var daytime = timearray[0];
            //console.log(daytime);
            return day + " " + daytime;
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
        }        
    }

}); 