app.filter('selectionByName', function () {
    return function (items) {
        var result = [];
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            var flag = false;
            for(var j=0; j<result.length; j++) {
                if (item.WhoReported == result[j].WhoReported) {
                    flag = true;}
            }
            if (!flag) {
                result.push(item);
            }
        }
        return result;
    };
});


