import Service from '@ember/service';

export default Service.extend({
    islogged:JSON.parse(localStorage.getItem('logged')),
    cuser:JSON.parse(localStorage.getItem('cuser')),
    c_blogger:"",
    c_post:null,
    allposts:null,
    userInfo:null,
    allgroups:null,
    mygroup:null,
    isavailable:0,
    feeds:null,
    mine:null,
    
    init(){
        this._super(...arguments)
        this.setFeeds()
        this.setAllPost()
        this.setMine()
        this.setAllGroup()
        this.setMyGroup()
        this.setMyInfo()
    },

    find(key,arg,value){
        let get_value=JSON.parse(localStorage.getItem(key))
        if(arg==''){return get_value} //to retive all records
        let particular_info=get_value.filter(cur_info=> cur_info[arg]==value)
        if(key=='users'){this.set('userInfo',particular_info[0])}
        return particular_info;
    },

    updateCount(key){
        let get_value=JSON.parse(localStorage.getItem(key))
        localStorage.setItem(key,JSON.stringify(get_value+1))
    },

    update(key,valueToAdd){
        let data=JSON.parse(localStorage.getItem(key))
        data.pushObject(valueToAdd)
        localStorage.setItem(key,JSON.stringify(data))
        if(key=='posts')
        {
            this.allposts.pushObject(valueToAdd)
        }
    },

    updateUser(data,value){
        let users=JSON.parse(localStorage.getItem('users'))
        let index=users.findIndex(user=> user.id==value)
        users.splice(index,1,data)
        this.set('userInfo',data)
        localStorage.setItem('users',JSON.stringify(users))
    },

    updateShare(value,username){
        let posts=JSON.parse(localStorage.getItem('posts'))
        posts.forEach(element => {
            if(element.author_name==value){
                element['shared'].push(username)
            }
        });
        localStorage.setItem('posts',JSON.stringify(posts))
    },

    updateArray(user,friend,array,operation){
        let x=0
        let users=this.find('users','','')
        let me=this
        users.forEach(eachUser =>{
            if(eachUser.dispName==user){
                if(array=='requests' && eachUser['friends'].includes(friend)){x=x+1}
                else{
                if(!eachUser[array].includes(friend))
                {
                    if(operation=='push'){
                        eachUser[array].push(friend)
                    }
                    me.set('isavailable',1)
                }
                else{
                    if(array=='requests' && operation=='push'){alert('already request sent')}
                    else if(array=='requests'&& operation=='pop')
                    {
                        let index=eachUser[array].indexOf(friend)
                        if(index>-1)eachUser[array].splice(index,1)
                    }
                    me.set('isavailable',1)
                }}
            }
        })
        if(this.isavailable){localStorage.setItem('users',JSON.stringify(users))}
        else{alert('User Name not available')}
        this.set('isavailable',0)
    },

    getShared(){
        let posts=JSON.parse(localStorage.getItem('posts'))
        let user=JSON.parse(localStorage.getItem('cuser'))
        let shared_post=posts.filter(post=> post['shared'].includes(user))
        return shared_post
    },

    setFeeds(){
        if(localStorage.getItem('feeds')!=undefined && localStorage.getItem('feeds') != "[]")
        {
            let feedList=JSON.parse(localStorage.getItem('feeds'))
            let posts=JSON.parse(localStorage.getItem('posts'))
            let feedPost=posts.filter(eachPost => feedList.includes(eachPost.id))
            this.set('feeds',feedPost)
        }
        else
        {
            localStorage.setItem('feeds',JSON.stringify([]))
            this.set('feeds',[])
        }
    },

    setMine(){
        if(localStorage.getItem('posts')!=undefined && localStorage.getItem('posts') != "[]")
        {
            let particular_info=this.find('posts','author_name',this.get('cuser'))
            this.set('mine',particular_info)
        }
        else
        {
            this.set('mine',[])
        }
    },

    setAllPost(){
        if(localStorage.getItem('posts')!=undefined && localStorage.getItem('posts') != "[]")
        {
            this.set('allposts',JSON.parse(localStorage.getItem('posts')))
        }
        else
        {
            localStorage.setItem('posts',JSON.stringify([]))
            this.set('allposts',[])
            localStorage.setItem('p_cnt',0)
            localStorage.setItem('cmt_cnt',0)
        }
    },

    setAllGroup(){
        if(localStorage.getItem('groups')!=undefined && localStorage.getItem('groups') != "[]")
        {
            this.set('allgroups',JSON.parse(localStorage.getItem('groups')))
        }
        else
        {
            localStorage.setItem('groups',JSON.stringify([]))
            this.set('allgroups',[])
        }
    },

    setMyGroup(){
        if(localStorage.getItem('groups')!=undefined && localStorage.getItem('groups') != "[]")
        {
            let groups=this.allgroups
            let myGroup=groups.filter(eachGroup => eachGroup['users'].includes(this.cuser))
            this.set('mygroup',myGroup)
        }
        else{this.set('mygroups',[])}
        
    },

    setMyInfo(){
        if(localStorage.getItem('users')!=undefined && localStorage.getItem('users') != "[]")
        {
            let user=JSON.parse(localStorage.getItem('users')).filter(each => each.dispName==this.cuser)[0]
            this.set('userInfo',user)
        }
        else
        {
            this.set('userInfo',{})
            localStorage.setItem('users',JSON.stringify([]))
            localStorage.setItem('u_cnt',0)
        }
    },

    login(user){
        localStorage.setItem('cuser',JSON.stringify(user.dispName))
        this.set('cuser',JSON.parse(localStorage.getItem('cuser')))
        this.setMine()
        this.setFeeds()
        this.setMyGroup()
        this.setMyInfo()
        this.set('islogged',true);
    },

    logout(){
        this.set('cuser',JSON.parse(localStorage.getItem('cuser')),)
        localStorage.setItem('cuser',null)
        localStorage.setItem('logged',null)
        this.toggleProperty('islogged');
    },
});