import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';


module('Integration | Component | comp-no2', function(hooks) {
  setupRenderingTest(hooks);

  test('Comp No 2 renders', async function(assert) {

    let result="Blog By:thamizh05 Title:thamizh's Blog Content: This is on thamizh post with id"
    this.setProperties({data:[{'id': 2,'author_name': "thamizh05", 'title': "thamizh's Blog" ,'content': "This is on thamizh post with id", 'shared': ["GroupNo1"],'comment': []}]})
    await render(hbs`<CompNo2 />`);
    assert.equal(this.element.textContent.trim(), 'Sorry No Post available','Empty data passed');
    await render(hbs`<CompNo2 @model={{this.data}}/>`);
    assert.dom('').containsText(result,"Data is passed to Component")

  });
});
