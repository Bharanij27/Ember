import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

//let originalAlert;

module('Unit | Route | login', function(hooks) {
  setupTest(hooks);

/*  hooks.beforeEach(function(assert) {
    originalAlert = window.alert; // store a reference to window.alert
  });

  hooks.afterEach(function(assert) {
    window.alert = originalAlert; // restore window.alert
  });*/
  test('it exists', function(assert) {
    let route = this.owner.lookup('route:login');
    assert.ok(route)
  })
});
