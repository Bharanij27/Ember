import { module, test } from 'qunit';
import { fillIn, visit, click, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | project', function(hooks) {
  setupApplicationTest(hooks);

  test('Complete WalkThrough', async function(assert) {

    let users,posts,groups,u_cnt,p_cnt,feeds;

    users=JSON.parse(localStorage.getItem('users'))
    posts=JSON.parse(localStorage.getItem('posts'))
    feeds=JSON.parse(localStorage.getItem('feeds'))
    u_cnt=(localStorage.getItem('u_cnt'))
    p_cnt=(localStorage.getItem('p_cnt'))
    groups=JSON.parse(localStorage.getItem('groups'))	

    await visit('/signup');
    assert.equal(currentURL(), '/signup');

    //this account is created to give request and to add this to group

    await visit('/signup')
    await fillIn('#uname','mani')
    await fillIn('#udisp','Mani')
    await fillIn('#upass','mani')
    await fillIn('#ueid','mani@gmail.com')
    await fillIn('#uno',9191910220)
    await click('.lobtn')

    //create account
    await visit('/signup')
    await fillIn('#uname','test')
    await fillIn('#udisp','Test1')
    await fillIn('#upass','test')
    await fillIn('#ueid','test1@gmail.com')
    await fillIn('#uno',9191910000)
    await click('.lobtn')

    //LogIn 
    assert.equal(currentURL(),'/login',"account created")
    await fillIn('#username','test')
    await fillIn('#password','test')
    await click('button')
    assert.equal(currentURL(),'/page1',"Account created and logged in")

    //create post
    await visit('/create')
    assert.equal(currentURL(),'/create',"In Create Post Page")
    await fillIn('#title','Test Post')
    await fillIn('#content','Test Content')
    await click('button')
    assert.equal(currentURL(),'/page1',"post created")
    
    //visiting /mypost to check created post
    await visit('/user/MyPost')
    let post='Blog By:Test1 Title:Test Post Content: Test Content'
    let id=JSON.parse(localStorage.getItem('p_cnt'))
    assert.dom('.comp2').hasText(post,"post is updated correctly")

    //visiting created post by clicking it and share it to Mnai & feeds
    await click('.listOfUser'+id)
    assert.equal(currentURL(),'/post/'+id,"In MyPost page")
    await fillIn('#shared','Feeds')
    await click('.lobtn')
    await visit('/user/MyPost')
    await click('.listOfUser'+id)
    await fillIn('#shared','Mani')
    await click('.lobtn')
    await visit('/page1') 
    await click('.listOfUser'+id)
    assert.equal(currentURL(),'/post/'+id,"Post Updated in Feeds")

    //send request to Mani
    await visit('/friend');
    await fillIn('#name','Mani')  
    await click('.lobtn')

    //Edit User Details and check
    await visit('/edit')
    await fillIn('#uname','tester')
    await fillIn('#upass','tester')
    await fillIn('#ueid','tester21@gmail.com')
    await fillIn('#uno',9231017574)
    await click('button')

    await visit('/account')
    assert.dom('.textbox').hasText('UserName:tester Email:tester21@gmail.com Contact:9231017574',"Account Edited Successfully")

    //LogOut
    await visit('/');
    
    //Logging check shared to me and accept request
    await fillIn('#username','mani')
    await fillIn('#password','mani')
    await click('button')

    await visit('/shared')
    await click('.listOfUser'+id)
    assert.dom('.content').hasText("Test Content","post is shared correctly")

    await visit('/friend')
    await click('#accept') //accepting request

    //checking is friend list updated properly
    let user=JSON.parse(localStorage.getItem('users'))
    user=user.filter(each => each.dispName=='Mani')[0]
    assert.equal(user['friends'].includes('Test1'),true,"Friend list updated successfully")

    //creating group

    await visit('/group')
    await fillIn('#gname','Test')
    await click('#create')

    await visit('/create')
    await visit('/group')

    await click('#addTest')//Add Test1 user to group
    await fillIn('#uname','Test1')
    await click('#add')

    //check group is created
    let all_groups=JSON.parse(localStorage.getItem('groups'))
    let created_one=all_groups.filter(each =>each['name']=='Test')
    assert.equal(created_one.length,1,"Group is Created")
    created_one=created_one[0]
    //check person is added
    assert.equal(created_one['users'].includes('Test1'),true,"User is added to the Group")

    await visit('/login')

    //Restoring Data as it was
    localStorage.setItem('users',JSON.stringify(users))
    localStorage.setItem('posts',JSON.stringify(posts))
    localStorage.setItem('groups',JSON.stringify(groups))

    localStorage.setItem('feeds',JSON.stringify(feeds));
    localStorage.setItem('u_cnt',u_cnt)
    localStorage.setItem('p_cnt',p_cnt)
  })
  
});
