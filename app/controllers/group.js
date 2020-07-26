import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import {empty } from '@ember/object/computed'

export default Controller.extend({
    demo:service(),
    gname:"",
    isclicked:false,
    isdisabled:empty('gname'),
    isname:empty('uname'),
    group_name:null,
    uname:'',

    actions:{
        create(){
            let data={
                name:this.gname,
                users:[this.demo.get('userInfo').dispName],
                posts:[]
            }
            let allgroups=this.demo.get('allgroups')
            allgroups.pushObject(data)
            localStorage.setItem('groups',JSON.stringify(allgroups))
            this.demo.setMyGroup()
            this.demo.setAllGroup()
            this.set('gname','')            
            this.transitionToRoute('create')
            this.transitionToRoute('group')
        },
        
        add_user(groupName){
            this.set('isclicked',true)
            this.set('uname',"")
            this.set('group_name',groupName)
        },

        add(){
            let groupName=this.get('group_name')
            let name=this.get('uname')
            if(this.demo.get('userInfo')['friends'].includes(name))
            {
                let allgroups=this.demo.get('allgroups')
                allgroups.forEach(group => {
                    if(group['name']==groupName){
                        group['users'].push(name)
                    }
                });
                localStorage.setItem('groups',JSON.stringify(allgroups))
                this.demo.setMyGroup()
                this.demo.setAllGroup()
            }
            else{alert("Sorry This user is not in your Friend List")}
            this.set('uname','')
        }
    }
})