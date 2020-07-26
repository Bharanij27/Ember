import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
    demo:service(),
    uname:'',

    actions:{
        request(){
            let friend=this.get('uname')
            let cuser=JSON.parse(localStorage.getItem('cuser'))
            this.demo.updateArray(friend,cuser,'requests','push')
            this.set('uname','')
        },
        accept(friend){
            let cuser=JSON.parse(localStorage.getItem('cuser'))
            this.demo.updateArray(friend,cuser,'requests','pop')
            this.demo.updateArray(cuser,friend,'requests','pop')
            this.demo.updateArray(cuser,friend,'friends','push')
            this.demo.updateArray(friend,cuser,'friends','push')
            this.demo.setMyInfo()
            this.demo.setMine()
            this.demo.setFeeds()
            this.transitionToRoute('create')
            this.transitionToRoute('friend')
        },
        cancel(friend){
            let cuser=JSON.parse(localStorage.getItem('cuser'))
            this.demo.updateArray(cuser,friend,'requests','pop')
            this.demo.setMine()
            this.demo.setMyInfo()
            this.demo.setFeeds()
            this.transitionToRoute('create')
            this.transitionToRoute('friend')
            
        }
    }
});