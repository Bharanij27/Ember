import Controller from '@ember/controller';

export default Controller.extend({
    actions:{
        pass(vall){
            this.transitionToRoute('post',vall)
        }
    }
})
