import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
    router:service(),
    demo:service(),

    actions:{
        pass(vall){
            this.set('demo.c_post',vall)
            this.get('router').transitionTo('post',vall.id)
        },
        
    }
})