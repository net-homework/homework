/**
 * Created by ptrdu on 2016/2/2.
 */
function VM(opts) {
    this.id = opts.id;
}

VM._init = function() {
    var id = this.id;
    var dom = documet.getElementById(id);

}
var _transclude = function(dom) {
    var directives = VM.directives;
    for(var item in dom.children) {

    }
}
module.exports = VM;