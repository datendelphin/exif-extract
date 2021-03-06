var map = L.mapbox.map('map', 'examples.map-4l7djmvo')
    .setView([40, -74.50], 9);

d3.select('body')
    .attr('dropzone', 'copy')
    .on('drop.localgpx', function() {
        d3.event.stopPropagation();
        d3.event.preventDefault();
        var f = d3.event.dataTransfer.files[0],
            reader = new FileReader();

        reader.onload = function(e) {
            var data = reader.result;
            exifExtract(data, function(err, result) {
                if (err) throw err;

                if (result.position) {
                    map.setView(result.position, 13);
                }

                if (result.position && result.thumbnail) {
                    var popup = L.popup()
                        .setLatLng(result.position)
                        .setContent('<img src="' + result.thumbnail + '" />')
                        .openOn(map);
                }

            });
        };

        reader.readAsArrayBuffer(f);
    })
    .on('dragenter.localgpx', over)
    .on('dragexit.localgpx', over)
    .on('dragover.localgpx', over);

function over() {
    d3.event.stopPropagation();
    d3.event.preventDefault();
    d3.event.dataTransfer.dropEffect = 'copy';
}
