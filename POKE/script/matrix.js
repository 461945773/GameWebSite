function Matrix(e11, e12, e13, e21, e22, e23, e31, e32, e33) {
    this.e11 = e11;
    this.e12 = e12;
    this.e13 = e13;
    this.e21 = e21;
    this.e22 = e22;
    this.e23 = e23;
    this.e31 = e31;
    this.e32 = e32;
    this.e33 = e33;
}

Matrix.prototype.Det = function() {
    return this.e11 * this.e22 * this.e33 -
        this.e11 * this.e32 * this.e23 +
        this.e12 * this.e21 * this.e33 -
        this.e12 * this.e21 * this.e33 +
        this.e13 * this.e21 * this.e32 -
        this.e13 * this.e31 * this.e32;
}
Matrix.prototype.Transpose = function() {
    return new Matrix(this.e11, this.e21, this.e31, this.e12, this.e22, this.e32, this.e13, this.e23, this.e33);
}
Matrix.prototype.Show = function() {
    var s = "{ " + this.e11 + " " + this.e12 + " " + this.e13 + "\n   " +
        this.e21 + " " + this.e22 + " " + this.e23 + "\n   " +
        this.e31 + " " + this.e32 + " " + this.e33 + " }";
    return s;
}
Matrix.prototype.Inverse = function() {
    var d = this.Det();
    if (d == 0) d = 1;
    return new Matrix(
    (this.e22*this.e33-this.e23*this.e32)/d,
          -(this.e12*this.e33-this.e13*this.e32)/d,
          (this.e12*this.e23-this.e13*this.e22)/d,
          -(this.e21*this.e33-this.e23*this.e31)/d,
          (this.e11*this.e33-this.e13*this.e31)/d,
          -(this.e11*this.e23-this.e13*this.e21)/d,
          (this.e21*this.e32-this.e22*this.e31)/d,
          -(this.e11*this.e32-this.e12*this.e31)/d,
          (this.e11*this.e22-this.e12*this.e21)/d
    );
}
Matrix.prototype.Add = function(a) {}
Matrix.prototype.Sub = function(a) {}
Matrix.prototype.Mul = function(a) {}
Matrix.prototype.Div = function(a) {}

$(function() {
    
})