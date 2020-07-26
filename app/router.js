import EmberRouter from '@ember/routing/router';
import config from './config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function() {
  this.route('login');
  this.route('page1');
  this.route('signup');
  this.route('create');
  this.route('post',{path:'/post/:post_id'});
  this.route('user',{path:'/user/:user_name'});
  this.route('notfound');
  this.route('shared');
  this.route('account', function() {});
  this.route('edit');
  this.route('friend');
  this.route('group');
});
