import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
    demo:service(),

    actions:{
        pass(val){
            this.get('demo').set('c_blogger',val);
        }
    }
});