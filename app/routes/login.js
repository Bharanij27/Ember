import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
    demo:service(),
    store:service(),
    uname:"",
    upass:"",
    perform:"",

    model(){
        var me=this
        if(JSON.parse(localStorage.getItem('logged'))){
            me.set('uname',"")
            me.set('upass',"")
            me.get('demo').set('c_post',null)
            me.get('demo').logout()
            localStorage.setItem('cuser',null)
        }
    },
})
