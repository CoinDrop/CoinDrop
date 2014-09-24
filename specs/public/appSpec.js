//without this test, we wont know if our module is loading
describe('coindropApp module', function() {
  var module;
  before(function() {
    module = angular.module('coindropApp');
  });
  it('should be registered', function() {
    expect(module).not.to.equal(null);
  });

  //withut these tests, we wont know if we're injecting the proper dependencies
  describe('coindropApp dependencies', function() {
    var dependencies;
    var hasModule = function(module) {
      return dependencies.indexOf(module) >= 0;
    };
    before(function() {
      dependencies = module.value('coindropApp').requires;
    });
    it('should have only 2 dependencies', function() {
      expect(dependencies.length).to.equal(2);
    });
    it('should have ui.route as a dependency', function() {
      expect(hasModule('ui.router')).to.equal(true);
    });
    it('should have ngAnimate as a dependency', function() {
      expect(hasModule('ngAnimate')).to.equal(true);
    })
  });
});
