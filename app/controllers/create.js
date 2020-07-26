import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import {empty , or } from '@ember/object/computed'

export default Controller.extend({
    demo:service(),
    isuname:empty('title'),
    isupass:empty('content'),
    isdisable:or('isuname','isupass'),

    actions:{
        submit(){
            this.demo.updateCount('p_cnt')
            let data={id:JSON.parse(localStorage.getItem('p_cnt')),
                    author_name:JSON.parse(localStorage.getItem('cuser')),
                    title:this.get('title'),
                    content:this.get('content'),
                    shared:[],
                    comment:[]
            }
            this.demo.update('posts',data)
            this.demo.setMine()
            this.set('title','')
            this.set('content','')
            this.transitionToRoute('page1')
        }
    }
});