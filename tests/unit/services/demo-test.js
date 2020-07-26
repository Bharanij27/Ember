import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Service | demo', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('Find works properly', function(assert) {
    let service = this.owner.lookup('service:demo');
    let user=JSON.parse(localStorage.getItem('users'))
    let obj=user.filter(each => each.id==1)
    assert.deepEqual(service.find('users','id',1),obj,"object works")
  });

  test('Update Key works properly', function(assert) {
    let service = this.owner.lookup('service:demo');
    let count=JSON.parse(localStorage.getItem('p_cnt'))+1
    service.updateCount('p_cnt')
    assert.deepEqual(JSON.parse(localStorage.getItem('p_cnt')),count,"object works")
    localStorage.setItem('p_cnt',JSON.parse(localStorage.getItem('p_cnt'))-1)
  });

  test('checking initials', function(assert){
    let service = this.owner.lookup('service:demo')
    //assert.expect(5)
    let result=[]
    service.set('cuser','thamizh05')
    service.setMine()
    //check setMine()
    assert.deepEqual(service.get('mine'),result,"SetMine() works...Changes are done in mine")
    
    //check setAllPost()
    service.setAllPost()
    assert.deepEqual(service.get('allposts'),JSON.parse(localStorage.getItem('posts')),"setAllPost() works...Changes are done in allPosts")
    
    //check setAllGroup()
    service.setAllGroup()
    assert.deepEqual(service.get('allgroups'),JSON.parse(localStorage.getItem('groups')),"setAllGroups() works...Changes are done in allGroups")
    
    //check setFeeds()
    service.setFeeds()
    result=service.get('feeds').map(each => each.id)
    assert.deepEqual(result,JSON.parse(localStorage.getItem('feeds')),"setFeeds() works...Changes are done in feeds")
    
  })

  test('updateUser',function(assert){
    let service = this.owner.lookup('service:demo')
    let data={id:1,
    name:"bharani",
    password:"password",
    dispName:"BharaniJ27",
    friends:['User3',"thamizh05"],
    requests:[],
    email:"bharani05@gmail.com",
    contact:9120001751}
  let users = JSON.parse(localStorage.getItem('users'))
  service.updateUser(data,1)
  assert.deepEqual(service.get('userInfo'),data,"User Data is updated")
  localStorage.setItem('users',JSON.stringify(users))
  })

});
