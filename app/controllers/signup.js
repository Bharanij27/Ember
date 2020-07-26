import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { or , empty} from '@ember/object/computed';

export default Controller.extend({
    demo:service(),
    store:service(),
    uname:"",
    dispName:"",
    upass:'',
    ueid:'',
    uno:null,
    isdisp:empty('dispName'),
    isuname:empty('uname'),
    isupass:empty('upass'),
    isueid:empty('ueid'),
    isuno:empty('uno'),
    isdisable:or('isuname','isdisp','isupass','isueid','isuno'),
    error:"",

    actions:{
        signup(){
            this.error=""
            let x=this.demo.find('users','dispName',this.dispName);
            if(x.length){
                alert('This Name exists')
                this.transitionToRoute('login')
            }
            else{
                this.send('check')
                if(this.error=="")
                {
                    this.demo.updateCount('u_cnt')
                    let newone={id:JSON.parse(localStorage.getItem('u_cnt')),
                        name:this.uname,
                        password:this.upass,
                        dispName:this.dispName,
                        friends:[],
                        requests:[],
                        email:this.ueid,
                        contact:this.uno}
                    this.demo.update('users',newone)
                    this.transitionToRoute('login')
            
                }
                else
                {
                    alert(this.error)
                }
            }
        },

        check()
        {
            if(this.upass.length<2)
            {
                this.error="Enter password length more than 3"
                return false
            }
            else if(this.ueid.search('@gmail.com')<1)
            {
                this.error="Enter valid Gmail id"
                return false
            }
            else if(this.uno.length!=10)
            {
                this.error="Enter valid Mobile No"
                return false
            }
        }

    }
});
