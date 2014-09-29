/*jshint expr:true */
// 'use strict';

describe('Routing', function() {

  var $state, $injector, $rootScope;

  beforeEach(module('coindropApp'));
  beforeEach(inject(function($injector){
    $state = $injector.get('$state');
  }));

  it('Should have /home route', function () {
    expect($state.href('home')).to.equal('/');
  });
  it('Should have /login route', function () {
    expect($state.href('login')).to.equal('/login');
  });
  it('Should have /signup route', function () {
    expect($state.href('signup')).to.equal('/signup');
  });
  it('Should have /user route', function () {
    // expect($state.href('')).to.equal('#/user');
    expect($state.href('user')).to.equal('/user');
  });
  it('Should have /deal/new route', function () {
    expect($state.href('makeLock')).to.equal('/deal/new');
  });
});
