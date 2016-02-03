/**
 * Created by ptrdu on 2016/2/2.
 */
function Router() {
    this.routeMap = {};
    this.vm = {};
}

Router.prototype.set = function(hash, vm) {
    this.routeMap[hash] = vm;
    return this;
};

Router._init = function() {
    var self = this;
    if(typeof window.location === 'undefined'){
        console.log('need work in browser');
        return;
    }else{
        if(typeof window.onhashchange !== 'undefined') {
            window.onhashchange = function() {
                if(self.routeMap[window.location.hash]) {
                    self.vm = self.routeMap[window.location.hash];
                }
            }
        }else{
            var oldHash = window.location.hash;
            var newHash;
            setInterval(function(){
                newHash = window.location.hash;
                oldHash = newHash;
                if(self.routeMap[newHash]) self.vm = self.routeMap[newHash];
                else console.log('please add the correct route');
            },100);
        }
    }
};
module.exports = Router;