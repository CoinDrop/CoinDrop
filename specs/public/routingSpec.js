//var db = require('../app/config');
//var User = require('../app/models/user');
//var Link = require('../app/models/link');

describe('Routing', function() {

  // it('should work', function(done) {
  //   request(app)
  //     .get('/')
  //     .expect(200)
  //     .end(done);
  // });

  var $state, $injector, $rootScope;

  beforeEach(module('coindropApp'));
  beforeEach(inject(function($injector){
    $state = $injector.get('$state');
  }));

  it('Should have /home route', function () {
    expect($state.href('home')).to.equal('#/');
  });
  it('Should have /login route', function () {
    expect($state.href('login')).to.equal('#/login');
  });
  it('Should have /signup route', function () {
    expect($state.href('signup')).to.equal('#/signup');
  });
  it('Should have /user route', function () {
    // expect($state.href('')).to.equal('#/user');
    expect($state.href('user')).to.equal('#/user');
  });
  it('Should have /transaction/new route', function () {
    expect($state.href('makeTran')).to.equal('#/transaction/new');
  });
});
