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
        childnum:0,
        locatnum:0,
        stakenum:0,
        state: false,
        processdata:{system:[], process:[]},
        tmpprocess:{}
    },
    mounted(){
        var item = this;
        $.getJSON("../source/process.json",function(data){
            item.processdata = data;
            item.tmpprocess = item.processdata.process.childs;
            item.childnum = Count(item.processdata.process.childs);
            item.locatnum = Count(item.processdata.process.locations);
            item.stakenum = Count(item.processdata.process.stakeholder);
        });
    },
    methods: {
        expand: function(id){
            var x = document.getElementById(id);
            if (x.style.display === "block"){
                x.style.display = "none";
            } else {
                x.style.display = "block";
            }
        }

        
    }

}); 