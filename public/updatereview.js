function updateReview(id){
$.ajax({
        url: '/userProfile/' + id,
        type: 'PUT',
        data: $('#update-review').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};
