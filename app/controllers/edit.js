import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
    demo:service(),

    actions:{
        save(){
        let data=
            {
                id:this.get('model').id,
                name:this.get('name'),
                dispName:JSON.parse(localStorage.getItem('cuser')),
                password:this.get('password'),
                friends:this.get('model').friends,
                requests:this.get('model').requests,
                email:this.get('email'),
                contact:this.get('contact'),
            }
            this.demo.updateUser(data,this.get('model').id)
            this.transitionToRoute('/account')
        }
    }
})