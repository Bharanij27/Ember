import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
    demo:service(),
    store:service(),
    uname:"",
    upass:"",
});
