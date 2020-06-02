function updateMedia(id){
$.ajax({
        url: '/media/' + id,
        type: 'PUT',
        data: $('#update-media').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};
