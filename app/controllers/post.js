import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { empty } from '@ember/object/computed';

export default Controller.extend({
    demo:service(),
    router:service(),
    ulist:"",
    content:'',
    isok:empty('content'),
    isdisabled:empty('ulist'),

    actions:{
        share()
        {
            let users=this.demo.find('users','','')
            users=users.map(val=>{ return val.dispName})
            let mygroupName
            if(this.demo.mygroup!=null)
            {
                mygroupName=this.demo.mygroup.map(group=> {return group['name']})
            }
            else{mygroupName=[]}

            if(this.ulist.toLowerCase()=='feeds')
            {
                let feeds=JSON.parse(localStorage.getItem('feeds'))
                feeds.push(this.model.id)
                localStorage.setItem('feeds',JSON.stringify(feeds))
                this.demo.updateShare(this.model.author_name,'Feeds')
                this.demo.setAllPost()
                this.demo.setFeeds()
            }
            else if(users.includes(this.ulist)&&this.ulist!=JSON.parse(localStorage.getItem('cuser')))
            {
                this.demo.updateShare(this.model.author_name,this.ulist)
                this.demo.setAllPost()
                this.demo.setMine()
            }
            else if(mygroupName.includes(this.ulist)){
                let allgroup=this.demo.allgroups
                allgroup.forEach(group => {
                    if(group.name==this.ulist){
                        group['posts'].push(this.model.id)
                    }
                })
                localStorage.setItem('groups',JSON.stringify(allgroup))
                this.demo.updateShare(this.model.author_name,this.ulist)
                this.demo.setAllPost()
                this.demo.setAllGroup()
                this.demo.setMyGroup()
            }
            else
            {
                alert("user name or group name not available")
            }
            this.set('ulist','')
            this.transitionToRoute('page1')
            this.transitionToRoute('post',this.model.id)
            
        },

        addcom(){
            let me=this
            this.demo.updateCount('cmt_cnt')
            var new_comment ={
                id:localStorage.getItem('cmt_cnt'),
                commentor:JSON.parse(localStorage.getItem('cuser')),
                body:this.content,
                at: new Date()
            }  
            let all_post=JSON.parse(localStorage.getItem('posts'))
            all_post.forEach(element => {
                if(element.id==me.model.id){
                    element.comment.pushObject(new_comment)
                }
            });
            localStorage.setItem('posts',JSON.stringify(all_post))
            this.demo.setAllPost()
            this.demo.setMine()
            this.transitionToRoute('create')
            this.transitionToRoute('post',this.model.id)
            this.set('content',"")
            
        },
    }
})
