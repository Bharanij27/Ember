import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click } from '@ember/test-helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | comp-no1', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {

    this.setProperties({data:['Feeds','MyPost','GroupNo1']})
    await render(hbs`<CompNo1 />`);
    assert.equal(this.element.textContent.trim(), '');

    await render(hbs`<CompNo1 @available={{this.data}}/>`);
    assert.dom('.comp1').containsText('Feeds MyPost GroupNo1')
    await click('.Feeds')

  });
});
