import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
    demo:service(),

    beforeModel(){
        if(!JSON.parse(localStorage.getItem('logged')))
        {
            //alert("Please login to access...")
            this.transitionTo('login');
        }
    },
    model(){
        return this.demo.userInfo
    }
})