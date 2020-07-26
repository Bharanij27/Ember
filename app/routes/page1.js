import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { hash } from 'rsvp';
import { observer } from '@ember/object';

export default Route.extend({
    demo:service(),
    beforeModel(){
        //this.get('demo').set('c_post',null);
        if(!JSON.parse(localStorage.getItem('logged')))
        {
            //alert("Please login to access...")
            this.transitionTo('login');
        }
    },
    model(){
        this.get('demo').set('c_blogger','')  
        let groups=[]
        if(this.demo.get('mygroup')!=null)
        {
            groups=this.demo.get('mygroup').map(group => group['name'])
        }  
        return hash({
            user:['Feeds','MyPost'].concat(groups),
            posts:this.demo.get('feeds'),
        })
    },
    nameobs:observer('demo.c_blogger',function(){
        this.transitionTo('user',this.get('demo.c_blogger'))
        this.get('demo').set('c_blogger','')
    }),
    
});
