import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { hash } from 'rsvp';

export default Route.extend({
    demo:service(),

    beforeModel(){
        if(!JSON.parse(localStorage.getItem('logged')))
        {
            //alert("Please login to access...")
            this.transitionTo('login');
        }
    },
    model(params){
        let groups=[]
        let cur_group=[]
        if(this.demo.get('mygroup')!=null)
        {
            groups=this.demo.get('mygroup').map(group => group['name'])
            cur_group=this.demo.get('mygroup').filter(each => each.name==params.user_name)[0]
        }
        if(params.user_name=='MyPost')
        {
            return hash({
                user:['Feeds','MyPost'].concat(groups),
                posts:this.demo.get('mine')
            })
        }
        else if(params.user_name=='Feeds'){this.transitionTo('page1')}
        else if(groups.includes(params.user_name))
        {
            return hash({
                user:['Feeds','MyPost'].concat(groups),
                posts:this.demo.get('allposts').filter(each => cur_group['posts'].includes(each.id))
            })   
        }
        else{this.transitionTo('notfound')}
    },
})