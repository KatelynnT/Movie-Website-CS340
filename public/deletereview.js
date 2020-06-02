function deleteReview(id){
    $.ajax({
        url: '/userProfile/',
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};
