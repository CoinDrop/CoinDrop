describe('Routing', function() {

  // it('should work', function(done) {
  //   request(app)
  //     .get('/')
  //     .expect(200)
  //     .end(done);
  // });

  var $route;

  beforeEach(module('coindropApp'));
  beforeEach(inject(function($injector){
    $route = $injector.get('$route');
  }));

  it('Should have /initiate route, template, and controller', function () {
    expect($route.routes['/initiate']).to.be.ok();
    expect($route.routes['/initiate'].controller).to.be('initiateCtrl');
    expect($route.routes['/initiate'].templateUrl).to.be('scripts/states/initiate/initiate.html');
  });

});
