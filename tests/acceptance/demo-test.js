import { module, test } from 'qunit';
import { click, fillIn, visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit'; 

module('Acceptance | demo', function(hooks) {
  setupApplicationTest(hooks);


  test('Redirecting To Login', async function(assert) {
    localStorage.setItem('logged',null)
    await visit('/page1');
    assert.equal(currentURL(), '/login',"Redirecting is done")
  });

  test('Visiting Login', async function(assert) {
    await visit('/');
    assert.equal(currentURL(), '/login');
  });

  test('Logging In', async function(assert) {
    await visit('/signup')
    await fillIn('#uname','mani')
    await fillIn('#udisp','Mani')
    await fillIn('#upass','mani')
    await fillIn('#ueid','mani@gmail.com')
    await fillIn('#uno',9191910220)
    await click('.lobtn')

    await fillIn('#username','mani')
    await fillIn('#password','mani')
    await click('button')
    assert.equal(currentURL(), '/page1',"Logged In and Transition is done")

  });

  test('Visiting Shared To Me', async function(assert) {
    await visit('/login');
    await fillIn('#username','mani')
    await fillIn('#password','mani')
    await click('button')
    assert.equal(currentURL(), '/page1',"Logged In and Transition is done")
    assert.dom('.menu-shared').hasText('Shared To Me')
  });

  test('Visiting Create Post', async function(assert) {
    await visit('/login');
    await fillIn('#username','mani')
    await fillIn('#password','mani')
    await click('button')
    
    assert.dom('.menu-create').hasText('Create Post')
    await click('.menu-create')
    assert.equal(currentURL(), '/create')
  });

  test('Visiting Account and details', async function(assert) {
    await visit('/login');
    await fillIn('#username','mani')
    await fillIn('#password','mani')
    await click('button')
    
    await click('.menu-account')
    assert.equal(currentURL(), '/account')
    await click('.menu-group')
    assert.equal(currentURL(), '/group')
    
    await visit('/account');
    await click('.menu-friend')
    assert.equal(currentURL(), '/friend')
    
    await visit('/account');
    await click('.menu-edit')
    assert.equal(currentURL(), '/edit')
  });

  test('Logging Out', async function(assert) {
    await visit('/login');
    await fillIn('#username','mani')
    await fillIn('#password','mani')
    await click('button')
    
    await click('.menu-logout')
    assert.equal(currentURL(), '/login')


    let users=JSON.parse(localStorage.getItem('users'))
    let index=null
    for( let i=0;i<users.length;i++){
      if(users[i]['name']=='mani'){index=i}
    }
    users.splice(index,1)
    localStorage.setItem('users',JSON.stringify(users))
    localStorage.setItem('u_cnt',localStorage.getItem('u_cnt')-1)
  });

});
