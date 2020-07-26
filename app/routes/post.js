import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
    demo:service(),
    post:null,

    beforeModel(){
        if(!JSON.parse(localStorage.getItem('logged')))
        {
            //alert("Please login to access...")
            this.transitionTo('login');
        }    
    },
    
    model(params){
        let post_id=Math.round(params.post_id)
        let allposts=this.demo.get('allposts')
        let post_data=allposts.filter(post => post.id==post_id)
        if(!post_data.length){this.transitionTo('notfound')}
        return post_data[0]
    },
})