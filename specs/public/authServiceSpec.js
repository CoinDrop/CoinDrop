/*jshint expr:true */
describe('authService factory', function() {
  var authService;
  var httpBackend;

  beforeEach(function() {
    module('coindropApp');

    inject(function(_authService_) {
      authService = _authService_;
      // httpBackend = $httpBackend;
      // httpBasedService = _httpBasedService_;
    });
  });

  // afterEach(function() {
  //   httpBackend.verifyNoOutstandingExpectation();
  //   httpBackend.verifyNoOutstandingRequest();
  // });
  it('should have an auth service', function() {
    expect(authService).to.exist;
  });
  it('it should have a signup method', function() {
    expect(authService.signup).to.be.a('function');
  });
  it('should have a login method', function() {
    expect(authService.login).to.be.a('function');
  });


});