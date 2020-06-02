function updateMedia(id){
$.ajax({
        url: '/admin/' + id,
        type: 'PUT',
        data: $('#update-media').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};
