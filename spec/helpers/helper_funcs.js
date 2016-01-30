beforeEach(function (){
    this.hexToRgb = function (color){
        var rgb = [
            parseInt(color.slice(1, 3), 16),
            parseInt(color.slice(3, 5), 16),
            parseInt(color.slice(5), 16)
        ];

        return rgb;
    };
    
});
