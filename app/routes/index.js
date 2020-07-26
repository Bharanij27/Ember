import Route from '@ember/routing/route';
import {inject as service} from '@ember/service'

export default Route.extend({
    demo:service(),
    redirect(){
        this.transitionTo('login');
    }
});
/* 
id:1,
            name:"bharani",
            password:"password"
*/