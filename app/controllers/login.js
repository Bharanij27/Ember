import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { or , empty } from '@ember/object/computed';

export default Controller.extend({
    demo:service(),
    store:service(),
    uname:"",
    upass:"",
    isuname:empty('uname'),
    isupass:empty('upass'),
    isdisable:or('isuname','isupass'),

    actions:{
        login()
        {
            let x=this.demo.find('users','name',this.uname);
            x=x[0]
            if(x){
                if(x['password']===this.upass){
                    this.get('demo').login(x);
                    this.setProperties({uname:'',upass:''}) 
                    localStorage.setItem('logged',1)
                    this.transitionToRoute('page1')
                }
                else{ alert('Invlaid Password') } 
            }
            else {alert('Invliad Credentials') }
        }
    },
    
});